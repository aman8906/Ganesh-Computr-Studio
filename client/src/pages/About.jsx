import { Link } from 'react-router-dom';
import { business } from '../data/services';

const values = [
  { title: 'Clear communication', desc: 'We tell you exactly what a service does — and doesn\u2019t — cover.' },
  { title: 'Minimum data collected', desc: 'We only ever ask for what\u2019s needed to help you, nothing more.' },
  { title: 'Neighbourhood trust', desc: 'Built over years of serving the same families and local businesses.' },
];

export default function About() {
  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark">About {business.name}</h1>
        <p className="text-lg text-ink/80 mt-4 leading-relaxed">{business.description}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mt-12">
        {values.map((v) => (
          <div key={v.title} className="card p-5">
            <h3 className="font-semibold text-primary-dark mb-2">{v.title}</h3>
            <p className="text-muted text-[15px]">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="card p-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h3 className="font-semibold text-primary-dark text-lg">Have something you need help with?</h3>
          <p className="text-muted mt-1">We're happy to explain what to bring before you visit.</p>
        </div>
        <Link to="/request-service" className="btn-primary shrink-0">Request Service</Link>
      </div>
    </div>
  );
}
