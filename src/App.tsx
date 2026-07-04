import React from 'react';
import Header from './components/Header';
import LandingPage from './pages/Landing/LandingPage';

/**
 * Root component that renders the main application layout
 * @returns {JSX.Element} The main application layout with header and landing page
 */
const App: React.FC = () => {
  return (
    <>
      <Header />
      <LandingPage />
    </>
  );
};

export default App;
