import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
} from 'lucide-react';

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from 'react-icons/fa';

import { business, categories } from '../../data/services';
import { staggerGrid, gridItem } from '../../animations/variants';

const socialLinks = [
  {
    icon: FaFacebookF,
    href: 'https://facebook.com',
    label: 'Facebook',
    hover: 'hover:bg-[#1877F2]',
  },
  {
    icon: FaInstagram,
    href: 'https://instagram.com',
    label: 'Instagram',
    hover:
      'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]',
  },
  {
    icon: FaYoutube,
    href: 'https://youtube.com',
    label: 'YouTube',
    hover: 'hover:bg-[#FF0000]',
  },
  {
    icon: FaTwitter,
    href: 'https://twitter.com',
    label: 'Twitter / X',
    hover: 'hover:bg-black',
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white mt-24">
      {/* Background Decorations */}
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-marigold/10 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-marigold via-coral to-teal" />

      {/* Footer Content */}
      <motion.div
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container-page relative py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand */}
        <motion.div variants={gridItem}>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-marigold to-coral text-white font-bold shadow-glow">
              SG
            </span>

            <span className="font-semibold">
              Shri Ganesh Computer &amp; Studio
            </span>
          </div>

          <p className="text-sm text-white/70 leading-relaxed mb-5">
            Documentation assistance, printing, photography and card
            designing — done right, close to home.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((s) => {
              const Icon = s.icon;

              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white transition-all duration-300 ${s.hover}`}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div variants={gridItem}>
          <h4 className="font-semibold mb-3 text-marigold">
            Services
          </h4>

          <ul className="space-y-2 text-sm text-white/70">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/services?category=${c.slug}`}
                  className="hover:text-white hover:pl-1 transition-all duration-200"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={gridItem}>
          <h4 className="font-semibold mb-3 text-coral">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link
                to="/about"
                className="hover:text-white hover:pl-1 transition-all duration-200"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/gallery"
                className="hover:text-white hover:pl-1 transition-all duration-200"
              >
                Gallery
              </Link>
            </li>

            <li>
              <Link
                to="/request-service"
                className="hover:text-white hover:pl-1 transition-all duration-200"
              >
                Request a Service
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-white hover:pl-1 transition-all duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Reach Us */}
        <motion.div variants={gridItem}>
          <h4 className="font-semibold mb-3 text-teal">
            Reach Us
          </h4>

          <ul className="space-y-3 text-sm text-white/70">
            {/* Phone */}
            <li className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 shrink-0 mt-0.5">
                <Phone className="h-3.5 w-3.5" />
              </span>

              <a
                href={`tel:${business.phone}`}
                className="hover:text-white transition-colors pt-1"
              >
                {business.phoneDisplay}
              </a>
            </li>

            {/* WhatsApp */}
            <li className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 shrink-0 mt-0.5">
                <MessageCircle className="h-3.5 w-3.5" />
              </span>

              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors pt-1"
              >
                WhatsApp Us
              </a>
            </li>

            {/* Address */}
            <li className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 shrink-0 mt-0.5">
                <MapPin className="h-3.5 w-3.5" />
              </span>

              <span className="pt-1">
                {business.address}
              </span>
            </li>

            {/* Working Hours */}
            <li className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 shrink-0 mt-0.5">
                <Clock className="h-3.5 w-3.5" />
              </span>

              <span className="pt-1">
                {business.workingHours}
              </span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <div className="relative border-t border-white/10 py-5">
        <div className="container-page flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} Shri Ganesh Computer &amp; Studio.
            All rights reserved.
          </span>

          <span className="text-center">
            We assist with government-related paperwork — we are not a
            government office.
          </span>
        </div>
      </div>
    </footer>
  );
}