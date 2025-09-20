import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

// === DATA FOR FOOD ITEMS ===
const FOOD_ITEMS = [
    { key: 'apple', source: 'plant' },
    { key: 'egg', source: 'animal' },
    { key: 'cheese', source: 'animal' },
    { key: 'carrot', source: 'plant' },
    { key: 'fish', source: 'animal' },
    { key: 'sugarcane', source: 'plant' },
    { key: 'steak', source: 'animal' },
    { key: 'bread', source: 'plant' },
    { key: 'milk', source: 'animal' },
    { key: 'broccoli', source: 'plant' }
];

// === PHASER MENU SCENE ===
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Since GameScene creates all assets, we just need to ensure its assets are available.
        // In a larger game, you'd load assets here.
        this.makePlaceholders();
    }

    create() {
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        
        // --- Title ---
        this.add.text(400, 150, 'Source Sort', { 
            fontSize: '64px', 
            fill: '#FFF', 
            stroke: '#000', 
            strokeThickness: 6 
        }).setOrigin(0.5);

        // --- Instructions ---
        const instructions = [
            'Food items will move across the conveyor belt.',
            'Drag each item to the correct bin below.',
            'Score as many points as you can in 60 seconds!'
        ];
        this.add.text(400, 280, instructions, { 
            fontSize: '24px', 
            fill: '#FFF', 
            stroke: '#000', 
            strokeThickness: 4,
            align: 'center' 
        }).setOrigin(0.5);

        // --- Start Button ---
        const startButton = this.add.rectangle(400, 450, 250, 80, 0x4CAF50, 1).setStrokeStyle(4, 0xffffff);
        const startText = this.add.text(400, 450, 'Start Game', { 
            fontSize: '32px', 
            fill: '#FFF' 
        }).setOrigin(0.5);
        
        startButton.setInteractive({ useHandCursor: true });
        startButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('GameScene');
            });
        });
        startButton.on('pointerover', () => startButton.setFillStyle(0x5cb85c));
        startButton.on('pointerout', () => startButton.setFillStyle(0x4CAF50));
    }
    
    // Minimal placeholder generation for the menu background
    makePlaceholders() {
        let graphics = this.make.graphics();
        graphics.fillStyle(0x87ceeb); // Lighter blue sky
        graphics.fillRect(0, 0, 800, 600);
        // Add a subtle pattern
        graphics.fillStyle(0xFFFFFF, 0.1);
        for (let i = 0; i < 800; i += 20) {
            for (let j = 0; j < 600; j += 20) {
                if ((i / 20 + j / 20) % 2 === 0) {
                    graphics.fillRect(i, j, 20, 20);
                }
            }
        }
        graphics.generateTexture('background', 800, 600);
        graphics.destroy();
    }
}


// === PHASER GAME SCENE ===
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    
    // Initialize or reset game variables
    init() {
        this.score = 0;
        this.gameSpeed = 100; // Initial velocity
        this.spawnDelay = 3000; // Initial delay
        this.timeLeft = 60; // Game duration in seconds
    }

    preload() {
        this.makePlaceholders();
    }

    create() {
        // --- Setup Game World ---
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.add.image(400, 300, 'conveyor').setDisplaySize(800, 150);

        // --- UI Elements ---
        const uiBoxStyle = { backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 10, y: 5 } };
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '28px', fill: '#FFF', ...uiBoxStyle });
        this.speedText = this.add.text(350, 16, 'Speed: x1.0', { fontSize: '28px', fill: '#FFF', ...uiBoxStyle }).setOrigin(0.5, 0);
        this.timerText = this.add.text(784, 16, 'Time: 60', { fontSize: '28px', fill: '#FFF', ...uiBoxStyle }).setOrigin(1, 0);

        // --- Timer ---
        this.gameTimer = this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });

        // --- Bins (Drop Zones) ---
        this.createBins();

        // --- Food Item Spawning ---
        this.foodItemGroup = this.physics.add.group();
        this.spawnFood();
        this.foodSpawnTimer = this.time.addEvent({ delay: this.spawnDelay, callback: this.spawnFood, callbackScope: this, loop: true });

        // --- Drag and Drop Logic ---
        this.setupDragAndDrop();
    }
    
    update() {
        // Cleanup items that go off-screen
        this.foodItemGroup.getChildren().forEach(food => {
            if (food.x > this.sys.game.config.width + 100) {
                food.destroy();
            }
        });
    }

    // --- SETUP FUNCTIONS ---
    createBins() {
        const binTextStyle = { fontSize: '24px', fill: '#FFF', align: 'center', stroke: '#000', strokeThickness: 4 };
        // Plant Bin
        const plantBin = this.add.zone(200, 500, 300, 150).setRectangleDropZone(300, 150);
        const plantBinGraphics = this.add.graphics();
        plantBinGraphics.fillStyle(0x008800, 0.6);
        plantBinGraphics.fillRoundedRect(plantBin.x - 150, plantBin.y - 75, 300, 150, 16);
        this.add.text(plantBin.x, plantBin.y - 10, '🌿\nPlant Source', binTextStyle).setOrigin(0.5);
        plantBin.name = 'plant';

        // Animal Bin
        const animalBin = this.add.zone(600, 500, 300, 150).setRectangleDropZone(300, 150);
        const animalBinGraphics = this.add.graphics();
        animalBinGraphics.fillStyle(0x880000, 0.6);
        animalBinGraphics.fillRoundedRect(animalBin.x - 150, animalBin.y - 75, 300, 150, 16);
        this.add.text(animalBin.x, animalBin.y - 10, '🥩\nAnimal Source', binTextStyle).setOrigin(0.5);
        animalBin.name = 'animal';
    }

    setupDragAndDrop() {
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => gameObject.setPosition(dragX, dragY));
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.body.setVelocityX(0);
            this.children.bringToTop(gameObject);
        });
        this.input.on('drop', (pointer, gameObject, dropZone) => this.checkDrop(gameObject, dropZone));
        this.input.on('dragend', (pointer, gameObject, dropped) => {
            if (!dropped) gameObject.body.setVelocityX(this.gameSpeed);
        });
    }

    // --- GAMEPLAY FUNCTIONS ---
    spawnFood() {
        const foodData = Phaser.Math.RND.pick(FOOD_ITEMS);
        
        // Create the visual sprite and the text label
        const foodImage = this.add.sprite(0, 0, foodData.key);
        const foodLabel = this.add.text(0, 45, foodData.key.charAt(0).toUpperCase() + foodData.key.slice(1), { 
            fontSize: '18px', 
            fill: '#000', 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: { x: 5, y: 2 },
        }).setOrigin(0.5);

        // Create a container to hold both image and label
        const foodContainer = this.add.container(-100, 300, [foodImage, foodLabel]);
        foodContainer.setSize(64, 90); // Set interactive area
        this.foodItemGroup.add(foodContainer);
        
        foodContainer.setInteractive({ useHandCursor: true });
        this.input.setDraggable(foodContainer);
        foodContainer.setData('source', foodData.source);
        foodContainer.body.setVelocityX(this.gameSpeed);
    }
    
    checkDrop(food, bin) {
        if (food.getData('source') === bin.name) {
            this.score += 10;
            this.flashFeedback(true);
            this.increaseDifficulty();
        } else {
            this.score = Math.max(0, this.score - 5); // Don't go below 0
            this.flashFeedback(false);
        }
        this.scoreText.setText('Score: ' + this.score);
        food.destroy();
    }

    increaseDifficulty() {
        this.gameSpeed += 4;
        this.foodItemGroup.getChildren().forEach(item => item.body.setVelocityX(this.gameSpeed));
        if (this.spawnDelay > 700) {
            this.spawnDelay *= 0.98;
            this.foodSpawnTimer.delay = this.spawnDelay;
        }
        const speedMultiplier = (this.gameSpeed / 100).toFixed(1);
        this.speedText.setText(`Speed: x${speedMultiplier}`);
    }
    
    updateTimer() {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);
        if (this.timeLeft <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.gameTimer.remove();
        this.foodSpawnTimer.remove();
        this.physics.pause();
        this.input.enabled = false;

        // Dim the background
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

        // Show Game Over text and final score
        this.add.text(400, 250, 'Time\'s Up!', { fontSize: '64px', fill: '#ff4444' }).setOrigin(0.5);
        this.add.text(400, 320, 'Final Score: ' + this.score, { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);

        // Restart Button
        const restartButton = this.add.rectangle(400, 420, 200, 70, 0x0099cc).setStrokeStyle(4, 0xffffff);
        this.add.text(400, 420, 'Restart', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
        restartButton.setInteractive({ useHandCursor: true });
        restartButton.on('pointerdown', () => this.scene.start('MenuScene'));
        restartButton.on('pointerover', () => restartButton.setFillStyle(0x00b8e6));
        restartButton.on('pointerout', () => restartButton.setFillStyle(0x0099cc));
    }

    // --- VISUALS & ASSETS ---
    flashFeedback(isCorrect) {
        const color = isCorrect ? 0x00ff00 : 0xff0000;
        const flashRect = this.add.rectangle(400, 300, 800, 600, color, 0.3);
        this.tweens.add({ targets: flashRect, alpha: 0, duration: 300, onComplete: () => flashRect.destroy() });
    }

    makePlaceholders() {
        // Create a texture for the background and conveyor
        let graphics = this.make.graphics();
        graphics.fillStyle(0x87ceeb); // Light blue sky
        graphics.fillRect(0, 0, 800, 600);
         graphics.fillStyle(0xFFFFFF, 0.1);
        for (let i = 0; i < 800; i += 20) {
            for (let j = 0; j < 600; j += 20) {
                if ((i / 20 + j / 20) % 2 === 0) {
                    graphics.fillRect(i, j, 20, 20);
                }
            }
        }
        graphics.generateTexture('background', 800, 600);

        graphics.fillStyle(0x5d6d7e); // Grey conveyor
        graphics.fillRect(0, 0, 800, 150);
        graphics.generateTexture('conveyor', 800, 150);
        graphics.destroy();
        
        const foodColors = {
            apple: 0xff0000, egg: 0xfffde8, cheese: 0xffd700, carrot: 0xf39c12,
            fish: 0xaed6f1, sugarcane: 0x98fb98, steak: 0x8b4513, bread: 0xdeb887,
            milk: 0xffffff, broccoli: 0x228b22
        };
        
        FOOD_ITEMS.forEach(item => {
            graphics = this.make.graphics();
            graphics.fillStyle(foodColors[item.key] || 0xffffff);
            graphics.fillRoundedRect(0, 0, 64, 64, 12);
            graphics.generateTexture(item.key, 64, 64);
            graphics.destroy();
        });
    }
}

// === REACT COMPONENT ===
const SourceSortGame = () => {
    const gameContainer = useRef(null);
    const gameInstance = useRef(null);

    useEffect(() => {
        if (gameInstance.current) return;
        
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameContainer.current,
            physics: {
                default: 'arcade',
                arcade: { gravity: { y: 0 }, debug: false }
            },
            // Start with the MenuScene
            scene: [MenuScene, GameScene]
        };

        gameInstance.current = new Phaser.Game(config);

        return () => {
            gameInstance.current.destroy(true);
            gameInstance.current = null;
        };
    }, []);

    return <div ref={gameContainer} style={{ width: '800px', height: '600px', margin: 'auto', border: '4px solid #333', borderRadius: '10px', overflow: 'hidden' }} />;
};

export default SourceSortGame;

