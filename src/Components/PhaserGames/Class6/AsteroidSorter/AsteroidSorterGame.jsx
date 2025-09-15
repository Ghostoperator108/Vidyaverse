import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';

const AsteroidSorterGame = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Main Phaser game configuration
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-container', // This matches the ID of the div below
            backgroundColor: '#000',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                },
            },
            scene: {
                preload,
                create,
                update,
            },
        };

        const game = new Phaser.Game(config);

        // Phaser Scene Methods
        function preload() {
            // Load assets. You can replace these with your own images.
            this.load.image('background', 'https://via.placeholder.com/800x600/000428/ffffff?text=SPACE');
            this.load.image('asteroid', 'https://via.placeholder.com/60x60/8B4513/ffffff?text=ASTEROID');
        }

        let asteroidsGroup;
        let currentTargetNumber = 1;
        let scoreText;
        let currentTargetText;

        function create() {
            // Set up the background
            this.add.image(400, 300, 'background');

            // Set up a group to manage the asteroids
            asteroidsGroup = this.add.group();

            // Set up UI for score and target number
            scoreText = this.add.text(16, 16, `Score: 0`, { fontSize: '32px', fill: '#FFF', fontStyle: 'bold' });
            currentTargetText = this.add.text(16, 50, `Find: ${currentTargetNumber}`, { fontSize: '32px', fill: '#FFD700', fontStyle: 'bold' });

            // Spawn initial asteroids
            spawnAsteroids(this);

            // Add an input handler for clicks
            this.input.on('pointerdown', (pointer) => {
                const clickedAsteroids = this.input.hitTest(pointer, asteroidsGroup.getChildren());
                if (clickedAsteroids.length > 0) {
                    const asteroid = clickedAsteroids[0];
                    const asteroidNumber = parseInt(asteroid.getData('number'));

                    if (asteroidNumber === currentTargetNumber) {
                        // Correct hit: increase score, remove asteroid, update target
                        setScore(prevScore => prevScore + 10);
                        currentTargetNumber++;
                        currentTargetText.setText(`Find: ${currentTargetNumber}`);
                        asteroid.destroy();
                        
                        // Check if we need to respawn new asteroids
                        if (asteroidsGroup.countActive(true) < 2) {
                            spawnAsteroids(this);
                        }
                    } else {
                        // Incorrect hit: deduct points (optional) and show feedback
                        // setScore(prevScore => Math.max(0, prevScore - 5));
                    }
                }
            });
        }

        function update() {
            // Update the score text
            scoreText.setText(`Score: ${score}`);
        }

        // Helper function to spawn asteroids with numbers
        function spawnAsteroids(scene) {
            const numbers = [currentTargetNumber, ...generateRandomNumbers(3, currentTargetNumber)];
            Phaser.Utils.Array.Shuffle(numbers);

            asteroidsGroup.clear(true, true); // Clear existing asteroids and their data

            numbers.forEach((num) => {
                const x = Phaser.Math.Between(100, 700);
                const y = Phaser.Math.Between(100, 500);

                const asteroid = scene.add.sprite(x, y, 'asteroid');
                asteroid.setScale(1.2);
                asteroid.setInteractive();
                asteroid.setData('number', num);

                const numberText = scene.add.text(0, 0, num, { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0.5);
                
                const container = scene.add.container(x, y, [asteroid, numberText]);
                asteroidsGroup.add(container);
            });
        }
        
        // Generates an array of random numbers, ensuring no duplicates with the target
        function generateRandomNumbers(count, exclude) {
            const numbers = [];
            while(numbers.length < count) {
                const num = Math.floor(Math.random() * 20) + 1; // Generate numbers up to 20
                if (num !== exclude && !numbers.includes(num)) {
                    numbers.push(num);
                }
            }
            return numbers;
        }

        // Clean up the Phaser game instance when the component unmounts
        return () => {
            game.destroy(true);
        };
    }, [score, navigate]);

    return (
        <div className="min-h-screen bg-[#000428] flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-black text-white uppercase tracking-wider mb-4">Mission: Asteroid Sorter</h1>
            <div id="phaser-container" className="border-4 border-cyan-400 rounded-lg shadow-2xl"></div>
            <button
                onClick={() => navigate('/welcome')}
                className="mt-8 px-8 py-3 bg-red-600 text-white rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 transform hover:bg-red-700"
            >
                End Mission
            </button>
        </div>
    );
};

export default AsteroidSorterGame;