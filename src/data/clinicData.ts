export interface ServiceItem {
  id: string;
  category: 'cosmetic' | 'implants' | 'restorative' | 'wellness' | 'emergency';
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  duration: string;
  recovery: string;
  bestFor: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google' | 'Zocdoc' | 'Verified Patient';
  date: string;
  treatment: string;
  quote: string;
  rating: number;
}

export const CLINIC_INFO = {
  name: "My Dentist of Fort Lauderdale",
  shortName: "My Dentist FTL",
  tagline: "Uncompromising Dental Artistry & Gentle Family Care",
  leadDentist: {
    name: "Dr. Zelka Licina, DDS",
    title: "Lead Cosmetic & Restorative Dentist",
    credentials: [
      "Doctor of Dental Surgery (DDS) — New York University College of Dentistry",
      "General Practice Residency (GPR) — Columbia University College of Dental Medicine",
      "Member — American Dental Association (ADA)",
      "Member — Florida Dental Association (FDA)",
      "Certified Provider — Clear Aligners & Digital Smile Design"
    ],
    bio: "Dr. Zelka Licina brings prestigious training from New York University and Columbia University to East Fort Lauderdale. Renowned for her remarkably gentle touch and calm demeanor, Dr. Licina believes dental care should feel restorative rather than clinical. She pairs advanced 3D intraoral digital imaging with an artist's eye for dental aesthetics, ensuring every patient enjoys a relaxed, comfortable, and tailored visit."
  },
  contact: {
    phone: "(954) 408-9282",
    phoneRaw: "+19544089282",
    email: "care@mydentistftl.com",
    address: {
      street: "2500 E Oakland Park Blvd",
      city: "Fort Lauderdale",
      state: "FL",
      zip: "33306",
      neighborhood: "East Fort Lauderdale / Coral Ridge"
    },
    googleMapsUrl: "https://maps.google.com/?q=2500+E+Oakland+Park+Blvd,+Fort+Lauderdale,+FL+33306"
  },
  hours: [
    { day: "Monday", hours: "8:00 AM – 5:00 PM", isOpen: true },
    { day: "Tuesday", hours: "8:00 AM – 5:00 PM", isOpen: true },
    { day: "Wednesday", hours: "10:00 AM – 7:00 PM (Late Hours)", isOpen: true },
    { day: "Thursday", hours: "8:00 AM – 5:00 PM", isOpen: true },
    { day: "Friday", hours: "8:00 AM – 3:00 PM", isOpen: true },
    { day: "Saturday", hours: "8:00 AM – 3:00 PM (Weekend Care)", isOpen: true },
    { day: "Sunday", hours: "Closed (Emergency On-Call)", isOpen: false }
  ],
  membership: {
    title: "My Dental Membership Plan",
    tagline: "High-tier dental wellness without insurance headaches.",
    annualAdult: "$379 / year",
    annualChild: "$299 / year",
    features: [
      "2 Comprehensive Dental Examinations & Oral Cancer Screenings",
      "2 Professional Dental Cleanings (Prophylaxis)",
      "All Routine Low-Dose Digital X-Rays & 3D Intraoral Scans",
      "25% Discount on ALL Cosmetic, Restorative & Implant Treatments",
      "Zero Deductibles, Zero Maximums, and Zero Waiting Periods",
      "Complimentary Emergency Exam & Consultation per Year"
    ]
  },
  financing: [
    {
      provider: "CareCredit",
      headline: "Up to 24 Months Deferred Interest",
      details: "Convenient monthly payments with zero upfront costs and instant online pre-approval."
    },
    {
      provider: "Cherry",
      headline: "Fast Approval with Soft Credit Check",
      details: "Split treatments into budget-friendly monthly installments without affecting your credit score."
    },
    {
      provider: "Alphaeon Credit",
      headline: "Specialized Aesthetic Dental Financing",
      details: "Tailored for cosmetic smile makeovers, porcelain veneers, and dental implant therapy."
    }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: "cosmetic-veneers",
    category: "cosmetic",
    title: "Porcelain Veneers & Smile Makeovers",
    tagline: "Individually handcrafted ceramic shells for natural, luminous symmetry.",
    description: "Dr. Licina custom designs ultrathin porcelain veneers that bond seamlessly to your natural teeth, correcting chips, deep discoloration, gaps, or uneven edges with lifelike translucency.",
    benefits: [
      "Custom shade matching to your natural skin tone and facial structure",
      "Stain-resistant high-density ceramic material",
      "Minimal enamel preparation preserving natural tooth structure",
      "Long-lasting aesthetics with proper routine oral care"
    ],
    duration: "2 visits across 2–3 weeks",
    recovery: "Immediate; minimal sensitivity for 24–48 hours",
    bestFor: "Patients seeking permanent correction of discoloration, gaps, or misaligned tooth edges."
  },
  {
    id: "dental-implants",
    category: "implants",
    title: "Dental Implants & Fixed Restorations",
    tagline: "Permanent, bio-integrated titanium foundations for missing teeth.",
    description: "Replace one or more missing teeth with medical-grade titanium implants topped by custom porcelain crowns. Experience full biting power and preserve underlying jawbone health without altering adjacent teeth.",
    benefits: [
      "Prevents bone resorption and facial sagging after tooth loss",
      "Functions and feels exactly like natural permanent teeth",
      "Complimentary initial 3D digital implant consultation included",
      "Over 98% clinical success rate in healthy candidates"
    ],
    duration: "Consultation + 3–4 month osseointegration & crown placement",
    recovery: "2–3 days mild rest; minimal post-operative discomfort",
    bestFor: "Adults with single or multiple missing teeth seeking permanent non-removable stability."
  },
  {
    id: "clear-aligners",
    category: "cosmetic",
    title: "Clear Aligners & Invisible Orthodontics",
    tagline: "Straighten your smile discreetly without brackets or metal wires.",
    description: "Using digital 3D intraoral scans, Dr. Licina maps a computerized series of custom, transparent aligner trays that gently shift your teeth into proper harmony with minimal disruption to your daily lifestyle.",
    benefits: [
      "Virtually invisible aligners crafted from medical-grade BPA-free plastic",
      "Removable for effortless eating, brushing, and flossing",
      "Fewer office visits with digital tracking milestones",
      "Gentle, calibrated forces reducing soreness compared to metal braces"
    ],
    duration: "6 to 18 months depending on case complexity",
    recovery: "Zero downtime; trays are worn 20–22 hours daily",
    bestFor: "Teens and adults with crowded teeth, mild bite issues, or relapse from prior braces."
  },
  {
    id: "preventive-wellness",
    category: "wellness",
    title: "Comprehensive Hygiene & 3D Diagnostics",
    tagline: "Gentle ultrasonic care paired with modern low-radiation imaging.",
    description: "Prevention is the cornerstone of our practice. Our comprehensive exams include painless ultrasonic scaling, high-definition intraoral digital scanning, oral cancer screening, and thorough periodontal assessments.",
    benefits: [
      "Ultrasonic cavitron cleanings that dissolve plaque painlessly",
      "No messy impression goo — digital wand captures exact 3D models",
      "Low-radiation digital sensor technology for maximum safety",
      "Personalized preventive coaching tailored to your oral microbiome"
    ],
    duration: "45–60 minutes per visit",
    recovery: "Immediate; leave with a fresh, polished smile",
    bestFor: "Every individual and family member twice yearly for lifelong oral wellness."
  },
  {
    id: "tmj-botox",
    category: "wellness",
    title: "Therapeutic Botox & TMJ Jaw Relief",
    tagline: "Targeted neuromodulator therapy for clenching, bruxism, and migraines.",
    description: "Dr. Licina provides therapeutic neuromodulator injections directly into overactive masseter and temporalis muscles to alleviate tension headaches, jaw popping, nighttime grinding, and facial discomfort.",
    benefits: [
      "Substantial reduction in jaw clenching and chronic tension headaches",
      "Protects teeth from fractures and premature enamel wear",
      "Slims enlarged masseter muscles for a softer lower jaw contour",
      "Quick 15-minute in-office procedure with no downtime"
    ],
    duration: "15–20 minutes",
    recovery: "Immediate; results appear within 5–10 days and last 4–6 months",
    bestFor: "Patients suffering from morning jaw soreness, teeth grinding, or TMJ pain."
  },
  {
    id: "restorative-crowns",
    category: "restorative",
    title: "Ceramic Crowns, Bridges & White Fillings",
    tagline: "Tooth-colored, mercury-free restorations engineered for longevity.",
    description: "We utilize bio-compatible composite resins and precision-milled zirconia or lithium disilicate porcelain to restore decayed, cracked, or worn teeth with undetectable, natural strength.",
    benefits: [
      "100% metal-free and amalgam-free aesthetic restorations",
      "Color-matched precisely to your surrounding natural dentition",
      "Restores full masticatory strength and natural tooth contours",
      "Conservative prep techniques preserving maximum healthy structure"
    ],
    duration: "1–2 visits depending on restoration type",
    recovery: "Immediate once local anesthetic wears off (1–2 hours)",
    bestFor: "Teeth with older metal fillings, cracks, or extensive cavity damage."
  },
  {
    id: "emergency-care",
    category: "emergency",
    title: "Same-Day Emergency Dentistry",
    tagline: "Rapid relief when you need it most — compassionate urgent care.",
    description: "Dental emergencies can be distressing. Whether dealing with a severe toothache, knocked-out tooth, chipped crown, or sudden swelling, Dr. Licina offers same-day urgent appointments in Fort Lauderdale.",
    benefits: [
      "Dedicated daily reserve slots for immediate emergency care",
      "Rapid pain diagnosis with instant digital radiography",
      "Gentle emergency pain alleviation and stabilization",
      "Saturday appointments available for weekend dental emergencies"
    ],
    duration: "30–60 minutes triage & stabilization",
    recovery: "Dependent on underlying treatment condition",
    bestFor: "Severe tooth pain, lost restorations, oral trauma, or acute infections."
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Elena R.",
    source: "Verified Patient",
    date: "2 months ago",
    treatment: "Cosmetic Porcelain Veneers",
    rating: 5,
    quote: "Dr. Licina is simply the best dentist I've ever had in South Florida. I was very nervous about getting veneers, but she walked me through every digital scan and took all the time needed. The result looks so natural that my friends just thought I was glowing."
  },
  {
    id: "rev-2",
    author: "Marcus T.",
    source: "Google",
    date: "1 month ago",
    treatment: "Dental Implant & Crown",
    rating: 5,
    quote: "From the front desk to the operatory suite, the boutique feel is exceptional. Dr. Licina replaced a failed molar with an implant seamlessly. Absolutely zero pain during the procedure. Finding a dentist open on Saturdays is also a huge plus!"
  },
  {
    id: "rev-3",
    author: "Sophia L.",
    source: "Zocdoc",
    date: "3 weeks ago",
    treatment: "TMJ Botox & Routine Cleaning",
    rating: 5,
    quote: "I've suffered from severe jaw clenching for years. Dr. Licina's TMJ treatment eliminated my morning headaches completely within a week. The clinic is pristine, modern, and has the most relaxing atmosphere."
  },
  {
    id: "rev-4",
    author: "David B.",
    source: "Verified Patient",
    date: "4 months ago",
    treatment: "My Dental Membership Plan",
    rating: 5,
    quote: "I run my own business without corporate dental insurance. The in-house My Dental Membership plan paid for itself on my very first visit. Transparent pricing, no hidden fees, and world-class clinical care."
  }
];

export const FAQS = [
  {
    q: "Do you accept dental insurance?",
    a: "Yes. We accept most major PPO dental insurance plans including Delta Dental, MetLife, Cigna, Guardian, Aetna, Humana, and United Healthcare. Our team handles all claim filings and works directly with your provider to maximize your coverage."
  },
  {
    q: "What if I don't have dental insurance?",
    a: "We created our in-house 'My Dental Membership' specifically for uninsured individuals and families. For $379/year, you receive all routine exams, low-dose digital X-rays, 2 cleanings, plus an exclusive 25% discount on all cosmetic, restorative, and implant services with zero waiting periods or maximums."
  },
  {
    q: "Do you offer financing for cosmetic dentistry or implants?",
    a: "Yes. We partner with CareCredit, Cherry, and Alphaeon to provide flexible monthly payment options, including up to 24 months deferred interest with low or zero upfront costs."
  },
  {
    q: "Are Saturday appointments available?",
    a: "Yes! We understand our patients have busy work schedules during the week. We are open on Saturdays from 8:00 AM to 3:00 PM for routine care, cosmetic consultations, and emergency treatments."
  },
  {
    q: "How does Dr. Licina ensure a comfortable, painless visit?",
    a: "We prioritize patient comfort with gentle computerized local anesthesia, quiet modern handpieces, noise-canceling headphones, ceiling entertainment screens, and a calm, boutique setting designed to alleviate dental anxiety."
  }
];
