import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { gridItem } from '../../animations/variants';
import { categoryVisuals } from '../../data/categoryImages';

export default function ServiceCard({ service }) {
  const accent = categoryVisuals[service.category]?.tag || 'bg-primary text-white';

  return (
    <motion.div
      variants={gridItem}
      className="card p-6 flex flex-col h-full hover:shadow-raised hover:-translate-y-1 transition-all"
    >
      <span className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3 ${accent}`}>
        {service.category.replace('-', ' ')}
      </span>
      <h3 className="text-lg font-semibold text-primary-dark mb-2">{service.name}</h3>
      <p className="text-muted text-[15px] leading-relaxed flex-1">{service.shortDescription}</p>
      <Link
        to={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-coral-dark font-semibold text-sm mt-5 hover:gap-2.5 transition-all"
      >
        View Details <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
