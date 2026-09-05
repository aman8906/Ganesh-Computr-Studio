import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { gridItem } from '../../animations/variants';
import { categoryVisuals } from '../../data/categoryImages';

export default function CategoryTile({ category }) {
  const visual = categoryVisuals[category.slug];
  const IconComponent = Icons[visual?.icon] || Icons.LayoutGrid;

  // Safety net: if a category is ever added to categories[] without a matching
  // entry in categoryImages.js, skip rendering this tile instead of crashing.
  if (!visual) return null;

  return (
    <motion.div variants={gridItem} style={{ perspective: 1000 }}>
      <Link
        to={`/services?category=${category.slug}`}
        className="group relative block h-64 rounded-lg overflow-hidden glow-card"
      >
        <motion.div
          whileHover={{ rotateX: -3, rotateY: 3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src={visual.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-ink-gradient" />
        </motion.div>

        {/* Floating 3D icon badge */}
        <motion.span
          whileHover={{ y: -4, rotate: -6 }}
          className={`absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl ${visual.tag} shadow-glow`}
        >
          <IconComponent className="h-5 w-5" />
        </motion.span>

        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${visual.tag}`}>
            Popular
          </span>
          <h3 className="text-white text-lg font-bold leading-snug drop-shadow">
            {category.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}