import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { business, categories } from '../../data/services';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-24">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-primary-dark font-bold">
              SG
            </span>
            <span className="font-semibold">Shri Ganesh Computer &amp; Studio</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Documentation assistance, printing, photography and card designing — done right, close to home.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white/90">Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link to={`/services?category=${c.slug}`} className="hover:text-white transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white/90">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link to="/request-service" className="hover:text-white transition-colors">Request a Service</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white/90">Reach Us</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" />
              <a href={`tel:${business.phone}`} className="hover:text-white transition-colors">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                WhatsApp Us
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{business.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{business.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Shri Ganesh Computer &amp; Studio. All rights reserved.</span>
          <span>We assist with government-related paperwork — we are not a government office.</span>
        </div>
      </div>
    </footer>
  );
}
