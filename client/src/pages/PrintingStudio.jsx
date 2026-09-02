import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { staggerGrid, gridItem } from '../animations/variants';

const printingSlugs = ['printing-photocopy', 'document-scanning', 'passport-photo', 'photo-printing', 'wedding-cards', 'visiting-cards'];

export default function PrintingStudio() {
  const items = services.filter((s) => printingSlugs.includes(s.slug));

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark">Printing &amp; Studio</h1>
        <p className="text-muted mt-2 text-lg">
          Printing, photography and card-design services — pick a product to see pricing details and place a request.
        </p>
      </div>

      <motion.div
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
      >
        {items.map((item) => (
          <motion.div key={item.slug} variants={gridItem} className="card p-6 flex flex-col">
            <h3 className="font-semibold text-primary-dark text-lg">{item.name}</h3>
            <p className="text-muted text-[15px] mt-2 flex-1">{item.shortDescription}</p>
            <p className="text-sm text-muted mt-4">Ready in: {item.turnaround}</p>
            <Link to={`/request-service?service=${item.slug}`} className="btn-primary mt-4">
              Request This
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
