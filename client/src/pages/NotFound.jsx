import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="text-3xl font-bold text-primary-dark mt-2">Page not found</h1>
      <p className="text-muted mt-2">The page you're looking for doesn't exist or has moved.</p>
      <div className="flex justify-center gap-3 mt-8">
        <Link to="/" className="btn-primary">Go Home</Link>
        <Link to="/services" className="btn-outline">Browse Services</Link>
      </div>
    </div>
  );
}
