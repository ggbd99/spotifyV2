// src/utils/spotifyApi.js
// This file contains utilities for interacting with the Spotify Web API

/**
 * Get the access token from the URL hash fragment
 * @returns {string|null} The access token or null if not found
 */
export const getAccessToken = () => {
  const params = new URLSearchParams(window.location.hash.substring(1));
  return params.get("access_token");
};

/**
 * Make an authenticated request to the Spotify API
 * @param {string} endpoint - The API endpoint to call (without base URL)
 * @param {string} token - The Spotify access token
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} The JSON response from the API
 */
const spotifyFetch = async (endpoint, token, options = {}) => {
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Fetch the current user's profile
 * @param {string} token - Spotify access token
 * @returns {Promise<Object>} User profile data
 */
export const fetchUserProfile = async (token) => {
  return await spotifyFetch('/me', token);
};

/**
 * Fetch the user's playlists
 * @param {string} token - Spotify access token
 * @param {number} limit - Maximum number of playlists to return (default 50)
 * @returns {Promise<Array>} Array of playlist objects
 */
export const fetchUserPlaylists = async (token, limit = 50) => {
  const result = await spotifyFetch(`/me/playlists?limit=${limit}`, token);
  return result.items || [];
};

/**
 * Fetch tracks from a specific playlist
 * @param {string} token - Spotify access token
 * @param {string} playlistId - ID of the playlist to fetch
 * @param {number} limit - Maximum number of tracks to return (default 100)
 * @returns {Promise<Array>} Array of track objects
 */
export const fetchPlaylistTracks = async (token, playlistId, limit = 100) => {
  const result = await spotifyFetch(`/playlists/${playlistId}/tracks?limit=${limit}`, token);
  
  // Extract the track object from each item
  return result.items.map(item => item.track).filter(track => track !== null);
};

/**
 * Search for items on Spotify
 * @param {string} token - Spotify access token
 * @param {string} query - Search query
 * @param {string} type - Item type to search for (track, album, artist, etc)
 * @param {number} limit - Maximum number of results to return
 * @returns {Promise<Object>} Search results
 */
export const searchSpotify = async (token, query, type = 'track', limit = 5) => {
  return await spotifyFetch(
    `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`, 
    token
  );
};