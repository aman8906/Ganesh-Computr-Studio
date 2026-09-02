import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, Phone } from 'lucide-react';
import { services, business } from '../data/services';
import { enquirySchema } from '../lib/validation';
import { submitEnquiry } from '../lib/api';
import { Field, Input, Select, Textarea } from '../components/ui/FormFields';
import Button from '../components/ui/Button';

export default function RequestService() {
  const [params] = useSearchParams();
  const preselected = params.get('service') || '';
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | success | error
  const [requestId, setRequestId] = useState(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: '', phone: '', service: preselected, message: '' },
  });

  const onSubmit = async (data) => {
    setSubmitState('submitting');
    try {
      // Backend not connected yet — swap this for a real call once the API is live:
      // const res = await submitEnquiry(data);
      // setRequestId(res.data.id);
      await new Promise((r) => setTimeout(r, 700));
      setRequestId(`SG-${Date.now().toString().slice(-6)}`);
      setSubmitState('success');
      reset();
    } catch (err) {
      setSubmitState('error');
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (submitState === 'success') {
    return (
      <div className="container-page py-20 max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <CheckCircle2 className="h-16 w-16 text-success mx-auto" />
        </motion.div>
        <h1 className="text-2xl font-bold text-primary-dark mt-5">Request received</h1>
        <p className="text-muted mt-2">
          We've got your details. Our team will contact you shortly on the number you provided.
        </p>

        <div className="card p-5 mt-8 flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs text-muted">Your Request ID</p>
            <p className="text-lg font-semibold text-primary-dark">{requestId}</p>
          </div>
          <button onClick={copyId} className="btn-outline h-10 px-3.5">
            <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
          <a href={`tel:${business.phone}`} className="btn-outline">
            <Phone className="h-4 w-4" /> Call us if urgent
          </a>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-dark">Request a Service</h1>
      <p className="text-muted mt-2 mb-8">
        Share a few details and our team will reach out to help. Fields marked with * are required.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6 space-y-5">
        <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" placeholder="e.g. Ramesh Patil" error={errors.name} {...register('name')} />
        </Field>

        <Field label="Mobile number" htmlFor="phone" required error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            error={errors.phone}
            {...register('phone')}
          />
        </Field>

        <Field label="Service" htmlFor="service" required error={errors.service?.message}>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <Select id="service" error={errors.service} {...field}>
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
                <option value="other">Other</option>
              </Select>
            )}
          />
        </Field>

        <Field
          label="Message"
          htmlFor="message"
          error={errors.message?.message}
          hint="Optional — tell us anything that will help us assist you faster."
        >
          <Textarea id="message" placeholder="Tell us what you need..." error={errors.message} {...register('message')} />
        </Field>

        <AnimatePresence>
          {submitState === 'error' && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-danger"
            >
              Something went wrong. Please try again, or call us directly.
            </motion.p>
          )}
        </AnimatePresence>

        <Button type="submit" variant="primary" loading={isSubmitting} className="w-full">
          Submit Request
        </Button>
      </form>
    </div>
  );
}
