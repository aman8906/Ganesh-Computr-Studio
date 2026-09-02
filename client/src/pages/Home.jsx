import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Star, ShieldCheck, Zap } from 'lucide-react';
import { services, business, categories } from '../data/services';
import { heroReveal, heroItem, staggerGrid, gridItem } from '../animations/variants';
import ServiceCard from '../components/sections/ServiceCard';
import CategoryTile from '../components/sections/CategoryTile';
import StatCounter from '../components/ui/StatCounter';

const steps = [
  { title: 'Choose a service', desc: 'Browse categories or search for what you need.', color: 'bg-marigold-light text-marigold-dark' },
  { title: 'Submit your details', desc: 'Tell us your requirement — takes under a minute.', color: 'bg-coral-light text-coral-dark' },
  { title: 'We process it', desc: 'Our team prepares or files your request accurately.', color: 'bg-teal-light text-teal-dark' },
  { title: 'Collect or receive', desc: "We'll let you know the moment it's ready.", color: 'bg-primary-light text-primary' },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Trusted locally' },
  { icon: Zap, label: 'Fast turnaround' },
  { icon: Star, label: '4.8-star service' },
];

export default function Home() {
  const popular = services.slice(0, 8);

  return (
    <>
      {/* Hero — photo + gradient blobs + floating stat card */}
      <section className="relative overflow-hidden bg-cream">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-marigold/20 blur-3xl" />
        <div className="absolute top-40 -left-32 h-80 w-80 rounded-full bg-teal/15 blur-3xl" />

        <div className="container-page relative py-14 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={heroReveal} initial="hidden" animate="show">
            <motion.span
              variants={heroItem}
              className="inline-flex items-center gap-2 text-sm font-semibold text-coral-dark bg-coral-light rounded-full px-4 py-1.5 mb-5"
            >
              <Star className="h-3.5 w-3.5 fill-coral-dark" /> Your neighbourhood digital service center
            </motion.span>
            <motion.h1 variants={heroItem} className="text-4xl md:text-5xl font-extrabold text-primary-dark leading-[1.1]">
              Documents, printing &amp; studio work — sorted today.
            </motion.h1>
            <motion.p variants={heroItem} className="mt-5 text-lg text-ink/75 max-w-xl">
              Aadhaar &amp; PAN paperwork, online forms, printing, photography and card design —
              handled by people you can actually walk up to and talk with.
            </motion.p>
            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="btn-primary">View Services</Link>
              <a href={`tel:${business.phone}`} className="btn-outline">
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </motion.div>
            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-5">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-ink/70">
                  <b.icon className="h-4 w-4 text-teal-dark" /> {b.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden glow-card aspect-[4/5] max-w-md mx-auto">
              <img
                src="https://picsum.photos/id/1062/700/900"
                alt="Customer being helped at the service counter"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-4 sm:left-2 bg-white rounded-lg shadow-raised p-4 flex items-center gap-3 max-w-[240px]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white font-bold">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-primary-dark leading-tight">Request confirmed</p>
                <p className="text-xs text-muted">Usually same-day</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Colorful category tiles */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">Explore by Category</h2>
            <p className="text-muted mt-1">Six ways we help — pick what you need.</p>
          </div>
        </div>
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categories.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </motion.div>
      </section>

      {/* Popular services */}
      <section className="bg-surface py-16 md:py-20 border-y border-border">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">Popular Services</h2>
              <p className="text-muted mt-1">The services our customers ask for most.</p>
            </div>
            <Link to="/services" className="hidden sm:inline-flex text-coral-dark font-semibold text-sm">
              See all services →
            </Link>
          </div>
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {popular.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-10">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg font-bold mb-4 ${step.color}`}>
                {i + 1}
              </div>
              <h3 className="font-semibold text-primary-dark mb-1">{step.title}</h3>
              <p className="text-muted text-[15px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip — bold gradient band */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-teal-dark py-14">
        <div className="container-page grid grid-cols-2 sm:grid-cols-4 gap-8">
          <StatCounter to={12} suffix="+" label="Years serving locally" />
          <StatCounter to={5000} suffix="+" label="Requests completed" />
          <StatCounter to={14} label="Services offered" />
          <StatCounter to={98} suffix="%" label="Customers who return" />
        </div>
      </section>

      {/* Trust + Location */}
      <section className="container-page py-16 md:py-20 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">Why customers choose us</h2>
          <ul className="space-y-4">
            {[
              'Clear, honest guidance — we tell you exactly what to bring.',
              'Fast turnaround on printing, photos and card designs.',
              'We explain assistance vs. official issuance so there is never confusion.',
              'A team that has served this neighbourhood for years.',
            ].map((point) => (
              <li key={point} className="flex gap-3 text-[15px] text-ink/85">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-coral shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="glow-card relative h-72">
          <img
            src="https://picsum.photos/id/164/900/500"
            alt="Shop storefront"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-gradient" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="flex items-start gap-3 mb-3 text-white">
              <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
              <p className="text-[15px]">{business.address}</p>
            </div>
            <a href={business.mapUrl} target="_blank" rel="noreferrer" className="btn-primary w-fit">
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
