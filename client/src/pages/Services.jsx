import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { services, categories } from '../data/services';
import ServiceCard from '../components/sections/ServiceCard';
import { staggerGrid } from '../animations/variants';

export default function Services() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get('category') || 'all';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const setCategory = (slug) => {
    if (slug === 'all') setParams({});
    else setParams({ category: slug });
  };

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark">Our Services</h1>
        <p className="text-muted mt-2 text-lg">
          Documentation assistance, printing, photography and card design — grouped so you can find what you need quickly.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="input-field pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary text-white border-primary'
                : 'border-border text-ink hover:bg-surface'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                activeCategory === c.slug
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-ink hover:bg-surface'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold text-primary-dark">No services found</p>
          <p className="text-muted mt-1">Try a different search term or reset the filters.</p>
          <button
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="btn-outline mt-5"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <motion.div
          key={activeCategory + query}
          variants={staggerGrid}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
