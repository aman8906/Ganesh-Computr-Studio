import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { pageTransition } from '../../animations/variants';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        className="flex-1"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
