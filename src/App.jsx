// src/App.jsx
import { useEffect, useState } from 'react';
import SpotifyLogin from './components/SpotifyLogin';
import PlaylistView from './components/PlaylistView';
import YouTubePlayer from './components/YouTubePlayer';
import { getAccessToken, fetchUserPlaylists, fetchPlaylistTracks } from './utils/spotifyApi';

function App() {
  const [token, setToken] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [showYouTube, setShowYouTube] = useState(false);

  useEffect(() => {
    // Check if the URL contains the authorization code from Spotify
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");
    
    if (accessToken) {
      // Store the token in session storage and state
      sessionStorage.setItem("spotify_token", accessToken);
      setToken(accessToken);
      
      // Clear the URL without refreshing the page
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Check if we already have a token in session storage
      const storedToken = sessionStorage.getItem("spotify_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    const fetchFirstPlaylist = async () => {
      if (!token) return;
      
      setLoading(true);
      setError("");
      
      try {
        // Fetch user's playlists
        const playlists = await fetchUserPlaylists(token);
        
        if (playlists.length > 0) {
          const firstPlaylist = playlists[0];
          setPlaylist(firstPlaylist);
          
          // Fetch tracks for the first playlist
          const playlistTracks = await fetchPlaylistTracks(token, firstPlaylist.id);
          setTracks(playlistTracks);
        } else {
          setError("No playlists found in your Spotify account");
        }
      } catch (err) {
        console.error("Error fetching playlist:", err);
        setError("Failed to fetch your Spotify playlists. Please try logging in again.");
        sessionStorage.removeItem("spotify_token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFirstPlaylist();
  }, [token]);

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setShowYouTube(true);
  };

  const handleCloseYouTube = () => {
    setShowYouTube(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black text-white p-4">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Spotify to YouTube</h1>
        <p className="text-xl text-green-400">Listen to your Spotify playlist songs on YouTube</p>
      </header>

      <main className="max-w-4xl mx-auto">
        {!token ? (
          <SpotifyLogin />
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900 text-white p-4 rounded-lg text-center">
                {error}
              </div>
            ) : (
              <>
                {playlist && (
                  <PlaylistView 
                    playlist={playlist} 
                    tracks={tracks} 
                    onSongClick={handleSongClick} 
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {showYouTube && selectedSong && (
        <YouTubePlayer 
          song={selectedSong} 
          onClose={handleCloseYouTube} 
        />
      )}

      <footer className="mt-8 text-center text-sm text-gray-400">
        <p>This application uses Spotify API to fetch your playlists and YouTube to play songs.</p>
      </footer>
    </div>
  );
}

export default App;