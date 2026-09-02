import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { business } from '../../data/services';
import { drawerVariants, overlayVariants } from '../../animations/variants';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/printing-studio', label: 'Printing & Studio' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-white font-bold">
            SG
          </span>
          <span className="font-semibold text-primary-dark leading-tight text-[15px] hidden sm:block">
            Shri Ganesh<br className="hidden md:block" /> Computer &amp; Studio
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[15px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-ink hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${business.phone}`} className="btn-outline">
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <Link to="/request-service" className="btn-primary">
            Request Service
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-primary-dark"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-raised flex flex-col"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex items-center justify-between h-16 px-5 border-b border-border">
                <span className="font-semibold text-primary-dark">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1 text-ink">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `py-3 text-lg font-medium border-b border-border/60 ${
                        isActive ? 'text-primary' : 'text-ink'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto p-5 flex flex-col gap-3 border-t border-border">
                <a href={`tel:${business.phone}`} className="btn-outline w-full">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <Link to="/request-service" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Request Service
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
