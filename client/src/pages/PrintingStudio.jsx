import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { services } from '../data/services';
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

// Distinct image per service instead of one repeated category photo —
// reuses the same real photography already used elsewhere on the site.
const serviceImages = {
  'printing-photocopy': 'https://inkpaste.co.ke/wp-content/uploads/2023/03/photocopy-services-e1679521596330.jpg',
  'document-scanning': 'https://www.e-arc.in/wp-content/uploads/2026/08/Bulk-Document-Scanning.jpg',
  'banner-poster-printing': 'https://shreejigraphic.com/wp-content/uploads/2025/12/SG-Dec-_33-Printing-Press-Banner-Poster-Design-CDR-File.jpg',
  'cup-tshirt-printing': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FynPveyfHbMfvRKfJCmlb6Sa3cz0Od9ZMfiJ0pE0DA&s=10',
  'passport-photo': 'https://5.imimg.com/data5/SELLER/Default/2022/2/GO/AH/UP/5295475/8-passport-size-photos-500x500-standard-scale-2-00x-gigapixel-500x500.jpg',
  'photo-printing': 'https://cdn.canvaschamp.in/static/images/landingpage/photoprints/need_more_reasons.jpg',
  'wedding-cards': 'https://image.epicinvites.in/storage/v1/object/public/product-images/1758652437854/elegant-noor-editable-nikah-muslim-wedding-invitation-card.webp',
  'visiting-cards': 'https://kingofcards.in/cdn/shop/files/V6TjNofq_2.png?v=1766752311&width=1100',
  'wedding-decoration': 'https://thejarvi.com/wp-content/uploads/2023/02/shadi-gadi10w.jpg',
};

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
          {items.map((item) => (
            <motion.div key={item.slug} variants={gridItem} style={{ perspective: 1000 }}>
              <motion.div
                whileHover={{ y: -6, rotateX: -3, rotateY: 3, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="glow-card bg-white flex flex-col h-full"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={serviceImages[item.slug]}
                    alt={item.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink-gradient" />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-marigold text-white">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}