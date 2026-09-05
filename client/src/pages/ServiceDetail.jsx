import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Clock,
  FileText,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { services, categories, business } from '../data/services';
import { categoryVisuals } from '../data/categoryImages';
import { heroReveal, heroItem } from '../animations/variants';

export default function ServiceDetail() {
  const { slug } = useParams();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const category = categories.find((c) => c.slug === service.category);
  const visual = categoryVisuals[service.category];

  const related = services
    .filter(
      (s) =>
        s.category === service.category &&
        s.slug !== service.slug
    )
    .slice(0, 3);

  const isGovtService = service.category === 'govt-documentation';

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-marigold/10 blur-3xl pointer-events-none" />
      <div className="absolute top-96 -left-32 h-80 w-80 rounded-full bg-teal/10 blur-3xl pointer-events-none" />

      {/* Image Banner */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <motion.img
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={visual?.image}
          alt={service.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-ink-gradient" />

        <div className="container-page relative h-full flex flex-col justify-end pb-6">
          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-white/80 mb-2"
          >
            <Link
              to="/services"
              className="hover:text-white transition-colors"
            >
              Services
            </Link>

            <span className="mx-1.5">/</span>

            {category?.name}
          </motion.p>

          {/* Service Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg max-w-2xl"
          >
            {service.name}
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-page relative py-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left Content */}
          <motion.div
            variants={heroReveal}
            initial="hidden"
            animate="show"
            className="lg:col-span-2"
          >
            {/* Description */}
            <motion.p
              variants={heroItem}
              className="text-lg text-ink/80 leading-relaxed"
            >
              {service.description}
            </motion.p>

            {/* Government Service Disclaimer */}
            {isGovtService && (
              <motion.div
                variants={heroItem}
                className="mt-6 flex gap-3 rounded-lg border border-warning/30 bg-warning/10 p-4"
              >
                <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />

                <p className="text-sm text-ink/85">
                  We assist with this application process. We are not a
                  government office and do not issue official documents
                  ourselves — final issuance is handled by the relevant
                  government department.
                </p>
              </motion.div>
            )}

            {/* Requirements + Time */}
            <motion.div
              variants={heroItem}
              className="mt-8 grid sm:grid-cols-2 gap-5"
            >
              {/* Requirements */}
              <motion.div
                whileHover={{ y: -4, rotateX: 2 }}
                style={{ transformPerspective: 800 }}
                className="card p-5 hover:shadow-raised hover:border-marigold/40 transition-shadow"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-marigold-light text-marigold-dark">
                    <FileText className="h-4 w-4" />
                  </span>

                  <h3 className="font-semibold text-primary-dark text-sm">
                    What to bring
                  </h3>
                </div>

                <p className="text-[15px] text-ink/80">
                  {service.requirements}
                </p>
              </motion.div>

              {/* Turnaround */}
              <motion.div
                whileHover={{ y: -4, rotateX: 2 }}
                style={{ transformPerspective: 800 }}
                className="card p-5 hover:shadow-raised hover:border-teal/40 transition-shadow"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-light text-teal-dark">
                    <Clock className="h-4 w-4" />
                  </span>

                  <h3 className="font-semibold text-primary-dark text-sm">
                    Estimated time
                  </h3>
                </div>

                <p className="text-[15px] text-ink/80">
                  {service.turnaround}
                </p>
              </motion.div>
            </motion.div>

            {/* Related Services */}
            {related.length > 0 && (
              <motion.div
                variants={heroItem}
                className="mt-12"
              >
                <h3 className="font-semibold text-primary-dark mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-coral-dark" />
                  Related services
                </h3>

                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <motion.div
                      key={r.slug}
                      whileHover={{ y: -4 }}
                    >
                      <Link
                        to={`/services/${r.slug}`}
                        className="group relative block h-32 rounded-lg overflow-hidden glow-card"
                      >
                        <img
                          src={categoryVisuals[r.category]?.image}
                          alt={r.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-ink-gradient" />

                        <div className="absolute inset-0 p-3 flex flex-col justify-end">
                          <p className="text-white text-sm font-semibold leading-tight">
                            {r.name}
                          </p>

                          <span className="text-white/70 text-xs flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                            View
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Sticky CTA Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="glow-card sticky top-24 bg-white">

              {/* Gradient Top Border */}
              <div className="h-2 bg-gradient-to-r from-marigold via-coral to-teal" />

              <div className="p-6">
                <p className="text-sm font-semibold text-muted mb-4">
                  Ready to get started?
                </p>

                {/* Request Service */}
                <Link
                  to={`/request-service?service=${service.slug}`}
                  className="btn-primary w-full mb-3 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request Service

                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                {/* Call Now */}
                <a
                  href={`tel:${business.phone}`}
                  className="btn w-full mb-3 border-2 border-primary-dark text-primary-dark bg-white hover:bg-primary-dark hover:text-white transition-colors duration-300"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                    `Hi, I'd like to know more about ${service.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full bg-[#25D366] text-white hover:bg-[#1DA851] transition-colors duration-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>

                {/* Response Time */}
                <div className="mt-5 pt-5 border-t border-border flex items-center gap-2 text-xs text-muted">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Usually responds within the hour
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}