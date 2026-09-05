import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Copy,
  Phone,
  MessageCircle,
  ClipboardList,
  Sparkles,
} from 'lucide-react';

import { services, business } from '../data/services';
import { enquirySchema } from '../lib/validation';
import { submitEnquiry } from '../lib/api';
import {
  Field,
  Input,
  Select,
  Textarea,
} from '../components/ui/FormFields';
import Button from '../components/ui/Button';
import { heroReveal, heroItem } from '../animations/variants';

export default function RequestService() {
  const [params] = useSearchParams();
  const preselected = params.get('service') || '';

  const [submitState, setSubmitState] = useState('idle');
  const [requestId, setRequestId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      service: preselected,
      message: '',
    },
  });

  const watchedName = watch('name');
  const watchedPhone = watch('phone');
  const watchedService = watch('service');

  const filledCount = [
    watchedName,
    watchedPhone,
    watchedService,
  ].filter(Boolean).length;

  const onSubmit = async (data) => {
    setSubmitState('submitting');
    setErrorMessage('');

    try {
      // ---- REAL API CALL — backend is live ----
      const response = await submitEnquiry(data);
      const generatedRequestId =
        response?.data?.data?.requestId ||
        response?.data?.requestId ||
        response?.data?.data?.id ||
        response?.data?.id;

      if (!generatedRequestId) {
        throw new Error('Request ID was not returned by the server.');
      }

      setRequestId(generatedRequestId);
      setSubmitState('success');
      reset();
    } catch (error) {
      console.error('Enquiry submission failed:', error);
      const apiMessage = error?.response?.data?.error?.message;
      setErrorMessage(apiMessage || 'Something went wrong. Please try again, or call us directly.');
      setSubmitState('error');
    }
  };

  const copyId = async () => {
    if (!requestId) return;

    try {
      await navigator.clipboard.writeText(requestId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to copy request ID:', error);
    }
  };

  if (submitState === 'success') {
    return (
      <div className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute top-20 -right-20 h-72 w-72 rounded-full bg-marigold/20 blur-3xl pointer-events-none" />

        <div className="absolute bottom-20 -left-20 h-72 w-72 rounded-full bg-teal/20 blur-3xl pointer-events-none" />

        <div className="container-page relative py-20 max-w-lg mx-auto text-center">
          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0,
              rotate: -10,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
            }}
            className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-success to-teal-dark flex items-center justify-center shadow-glow"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-2xl md:text-3xl font-extrabold text-primary-dark mt-6"
          >
            Request received!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-muted mt-2"
          >
            We've got your details. Our team will contact you shortly on the
            number you provided.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glow-card bg-white p-5 mt-8 flex items-center justify-between"
          >
            <div className="text-left">
              <p className="text-xs text-muted flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-coral-dark" />
                Your Request ID
              </p>

              <p className="text-xl font-bold text-primary-dark tracking-wide">
                {requestId}
              </p>
            </div>

            <button
              type="button"
              onClick={copyId}
              className="btn-outline h-10 px-3.5"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 mt-8 justify-center"
          >
            
              <a href={`tel:${business.phone}`}
              className="btn-outline"
            >
              <Phone className="h-4 w-4" />
              Call us if urgent
            </a>

            
              <a href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                `Hi, my request ID is ${requestId}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>

            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-marigold/15 blur-3xl pointer-events-none" />

      <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

      <div className="container-page relative py-14 max-w-xl mx-auto">
        <motion.div
          variants={heroReveal}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 text-sm font-semibold text-coral-dark bg-coral-light rounded-full px-4 py-1.5 mb-4"
          >
            <ClipboardList className="h-3.5 w-3.5" />
            Takes under a minute
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="text-3xl font-extrabold text-primary-dark"
          >
            Request a Service
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-muted mt-2 mb-6"
          >
            Share a few details and our team will reach out to help. Fields
            marked with * are required.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex items-center gap-2 mb-8"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < filledCount
                    ? 'bg-gradient-to-r from-marigold to-coral'
                    : 'bg-border'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.4,
          }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="glow-card bg-white"
        >
          <div className="h-1.5 bg-gradient-to-r from-marigold via-coral to-teal" />

          <div className="p-6 space-y-5">
            <Field
              label="Full name"
              htmlFor="name"
              required
              error={errors.name?.message}
            >
              <Input
                id="name"
                placeholder="e.g. Ramesh Patil"
                error={errors.name}
                {...register('name')}
              />
            </Field>

            <Field
              label="Mobile number"
              htmlFor="phone"
              required
              error={errors.phone?.message}
            >
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

            <Field
              label="Service"
              htmlFor="service"
              required
              error={errors.service?.message}
            >
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Select
                    id="service"
                    error={errors.service}
                    {...field}
                  >
                    <option value="">Select a service</option>

                    {services.map((service) => (
                      <option
                        key={service.slug}
                        value={service.slug}
                      >
                        {service.name}
                      </option>
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
              <Textarea
                id="message"
                placeholder="Tell us what you need..."
                error={errors.message}
                {...register('message')}
              />
            </Field>

            <AnimatePresence>
              {submitState === 'error' && (
                <motion.p
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="text-sm text-danger"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="primary"
              loading={submitState === 'submitting'}
              disabled={submitState === 'submitting'}
              className="w-full"
            >
              {submitState === 'submitting'
                ? 'Submitting...'
                : 'Submit Request'}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted pt-1">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Usually responds within the hour
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}