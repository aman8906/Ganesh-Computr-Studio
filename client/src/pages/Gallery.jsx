import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { staggerGrid, gridItem } from '../animations/variants';

// Replace `color` blocks with real photographs (imageUrl) once the business supplies them.
const galleryItems = [
  { id: 1, title: 'Wedding invitation set', category: 'Cards', color: 'from-primary to-accent' },
  { id: 2, title: 'Visiting card design', category: 'Cards', color: 'from-accent to-primary-dark' },
  { id: 3, title: 'Passport photo session', category: 'Photography', color: 'from-primary-dark to-primary' },
  { id: 4, title: 'Bulk document printing', category: 'Printing', color: 'from-accent to-success' },
  { id: 5, title: 'Event invitation card', category: 'Cards', color: 'from-primary to-primary-dark' },
  { id: 6, title: 'Studio portrait print', category: 'Photography', color: 'from-primary-dark to-accent' },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark">Our Work</h1>
        <p className="text-muted mt-2 text-lg">
          A look at recent printing, photography and card-design work from our studio.
        </p>
      </div>

      <motion.div
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
      >
        {galleryItems.map((item) => (
          <motion.button
            key={item.id}
            variants={gridItem}
            onClick={() => setActive(item)}
            className="group text-left rounded-md overflow-hidden border border-border"
          >
            <div className={`h-56 bg-gradient-to-br ${item.color} flex items-end p-4`}>
              <span className="text-white/90 text-xs font-medium bg-black/20 rounded-full px-2.5 py-1">
                {item.category}
              </span>
            </div>
            <div className="p-4 bg-white">
              <p className="font-medium text-ink">{item.title}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-md overflow-hidden max-w-lg w-full"
            >
              <div className={`h-72 bg-gradient-to-br ${active.color}`} />
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary-dark">{active.title}</p>
                  <p className="text-sm text-muted">{active.category}</p>
                </div>
                <button onClick={() => setActive(null)} className="p-2 text-muted hover:text-ink" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
