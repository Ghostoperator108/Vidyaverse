import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Link } from 'react-router-dom';



// --- 1. QUIZ DATA ---
// All game questions are stored in this array.
const questions = [
  {
    id: 1,
    type: 'multiple_choice',
    question: "Which plant's ROOT do we eat?",
    options: [
      { name: 'Carrot', imageKey: 'carrot', isCorrect: true },
      { name: 'Spinach', imageKey: 'spinach', isCorrect: false },
      { name: 'Pea', imageKey: 'pea', isCorrect: false },
    ],
  },
  {
    id: 2,
    type: 'multiple_choice',
    question: "Which plant's LEAVES do we eat?",
    options: [
      { name: 'Broccoli', imageKey: 'broccoli', isCorrect: false },
      { name: 'Cabbage', imageKey: 'cabbage', isCorrect: true },
      { name: 'Potato', imageKey: 'potato', isCorrect: false },
    ],
  },
  {
    id: 3,
    type: 'multiple_choice',
    question: "Which plant's FLOWER do we eat?",
    options: [
       { name: 'Lettuce', imageKey: 'lettuce', isCorrect: false },
       { name: 'Corn', imageKey: 'corn', isCorrect: false },
       { name: 'Cauliflower', imageKey: 'cauliflower', isCorrect: true },
    ]
  },
  {
    id: 4,
    type: 'interactive_plant',
    question: 'Tap the part we use for cooking oil.',
    plant_image: 'mustard_plant',
    hotspots: [
      // Note: x, y coordinates are relative to the plant image's center
      { part: 'leaves', x: 0, y: 0, width: 180, height: 120, isCorrect: false },
      { part: 'seeds', x: 0, y: -130, width: 150, height: 100, isCorrect: true },
    ],
  },
];

// --- 2. PHASER GAME SCENE ---
// This class contains all the logic for the actual game canvas.
class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  // Receives data from React component
  init(data) {
    this.questions = data.questions;
    this.onCorrect = data.onCorrect;
    this.onIncorrect = data.onIncorrect;
  }

  preload() {
    // Using placeholder images for simplicity
    this.load.image('carrot', 'https://placehold.co/150x150/FF8A2B/FFFFFF?text=Carrot');
    this.load.image('spinach', 'https://placehold.co/150x150/008037/FFFFFF?text=Spinach');
    this.load.image('pea', 'https://placehold.co/150x150/89C35C/FFFFFF?text=Pea+Pod');
    this.load.image('cabbage', 'https://placehold.co/150x150/90EE90/000000?text=Cabbage');
    this.load.image('broccoli', 'https://placehold.co/150x150/006400/FFFFFF?text=Broccoli');
    this.load.image('potato', 'https://placehold.co/150x150/D2B48C/000000?text=Potato');
    this.load.image('cauliflower', 'https://placehold.co/150x150/F0F0E0/000000?text=Cauliflower');
    this.load.image('lettuce', 'https://placehold.co/150x150/32CD32/FFFFFF?text=Lettuce');
    this.load.image('corn', 'https://placehold.co/150x150/FFD700/000000?text=Corn');
    this.load.image('mustard_plant', 'https://placehold.co/300x400/228B22/FFFFFF?text=Mustard+Plant');
  }

  create() {
    this.cameras.main.setBackgroundColor('#D1FAE5'); // A light green background
    this.currentQuestionIndex = 0;
    this.questionObjects = [];
    this.displayQuestion();
  }
  
  displayQuestion() {
    // Clear previous question's objects
    this.questionObjects.forEach(obj => obj.destroy());
    this.questionObjects = [];

    if (this.currentQuestionIndex >= this.questions.length) {
      this.displayGameOver();
      return;
    }

    const questionData = this.questions[this.currentQuestionIndex];
    const { width, height } = this.scale;

    // Display question text
    const qText = this.add.text(width / 2, 80, questionData.question, {
      font: '32px Arial',
      fill: '#1E40AF',
      wordWrap: { width: width - 40 },
      align: 'center',
    }).setOrigin(0.5);
    this.questionObjects.push(qText);

    if (questionData.type === 'multiple_choice') {
      this.displayMultipleChoice(questionData);
    } else if (questionData.type === 'interactive_plant') {
      this.displayInteractivePlant(questionData);
    }
  }

  displayMultipleChoice(data) {
    const { width } = this.scale;
    const optionSpacing = 200;
    const startX = width / 2 - optionSpacing;

    data.options.forEach((option, index) => {
      const x = startX + index * optionSpacing;
      const img = this.add.image(x, 250, option.imageKey).setInteractive({ cursor: 'pointer' });
      img.setData('isCorrect', option.isCorrect);
      this.questionObjects.push(img);
    });

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      this.handleAnswer(gameObject);
    });
  }

  displayInteractivePlant(data) {
    const { width, height } = this.scale;
    const plant = this.add.image(width / 2, height / 2 + 50, data.plant_image);
    this.questionObjects.push(plant);

    data.hotspots.forEach(spot => {
        const zone = this.add.zone(plant.x + spot.x, plant.y + spot.y, spot.width, spot.height)
            .setRectangleDropZone(spot.width, spot.height)
            .setInteractive({ cursor: 'pointer' });

        zone.setData('isCorrect', spot.isCorrect);
        this.questionObjects.push(zone);

        // Optional: visualize hotspot for debugging
        // const graphics = this.add.graphics();
        // graphics.lineStyle(2, 0xff0000);
        // graphics.strokeRect(zone.x - zone.input.hitArea.width/2, zone.y - zone.input.hitArea.height/2, zone.input.hitArea.width, zone.input.hitArea.height);
        // this.questionObjects.push(graphics);
    });

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      this.handleAnswer(gameObject);
    });
  }
  
  handleAnswer(selectedObject) {
    this.input.off('gameobjectdown'); // Disable further clicks
    const isCorrect = selectedObject.getData('isCorrect');

    if (isCorrect) {
      selectedObject.setTint(0x00ff00); // Green tint for correct
      this.onCorrect();
    } else {
      selectedObject.setTint(0xff0000); // Red tint for incorrect
      this.onIncorrect();
      // Highlight the correct one
      this.questionObjects.forEach(obj => {
          if(obj.getData('isCorrect')) {
              obj.setTint(0x00ff00);
          }
      });
    }

    // Move to next question after a delay
    this.time.delayedCall(1500, () => {
      this.currentQuestionIndex++;
      this.displayQuestion();
    });
  }
  
  displayGameOver() {
      const { width, height } = this.scale;
      const gameOverText = this.add.text(width / 2, height / 2, 'Great Job!\nGame Over', {
        font: '48px Arial',
        fill: '#000000',
        align: 'center'
      }).setOrigin(0.5);
      this.questionObjects.push(gameOverText);
  }
}

// --- 3. REACT COMPONENT ---
// This is the main App component that renders everything.
function App() {
  const [score, setScore] = useState(0);
  const phaserGameRef = useRef(null);

  const handleCorrect = () => {
    setScore(prevScore => prevScore + 10);
  };
  
  const handleIncorrect = () => {
    // You could add logic here, e.g., deducting points
  };

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-container',
      scene: GameScene,
      backgroundColor: '#ffffff',
    };

    // Instantiate the game
    const game = new Phaser.Game(config);
    phaserGameRef.current = game;
    
    // Pass data and callbacks to the scene
    game.scene.start('GameScene', { 
        questions: questions,
        onCorrect: handleCorrect,
        onIncorrect: handleIncorrect
    });

    // Cleanup function to destroy the game instance on component unmount
    return () => {
      phaserGameRef.current.destroy(true);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 font-sans p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">🌿 Plant Parts Picnic 🥕</h1>
        <p className="text-xl text-gray-600 mb-4">
          Click on the correct plant part to score points!
        </p>
        <div className="bg-yellow-200 text-yellow-800 font-bold text-2xl p-3 rounded-lg inline-block mb-4">
          Score: {score}
        </div>
        
        {/* The Phaser game canvas will be injected into this div */}
        <div id="phaser-container" className="flex justify-center cursor-pointer rounded-lg overflow-hidden"/>
      </div>
    </div>
  );
}

export default App;