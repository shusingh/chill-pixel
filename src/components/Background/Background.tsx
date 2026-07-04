import { motion } from 'framer-motion';
import './Background.css';

/**
 * Background component that displays a full-screen animated background image
 * @param {Object} props - Component props
 * @param {string} props.src - URL of the background image to display
 * @returns {JSX.Element} A full-screen background with fade animation
 */
const Background = ({ src }: { src: string }) => (
  <motion.div
    key={src}
    className="scene-bg"
    style={{ backgroundImage: `url(${src})` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  />
);

export default Background;
