import React from 'react';
// Import the VideoConsent component for the video call feature
import VideoConsent from './VideoConsent'; 

function App() {
  return (
    <div>
      {/* Main Application Header */}
      <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '20px' }}>
        Rural Telemedicine Platform
      </h1>
      
      {/* Render the VideoConsent component to handle patient consent and video room access */}
      <VideoConsent />
      
    </div>
  );
}

export default App;
