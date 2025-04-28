import React from 'react';
import { VStack } from '@chakra-ui/react';
import Header from './components/Header';
import LandingPage from './pages/Landing/LandingPage';

/**
 * Root component that renders the main application layout
 * @returns {JSX.Element} The main application layout with header and landing page
 */
const App: React.FC = () => {
  return (
    <VStack w="100vw" h="100vh" gap={0} overflow="hidden">
      <Header />
      <LandingPage />
    </VStack>
  );
};

export default App;
