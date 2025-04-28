import React from 'react';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './audio-player-dark.css';
import { useTracks } from '../../hooks/useTracks';

interface AudioPlayerProps {
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Audio player component that plays lofi tracks
 * @param {Object} props - Component props
 * @param {() => void} props.onNext - Callback function when next track is played
 * @param {() => void} props.onPrev - Callback function when previous track is played
 * @returns {JSX.Element | null} Audio player component or null if tracks are loading
 */
const AudioPlayer: React.FC<AudioPlayerProps> = ({ onNext, onPrev }) => {
  const { currentTrack, isLoading, nextTrack, previousTrack } = useTracks();

  if (isLoading || !currentTrack) return null;

  const handleClickPrevious = () => {
    previousTrack();
    onPrev();
  };

  const handleClickNext = () => {
    nextTrack();
    onNext();
  };

  return (
    <ReactH5AudioPlayer
      src={currentTrack.audio}
      showSkipControls
      showJumpControls={false}
      onClickPrevious={handleClickPrevious}
      onClickNext={handleClickNext}
      autoPlayAfterSrcChange
      className="dark-theme"
    />
  );
};

export default AudioPlayer;
