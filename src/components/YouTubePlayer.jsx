// src/components/YouTubePlayer.jsx
import React, { useState, useEffect } from 'react';
import { searchYouTube } from '../utils/youtubeSearch';

const YouTubePlayer = ({ song, onClose }) => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadYouTubeVideo = async () => {
      setLoading(true);
      setError("");
      
      try {
        if (!song) return;
        
        const searchQuery = `${song.name} ${song.artists.map(a => a.name).join(' ')}`;
        const result = await searchYouTube(searchQuery);
        
        if (result) {
          setVideoId(result);
        } else {
          setError("Couldn't find this song on YouTube");
        }
      } catch (err) {
        console.error("Error searching YouTube:", err);
        setError("Error connecting to YouTube");
      } finally {
        setLoading(false);
      }
    };
    
    loadYouTubeVideo();
  }, [song]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gray-900 rounded-xl p-4 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold truncate pr-4">
            {song?.name} - {song?.artists?.map(a => a.name).join(', ')}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="relative pt-[56.25%] bg-black rounded overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <div>
                <p className="text-red-500 mb-2">{error}</p>
                <p className="text-sm text-gray-400">Try searching manually on YouTube</p>
              </div>
            </div>
          ) : videoId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={`YouTube video player for ${song?.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;