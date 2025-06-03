// src/components/SongItem.jsx
import React from 'react';

const SongItem = ({ track, index, onClick }) => {
  // Format duration from ms to mm:ss
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Get all artists names joined with commas
  const artistNames = track.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist';

  return (
    <div 
      onClick={() => onClick(track)} 
      className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors cursor-pointer group"
    >
      {/* Track number */}
      <div className="w-8 text-right text-gray-400 pr-4">
        {index}
      </div>
      
      {/* Track image (if available) */}
      <div className="w-10 h-10 mr-4 flex-shrink-0">
        {track.album?.images && track.album.images.length > 0 ? (
          <img 
            src={track.album.images[track.album.images.length - 1].url} 
            alt={track.album?.name || 'Album cover'} 
            className="w-10 h-10 rounded object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-gray-600">🎵</span>
          </div>
        )}
      </div>
      
      {/* Track info */}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{track.name || 'Unknown Track'}</div>
        <div className="text-sm text-gray-400 truncate">{artistNames}</div>
      </div>
      
      {/* Album name (hidden on mobile) */}
      <div className="hidden md:block flex-1 text-gray-400 text-sm truncate px-2">
        {track.album?.name || 'Unknown Album'}
      </div>
      
      {/* Duration */}
      <div className="text-sm text-gray-400 w-16 text-right">
        {formatDuration(track.duration_ms)}
      </div>
      
      {/* Play on YouTube button (only visible on hover) */}
      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClick(track);
          }}
        >
          YouTube
        </button>
      </div>
    </div>
  );
};

export default SongItem;