import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Link } from 'react-router-dom';



/**
 * Animal Diets Adventure - A Complete Phaser Game in a Single React Component.
 *
 * This component encapsulates the entire game. It initializes Phaser, defines all game scenes,
 * and handles cleanup when the component is removed from the screen.
 */
const AnimalDietGame = () => {
    // This ref will hold the DOM element where the Phaser canvas will be rendered.
    const gameContainer = useRef(null);
    // This ref holds the actual Phaser game instance, so we can destroy it on cleanup.
    const gameInstance = useRef(null);

    // The useEffect hook runs once after the component mounts, thanks to the empty dependency array [].
    useEffect(() => {
        // Prevent creating multiple game instances if the component re-renders.
        if (gameInstance.current) {
            return;
        }

        // --- All game logic and scenes are defined here, inside the useEffect hook ---

        // ## 1. GAME DATA ##
        // Centralized data for all animals in the game.
        const ANIMAL_DATA = [
            { name: 'Lion', key: 'animal-lion', habitat: 'bg-savanna', correctFood: 'food-meat', foods: ['food-meat', 'food-grass', 'food-berries'], classification: 'Carnivore' },
            { name: 'Cow', key: 'animal-cow', habitat: 'bg-grassland', correctFood: 'food-grass', foods: ['food-grass', 'food-meat', 'food-fish'], classification: 'Herbivore' },
            { name: 'Bear', key: 'animal-bear', habitat: 'bg-forest', correctFood: 'food-fish', foods: ['food-fish', 'food-leaves', 'food-carrot'], classification: 'Omnivore' },
            { name: 'Rabbit', key: 'animal-rabbit', habitat: 'bg-meadow', correctFood: 'food-carrot', foods: ['food-carrot', 'food-steak', 'food-worms'], classification: 'Herbivore' },
            { name: 'Chicken', key: 'animal-chicken', habitat: 'bg-farm', correctFood: 'food-worms', foods: ['food-worms', 'food-steak', 'food-grass'], classification: 'Omnivore' },
        ];

        // ## 2. PHASER SCENES ##

        // ### PreloadScene: Loads all assets ###
        class PreloadScene extends Phaser.Scene {
            constructor() { super('PreloadScene'); }
            preload() {
                const { width, height } = this.scale;
                const progressBox = this.add.graphics().fillStyle(0x222222, 0.8).fillRect(width / 2 - 160, height / 2 - 30, 320, 50);
                const progressBar = this.add.graphics();
                const loadingText = this.make.text({ x: width / 2, y: height / 2 - 50, text: 'Loading...', style: { font: '20px monospace', fill: '#ffffff' }}).setOrigin(0.5);
                this.load.on('progress', (value) => {
                    progressBar.clear().fillStyle(0xffffff, 1).fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
                });
                this.load.on('complete', () => {
                    progressBar.destroy();
                    progressBox.destroy();
                    loadingText.destroy();
                });

                // Load all game assets using placeholder images
                this.load.image('bg-grassland', 'https://placehold.co/1024x768/8BC34A/FFFFFF?text=Grassland');
                this.load.image('bg-savanna', 'https://placehold.co/1024x768/FBC02D/FFFFFF?text=Savanna');
                this.load.image('bg-forest', 'https://placehold.co/1024x768/388E3C/FFFFFF?text=Forest');
                this.load.image('bg-meadow', 'https://placehold.co/1024x768/4CAF50/FFFFFF?text=Meadow');
                this.load.image('bg-farm', 'https://placehold.co/1024x768/CDDC39/FFFFFF?text=Farm');
                this.load.image('animal-cow', 'https://placehold.co/200x200/FFFFFF/000000?text=Cow');
                this.load.image('animal-lion', 'https://placehold.co/200x200/FF9800/000000?text=Lion');
                this.load.image('animal-bear', 'https://placehold.co/200x200/795548/000000?text=Bear');
                this.load.image('animal-rabbit', 'https://placehold.co/150x150/EEEEEE/000000?text=Rabbit');
                this.load.image('animal-chicken', 'https://placehold.co/150x150/FFEB3B/000000?text=Chicken');
                this.load.image('food-grass', 'https://placehold.co/80x80/4CAF50/FFFFFF?text=Grass');
                this.load.image('food-meat', 'https://placehold.co/80x80/D32F2F/FFFFFF?text=Meat');
                this.load.image('food-fish', 'https://placehold.co/80x80/2196F3/FFFFFF?text=Fish');
                this.load.image('food-berries', 'https://placehold.co/80x80/E91E63/FFFFFF?text=Berries');
                this.load.image('food-leaves', 'https://placehold.co/80x80/689F38/FFFFFF?text=Leaves');
                this.load.image('food-carrot', 'https://placehold.co/80x80/FF5722/FFFFFF?text=Carrot');
                this.load.image('food-steak', 'https://placehold.co/80x80/B71C1C/FFFFFF?text=Steak');
                this.load.image('food-worms', 'https://placehold.co/80x80/9E9E9E/FFFFFF?text=Worms');
                this.load.image('bubble', 'https://placehold.co/150x150/80DEEA/FFFFFF?text=');
                this.load.image('particle', 'https://placehold.co/16x16/FFFFFF/FFFFFF?text=+');
            }
            create() {
                this.scene.start('GameScene');
                this.scene.launch('UIScene');
            }
        }

        // ### GameScene: Core gameplay logic ###
        class GameScene extends Phaser.Scene {
            constructor() {
                super('GameScene');
                this.currentAnimalIndex = 0;
                this.score = 0;
                this.gameState = 'START';
            }
            create() {
                this.game.events.on('classificationAttempt', this.checkClassification, this);
                this.startRound();
            }
            startRound() {
                if (this.currentAnimalIndex >= ANIMAL_DATA.length) { this.endGame(); return; }
                this.gameState = 'FEEDING';
                this.currentAnimalData = ANIMAL_DATA[this.currentAnimalIndex];
                this.add.image(this.scale.width / 2, this.scale.height / 2, this.currentAnimalData.habitat);
                this.animalSprite = this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, this.currentAnimalData.key);
                this.game.events.emit('updateAnimalName', this.currentAnimalData.name);
                this.createFoodBubbles();
            }
            createFoodBubbles() {
                this.foodBubbles = this.add.group();
                const positions = [{ x: this.scale.width * 0.25, y: 200 }, { x: this.scale.width * 0.5, y: 150 }, { x: this.scale.width * 0.75, y: 200 }];
                Phaser.Utils.Array.Shuffle([...this.currentAnimalData.foods]).forEach((foodKey, index) => {
                    const container = this.add.container(positions[index].x, positions[index].y, [this.add.sprite(0, 0, 'bubble'), this.add.sprite(0, 0, foodKey).setScale(0.8)]);
                    container.setSize(150, 150).setInteractive();
                    container.foodKey = foodKey;
                    this.foodBubbles.add(container);
                    this.tweens.add({ targets: container, y: `+=${Phaser.Math.Between(15, 30)}`, duration: 2000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });
                    container.on('pointerdown', () => this.handleFoodChoice(container));
                    container.on('pointerover', () => this.tweens.add({ targets: container, scale: 1.1, duration: 200 }));
                    container.on('pointerout', () => this.tweens.add({ targets: container, scale: 1, duration: 200 }));
                });
            }
            handleFoodChoice(chosenBubble) {
                if (this.gameState !== 'FEEDING') return;
                this.foodBubbles.getChildren().forEach(b => b.disableInteractive());
                const isCorrect = chosenBubble.foodKey === this.currentAnimalData.correctFood;
                if (isCorrect) {
                    this.gameState = 'CLASSIFYING';
                    this.add.particles(chosenBubble.x, chosenBubble.y, 'particle', { speed: 100, lifespan: 300, scale: { start: 1, end: 0 }, blendMode: 'ADD' }).explode(20);
                    this.foodBubbles.getChildren().forEach(b => b !== chosenBubble && this.tweens.add({ targets: b, alpha: 0, duration: 300, onComplete: () => b.destroy() }));
                    this.tweens.add({ targets: chosenBubble.list[1], x: this.animalSprite.x - chosenBubble.x, y: this.animalSprite.y - chosenBubble.y, scale: 0.3, duration: 800, ease: 'Cubic.easeIn', onComplete: () => {
                        this.tweens.add({ targets: this.animalSprite, scaleX: 1.05, scaleY: 0.95, yoyo: true, duration: 150, onComplete: () => this.game.events.emit('showClassification') });
                        chosenBubble.destroy();
                    }});
                } else {
                    chosenBubble.list[0].setTint(0xff0000);
                    this.tweens.timeline({ targets: chosenBubble, tweens: [{ x: '-=10', duration: 50 }, { x: '+=20', duration: 100 }, { x: '-=10', duration: 50 }], onComplete: () => {
                        this.tweens.add({ targets: chosenBubble, alpha: 0, duration: 300, onComplete: () => {
                            chosenBubble.destroy();
                            this.foodBubbles.getChildren().forEach(b => b.setInteractive());
                        }});
                    }});
                }
            }
            checkClassification(attempt) {
                if (this.gameState !== 'CLASSIFYING') return;
                const isCorrect = attempt === this.currentAnimalData.classification;
                if (isCorrect) {
                    this.score += 10;
                    this.game.events.emit('updateScore', this.score);
                    this.game.events.emit('showFeedback', { correct: true });
                    this.gameState = 'TRANSITION';
                    this.time.delayedCall(2000, () => {
                        this.currentAnimalIndex++;
                        this.animalSprite.destroy();
                        this.foodBubbles.destroy(true, true);
                        this.game.events.emit('hideClassification');
                        this.startRound();
                    }, [], this);
                } else {
                    const hint = { Carnivore: 'Eats meat!', Herbivore: 'Eats plants!', Omnivore: 'Eats both!' }[this.currentAnimalData.classification];
                    this.game.events.emit('showFeedback', { correct: false, hint: `Remember: ${hint}` });
                }
            }
            endGame() {
                this.game.events.emit('showEndGame', this.score);
            }
        }

        // ### UIScene: Handles all UI elements ###
        class UIScene extends Phaser.Scene {
            constructor() { super('UIScene'); }
            create() {
                const { width, height } = this.scale;
                this.scoreText = this.add.text(width - 20, 20, 'Score: 0', { font: '32px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 4 }).setOrigin(1, 0);
                this.animalNameText = this.add.text(width / 2, 50, '', { font: '48px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);
                this.feedbackText = this.add.text(width / 2, height - 180, '', { font: '40px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 5, align: 'center' }).setOrigin(0.5).setVisible(false);
                this.createInstructions(width, height);
                this.createClassificationButtons(width, height);

                this.game.events.on('updateScore', (score) => this.scoreText.setText(`Score: ${score}`));
                this.game.events.on('updateAnimalName', (name) => this.animalNameText.setText(name));
                this.game.events.on('showClassification', () => this.toggleButtons(true));
                this.game.events.on('hideClassification', () => { this.toggleButtons(false); this.feedbackText.setVisible(false); });
                this.game.events.on('showFeedback', ({ correct, hint }) => {
                    this.feedbackText.setText(correct ? 'Correct! ✅' : `Try Again!\n${hint}`).setFill(correct ? '#4CAF50' : '#D32F2F').setVisible(true).setAlpha(0);
                    this.tweens.add({ targets: this.feedbackText, alpha: 1, duration: 300, yoyo: !correct, hold: 1500, onComplete: () => correct && this.feedbackText.setVisible(false) });
                });
                this.game.events.on('showEndGame', (score) => {
                    this.animalNameText.setText('Great Job!');
                    this.feedbackText.setText(`Final Score: ${score}`).setFill('#FFD700').setVisible(true);
                    this.toggleButtons(false);
                });
            }
            createInstructions(width, height) {
                const text = "Welcome!\n\nFeed the animal its favorite food.\nThen, classify its diet.\n\nClick to Start!";
                const panel = this.add.container(width / 2, height / 2, [
                    this.add.graphics().fillStyle(0x000000, 0.7).fillRoundedRect(-300, -150, 600, 300, 16),
                    this.add.text(0, 0, text, { font: '32px Arial', fill: '#ffffff', align: 'center', wordWrap: { width: 580 }}).setOrigin(0.5)
                ]);
                this.input.once('pointerdown', () => this.tweens.add({ targets: panel, alpha: 0, duration: 500, onComplete: () => panel.destroy() }));
            }
            createClassificationButtons(width, height) {
                this.buttons = [];
                ['Herbivore', 'Carnivore', 'Omnivore'].forEach((type, i) => {
                    const button = this.add.container((width / 4) * (i + 1), height + 80, [
                        this.add.graphics().fillStyle({Herbivore: 0x4CAF50, Carnivore: 0xD32F2F, Omnivore: 0x1976D2}[type]).fillRoundedRect(-125, -40, 250, 80, 16),
                        this.add.text(0, 0, type, { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5)
                    ]).setSize(250, 80).setInteractive();
                    button.on('pointerdown', () => this.game.events.emit('classificationAttempt', type));
                    button.on('pointerover', () => this.tweens.add({ targets: button, scale: 1.1, duration: 200 }));
                    button.on('pointerout', () => this.tweens.add({ targets: button, scale: 1, duration: 200 }));
                    this.buttons.push(button);
                });
            }
            toggleButtons(isVisible) {
                this.buttons.forEach(button => {
                    this.tweens.add({ targets: button, y: this.scale.height + (isVisible ? -80 : 80), duration: 500, ease: 'Back.easeOut' });
                });
            }
        }

        // ## 3. PHASER GAME CONFIGURATION ##
        const config = {
            type: Phaser.AUTO, // Use WebGL if available, otherwise fallback to Canvas
            width: 1024,
            height: 768,
            parent: gameContainer.current, // Render the game in our container div
            scale: {
                mode: Phaser.Scale.FIT, // Scale the game to fit the container
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            backgroundColor: '#87CEEB',
            scene: [PreloadScene, GameScene, UIScene], // The list of scenes for the game
        };

        // Create the Phaser game instance and store it in our ref.
        gameInstance.current = new Phaser.Game(config);

        // This is the cleanup function.
        // It runs when the component unmounts, destroying the game instance to free up resources.
        return () => {
            if (gameInstance.current) {
                gameInstance.current.destroy(true);
                gameInstance.current = null;
            }
        };
    }, []); // The empty array ensures this effect runs only once.

    // This div is where our Phaser game will live.
    return <div ref={gameContainer} style={{ width: '100%', height: '100%' }} />;
    
};

export default AnimalDietGame;