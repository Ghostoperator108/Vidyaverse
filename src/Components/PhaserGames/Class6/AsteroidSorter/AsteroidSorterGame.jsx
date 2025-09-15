// src/components/AsteroidSorterGame.jsx
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
            parent: 'phaser-container', // Must match the div ID
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
            // Load local assets
            this.load.image('background', 'assets/background.png');
            this.load.image('asteroid', 'assets/asteroid.png');
        }

        let asteroidsGroup;
        let currentTargetNumber = 1;
        let scoreText;
        let currentTargetText;

        function create() {
            this.add.image(400, 300, 'background');
            asteroidsGroup = this.add.group();

            scoreText = this.add.text(16, 16, `Score: 0`, { fontSize: '32px', fill: '#FFF', fontStyle: 'bold' });
            currentTargetText = this.add.text(16, 50, `Find: ${currentTargetNumber}`, { fontSize: '32px', fill: '#FFD700', fontStyle: 'bold' });
            
            spawnAsteroids(this);

            this.input.on('pointerdown', (pointer) => {
                const clickedAsteroids = this.input.hitTest(pointer, asteroidsGroup.getChildren());
                if (clickedAsteroids.length > 0) {
                    const container = clickedAsteroids[0].parentContainer;
                    const asteroidNumber = parseInt(container.getData('number'));

                    if (asteroidNumber === currentTargetNumber) {
                        setScore(prevScore => prevScore + 10);
                        currentTargetNumber++;
                        currentTargetText.setText(`Find: ${currentTargetNumber}`);
                        container.destroy();
                        
                        if (asteroidsGroup.countActive(true) < 2) {
                            spawnAsteroids(this);
                        }
                    }
                }
            });
        }
        
        function update() {
            scoreText.setText(`Score: ${score}`);
        }

        function spawnAsteroids(scene) {
            const numbers = [currentTargetNumber, ...generateRandomNumbers(3, currentTargetNumber)];
            Phaser.Utils.Array.Shuffle(numbers);

            asteroidsGroup.clear(true, true);

            numbers.forEach((num) => {
                const x = Phaser.Math.Between(100, 700);
                const y = Phaser.Math.Between(100, 500);

                const asteroid = scene.add.sprite(0, 0, 'asteroid');
                asteroid.setScale(1.2);
                asteroid.setInteractive();

                const numberText = scene.add.text(0, 0, num, { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0.5);
                
                const container = scene.add.container(x, y, [asteroid, numberText]);
                container.setData('number', num);
                asteroidsGroup.add(container);
            });
        }
        
        function generateRandomNumbers(count, exclude) {
            const numbers = [];
            while(numbers.length < count) {
                const num = Math.floor(Math.random() * 20) + 1;
                if (num !== exclude && !numbers.includes(num)) {
                    numbers.push(num);
                }
            }
            return numbers;
        }

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