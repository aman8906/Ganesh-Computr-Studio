import 'dotenv/config';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';

import ServiceCategory from '../models/ServiceCategory.js';
import Service from '../models/Service.js';
import Business from '../models/Business.js';
import User from '../models/User.js';

// Mirrors client/src/data/services.js and categoryImages.js exactly, so the
// database starts out identical to what the frontend currently shows as mock data.
const categories = [
  { slug: 'govt-documentation', name: 'Government & Documentation', sortOrder: 1 },
  { slug: 'pension-welfare', name: 'Pension & Welfare Schemes', sortOrder: 2 },
  { slug: 'banking-services', name: 'Banking & Bill Payment', sortOrder: 3 },
  { slug: 'printing', name: 'Printing & Documentation', sortOrder: 4 },
  { slug: 'photography', name: 'Photography', sortOrder: 5 },
  { slug: 'designing-cards', name: 'Designing & Cards', sortOrder: 6 },
  { slug: 'other-digital', name: 'Other Digital Services', sortOrder: 7 },
];

const categoryImages = {
  'govt-documentation': 'https://picsum.photos/id/24/800/1000',
  'pension-welfare': 'https://picsum.photos/id/342/800/1000',
  'banking-services': 'https://picsum.photos/id/1/800/1000',
  printing: 'https://picsum.photos/id/48/800/1000',
  photography: 'https://picsum.photos/id/250/800/1000',
  'designing-cards': 'https://picsum.photos/id/1048/800/1000',
  'other-digital': 'https://picsum.photos/id/96/800/1000',
};

const services = [
  // Government & Documentation
  { slug: 'aadhaar-assistance', name: 'Aadhaar Card Assistance', category: 'govt-documentation', shortDescription: 'Help with new Aadhaar enrolment, print, corrections and updates.', description: 'We guide you through Aadhaar enrolment, printing, and correction — filling the form correctly, organising your supporting documents and booking your slot. We assist with the process; we do not issue the Aadhaar card ourselves.', requirements: 'Proof of identity, proof of address, recent photograph.', turnaround: 'Same day filing; issuance timeline set by UIDAI.' },
  { slug: 'pan-card-assistance', name: 'PAN Card Assistance', category: 'govt-documentation', shortDescription: 'Support with new PAN applications and correction forms.', description: 'Bring your identity and address proof and we will help you complete a new PAN application or a correction request accurately, reducing the chance of rejection.', requirements: 'Identity proof, address proof, photograph.', turnaround: 'Filed same day; PAN issued by the department.' },
  { slug: 'voter-id-assistance', name: 'Voter ID Assistance', category: 'govt-documentation', shortDescription: 'Help with new voter registration and detail corrections.', description: 'We help you fill the correct election-commission form for new registration, address change or correction.', requirements: 'Age and address proof, photograph.', turnaround: 'Filed same day; approval timeline set by the Election Commission.' },
  { slug: 'passport-assistance', name: 'Passport Application Assistance', category: 'govt-documentation', shortDescription: 'Guidance for fresh and renewal passport applications.', description: 'We help you complete the online passport application form and prepare your document checklist before your appointment.', requirements: 'Identity proof, address proof, birth proof, photographs.', turnaround: 'Form filing same day; appointment scheduled via official portal.' },
  { slug: 'ration-card', name: 'Ration Card Assistance', category: 'govt-documentation', shortDescription: 'New ration card applications and member updates.', description: 'Help with new ration card applications, adding or removing family members, and correcting existing details.', requirements: 'Family ID/address proof, Aadhaar of members.', turnaround: 'Same day filing.' },
  { slug: 'caste-residence-certificate', name: 'Caste & Residence Certificate', category: 'govt-documentation', shortDescription: 'Assistance preparing caste and residence certificate applications.', description: 'We help you fill and submit caste (jati) and residence (nivas) certificate applications with the correct supporting documents.', requirements: 'Identity proof, address proof, relevant caste documents.', turnaround: 'Same day filing.' },
  { slug: 'income-certificate', name: 'Income Certificate', category: 'govt-documentation', shortDescription: 'Help applying for an income certificate.', description: 'Assistance completing income certificate applications, commonly needed for scholarships, admissions and welfare schemes.', requirements: 'Identity proof, address proof, income-related documents if available.', turnaround: 'Same day filing.' },
  { slug: 'driving-licence-form', name: 'Driving Licence Form Assistance', category: 'govt-documentation', shortDescription: 'Help filling learner and permanent driving licence forms.', description: 'We help you complete the online driving licence application form correctly before you visit the RTO.', requirements: 'Identity proof, address proof, age proof.', turnaround: 'Same day filing.' },

  // Pension & Welfare
  { slug: 'e-shram-card', name: 'e-Shram Card Registration', category: 'pension-welfare', shortDescription: 'Registration on the e-Shram portal for unorganised workers.', description: 'We help unorganised sector workers register on the e-Shram portal and obtain their e-Shram card.', requirements: 'Aadhaar card, mobile number linked to Aadhaar, bank account details.', turnaround: 'Same day.' },
  { slug: 'widow-pension', name: 'Widow Pension (Vidhwa Pension)', category: 'pension-welfare', shortDescription: 'Assistance applying for widow pension scheme.', description: 'Help completing the widow pension application with the correct supporting documents.', requirements: "Identity proof, address proof, husband's death certificate.", turnaround: 'Same day filing.' },
  { slug: 'old-age-pension', name: 'Old Age Pension (Vridha Pension)', category: 'pension-welfare', shortDescription: 'Assistance applying for the old-age pension scheme.', description: 'Help completing old-age pension applications for eligible senior citizens.', requirements: 'Age proof, identity proof, address proof.', turnaround: 'Same day filing.' },
  { slug: 'disability-pension', name: 'Divyang (Disability) Pension', category: 'pension-welfare', shortDescription: 'Assistance applying for the disability pension scheme.', description: 'Help completing disability pension applications along with the required medical certification.', requirements: 'Disability certificate, identity proof, address proof.', turnaround: 'Same day filing.' },

  // Banking & Bill Payment
  { slug: 'aeps-banking', name: 'Bank Cash Deposit & Withdrawal (AEPS)', category: 'banking-services', shortDescription: 'Aadhaar-enabled cash deposit and withdrawal for all major banks.', description: 'Deposit or withdraw cash from your bank account using Aadhaar-based authentication — no need to visit your bank branch.', requirements: 'Aadhaar-linked bank account, Aadhaar number.', turnaround: 'Instant.' },
  { slug: 'lic-assistance', name: 'LIC Premium Deposit & Withdrawal', category: 'banking-services', shortDescription: 'Help with LIC premium payments, receipts and related paperwork.', description: 'Support with LIC premium payment/deposit, withdrawal-related forms and general policy documentation.', requirements: 'Policy number, relevant identity documents.', turnaround: 'Same day.' },
  { slug: 'electricity-bill-payment', name: 'Electricity Bill Payment', category: 'banking-services', shortDescription: 'Quick electricity bill payment support.', description: 'Pay your electricity bill at the counter without needing to use an app or visit the office.', requirements: 'Bill/consumer number.', turnaround: 'Instant.' },
  { slug: 'vehicle-challan-payment', name: 'Vehicle Challan Payment', category: 'banking-services', shortDescription: 'Pay pending traffic challans at the counter.', description: 'We help you look up and pay pending vehicle challans (traffic fines) online.', requirements: 'Vehicle number or challan number.', turnaround: 'Instant.' },
  { slug: 'vehicle-insurance', name: 'Vehicle Insurance', category: 'banking-services', shortDescription: 'Assistance with two-wheeler and four-wheeler insurance.', description: 'Help comparing and purchasing vehicle insurance policies for two-wheelers and four-wheelers.', requirements: 'Vehicle RC, identity proof.', turnaround: 'Same day.' },

  // Printing & Documentation
  { slug: 'printing-photocopy', name: 'Printing & Photocopy', category: 'printing', shortDescription: 'Colour and B&W printing, photocopying and lamination.', description: 'Fast, affordable colour and black-and-white printing, photocopying, scanning and lamination for documents of all kinds.', requirements: 'Bring your file (USB/email) or physical document.', turnaround: 'While you wait.' },
  { slug: 'document-scanning', name: 'Document Scanning & Preparation', category: 'printing', shortDescription: 'Scan, format and prepare documents for online submission.', description: 'We scan physical documents and prepare them in the correct size and format required for online forms and applications.', requirements: 'Original documents.', turnaround: 'Usually same day.' },
  { slug: 'banner-poster-printing', name: 'Banner & Poster Printing', category: 'printing', shortDescription: 'Custom banners and posters for shops and events.', description: 'Design and print banners and posters in various sizes for shops, events and celebrations.', requirements: 'Text/logo/photo content for the banner; size preference.', turnaround: '1–2 days.' },
  { slug: 'cup-tshirt-printing', name: 'Cup & T-Shirt Printing', category: 'printing', shortDescription: 'Custom photo printing on cups and T-shirts.', description: 'Personalised photo or text printing on cups and T-shirts — popular for gifts and events.', requirements: 'Digital photo/design file.', turnaround: 'Same day to 1 day.' },

  // Photography
  { slug: 'passport-photo', name: 'Passport-Size & Urgent Photography', category: 'photography', shortDescription: 'Passport, ID-size and urgent photographs printed on the spot.', description: 'Studio-quality passport, ID-size and urgent photographs, printed immediately in the size your application needs.', requirements: 'None — just visit the studio.', turnaround: '10–15 minutes.' },
  { slug: 'photo-printing', name: 'Photo Printing', category: 'photography', shortDescription: 'High-quality photo prints in multiple sizes.', description: 'Send us your photos and choose from standard print sizes for albums, frames or keepsakes.', requirements: 'Digital photo files (USB, email, or WhatsApp).', turnaround: 'Same day for standard orders.' },

  // Designing & Cards
  { slug: 'wedding-cards', name: 'Wedding & Invitation Cards', category: 'designing-cards', shortDescription: 'Custom wedding and event invitation card design and printing.', description: 'Personalised wedding and event invitation card designs, from concept to final printed cards.', requirements: 'Event details and wording; reference designs if you have any.', turnaround: '2–4 days depending on quantity.' },
  { slug: 'visiting-cards', name: 'Visiting Card Design', category: 'designing-cards', shortDescription: 'Professional visiting/business card design and printing.', description: 'Clean, professional visiting card designs printed on quality card stock for individuals and businesses.', requirements: 'Name, contact details and business info.', turnaround: '1–2 days.' },
  { slug: 'wedding-decoration', name: 'Wedding & Vehicle Decoration', category: 'designing-cards', shortDescription: "Jaimal stage and groom's vehicle decoration for weddings.", description: 'Decoration for the jaimal (garland ceremony) stage and the groom\'s vehicle for weddings and other auspicious occasions.', requirements: 'Event date, venue and decoration preference.', turnaround: 'Booked in advance of the event date.' },

  // Other Digital Services
  { slug: 'mobile-recharge', name: 'Mobile Recharge', category: 'other-digital', shortDescription: 'Prepaid mobile recharge for all major operators.', description: 'Quick prepaid mobile recharge for all major telecom operators.', requirements: 'Mobile number.', turnaround: 'Instant.' },
  { slug: 'online-form-filling', name: 'Online Form Filling', category: 'other-digital', shortDescription: 'Help with government and general online forms.', description: 'We help you complete common online forms accurately — from scholarship forms to job applications.', requirements: 'Relevant personal details and documents.', turnaround: 'Same day.' },
];

const businessData = {
  name: 'Shri Ganesh Computer & Studio',
  tagline: 'लैमिनेशन, अर्जेंट फोटो, फोटो कॉपी, मोबाइल रिचार्ज और सभी सरकारी सेवाओं में सहायता',
  phone: '+918286130690',
  whatsapp: '918286130690',
  address: 'Mavai Chauraha, Chhivlaha Road, Fatehpur, Uttar Pradesh',
  addressHindi: 'मवई चौराहा, छिवलहा रोड, फतेहपुर',
  proprietor: 'Prop. Moolchandra Chaurasiya',
  workingHours: 'Mon–Sat, 9:00 AM – 8:30 PM · Sun, 10:00 AM – 2:00 PM',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mavai+Chauraha+Chhivlaha+Road+Fatehpur+Uttar+Pradesh',
  description:
    'Shri Ganesh Computer & Studio has been helping local residents of Fatehpur with documentation assistance (Aadhaar, PAN, Voter ID, ration card, pension schemes and more), banking services, printing, photography and card design for years. We keep things simple, honest and fast — so you can get in, get help, and get on with your day.',
};

async function seed() {
  await connectDB();
  console.log('[seed] Connected. Seeding...');

  // Categories
  const categoryMap = {};
  for (const cat of categories) {
    const doc = await ServiceCategory.findOneAndUpdate(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true, new: true }
    );
    categoryMap[cat.slug] = doc._id;
  }
  console.log(`[seed] Upserted ${categories.length} categories.`);

  // Services
  let serviceCount = 0;
  for (const svc of services) {
    const { category, ...rest } = svc;
    await Service.findOneAndUpdate(
      { slug: svc.slug },
      { $set: { ...rest, category: categoryMap[category], image: categoryImages[category], isActive: true } },
      { upsert: true, new: true }
    );
    serviceCount++;
  }
  console.log(`[seed] Upserted ${serviceCount} services.`);

  // Business profile (singleton)
  await Business.findOneAndUpdate({}, { $set: businessData }, { upsert: true });
  console.log('[seed] Business profile set.');

  // Default admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const passwordHash = await User.hashPassword(adminPassword);
      await User.create({
        name: process.env.SEED_ADMIN_NAME || 'Admin',
        email: adminEmail,
        passwordHash,
        role: 'admin',
        status: 'active',
      });
      console.log(`[seed] Created admin user: ${adminEmail}`);
      console.log('[seed] IMPORTANT: change this password after first login.');
    } else {
      console.log(`[seed] Admin user already exists: ${adminEmail}`);
    }
  } else {
    console.log('[seed] SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipped admin creation.');
  }

  console.log('[seed] Done.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
