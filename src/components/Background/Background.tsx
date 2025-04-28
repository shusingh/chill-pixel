import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

/**
 * Background component that displays a full-screen animated background image
 * @param {Object} props - Component props
 * @param {string} props.src - URL of the background image to display
 * @returns {JSX.Element} A full-screen background with fade animation
 */
const Background = ({ src }: { src: string }) => (
  <MotionBox
    as="div"
    position="absolute"
    top="0"
    left="0"
    w="100%"
    h="100%"
    bgImage={`url(${src})`}
    bgSize="cover"
    bgPos="center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  />
);

export default Background;
