import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// --- Data ---
// In a real app, this might come from a different file or an API.
const indianStatesData = {
    'Andhra Pradesh': { dish: 'Pesarattu', fact: 'A savory pancake from green gram, a healthy and popular breakfast.' },
    'Arunachal Pradesh': { dish: 'Thukpa', fact: 'A hearty Tibetan noodle soup, perfect for the cool mountain climate.' },
    'Assam': { dish: 'Khar', fact: 'A unique dish made with raw papaya, pulses, and a signature alkaline ingredient.' },
    'Bihar': { dish: 'Litti Chokha', fact: 'Roasted wheat balls stuffed with spiced gram flour, served with mashed vegetables.' },
    'Chhattisgarh': { dish: 'Chila', fact: 'A delicious and easy-to-make crepe made from gram flour.' },
    'Goa': { dish: 'Fish Curry', fact: 'A tangy and spicy curry made with coconut, a staple of Goan cuisine.' },
    'Gujarat': { dish: 'Dhokla', fact: 'A steamed and spongy savory cake, perfect as a light snack or breakfast.' },
    'Haryana': { dish: 'Bajre ki Khichdi', fact: 'A wholesome porridge made from pearl millet and lentils.' },
    'Himachal Pradesh': { dish: 'Dham', fact: 'A traditional festive meal with multiple courses served on a leaf plate.' },
    'Jharkhand': { dish: 'Dhuska', fact: 'A deep-fried snack made from a batter of rice and lentils.' },
    'Karnataka': { dish: 'Bisi Bele Bath', fact: 'A hot lentil rice dish with a unique blend of spices and vegetables.' },
    'Kerala': { dish: 'Appam and Stew', fact: 'Fluffy rice pancakes paired with a mild coconut-based stew.' },
    'Madhya Pradesh': { dish: 'Poha Jalebi', fact: 'A popular breakfast of flattened rice and sweet, crispy swirls.' },
    'Maharashtra': { dish: 'Vada Pav', fact: 'The iconic Mumbai street food, a spiced potato fritter in a bread bun.' },
    'Manipur': { dish: 'Kangshoi', fact: 'A soupy stew of seasonal vegetables, often flavored with fermented fish.' },
    'Meghalaya': { dish: 'Jadoh', fact: 'A flavorful rice and meat dish, typically pork, cooked with aromatic spices.' },
    'Mizoram': { dish: 'Misa Mach Poora', fact: 'Grilled shrimp cooked with local spices and served with steamed rice.' },
    'Nagaland': { dish: 'Smoked Pork with Axone', fact: 'A signature Naga dish featuring smoked pork cooked with fermented soybean.' },
    'Odisha': { dish: 'Dalma', fact: 'A nutritious and traditional curry made with lentils and vegetables.' },
    'Punjab': { dish: 'Makki di Roti & Sarson da Saag', fact: 'Mustard greens curry served with corn flatbread.' },
    'Rajasthan': { dish: 'Dal Baati Churma', fact: 'A famous trio of baked wheat balls, spicy lentils, and sweetened cereal.' },
    'Sikkim': { dish: 'Momo', fact: 'Steamed dumplings filled with meat or vegetables, a beloved Himalayan snack.' },
    'Tamil Nadu': { dish: 'Pongal', fact: 'A comforting dish of rice and lentils, prepared both sweet and savory.' },
    'Telangana': { dish: 'Hyderabadi Biryani', fact: 'A world-famous aromatic rice dish layered with marinated meat.' },
    'Tripura': { dish: 'Chauk', fact: 'A traditional Tripuri rice beer, an essential part of their festivities.' },
    'Uttar Pradesh': { dish: 'Tunday Kababi', fact: 'Melt-in-your-mouth minced meat kebabs from Lucknow.' },
    'Uttarakhand': { dish: 'Kafuli', fact: 'A thick, nutritious curry made from spinach and fenugreek leaves.' },
    'West Bengal': { dish: 'Macher Jhol', fact: 'A traditional and light spicy fish stew, a staple in every Bengali household.' },
    'Andaman & Nicobar Islands': { dish: 'Seafood', fact: 'Freshly caught fish, crabs, and lobsters are a highlight of the island cuisine.' },
    'Chandigarh': { dish: 'Butter Chicken', fact: 'A creamy tomato-based chicken curry popular worldwide.' },
    'Dadra and Nagar Haveli and Daman and Diu': { dish: 'Gamthi Chicken', fact: 'A rustic, country-style chicken curry with local spices.' },
    'Delhi': { dish: 'Chole Bhature', fact: 'A spicy chickpea curry paired with fluffy, deep-fried bread.' },
    'Jammu & Kashmir': { dish: 'Rogan Josh', fact: 'An aromatic curried meat dish of Persian origin with a brilliant red gravy.' },
    'Ladakh': { dish: 'Skyu', fact: 'A traditional pasta-like stew with root vegetables and meat.' },
    'Lakshadweep': { dish: 'Octopus Fry', fact: 'A local delicacy where fresh octopus is stir-fried with aromatic spices.' },
    'Puducherry': { dish: 'Kootu', fact: 'A lentil and vegetable stew, reflecting a blend of Tamil and French culinary influences.' },
};

// --- Child Components ---

const WelcomeScreen = ({ onStart }) => (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all hover:scale-105 duration-300">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Welcome, Food Explorers!</h1>
            <p className="text-gray-600 mb-8 text-lg">
                India is a land of incredible flavors! Click on a state or union territory to discover its most famous dish.
            </p>
            <button
                onClick={onStart}
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transform hover:-translate-y-1 transition-all duration-200 shadow-lg text-xl"
            >
                Click to load the next game
            </button>
        </div>
    </div>
);

const DiscoveryCard = ({ stateData, onClose }) => {
    if (!stateData) return null;

    const imageUrl = `https://placehold.co/400x200/fb923c/ffffff?text=${encodeURIComponent(stateData.data.dish)}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center relative shadow-xl card-enter" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-4 text-3xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
                <img src={imageUrl} alt={stateData.data.dish} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-xl font-bold text-gray-700">{stateData.name}</h2>
                <h3 className="text-2xl font-bold text-orange-600 mb-2">{stateData.data.dish}</h3>
                <p className="text-gray-700 mb-4">{stateData.data.fact}</p>
            </div>
        </div>
    );
};


// --- Main App Component ---

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [activeState, setActiveState] = useState(null);

    const handleStateClick = (stateName) => {
        setActiveState({ name: stateName, data: indianStatesData[stateName] });
    };

    if (!gameStarted) {
        return <WelcomeScreen onStart={() => setGameStarted(true)} />;
    }

    return (
        <>
            {/* You can add this animation style to your main index.css file */}
            <style>{`
                .card-enter {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        
            <div className="bg-blue-50 min-h-screen">
                <div className="p-4 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">Click a State to Discover its Speciality!</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
                        {Object.keys(indianStatesData).sort().map(stateName => (
                            <button
                                key={stateName}
                                onClick={() => handleStateClick(stateName)}
                                className="p-4 bg-white rounded-lg font-bold text-gray-700 text-center cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-orange-400 hover:text-white shadow-md"
                            >
                                {stateName}
                            </button>
                        ))}
                    </div>
                </div>

                <DiscoveryCard stateData={activeState} onClose={() => setActiveState(null)} />
            </div>
        </>
    );
}

export default App;

