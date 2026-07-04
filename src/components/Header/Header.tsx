import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import './Header.css';

/**
 * Header with the wordmark and labelled text links, drawn in the pixel language
 * @returns {JSX.Element} Header with fullscreen control and navigation links
 */
const Header: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFs = () => {
    if (screenfull.isEnabled) screenfull.toggle();
  };

  useEffect(() => {
    if (!screenfull.isEnabled) return;
    const handler = () => setIsFullscreen(screenfull.isFullscreen);
    screenfull.on('change', handler);
    return () => void screenfull.off('change', handler);
  }, []);

  return (
    <header className="cp-header">
      <div className="cp-logo">
        CHILL<em>PIXEL</em>
      </div>

      <nav className="cp-links" aria-label="Site links">
        {screenfull.isEnabled && (
          <button type="button" className="cp-link cp-link-fs" onClick={toggleFs}>
            [ {isFullscreen ? 'exit fullscreen' : 'fullscreen'} ]
          </button>
        )}
        <a
          className="cp-link"
          href="https://github.com/shusingh/chill-pixel"
          target="_blank"
          rel="noopener noreferrer"
        >
          [ github ]
        </a>
        <a
          className="cp-link"
          href="https://shusingh.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          [ portfolio ]
        </a>
      </nav>
    </header>
  );
};

export default Header;
