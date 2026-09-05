import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchX, Home as HomeIcon, LayoutGrid } from 'lucide-react';
import { heroReveal, heroItem, bounceIn } from '../animations/variants';

export default function NotFound() {
  return (
    <div className="relative overflow-hidden min-h-[75vh] flex items-center">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-marigold/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="container-page relative py-24 text-center max-w-lg mx-auto">
        <motion.div
          variants={bounceIn}
          initial="hidden"
          animate="show"
          className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-marigold to-coral flex items-center justify-center shadow-glow mb-6"
        >
          <SearchX className="h-9 w-9 text-white" />
        </motion.div>

        <motion.div variants={heroReveal} initial="hidden" animate="show">
          <motion.p variants={heroItem} className="text-sm font-bold tracking-widest text-coral-dark">
            404
          </motion.p>
          <motion.h1 variants={heroItem} className="text-3xl md:text-4xl font-extrabold text-primary-dark mt-2">
            Page not found
          </motion.h1>
          <motion.p variants={heroItem} className="text-muted mt-3">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/" className="btn-primary">
              <HomeIcon className="h-4 w-4" /> Go Home
            </Link>
            <Link to="/services" className="btn-outline">
              <LayoutGrid className="h-4 w-4" /> Browse Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}