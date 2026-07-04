import React, { useEffect, useRef, useState } from 'react';
import { useTracks } from '../../hooks/useTracks';
import './AudioPlayer.css';

const VOLUME_STEPS = 5;
const BAR_HEIGHTS = [6, 9, 12, 15, 18];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Pixel-deck audio player: now-playing readout, seekable progress bar,
 * transport controls, and stepped volume, all drawn in the pixel language
 * @returns {JSX.Element} Audio player deck
 */
const AudioPlayer: React.FC = () => {
  const { currentTrack, isLoading, nextTrack, previousTrack } = useTracks();
  const audioRef = useRef<HTMLAudioElement>(null);
  // User intent survives src swaps, whose pause events would otherwise clear it
  const wantsPlayRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeStep, setVolumeStep] = useState(3);

  // Keep the element's volume in sync with the stepped control
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volumeStep / VOLUME_STEPS;
  }, [volumeStep, currentTrack]);

  // Resume playback on track change if the user was listening
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    if (wantsPlayRef.current) void audioRef.current?.play().catch(() => undefined);
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      wantsPlayRef.current = true;
      void audio.play().catch(() => undefined);
    } else {
      wantsPlayRef.current = false;
      audio.pause();
    }
  };

  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, ratio)) * audio.duration;
  };

  if (isLoading) {
    return (
      <div className="deck px-border" role="status">
        <div className="deck-label">
          <span className="deck-dot" /> TUNING IN
        </div>
        <div className="deck-track deck-muted">finding lofi frequencies…</div>
      </div>
    );
  }

  if (!currentTrack) {
    return (
      <div className="deck px-border" role="status">
        <div className="deck-label deck-label-off">
          <span className="deck-dot deck-dot-off" /> RADIO OFFLINE
        </div>
        <div className="deck-track deck-muted">couldn't reach the station, try a refresh</div>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="deck px-border">
      <audio
        ref={audioRef}
        src={currentTrack.audio}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onEnded={nextTrack}
      />

      <div className="deck-label">
        <span className={isPlaying ? 'deck-dot deck-dot-live' : 'deck-dot'} /> NOW PLAYING
      </div>
      <div className="deck-track" title={currentTrack.name}>
        {currentTrack.name}
      </div>
      <div className="deck-artist">{currentTrack.artist_name}</div>

      <div
        className="deck-bar"
        onClick={seek}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        aria-valuenow={Math.floor(currentTime)}
      >
        <div className="deck-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="deck-times">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="deck-controls">
        <button type="button" className="pxbtn" onClick={previousTrack} aria-label="Previous track">
          &#9664;&#9664;
        </button>
        <button
          type="button"
          className="pxbtn primary deck-play"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '▮▮' : '▶'}
        </button>
        <button type="button" className="pxbtn" onClick={nextTrack} aria-label="Next track">
          &#9654;&#9654;
        </button>

        <div className="deck-volume" role="group" aria-label="Volume">
          {BAR_HEIGHTS.map((height, i) => (
            <button
              key={height}
              type="button"
              className={i < volumeStep ? 'deck-volbar on' : 'deck-volbar'}
              style={{ height }}
              onClick={() => setVolumeStep(i + 1 === volumeStep ? i : i + 1)}
              aria-label={`Volume ${i + 1} of ${VOLUME_STEPS}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
