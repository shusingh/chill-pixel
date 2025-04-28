import axios from 'axios';

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  audio: string;
}

const BASE_URL = 'https://api.jamendo.com/v3.0';

/**
 * Fetches lofi tracks from Jamendo API
 * @param {number} limit - Number of tracks to fetch
 * @returns {Promise<Track[]>} Array of tracks
 */
export async function fetchLofiTracks(limit: number = 20): Promise<Track[]> {
  try {
    const key = import.meta.env.VITE_JAMENDO_CLIENT_ID;
    const res = await axios.get(`${BASE_URL}/tracks/`, {
      params: {
        client_id: key,
        format: 'json',
        limit,
        tags: 'lofi',
      },
    });
    return res.data.results;
  } catch (err) {
    console.error('Failed to load Jamendo tracks', err);
    return [];
  }
}
