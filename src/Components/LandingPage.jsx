import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
  // State to manage the text displayed on the landing page
  const [displayText, setDisplayText] = useState("Let's explore the universe ");
  
  // State to manage the visibility of the "Explore" button
  const [showButton, setShowButton] = useState(false);

  // State to handle user interaction for autoplay
  const [hasInteracted, setHasInteracted] = useState(false);

  // Use refs to control the video and audio elements
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Video source URL (using a publicly accessible placeholder)
  const videoSrc = "./Universezoom.mp4";
  
  // Audio source URL (using a placeholder)
  const audioSrc = "voyager.mp3";

  // Function to handle the start of the experience with user interaction
  const handleStart = () => {
    setHasInteracted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.error("Video play failed:", error));
      videoRef.current.muted = false; // Unmute the video
    }
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  };

  // Function to handle the end of the video playback
  const handleVideoEnd = () => {
    // Update the text to the final message
    setDisplayText("Let's explore the unending cosmos");
  };

  // Function to handle the end of the audio playback
  const handleAudioEnd = () => {
    // Show the button after the audio ends
    setShowButton(true);
  };

  // Function to handle the Explore button click
  const handleExploreClick = () => {
    console.log('Explore button clicked!');
    // This function can be used for other actions later, such as navigation
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Video Element */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoSrc}
        loop={true}
        playsInline
        muted={true}
        onEnded={handleVideoEnd}
      />

      {/* Background Audio Element */}
      <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnd} playsInline preload="auto" />

      {/* Overlay Content with Text and Button */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 text-center">
        <h1
          className={`
            text-white text-5xl md:text-7xl lg:text-8xl font-bold 
            transition-opacity duration-1000 ease-in-out
            drop-shadow-lg [text-shadow:_0_5px_15px_rgb(255_255_255_/_80%)]
            p-8 rounded-2xl
            tracking-wider
            font-inter
          `}
        >
          {displayText}
        </h1>
        {showButton && (
          <button
            onClick={handleExploreClick}
            className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Explore
          </button>
        )}

        {/* Start Overlay */}
        {!hasInteracted && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm cursor-pointer"
            onClick={handleStart}
          >
            <div className="text-center p-8 rounded-lg">
              <h2 className="text-white text-3xl font-bold mb-4 animate-pulse">Tap or Click to Begin</h2>
              <p className="text-gray-300">The cosmos awaits...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
