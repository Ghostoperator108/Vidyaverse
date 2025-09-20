import React from 'react';
import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

// This is the main React component that will host our Phaser game.
const GardenHarvestGame = () => {
    // The `useRef` hook is used to get a reference to the div element that will contain the game.
    // This allows Phaser to know where to render its canvas.
    const gameContainer = useRef(null);

    // The `useEffect` hook is perfect for managing the lifecycle of the Phaser game.
    // The empty dependency array `[]` ensures this effect runs only once when the component mounts.
    useEffect(() => {
        // The game instance is stored in a variable, so it can be accessed in the cleanup function.
        let game;
        
        // --- DATA ---
        // We define foodData outside the Phaser scene so we can reset it if the game restarts.
        let foodData = [
            { name: 'Carrot Halwa', part: 'root' },
            { name: 'Spinach Curry', part: 'leaves' },
            { name: 'Apple Pie', part: 'fruit' },
            { name: 'Mashed Peas', part: 'seed' },
            { name: 'Roasted Cauliflower', part: 'flower' }
        ];
        let initialFoodData = [...foodData];


        // Ensure the container is available before creating the game.
        if (gameContainer.current) {
            // --- PHASER GAME LOGIC ---

            // This class encapsulates the entire game's logic within a Phaser Scene.
            class GardenScene extends Phaser.Scene {
                constructor() {
                    super({ key: 'GardenScene' });
                    this.currentFood = null;
                    this.foodText = null;
                    this.plants = [];
                    this.tooltipText = null;
                }

                preload() {
                    // No assets to preload for this example, as we are using procedural graphics.
                }

                create() {
                    // --- Create a more appealing background ---
                    const bg = this.add.graphics({ x: 0, y: 0 });
                    // Sky gradient
                    bg.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xB0E0E6, 0xB0E0E6, 1);
                    bg.fillRect(0, 0, 800, 400);
                    // Ground
                    bg.fillStyle(0x98FB98, 1); // A brighter green for the ground
                    bg.fillRect(0, 400, 800, 200);


                    // --- Create a texture for particle effects ---
                    this.make.graphics({ fillStyle: { color: 0xffd700 } }).fillCircle(5, 5, 5).generateTexture('star', 10, 10);


                    // --- Create the Drop Zone (Basket) ---
                    const basketVisuals = this.add.graphics();
                    // More detailed basket
                    basketVisuals.fillStyle(0x8B4513, 1); // Main brown color
                    basketVisuals.fillRoundedRect(650, 410, 120, 90, 15);
                    basketVisuals.lineStyle(2, 0x5D3A1A, 1); // Darker brown for weaving lines
                    for (let i = 0; i < 5; i++) {
                        basketVisuals.strokeLineShape({ x1: 650, y1: 428 + i * 15, x2: 770, y2: 428 + i * 15 });
                    }
                    basketVisuals.lineStyle(8, 0x5D3A1A, 1); // Thick border
                    basketVisuals.strokeRoundedRect(650, 410, 120, 90, 15);
                    
                    
                    const basket = this.add.zone(710, 455, 120, 90).setRectangleDropZone(120, 90);
                    basket.setName('basket');

                    // --- Create the UI Text ---
                    this.foodText = this.add.text(400, 40, '', {
                        fontSize: '32px',
                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif",
                        color: '#3e5622',
                        backgroundColor: '#ffffffaa',
                        padding: { x: 15, y: 10 },
                        align: 'center',
                        fixedWidth: 550,
                        wordWrap: { width: 550 },
                        borderRadius: 10,
                    }).setOrigin(0.5);

                    // --- Create the Tooltip Text Object ---
                    this.tooltipText = this.add.text(0, 0, '', {
                        fontSize: '18px',
                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif",
                        color: '#ffffff',
                        backgroundColor: '#000000b0',
                        padding: { x: 10, y: 5 },
                        borderRadius: 8,
                    }).setOrigin(0.5).setDepth(100).setVisible(false);

                    // --- Create the Plants and their Draggable Parts ---
                    this.createPlants();

                    // --- Setup Drag and Drop Events ---
                    this.input.on('dragstart', (pointer, gameObject) => {
                        this.children.bringToTop(gameObject);
                        gameObject.setScale(1.1);
                        this.children.bringToTop(this.tooltipText);
                    });

                    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                        this.tooltipText.setPosition(dragX, dragY - 50);
                    });
                    
                    this.input.on('drop', (pointer, gameObject, dropZone) => {
                       this.tooltipText.setVisible(false);
                       if (dropZone.name === 'basket' && this.currentFood) {
                           this.checkAnswer(gameObject);
                       } else {
                           this.returnToStartPosition(gameObject);
                       }
                    });

                    this.input.on('dragend', (pointer, gameObject, dropped) => {
                        gameObject.setScale(1.0);
                        this.tooltipText.setVisible(false);
                        if (!dropped) {
                            this.returnToStartPosition(gameObject);
                        }
                    });

                    this.startNewRound();
                }
                
                // Helper function to create all plant visuals.
                createPlants() {
                    const staticGraphics = this.add.graphics();
                    // Apple Tree
                    staticGraphics.fillStyle(0x8B4513).fillRect(400, 400, 20, 100); // Trunk
                    staticGraphics.fillStyle(0x008000).fillCircle(410, 350, 60); // Treetop
                    // Pea Plant stem
                    staticGraphics.lineStyle(4, 0x32CD32).beginPath().moveTo(550, 500).lineTo(550, 400).strokePath();
                    
                    // --- DRAGGABLE PLANT PARTS (More Realistic) ---

                    // 1. Carrot Plant (Root)
                    const carrotStartX = 100, carrotStartY = 485;
                    const carrotRoot = this.add.graphics({ x: carrotStartX, y: carrotStartY });
                    carrotRoot.fillStyle(0x006400).fillEllipse(0, -50, 60, 20); // Static leaves on the carrot itself
                    carrotRoot.fillStyle(0x228B22).fillEllipse(0, -55, 15, 30);
                    carrotRoot.fillStyle(0xFF8C00).fillTriangle(-20, -35, 20, -35, 0, 35); // Carrot body
                    carrotRoot.setData({ part: 'root', startX: carrotStartX, startY: carrotStartY });
                    carrotRoot.setInteractive(new Phaser.Geom.Triangle(-20, -35, 20, -35, 0, 35), Phaser.Geom.Triangle.Contains);

                    // 2. Spinach Plant (Leaves)
                    const spinachStartX = 250, spinachStartY = 480;
                    const spinachLeaves = this.add.graphics({ x: spinachStartX, y: spinachStartY });
                    spinachLeaves.fillStyle(0x228B22);
                    spinachLeaves.fillEllipse(0, 0, 30, 50); // Central leaf
                    spinachLeaves.fillEllipse(-25, 5, 25, 40); // Left leaf
                    spinachLeaves.fillEllipse(25, 5, 25, 40); // Right leaf
                    spinachLeaves.setData({ part: 'leaves', startX: spinachStartX, startY: spinachStartY });
                    spinachLeaves.setInteractive(new Phaser.Geom.Ellipse(0, 0, 100, 50), Phaser.Geom.Ellipse.Contains);
                    
                    // 3. Apple Tree (Fruit)
                    const appleStartX = 430, appleStartY = 360;
                    const appleFruit = this.add.graphics({ x: appleStartX, y: appleStartY });
                    appleFruit.fillStyle(0x006400).fillRect(-2, -22, 4, 10); // Stem
                    appleFruit.fillStyle(0xFF0000).fillCircle(0, 0, 15); // Apple
                    appleFruit.setData({ part: 'fruit', startX: appleStartX, startY: appleStartY });
                    appleFruit.setInteractive(new Phaser.Geom.Circle(0, 0, 15), Phaser.Geom.Circle.Contains);

                    // 4. Pea Plant (Seed Pod)
                    const peaStartX = 565, peaStartY = 430;
                    const peaPod = this.add.graphics({ x: peaStartX, y: peaStartY });
                    peaPod.fillStyle(0x3CB371);
                    // Using a simple ellipse to avoid the function error
                    peaPod.fillEllipse(0, 0, 50, 25);
                    peaPod.fillStyle(0x9ACD32); // Bumps for peas
                    peaPod.fillCircle(-10, 1, 4);
                    peaPod.fillCircle(0, 0, 4);
                    peaPod.fillCircle(10, -1, 4);
                    peaPod.setData({ part: 'seed', startX: peaStartX, startY: peaStartY });
                    peaPod.setInteractive(new Phaser.Geom.Ellipse(0, 0, 50, 25), Phaser.Geom.Ellipse.Contains);

                    // 5. Cauliflower Plant (Flower)
                    const cauliStartX = 180, cauliStartY = 530;
                    const cauliflowerFlower = this.add.graphics({ x: cauliStartX, y: cauliStartY });
                    cauliflowerFlower.fillStyle(0x90EE90).fillEllipse(0, 15, 100, 30); // Base leaves
                    cauliflowerFlower.fillStyle(0xFFFACD); // Flower head
                    cauliflowerFlower.fillCircle(0, 0, 30);
                    cauliflowerFlower.fillCircle(-20, 5, 15);
                    cauliflowerFlower.fillCircle(20, 5, 15);
                    cauliflowerFlower.fillCircle(0, -15, 15);
                    cauliflowerFlower.setData({ part: 'flower', startX: cauliStartX, startY: cauliStartY });
                    cauliflowerFlower.setInteractive(new Phaser.Geom.Circle(0, 0, 40), Phaser.Geom.Circle.Contains);
                    
                    this.plants = [carrotRoot, spinachLeaves, appleFruit, peaPod, cauliflowerFlower];
                    this.plants.forEach(part => {
                        this.input.setDraggable(part);

                        part.on('pointerover', () => {
                            const partName = part.getData('part');
                            const capitalizedPartName = partName.charAt(0).toUpperCase() + partName.slice(1);
                            this.tooltipText.setText(capitalizedPartName);
                            this.tooltipText.setPosition(part.x, part.y - 55);
                            this.tooltipText.setVisible(true);
                            this.children.bringToTop(this.tooltipText);
                        });

                        part.on('pointerout', () => {
                            this.tooltipText.setVisible(false);
                        });
                    });
                }
                
                // Manages starting a new turn.
                startNewRound() {
                    this.plants.forEach(p => {
                        this.returnToStartPosition(p);
                        p.setVisible(true);
                        p.input.enabled = true;
                    });
                    
                    if (foodData.length === 0) {
                        this.foodText.setText('You made everything! Great job!');
                        this.plants.forEach(p => p.setVisible(false));
                        
                        this.time.delayedCall(3000, () => {
                            foodData = [...initialFoodData];
                            this.startNewRound();
                        });
                        return;
                    }

                    const foodIndex = Phaser.Math.RND.between(0, foodData.length - 1);
                    this.currentFood = foodData.splice(foodIndex, 1)[0];
                    this.foodText.setText(`Let's make: ${this.currentFood.name}`);
                }
                
                checkAnswer(droppedPart) {
                    if (droppedPart.getData('part') === this.currentFood.part) {
                        this.foodText.setText('Yummy! Correct!');
                        
                        const emitter = this.add.particles(droppedPart.x, droppedPart.y, 'star', {
                            speed: 200,
                            lifespan: 1000,
                            blendMode: 'ADD',
                            scale: { start: 0.7, end: 0 },
                            emitting: false
                        });
                        emitter.explode(20);

                        droppedPart.setVisible(false);
                        droppedPart.input.enabled = false;
                        
                        this.time.delayedCall(1500, this.startNewRound, [], this);

                    } else {
                        this.foodText.setText('Oops! That\'s not right.');
                        this.returnToStartPosition(droppedPart);
                        this.cameras.main.shake(150, 0.005);
                    }
                }
                
                returnToStartPosition(gameObject) {
                     this.tweens.add({
                         targets: gameObject,
                         x: gameObject.getData('startX'),
                         y: gameObject.getData('startY'),
                         duration: 300,
                         ease: 'Power2'
                     });
                }
            }

            // --- PHASER CONFIGURATION ---
            const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                parent: gameContainer.current,
                scene: [GardenScene],
                physics: {
                    default: 'arcade',
                }
            };

            game = new Phaser.Game(config);
        }

        // --- CLEANUP FUNCTION ---
        return () => {
            if (game) {
                game.destroy(true);
            }
        };
    }, []);

    // This is the main JSX for the component, which includes the game and surrounding UI.
    return (
        <div style={{
            backgroundColor: '#f0f8f0', // Honeydew background
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif",
            color: '#3e5622',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <h1 style={{ fontSize: '3em', marginBottom: '10px', textShadow: '2px 2px #cdeccd' }}>
                Garden Harvest
            </h1>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '15px 25px',
                borderRadius: '10px',
                marginBottom: '20px',
                maxWidth: '800px',
                textAlign: 'center',
                border: '2px solid #a3b899',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{marginTop: 0, marginBottom: '10px'}}>How to Play</h2>
                <p style={{margin: 0, lineHeight: '1.5', fontSize: '1.1em'}}>
                    A recipe will appear at the top of the garden. Your job is to find the right ingredient!
                    <br/>
                    Click and drag the correct part of the plant and drop it into the basket.
                </p>
            </div>
            <div ref={gameContainer} id="phaser-container" style={{ width: '800px', height: '600px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }} />
        </div>
    );
};

export default GardenHarvestGame;

