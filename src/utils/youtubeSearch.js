// src/utils/youtubeSearch.js
/**
 * Search for a video on YouTube without using the API
 * This uses the browser to navigate to the YouTube search page and extract the first video ID
 * 
 * @param {string} query - The search query
 * @returns {Promise<string|null>} The YouTube video ID or null if not found
 */
export const searchYouTube = async (query) => {
  try {
    // Create a URL for YouTube search
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    
    // Fetch the search results page
    const response = await fetch(searchUrl);
    const html = await response.text();
    
    // Extract video ID from the HTML
    // YouTube embeds video IDs in various patterns, we'll look for the most common ones
    const patterns = [
      /\\"videoId\\":\\"([^\\]+)\\"/,   // Pattern in newer YouTube pages
      /watch\?v=([^"&]+)/,              // Classic watch URL pattern
      /\/embed\/([^"&?/]+)/,            // Embed URL pattern
      /\/v\/([^"&?/]+)/                 // Alternate video URL pattern
    ];
    
    // Try each pattern until we find a match
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // If we get here, we couldn't find a video ID
    console.error("Could not extract YouTube video ID from search results");
    return null;
    
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return null;
  }
};

/**
 * Alternative approach: Use a server-rendered search result to find a video ID
 * This is a fallback in case the direct page scraping doesn't work
 * 
 * @param {string} query - The search query
 * @returns {Promise<string|null>} The YouTube video ID or null if not found
 */
export const searchYouTubeAlternative = async (query) => {
  try {
    // Create a URL for a service that performs YouTube searches
    // Note: This is just an example - in a real app you'd need your own service or use a CORS proxy
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    )}`;
    
    // Fetch the search results through the proxy
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data && data.contents) {
      // Extract video ID from the HTML contents
      const videoIdMatch = data.contents.match(/\\"videoId\\":\\"([^\\]+)\\"/);
      if (videoIdMatch && videoIdMatch[1]) {
        return videoIdMatch[1];
      }
      
      // Try alternative pattern
      const watchMatch = data.contents.match(/watch\?v=([^"&]+)/);
      if (watchMatch && watchMatch[1]) {
        return watchMatch[1];
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error using alternative YouTube search method:", error);
    return null;
  }
};

/**
 * Helper function that tries both search methods in sequence
 * 
 * @param {string} query - The search query
 * @returns {Promise<string|null>} The YouTube video ID or null if not found
 */
export const searchWithFallback = async (query) => {
  // Try primary search method first
  const primaryResult = await searchYouTube(query);
  if (primaryResult) return primaryResult;
  
  // Fall back to alternative method if primary fails
  console.log("Primary YouTube search failed, trying alternative method");
  const alternativeResult = await searchYouTubeAlternative(query);
  return alternativeResult;
};