// src/components/PlaylistView.jsx
import React from 'react';
import SongItem from './SongItem';

const PlaylistView = ({ playlist, tracks, onSongClick }) => {
  if (!playlist) return null;

  return (
    <div className="bg-black bg-opacity-30 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Playlist Cover Image */}
        <div className="flex-shrink-0">
          {playlist.images && playlist.images[0] ? (
            <img 
              src={playlist.images[0].url} 
              alt={`${playlist.name} cover`}
              className="w-48 h-48 rounded-lg shadow-md object-cover"
            />
          ) : (
            <div className="w-48 h-48 rounded-lg bg-gray-800 flex items-center justify-center">
              <span className="text-3xl text-gray-600">🎵</span>
            </div>
          )}
        </div>
        
        {/* Playlist Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{playlist.name}</h2>
          <p className="text-gray-400 mb-3">
            By {playlist.owner.display_name} • {tracks.length} songs
          </p>
          {playlist.description && (
            <p className="text-gray-300 text-sm mb-4">{playlist.description}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-b border-gray-700"></div>
      
      {/* Track List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Songs</h3>
        
        {tracks.length === 0 ? (
          <p className="text-gray-400 text-center p-8">No tracks found in this playlist</p>
        ) : (
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <SongItem 
                key={track.id || index} 
                track={track} 
                index={index + 1}
                onClick={() => onSongClick(track)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistView;