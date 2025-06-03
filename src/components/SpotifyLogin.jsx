// src/components/SpotifyLogin.jsx
import React from 'react';

const SpotifyLogin = () => {
  // Spotify API configuration
  const CLIENT_ID = "c81af8af7bad47e89e0aba261d02e3df"; // Replace with your actual client ID
  const REDIRECT_URI = window.location.origin; // Dynamically get the current origin
  const SCOPES = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative"
  ].join("%20");
  
  // Spotify authorization URL
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&show_dialog=true`;
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black bg-opacity-30 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Connect your Spotify account</h2>
      <p className="text-gray-300 mb-6 text-center">
        To view your playlists, you need to authorize this app to access your Spotify account.
        No data will be stored or shared.
      </p>
      
      <a 
        href={authUrl} 
        className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
      >
        <svg 
          className="w-6 h-6 mr-2" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        Login with Spotify
      </a>
      
      <p className="mt-6 text-xs text-gray-400 max-w-md text-center">
        Note: This app will only read your playlist information and does not modify any of your Spotify data.
      </p>
    </div>
  );
};

export default SpotifyLogin;