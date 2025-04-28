import React, { useState, useEffect } from 'react';
import { chakra, Flex, Icon, Text, useBreakpointValue } from '@chakra-ui/react';
import { LuMinimize2, LuMaximize2 } from 'react-icons/lu';
import { FaGithub } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import screenfull from 'screenfull';

const ChakraButton = chakra('button');
const ChakraLink = chakra('a');

/**
 * Header component with fullscreen toggle and external links
 * @returns {JSX.Element} Header with fullscreen control and navigation links
 */
const Header: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const showFullscreenButton = useBreakpointValue({ base: false, md: true });

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
    <Flex
      as="header"
      position="absolute"
      top="0"
      left="0"
      w="100%"
      p={4}
      align="center"
      justify="space-between"
      zIndex="overlay"
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        color="white"
        letterSpacing="0.05em"
        fontFamily="monospace"
      >
        Chill Pixel
      </Text>

      <Flex gap={7}>
        {showFullscreenButton && (
          <ChakraButton
            type="button"
            onClick={toggleFs}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            p={0}
            m={0}
            bg="transparent"
            border="none"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            _focus={{ outline: 'none' }}
          >
            <Icon as={isFullscreen ? LuMinimize2 : LuMaximize2} boxSize={6} color="white" />
          </ChakraButton>
        )}

        <ChakraLink
          href="https://github.com/shusingh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          p={0}
          m={0}
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
        >
          <Icon as={FaGithub} boxSize={6} color="white" />
        </ChakraLink>

        <ChakraLink
          href="https://shusingh.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio"
          p={0}
          m={0}
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
        >
          <Icon as={FaCode} boxSize={6} color="white" />
        </ChakraLink>
      </Flex>
    </Flex>
  );
};

export default Header;
