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
      className="card p-6 flex flex-col h-full relative overflow-hidden group"
    >
      {/* Soft corner glow on hover — subtle depth without a photo */}
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-marigold/0 group-hover:bg-marigold/10 blur-2xl transition-colors duration-500" />

      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${accent}`}>
          {formatCategoryLabel(service.category)}
        </span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent} shrink-0`}>
          <IconComponent className="h-4 w-4" />
        </span>
      </div>

      <h3 className="text-lg font-semibold text-primary-dark mb-2 relative">{service.name}</h3>
      <p className="text-muted text-[15px] leading-relaxed flex-1 relative">{service.shortDescription}</p>

      <Link
        to={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-coral-dark font-semibold text-sm mt-5 hover:gap-2.5 transition-all relative"
      >
        View Details <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}