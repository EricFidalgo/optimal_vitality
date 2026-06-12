// assets/js/data.js

// Global data for navbar, marquee, index.html testimonials (but if testimonials are empty in specific js service file then these get sent to that page), faq's 
window.clinicData = window.clinicData || {};

const sharedTreatmentsGrid = [
  {
    title: "Hormone Optimization (TRT)",
    icon: "fa-syringe",
    desc: "Reclaim your physical energy and focus. Tailored testosterone replacement therapy (TRT) based on diagnostic biomarker tracking under MD oversight.",
    link: "services/hormone-optimization.html",
    linkText: "Explore TRT Program"
  },
  {
    title: "Medical Weight Loss",
    icon: "fa-weight-scale",
    desc: "Shed visceral fat while actively preserving lean muscle. Premium Semaglutide and Tirzepatide protocols calibrated to your metabolism.",
    link: "services/glp-1therapies.html",
    linkText: "Explore Weight Loss"
  },
  {
    title: "Peptide Therapy",
    icon: "fa-vial",
    desc: "Accelerate tissue healing, muscle recovery, and gut health with pharmacy-grade cellular signaling peptides (BPC-157, TB-500, Ipamorelin).",
    link: "services/peptides.html",
    linkText: "Explore Peptides"
  },
  {
    title: "Regenerative Medicine",
    icon: "fa-heartbeat",
    desc: "Harness exosome therapies, autologous Platelet-Rich Plasma (PRP), and clinical growth factors for advanced joint, follicle, and cellular repair.",
    link: "services/regenerative-medicine.html",
    linkText: "Explore Regeneration"
  },
  {
    title: "Skin & Aesthetics (Botox)",
    icon: "fa-magic",
    desc: "Smooth wrinkles and preserve natural facial expressions. Doctor-led Botox, Dysport, and advanced clinical skin rejuvenation therapies.",
    link: "services/skin-aesthetics.html",
    linkText: "Explore Aesthetics"
  },
  {
    title: "IV Nutrient Hydration",
    icon: "fa-tint",
    desc: "Deliver NAD+, Glutathione, and essential hydration directly to the bloodstream for immediate absorption and cellular revitalization.",
    link: "services/iv-wellness.html",
    linkText: "Explore IV Drips"
  }
];

Object.assign(window.clinicData, {
  contact: {
    phone: "(727) 555-0199", // TODO: Replace with your real clinic phone number
    email: "info@oviwellness.com",
    web3formsKey: "YOUR_ACCESS_KEY_HERE", // Enter your Web3Forms access key here to route form submissions to your email
    socials: {
      instagram: {
        handle: "@oviwellness_",
        url: "https://instagram.com/oviwellness_"
      },
      facebook: {
        handle: "@oviwellness_",
        url: "https://www.facebook.com/profile.php?id=61590423610288"
      }
    },
    address: {
      street: "600 2nd Ave NE",
      city: "St. Petersburg",
      state: "FL",
      zip: "33701"
    },
    hours: [
      { days: "Mon - Fri", time: "8:00 AM - 6:00 PM" },
      { days: "Sat - Sun", time: "Closed" }
    ]
  },
  navigation: [
    {
      label: "Treatments",
      href: "#",
      dropdown: [
        {
          label: "Hormone Optimization",
          href: "hormone-optimization.html",
          icon: "fa-syringe",
        },
        {
          label: "Medical Weight Loss",
          href: "glp-1therapies.html",
          icon: "fa-weight-scale",
        },
        { label: "Peptide Therapy", href: "peptides.html", icon: "fa-vial" },
        {
          label: "Regenerative Medicine",
          href: "regenerative-medicine.html",
          icon: "fa-heartbeat",
        },
        {
          label: "Skin & Aesthetics",
          href: "skin-aesthetics.html",
          icon: "fa-magic",
        },
        { label: "IV & Wellness", href: "iv-wellness.html", icon: "fa-tint" },
      ],
    },
    { label: "Team", href: "team.html" },
    { label: "Blog", href: "blog.html" },
    { label: "FAQs", href: "index.html#faqs" },
  ],

  marquee: [
    { label: "Doctor-Led Protocols", icon: "fa-user-md" },
    { label: "St. Petersburg, FL", icon: "fa-map-marker-alt" },
    { label: "Licensed Medical Clinic", icon: "fa-shield-alt" },
    { label: "5-Star Rated Clinic", icon: "fa-star" },
    { label: "HIPAA Compliant", icon: "fa-user-shield" },
  ],

team: [
    {
      name: "Dr. Marcus Vance, MD",
      credentials: "MD, FAARM",
      role: "Chief Medical Officer",
      bio: "Board-certified specialist in anti-aging medicine and bio-identical hormone optimization, guiding precision protocols for systemic longevity.",
      philosophy: "Optimization is not about chasing numbers; it's about restoring the physiological resilience of youth through precision dosing and advanced biomarker tracking.",
      expertise: ["Bio-identical Hormone Therapy", "Advanced Endocrinology", "Peptide Synthesis Protocols", "Longevity Medicine"],
      associations: ["Fellow of the American Academy of Anti-Aging Medicine (A4M)", "American Medical Association"],
      personalDetail: "Dr. Vance is an avid triathlete and utilizes the very protocols he prescribes to maintain elite cardiovascular performance.",
      image: "assets/images/photos/team/vance.png",
    },
    {
      name: "Sarah Jenkins, FNP-C",
      credentials: "FNP-C",
      role: "Lead Clinical Specialist",
      bio: "Expert in targeted peptide therapies and advanced metabolic weight loss programming to preserve lean muscle mass.",
      philosophy: "True weight loss is metabolic rehabilitation. We don't just reduce mass; we re-engineer your cellular metabolism to protect lean tissue and enhance energy output.",
      expertise: ["GLP-1/GIP Agonists", "Metabolic Optimization", "Body Recomposition", "Clinical Nutrition"],
      associations: ["American Association of Nurse Practitioners (AANP)", "Obesity Medicine Association"],
      personalDetail: "Sarah bridges the gap between clinical science and sustainable lifestyle integration, empowering patients to own their health journey.",
      image: "assets/images/photos/team/jenkins.png",
    },
    {
      name: "David Chen, RN",
      credentials: "RN, BSN",
      role: "Infusion Director",
      bio: "Overseeing our Drip Culture division, ensuring perfect bioavailability and safety for all NAD+ and Glutathione longevity infusions.",
      philosophy: "Intravenous therapy bypasses the unpredictability of the gut. By delivering clinical-grade nutrients directly to the bloodstream, we maximize absorption and promote immediate cellular impact.",
      expertise: ["NAD+ Protocols", "High-Dose Vitamin C", "Cellular Hydration", "Post-Surgical Recovery IVs"],
      associations: ["Infusion Nurses Society (INS)"],
      personalDetail: "David has safely administered over 10,000 IV protocols and is known for his perfectly painless insertion techniques.",
      image: "assets/images/photos/team/chen.png",
    },
  ],

  testimonials: [
    {
      initials: "JT",
      name: "James T.",
      tag: "TRT PATIENT",
      quote:
        "The TRT program completely changed my life. Within two months, my brain fog lifted and my energy levels are back to where they were in my 20s. The medical team here is incredibly thorough and precise with the bloodwork.",
    },
    {
      initials: "SM",
      name: "Sarah M.",
      tag: "METABOLIC OPTIMIZATION",
      quote:
        "I've struggled with weight loss for years. The metabolic protocol, combined with their nutritional guidance, helped me drop 35 pounds while keeping my muscle. It's the first time a clinic actually looked at my metabolic markers instead of just a scale.",
    },
    {
      initials: "MR",
      name: "Michael R.",
      tag: "IV THERAPY MEMBER",
      quote:
        "The Drip Culture membership is my secret weapon. As a frequent traveler, the NAD+ and Glutathione IVs keep my immune system bulletproof and my energy perfectly balanced. The infusion suite is a fantastic experience.",
    },
    {
      initials: "DL",
      name: "David L.",
      tag: "PEPTIDE THERAPY",
      quote:
        "The targeted protocols accelerated my recovery faster than anything else I've tried. They truly focus on precision and getting your body to operate efficiently. Highly recommend this clinic.",
    },
    {
      initials: "EK",
      name: "Elena K.",
      tag: "LONGEVITY PROTOCOLS",
      quote:
        "A truly concierge medical experience. I feel ten years younger after consistently utilizing their aesthetic and wellness treatments. The staff is incredible.",
    },
    {
      initials: "KT",
      name: "Kyle T.",
      tag: "TRT PATIENT",
      quote:
        "These peptides are truly the bomb. I feel like I'm 20 years old again.",
    },
  ],

  faqs: [
    {
      question: "What does the TRT program include?",
      answer:
        "Our TRT program provides comprehensive, medically supervised hormone optimization. It includes ongoing physician consultations, extensive routine biomarker blood panels, and custom-dosed, pharmacy-grade bio-identical testosterone to ensure your levels remain precisely optimized.",
    },
    {
      question: "How does the Metabolic Weight Loss program work?",
      answer:
        "We utilize advanced metabolic therapies like Semaglutide or Tirzepatide combined with lipotropic injectables. Your protocol is guided by metabolic lab markers and includes medical supervision, nutritional advising, and progress tracking to accelerate fat loss while preserving lean muscle.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Results depend entirely on the therapy. IV Therapy yields immediate improvements in hydration and energy. For TRT and Peptides, patients often notice enhanced mental clarity and sleep within weeks, while profound changes in body composition and tissue repair typically require 3 to 6 months of consistent adherence.",
    },
    {
      question: "Are peptide therapies safe and how are they administered?",
      answer:
        "Yes, peptides are extremely well-tolerated because they are naturally occurring compounds within your body. We exclusively prescribe rigorously tested, pharmacy-grade peptides. Most are administered via a virtually painless subcutaneous injection using a micro-needle, though some protocols use topical or oral alternatives.",
    },
  ],
  locations: {
    stPete: {
      name: "Optimal Vitality Institute — St. Petersburg",
      description: "Doctor-led TRT clinic, medical weight loss (Semaglutide/Tirzepatide), advanced aesthetics, and peptide therapy in St. Petersburg, Florida.",
      url: "https://oviwellness.com/st-pete.html",
      areaServed: [
        "St. Petersburg",
        "Tampa",
        "Clearwater",
        "Pinellas County",
        "Hillsborough County"
      ],
      heroHeadline: "OVI Wellness <br><span class='text-primary'>St. Pete</span>",
      heroSubheadline: "Our premier physical medical office providing doctor-led hormone optimization (TRT), metabolic weight loss, advanced peptide protocols, and aesthetics under strict medical board safety guidelines.",
      heroCTA: "Book St. Pete Consultation",
      advantageBadge: "PHYSICAL CLINIC LOCATION",
      advantageHeadline: "Doctor-Led Longevity Medicine in St. Pete",
      advantageText: "Located in the heart of St. Petersburg, our medical team—led by Chief Medical Officer Dr. Marcus Vance, MD—delivers personalized protocols designed to optimize your biomarkers. We combine advanced diagnostic lab work with sterile compounding pharmacy standards, ensuring your safety and clinical outcome.",
      advantageImage: "assets/images/photos/process-review.jpg",
      advantageBullets: [
        "Active Florida Medical Licensure",
        "CMO Physician Collaboration",
        "Visits & Lab Work Reviews",
        "FDA-Approved Compounds"
      ],
      treatmentsHeadline: "Our St. Petersburg Clinical Programs",
      treatmentsSubheadline: "Explore our bio-calibrated treatments designed to restore energy, metabolism, healing, and skin vitality.",
      treatmentsGrid: sharedTreatmentsGrid
    },
    tampa: {
      name: "Optimal Vitality Institute — Tampa Clinic",
      description: "Doctor-led TRT clinic, medical weight loss, peptides, and aesthetics serving Tampa Bay, with physical office located in St. Petersburg.",
      url: "https://oviwellness.com/tampa.html",
      areaServed: [
        "Tampa",
        "St. Petersburg",
        "Clearwater",
        "Hillsborough County",
        "Pinellas County"
      ],
      heroHeadline: "OVI Wellness <br><span class='text-primary'>Tampa Clinic</span>",
      heroSubheadline: "Serving our Tampa patients from our premier physical medical clinic located just across the bridge in St. Petersburg — providing doctor-led hormone optimization (TRT), metabolic weight loss, advanced peptides, and aesthetics.",
      heroCTA: "Book Tampa Clinic Consultation",
      advantageBadge: "TAMPA CLINIC SERVICES",
      advantageHeadline: "Your Tampa Clinic — Located Just Across the Bay",
      advantageText: "Optimal Vitality Institute serves Tampa patients from our state-of-the-art physical clinic in nearby St. Petersburg. Because Tampa and St. Pete are close, our Tampa patients easily travel across the bridge for our full range of in-person clinical treatments, including IV infusions, blood draws, and Botox. For your convenience, we also coordinate diagnostic lab work in Tampa and offer telehealth consultations for follow-up care.",
      advantageImage: "assets/images/photos/peptide.jpg",
      advantageBullets: [
        "Florida Board Certified Physicians",
        "In-Person Clinic Visits & Diagnostics",
        "Convenient St. Pete Physical Office",
        "Telehealth Follow-up Consultations"
      ],
      treatmentsHeadline: "Our Tampa Clinic Programs",
      treatmentsSubheadline: "Explore our bio-calibrated wellness programs, available to Tampa patients at our nearby St. Petersburg facility.",
      treatmentsGrid: sharedTreatmentsGrid
    }
  }
});
