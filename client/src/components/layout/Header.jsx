
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { business } from "../../data/services";
import {
  drawerVariants,
  overlayVariants,
} from "../../animations/variants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/printing-studio", label: "Printing & Studio" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-marigold via-coral to-teal" />

      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_4px_20px_-8px_rgba(18,53,91,0.25)] border-border"
            : "border-transparent"
        }`}
      >
        <div className="container-page flex items-center justify-between min-h-[76px]">
          
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 py-1"
            onClick={() => setOpen(false)}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="h-16 w-16 flex items-center justify-center shrink-0"
            >
              <img
                src="/logo.png"
                alt="Shri Ganesh Computer & Studio"
                className="h-full w-full object-contain"
              />
            </motion.div>

            <span className="font-bold text-primary-dark leading-tight text-[15px] hidden sm:block">
              Shri Ganesh
              <br />
              <span className="font-semibold">
                Computer &amp; Studio
              </span>
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-[15px] font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-primary-dark"
                      : "text-ink/70 hover:text-primary-dark hover:bg-surface"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-marigold to-coral"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${business.phone}`}
              className="btn-outline"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <Link
              to="/request-service"
              className="btn-primary"
            >
              <Sparkles className="h-4 w-4" />
              Request Service
            </Link>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 -mr-2 text-primary-dark"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay */}
              <motion.div
                key="overlay"
                className="fixed inset-0 bg-primary-dark/50 backdrop-blur-sm z-40 lg:hidden"
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                key="drawer"
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-raised flex flex-col"
                variants={drawerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/* Gradient */}
                <div className="h-1 w-full bg-gradient-to-r from-marigold via-coral to-teal" />

                {/* Mobile Header */}
                <div className="flex items-center justify-between min-h-[76px] px-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 flex items-center justify-center">
                      <img
                        src="/logo.png"
                        alt="Shri Ganesh Computer & Studio"
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <span className="font-bold text-primary-dark">
                      Menu
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="p-1.5 text-ink hover:text-coral-dark transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col p-5 gap-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `py-3.5 px-3 text-lg font-medium rounded-lg transition-all flex items-center gap-3 ${
                          isActive
                            ? "bg-gradient-to-r from-marigold-light to-coral-light text-primary-dark"
                            : "text-ink hover:bg-surface"
                        }`
                      }
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-coral shrink-0" />
                      {link.label}
                    </NavLink>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="mt-auto p-5 flex flex-col gap-3 border-t border-border">
                  <a
                    href={`tel:${business.phone}`}
                    className="btn-outline w-full"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>

                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>

                  <Link
                    to="/request-service"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    <Sparkles className="h-4 w-4" />
                    Request Service
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

