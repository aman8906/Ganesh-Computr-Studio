import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  User,
  ArrowUpRight,
} from 'lucide-react';
import { business } from '../data/services';
import { heroReveal, heroItem } from '../animations/variants';

const contactCards = [
  {
    key: 'call',
    icon: Phone,
    title: 'Call us',
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
    external: false,
    bg: 'bg-primary-light',
    text: 'text-primary',
  },
  {
    key: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Message us anytime',
    href: `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
      'Hi, I would like to know more about your services.'
    )}`,
    external: true,
    bg: 'bg-[#25D366]/10',
    text: 'text-[#25D366]',
  },
];

export default function Contact() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-marigold/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="container-page relative py-14">
        {/* Page Header */}
        <motion.div variants={heroReveal} initial="hidden" animate="show">
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 text-sm font-semibold text-coral-dark bg-coral-light rounded-full px-4 py-1.5 mb-4"
          >
            <MapPin className="h-3.5 w-3.5" />
            Fatehpur, Uttar Pradesh
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="text-3xl md:text-4xl font-extrabold text-primary-dark"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-muted mt-2 text-lg max-w-xl"
          >
            Call, message us on WhatsApp, or visit the center directly —
            whichever is easiest for you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          {/* Left: Contact Cards */}
          <motion.div
            variants={heroReveal}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* Call & WhatsApp */}
            {contactCards.map((c) => (
              <motion.a
                key={c.key}
                variants={heroItem}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="card p-5 flex items-center gap-4 hover:shadow-raised hover:border-marigold/40 transition-all group"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${c.bg} ${c.text} shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <c.icon className="h-5 w-5" />
                </span>

                <div className="flex-1">
                  <p className="font-semibold text-primary-dark">
                    {c.title}
                  </p>
                  <p className="text-muted text-sm">{c.value}</p>
                </div>

                <ArrowUpRight className="h-4 w-4 text-muted opacity-0 group-hover:opacity-100 group-hover:text-coral-dark transition-all" />
              </motion.a>
            ))}

            {/* Visit Us */}
            <motion.div
              variants={heroItem}
              whileHover={{ y: -3 }}
              className="card p-5 flex items-center gap-4 hover:shadow-raised transition-all"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-marigold-light text-marigold-dark shrink-0">
                <MapPin className="h-5 w-5" />
              </span>

              <div>
                <p className="font-semibold text-primary-dark">Visit us</p>
                <p className="text-muted text-sm">{business.address}</p>
                <p className="text-muted text-sm">
                  {business.addressHindi}
                </p>
              </div>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              variants={heroItem}
              whileHover={{ y: -3 }}
              className="card p-5 flex items-center gap-4 hover:shadow-raised transition-all"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-light text-teal-dark shrink-0">
                <Clock className="h-5 w-5" />
              </span>

              <div>
                <p className="font-semibold text-primary-dark">
                  Working hours
                </p>
                <p className="text-muted text-sm">
                  {business.workingHours}
                </p>
              </div>
            </motion.div>

            {/* Proprietor */}
            <motion.div
              variants={heroItem}
              whileHover={{ y: -3 }}
              className="card p-5 flex items-center gap-4 hover:shadow-raised transition-all"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-light text-coral-dark shrink-0">
                <User className="h-5 w-5" />
              </span>

              <div>
                <p className="font-semibold text-primary-dark">
                  Proprietor
                </p>
                <p className="text-muted text-sm">
                  {business.proprietor}
                </p>
              </div>
            </motion.div>

            {/* Enquiry Button */}
            <motion.div variants={heroItem}>
              <Link
                to="/request-service"
                className="btn-primary w-full mt-2"
              >
                Submit an Enquiry Instead
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glow-card min-h-[420px] flex flex-col overflow-hidden"
          >
            <iframe
              title="Shri Ganesh Computer & Studio location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                'Mavai Chauraha, Chhivlaha Road, Fatehpur, Uttar Pradesh'
              )}&z=15&output=embed`}
              className="w-full flex-1 min-h-[350px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Google Maps Link */}
            
             <a href={business.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white p-4 border-t border-border hover:bg-primary-light transition-colors"
            >
              <span className="text-sm font-semibold text-primary-dark">
                Open in Google Maps
              </span>

              <ArrowUpRight className="h-4 w-4 text-coral-dark" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}