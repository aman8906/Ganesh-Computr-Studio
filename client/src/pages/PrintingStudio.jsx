import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { services } from '../data/services';
import { categoryVisuals } from '../data/categoryImages';
import { staggerGrid, gridItem, heroReveal, heroItem } from '../animations/variants';

const printingSlugs = [
  'printing-photocopy',
  'document-scanning',
  'banner-poster-printing',
  'cup-tshirt-printing',
  'passport-photo',
  'photo-printing',
  'wedding-cards',
  'visiting-cards',
  'wedding-decoration',
];

export default function PrintingStudio() {
  const items = services.filter((s) => printingSlugs.includes(s.slug));

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-marigold/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="container-page relative py-14">
        <motion.div variants={heroReveal} initial="hidden" animate="show" className="max-w-2xl">
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 text-sm font-semibold text-marigold-dark bg-marigold-light rounded-full px-4 py-1.5 mb-4"
          >
            <Camera className="h-3.5 w-3.5" /> Printing, Photography &amp; Cards
          </motion.span>
          <motion.h1 variants={heroItem} className="text-3xl md:text-4xl font-extrabold text-primary-dark">
            Printing &amp; Studio
          </motion.h1>
          <motion.p variants={heroItem} className="text-muted mt-2 text-lg">
            Printing, photography and card-design services — pick a product to see details and place a request.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
        >
          {items.map((item) => {
            const visual = categoryVisuals[item.category];
            return (
              <motion.div
                key={item.slug}
                variants={gridItem}
                whileHover={{ y: -6 }}
                className="glow-card bg-white flex flex-col"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={visual?.image}
                    alt={item.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink-gradient" />
                  <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${visual?.tag}`}>
                    {item.turnaround}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-primary-dark text-lg">{item.name}</h3>
                  <p className="text-muted text-[15px] mt-2 flex-1">{item.shortDescription}</p>
                  <Link to={`/request-service?service=${item.slug}`} className="btn-primary mt-5">
                    Request This
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}