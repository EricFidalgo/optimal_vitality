// assets/js/data.js

// Global data for navbar, marquee, index.html testimonials (but if testimonials are empty in specific js service file then these get sent to that page), faq's 
window.clinicData = {
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
    { label: "Team", href: "index.html#team" },
    { label: "FAQs", href: "index.html#faqs" },
  ],

  marquee: [
    { label: "Doctor-Led Protocols", icon: "fa-user-md" },
    { label: "St. Petersburg, FL", icon: "fa-map-marker-alt" },
    { label: "Licensed Medical Clinic", icon: "fa-shield-alt" },
    { label: "5-Star Rated Clinic", icon: "fa-star" },
    { label: "HIPAA Compliant", icon: "fas fa-user-shield" },
  ],

team: [
    {
      name: "Dr. Marcus Vance",
      role: "Chief Medical Officer",
      bio: "Board-certified specialist in anti-aging medicine and bio-identical hormone optimization, guiding precision protocols for systemic longevity.",
      image: "images/med-director.jpg",
    },
    {
      name: "Sarah Jenkins, FNP-C",
      role: "Lead Clinical Specialist",
      bio: "Expert in targeted peptide therapies and advanced metabolic weight loss programming to preserve lean muscle mass.",
      image: "images/clin-specialist.jpg",
    },
    {
      name: "David Chen, RN",
      role: "Infusion Director",
      bio: "Overseeing our Drip Culture division, ensuring perfect bioavailability and safety for all NAD+ and Glutathione longevity infusions.",
      image: "images/iv-specialist.jpg",
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
};
