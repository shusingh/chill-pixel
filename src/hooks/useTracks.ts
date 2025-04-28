import { useState, useEffect } from 'react';
import { Track, fetchLofiTracks } from '../services/jamendo';

/**
 * Custom hook for managing tracks state and fetching
 * @returns {Object} Tracks state and control functions
 */
export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTracks() {
      setIsLoading(true);
      const fetchedTracks = await fetchLofiTracks();
      setTracks(fetchedTracks);
      setIsLoading(false);
    }
    loadTracks();
  }, []);

  const nextTrack = () => {
    setCurrentTrackIndex(current => (current + 1) % tracks.length);
  };

  const previousTrack = () => {
    setCurrentTrackIndex(current => (current === 0 ? tracks.length - 1 : current - 1));
  };

  return {
    tracks,
    currentTrack: tracks[currentTrackIndex],
    currentTrackIndex,
    isLoading,
    nextTrack,
    previousTrack,
  };
}
