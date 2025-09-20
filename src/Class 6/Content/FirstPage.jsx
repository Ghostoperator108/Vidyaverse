import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
// This is a new component for displaying Chapter 1.
// In a real app, you would pass the 'onBackToDashboard' function as a prop 
// from the main App component to handle navigation.
const FirstPage = ({ onBackToDashboard }) => {
    
    // A handler for the back button. It calls the function passed in props.
    const handleBackClick = () => {
        if (onBackToDashboard) {
            onBackToDashboard();
        } else {
            // This alert is a fallback for demonstration purposes if the component is used alone.
            alert("Going back to the dashboard!");
        }
    };

    return (
        
        
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                {/* Back Button for navigation */}
                <div className="mb-8">
                    <button 
                        onClick={handleBackClick} 
                        className="px-5 py-2 bg-cyan-600/80 text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-md flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Back to Dashboard
                    </button>

                </div>
                <Navbar/>

                {/* Main Content Card */}
                <div className="bg-black/30 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-cyan-400/30">
                    <h1 className="text-3xl sm:text-4xl font-black text-cyan-300 tracking-wide mb-4">
                        Chapter 1: Food - Arre! Yeh Aata Kahan Se Hai?
                    </h1>
                    <h2 className="text-2xl font-bold text-yellow-300 mt-6 mb-3">
                        Aapke Gaon Ki Kahani!
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Hello, Dost! 👋 Ever thought that your science book is actually telling the story of your own village? This chapter, "Food: Where Does It Come From?", is like a superhero movie where the heroes are your family, your neighbors, and you! Let's find out how.
                    </p>

                    {/* Section 1: Agriculture */}
                    <div className="mt-8 p-6 bg-gray-800/20 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-400 mb-3">
                            Khet, Kisaan, aur Kamaal! (Farms, Farmers, and Magic!)
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Think of the big green fields around your village. They are like a giant kitchen for the whole of India! Your family and other farmers are the master chefs.
                        </p>
                        <ul className="list-disc list-inside text-lg text-gray-300 leading-relaxed mt-4 space-y-2 pl-4">
                            <li><strong className="text-green-300">Paudhon ka Pitara (The Plant Treasure Box):</strong> Roti comes from the wheat grown in the fields. The yummy dal you eat for lunch comes from pulses. And what about sabzi? Bhindi, aloo, pyaaz... all these are treasures from the soil! It's like a magic show, isn't it? A tiny seed goes into the ground and comes out as delicious food! You see this magic happen every single day.</li>
                        </ul>
                    </div>

                    {/* Section 2: Animal Husbandry */}
                    <div className="mt-8 p-6 bg-gray-800/20 rounded-lg">
                        <h3 className="text-2xl font-bold text-orange-400 mb-3">
                           Ghar ke Dost, Pet ke Dost! (Friends at Home, Friends for our Tummy!)
                        </h3>
                         <p className="text-lg text-gray-300 leading-relaxed">
                            Farming is only half the story! What about the cows and buffaloes mooing in your backyard? Or the chickens clucking around? They are also our food heroes!
                        </p>
                        <ul className="list-disc list-inside text-lg text-gray-300 leading-relaxed mt-4 space-y-2 pl-4">
                            <li><strong className="text-orange-300">Jaanwaron ka Jaadu (The Animal Magic):</strong> That fresh glass of milk in the morning? That's a gift from your cow or buffalo! And from that milk, we get delicious dahi, makkhan, and ghee. Many of your friends might have hens at home that give us eggs for a power-packed breakfast. These animals are our friends who help us stay strong and healthy!</li>
                        </ul>
                    </div>

                    {/* Section 3: Supply Chain */}
                    <div className="mt-8 p-6 bg-gray-800/20 rounded-lg">
                        <h3 className="text-2xl font-bold text-purple-400 mb-3">
                            Gaon Se Sheher Tak Ka Safar (The Journey from Village to City)
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Have you ever seen a truck getting loaded at the village `mandi` (market)? That's your village's hard work, your food, going on an adventure! It travels far away to the big cities so that people there can also eat the tasty food grown by you.
                            <br/><br/>
                            So, you see? You are not just living in a village; you are living in the place where food for everyone begins. How cool is that! You are at the starting point of India's food story!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;

