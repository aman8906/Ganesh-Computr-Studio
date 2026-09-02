import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gridItem } from '../../animations/variants';
import { categoryVisuals } from '../../data/categoryImages';

export default function CategoryTile({ category }) {
  const visual = categoryVisuals[category.slug];

  return (
    <motion.div variants={gridItem}>
      <Link
        to={`/services?category=${category.slug}`}
        className="group relative block h-64 rounded-lg overflow-hidden glow-card"
      >
        <img
          src={visual.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-ink-gradient" />
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
