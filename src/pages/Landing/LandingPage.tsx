import React, { useMemo, useState } from 'react';
import Background from '../../components/Background';
import AudioPlayer from '../../components/AudioPlayer';
import SceneSwitcher from '../../components/SceneSwitcher';
import { GIF_LIST } from '../../constants/gifs';
import { shuffle } from '../../utils/array';
import './LandingPage.css';

/** Turns "/gifs/sakura-chill.gif" into "sakura chill" */
function sceneName(src: string): string {
  const file = src.split('/').pop() ?? src;
  return file.replace(/\.gif$/i, '').replace(/-/g, ' ');
}

/**
 * Landing page: pixel-art scene with the player deck and scene switcher over it.
 * Scenes and music are independent; skipping a track no longer swaps the scene.
 * @returns {JSX.Element} Landing page with animated background and audio controls
 */
const LandingPage: React.FC = () => {
  const shuffledGifs = useMemo(() => shuffle(GIF_LIST), []);
  const [idx, setIdx] = useState(0);

  const next = () => setIdx(i => (i + 1) % shuffledGifs.length);
  const prev = () => setIdx(i => (i === 0 ? shuffledGifs.length - 1 : i - 1));

  return (
    <div className="landing">
      <Background src={shuffledGifs[idx]} />
      <div id="darken" />
      <div id="vignette" />
      <div id="scanlines" />

      <div className="landing-deck">
        <AudioPlayer />
      </div>
      <div className="landing-scene">
        <SceneSwitcher name={sceneName(shuffledGifs[idx])} onPrev={prev} onNext={next} />
      </div>
    </div>
  );
};

export default LandingPage;
