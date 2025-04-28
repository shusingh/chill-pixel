import React, { useState, useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import Background from '../../components/Background';
import AudioPlayer from '../../components/AudioPlayer';
import { GIF_LIST } from '../../constants/gifs';
import { shuffle } from '../../utils/array';

/**
 * Landing page component that displays a rotating background with audio player
 * @returns {JSX.Element} Landing page with animated background and audio controls
 */
const LandingPage: React.FC = () => {
  const [shuffledGifs, setShuffledGifs] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  // Reshuffle GIFs whenever the index changes
  useEffect(() => {
    setShuffledGifs(shuffle(GIF_LIST));
  }, [idx]);

  const next = () => setIdx(i => (i + 1) % shuffledGifs.length);
  const prev = () => setIdx(i => (i === 0 ? shuffledGifs.length - 1 : i - 1));

  // Don't render until we have shuffled GIFs
  if (shuffledGifs.length === 0) return null;

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      <div id="darken" />
      <div id="vignette" />
      <Background src={shuffledGifs[idx]} />

      <VStack position="absolute" inset={0} justify="flex-end" align="flex-start" p={4} zIndex={3}>
        <AudioPlayer onNext={next} onPrev={prev} />
      </VStack>
    </Box>
  );
};

export default LandingPage;
