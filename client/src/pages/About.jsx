import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { business } from '../data/services';
import { heroReveal, heroItem, staggerGrid, gridItem } from '../animations/variants';
import StatCounter from '../components/ui/StatCounter';

const values = [
  {
    icon: MessageSquare,
    title: 'Clear communication',
    desc: "We tell you exactly what a service does — and doesn't — cover.",
    bg: 'bg-marigold-light',
    text: 'text-marigold-dark',
  },
  {
    icon: Shield,
    title: 'Minimum data collected',
    desc: "We only ever ask for what's needed to help you, nothing more.",
    bg: 'bg-teal-light',
    text: 'text-teal-dark',
  },
  {
    icon: Users,
    title: 'Neighbourhood trust',
    desc: 'Built over years of serving the same families and local businesses.',
    bg: 'bg-coral-light',
    text: 'text-coral-dark',
  },
];

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-marigold/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      {/* Hero */}
      <div className="container-page relative py-14 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={heroReveal} initial="hidden" animate="show">
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-dark bg-teal-light rounded-full px-4 py-1.5 mb-4"
          >
            <Award className="h-3.5 w-3.5" /> About Us
          </motion.span>
          <motion.h1 variants={heroItem} className="text-3xl md:text-4xl font-extrabold text-primary-dark leading-tight">
            About {business.name}
          </motion.h1>
          <motion.p variants={heroItem} className="text-lg text-ink/80 mt-4 leading-relaxed">
            {business.description}
          </motion.p>
          <motion.div variants={heroItem} className="mt-6">
            <p className="text-sm text-muted">{business.proprietor}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glow-card aspect-[4/3]"
        >
          <img
            src="https://picsum.photos/id/1074/800/600"
            alt="Inside Shri Ganesh Computer & Studio"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-gradient" />
        </motion.div>
      </div>

      {/* Value cards */}
      <div className="container-page py-4">
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-3 gap-5"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={gridItem}
              whileHover={{ y: -6 }}
              className="card p-6"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-full ${v.bg} ${v.text} mb-4`}>
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-primary-dark mb-2">{v.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats band */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-teal-dark py-14 mt-16">
        <div className="container-page grid grid-cols-2 sm:grid-cols-4 gap-8">
          <StatCounter to={12} suffix="+" label="Years serving locally" />
          <StatCounter to={5000} suffix="+" label="Requests completed" />
          <StatCounter to={14} label="Services offered" />
          <StatCounter to={98} suffix="%" label="Customers who return" />
        </div>
      </div>

      {/* CTA */}
      <div className="container-page py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="glow-card bg-white p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-primary-dark text-xl">Have something you need help with?</h3>
            <p className="text-muted mt-1">We're happy to explain what to bring before you visit.</p>
          </div>
          <Link to="/request-service" className="btn-primary shrink-0 group">
            <span className="flex items-center gap-2">
              Request Service <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}