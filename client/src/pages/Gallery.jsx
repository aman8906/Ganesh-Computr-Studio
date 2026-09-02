import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowUpRight } from 'lucide-react';
import {
  staggerGrid,
  gridItem,
  heroReveal,
  heroItem,
} from '../animations/variants';
import { business } from '../data/services';

// Placeholder photography — replace with the business's real work samples before launch.
const galleryItems = [
  {
    id: 1,
    title: 'Wedding invitation set',
    category: 'Cards',
    image: 'https://picsum.photos/id/1048/700/900',
    tag: 'bg-coral text-white',
  },
  {
    id: 2,
    title: 'Visiting card design',
    category: 'Cards',
    image: 'https://picsum.photos/id/1025/700/900',
    tag: 'bg-coral text-white',
  },
  {
    id: 3,
    title: 'Passport photo session',
    category: 'Photography',
    image: 'https://picsum.photos/id/250/700/900',
    tag: 'bg-teal text-white',
  },
  {
    id: 4,
    title: 'Bulk document printing',
    category: 'Printing',
    image: 'https://picsum.photos/id/60/700/900',
    tag: 'bg-marigold text-white',
  },
  {
    id: 5,
    title: 'Event invitation card',
    category: 'Cards',
    image: 'https://picsum.photos/id/1074/700/900',
    tag: 'bg-coral text-white',
  },
  {
    id: 6,
    title: 'Studio portrait print',
    category: 'Photography',
    image: 'https://picsum.photos/id/338/700/900',
    tag: 'bg-teal text-white',
  },
  {
    id: 7,
    title: 'Banner & poster print',
    category: 'Printing',
    image: 'https://picsum.photos/id/119/700/900',
    tag: 'bg-marigold text-white',
  },
  {
    id: 8,
    title: 'Custom T-shirt printing',
    category: 'Printing',
    image: 'https://picsum.photos/id/96/700/900',
    tag: 'bg-marigold text-white',
  },
  {
    id: 9,
    title: 'Wedding decoration setup',
    category: 'Cards',
    image: 'https://picsum.photos/id/1059/700/900',
    tag: 'bg-coral text-white',
  },
];

const filters = ['All', 'Cards', 'Photography', 'Printing'];

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.category === filter);

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-marigold/15 blur-3xl pointer-events-none" />

      <div className="absolute top-1/2 -left-24 h-64 w-64 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="container-page relative py-14">
        {/* Hero Section */}
        <motion.div
          variants={heroReveal}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 text-sm font-semibold text-coral-dark bg-coral-light rounded-full px-4 py-1.5 mb-4"
          >
            <ZoomIn className="h-3.5 w-3.5" />
            Our Portfolio
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="text-3xl md:text-4xl font-extrabold text-primary-dark"
          >
            Our Work
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-muted mt-2 text-lg max-w-xl"
          >
            A look at recent printing, photography and card-design work from
            our studio.
          </motion.p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mt-8"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                filter === f
                  ? 'bg-gradient-to-r from-marigold to-coral text-white shadow-glow'
                  : 'bg-white border border-border text-ink hover:border-marigold/40 hover:-translate-y-0.5'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style Grid */}
        <motion.div
          key={filter}
          variants={staggerGrid}
          initial="hidden"
          animate="show"
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 mt-10 [column-fill:_balance]"
        >
          {filtered.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              variants={gridItem}
              onClick={() => setActive(item)}
              whileHover={{ y: -6 }}
              className="group relative block w-full mb-5 break-inside-avoid rounded-lg overflow-hidden glow-card text-left"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-ink-gradient opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Category */}
              <span
                className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${item.tag}`}
              >
                {item.category}
              </span>

              {/* Zoom Icon */}
              <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4" />
              </span>

              {/* Title */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-white font-semibold leading-tight drop-shadow">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="glow-card mt-16 bg-gradient-to-r from-primary-dark via-primary to-teal-dark p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl md:text-2xl font-bold">
              Liked what you saw?
            </h3>

            <p className="text-white/70 mt-1">
              Bring your own idea — we'll help you bring it to life.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${
              business.whatsapp
            }?text=${encodeURIComponent(
              'Hi, I saw your gallery and wanted to ask about...'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 group"
          >
            <span className="flex items-center gap-2">
              WhatsApp Us
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                type: 'spring',
                damping: 22,
                stiffness: 260,
              }}
              onClick={(e) => e.stopPropagation()}
              className="glow-card bg-white max-w-lg w-full"
            >
              {/* Lightbox Image */}
              <div className="relative">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-80 object-cover"
                />

                <div className="absolute inset-0 bg-ink-gradient" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Lightbox Details */}
              <div className="p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary-dark text-lg">
                    {active.title}
                  </p>

                  <p className="text-sm text-muted">
                    {active.category}
                  </p>
                </div>

                {/* WhatsApp Enquiry */}
                <a
                  href={`https://wa.me/${
                    business.whatsapp
                  }?text=${encodeURIComponent(
                    `Hi, I'd like something like: ${active.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp shrink-0"
                >
                  Enquire
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}