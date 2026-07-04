import React from 'react';
import './SceneSwitcher.css';

interface SceneSwitcherProps {
  name: string;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Scene switcher: cycles the background pixel-art scene, independent of the music
 * @param {Object} props - Component props
 * @param {string} props.name - Display name of the current scene
 * @param {() => void} props.onPrev - Switch to the previous scene
 * @param {() => void} props.onNext - Switch to the next scene
 * @returns {JSX.Element} Scene switcher card
 */
const SceneSwitcher: React.FC<SceneSwitcherProps> = ({ name, onPrev, onNext }) => (
  <div className="scene px-border">
    <button type="button" className="pxbtn scene-btn" onClick={onPrev} aria-label="Previous scene">
      &#9664;
    </button>
    <div className="scene-name">{name}</div>
    <button type="button" className="pxbtn scene-btn" onClick={onNext} aria-label="Next scene">
      &#9654;
    </button>
  </div>
);

export default SceneSwitcher;
