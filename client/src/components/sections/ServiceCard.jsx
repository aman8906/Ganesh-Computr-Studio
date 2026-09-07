import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { gridItem } from '../../animations/variants';
import { categoryVisuals } from '../../data/categoryImages';

const formatCategoryLabel = (slug) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function ServiceCard({ service }) {
  const visual = categoryVisuals[service.category];
  const accent = visual?.tag || 'bg-primary text-white';
  const IconComponent = Icons[visual?.icon] || Icons.LayoutGrid;

  return (
    <motion.div
      variants={gridItem}
      whileHover={{ y: -6 }}
      className="glow-card bg-white flex flex-col h-full group"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={service.image || visual?.image}
          alt={service.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-ink-gradient" />
        <span className={`absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg ${accent}`}>
          <IconComponent className="h-4 w-4" />
        </span>
        <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full ${accent}`}>
          {formatCategoryLabel(service.category)}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-primary-dark mb-2">{service.name}</h3>
        <p className="text-muted text-[15px] leading-relaxed flex-1">{service.shortDescription}</p>
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-coral-dark font-semibold text-sm mt-5 hover:gap-2.5 transition-all"
        >
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}