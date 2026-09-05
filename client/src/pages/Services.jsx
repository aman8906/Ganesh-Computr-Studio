import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, LayoutGrid } from 'lucide-react';
import { services, categories } from '../data/services';
import ServiceCard from '../components/sections/ServiceCard';
import { staggerGrid, heroReveal, heroItem } from '../animations/variants';

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

  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-marigold/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="container-page relative py-14">
        {/* Hero */}
        <motion.div variants={heroReveal} initial="hidden" animate="show" className="max-w-2xl">
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-dark bg-teal-light rounded-full px-4 py-1.5 mb-4"
          >
            <LayoutGrid className="h-3.5 w-3.5" /> {services.length}+ services available
          </motion.span>
          <motion.h1 variants={heroItem} className="text-3xl md:text-4xl font-extrabold text-primary-dark">
            Our Services
          </motion.h1>
          <motion.p variants={heroItem} className="text-muted mt-2 text-lg">
            Documentation assistance, printing, photography and card design — grouped so you can find what you need quickly.
          </motion.p>
        </motion.div>

        {/* Search + filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-8"
        >
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services..."
              className="input-field pl-10 pr-9"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-danger transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-marigold to-coral text-white shadow-glow'
                  : 'bg-white border border-border text-ink hover:border-marigold/40 hover:-translate-y-0.5'
              }`}
            >
              All Services
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === c.slug
                    ? 'bg-gradient-to-r from-marigold to-coral text-white shadow-glow'
                    : 'bg-white border border-border text-ink hover:border-marigold/40 hover:-translate-y-0.5'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Result count */}
        <motion.p
          key={filtered.length + activeCategory + query}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted mt-6"
        >
          Showing <span className="font-semibold text-primary-dark">{filtered.length}</span>{' '}
          {activeCategoryName ? `in ${activeCategoryName}` : 'services'}
          {query && <> matching "<span className="font-semibold text-primary-dark">{query}</span>"</>}
        </motion.p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="mx-auto h-16 w-16 rounded-full bg-coral-light flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-coral-dark" />
              </div>
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
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + query}
              variants={staggerGrid}
              initial="hidden"
              animate="show"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
            >
              {filtered.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}