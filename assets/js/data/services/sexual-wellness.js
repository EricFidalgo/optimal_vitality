window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
  // ─── Card data ────────────────────────────────────────────────────────
  id: "sexual-wellness",
  type: "additional",
  tabLabel: "Sexual Wellness",
  href: "sexual-wellness.html",
  title: "Bring Back Passion, Drive & Intimacy",
  lead: "Feel confident, strong, and deeply connected again with doctor-guided intimacy care.",
  description:
    "Age and stress can lower drive and physical performance. Our licensed doctors use natural PRP (P-Shot & O-Shot) and custom hormone balancing to bring back your passion and performance.",
  icon: "fa-heart",
  delay: "-4s",
  features: [
    "Bring back natural drive & stamina",
    "P-Shot for men & O-Shot for women",
    "100% doctor-prescribed & discreet",
    "100% doctor-checked for your safety",
  ],
  image: "assets/images/photos/team-group.avif",
  ctaText: "Book Your Doctor Consultation",

  // ─── Page meta ────────────────────────────────────────────────────────
  pageTitle: "Doctor-Guided Sexual Wellness — OVI Wellness",
  pageDescription:
    "Doctor-guided sexual wellness protocols in St. Petersburg, FL. P-Shot, O-Shot, PT-141, and hormone balancing supervised by licensed medical providers.",

  heroHeadline: "Reclaim Your<br><span class=\"text-primary\">Intimate Drive</span>",
  heroSubheadline:
    "Prescription Sexual Wellness & Intimacy protocols medically supervised by Board-Certified Doctors in St. Petersburg, FL.",
  heroCTA: "Book Your Doctor Call Today",

  quiz: {
    badge: "Quick 1-Minute Assessment",
    headline: "Find Your Best Intimacy Plan",
    subheadline: "Answer 3 quick questions so our doctors can help you pick the right plan.",
    step1: {
      question: "What is your main goal right now?",
      sub: "Pick what you want to improve first.",
      options: [
        { value: "men", icon: "fa-mars", title: "Men's Performance & Drive", desc: "Want stronger erections, stamina, and youthful energy." },
        { value: "women", icon: "fa-venus", title: "Women's Sensation & Mood", desc: "Want higher desire, better lubrication, and arousal." },
        { value: "balance", icon: "fa-scale-balanced", title: "Total Couples Balance", desc: "Hormone and drive optimization for both partners." }
      ]
    },
    step2: {
      question: "How long have you noticed lower drive or performance?",
      sub: "Helps our doctor choose your starting plan.",
      options: [
        { value: "months", icon: "fa-calendar", title: "A Few Months", desc: "Recent decline due to stress or age." },
        { value: "years", icon: "fa-calendar-alt", title: "A Few Years", desc: "Long-term low drive or intimacy frustration." }
      ]
    },
    step3: {
      question: "Have you tried intimacy treatments before?",
      sub: "Helps our doctor guide your care.",
      options: [
        { value: "no", icon: "fa-times", title: "First Time", desc: "I have never tried clinical intimacy care before." },
        { value: "yes", icon: "fa-check", title: "Yes, I Have", desc: "I have tried pills or supplements without long success." }
      ]
    },
    protocols: {
      men: {
        tag: "Recommended Men's Plan",
        name: "The Male Peak Performance Plan (P-Shot + TRT)",
        peptides: "Prescription P-Shot + Hormone Support",
        icon: "fa-mars",
        desc: "Combines natural PRP growth factors with doctor hormone balancing to restore strong blood flow, stamina, and confidence.",
        goalModifiers: {
          no: "First-time plan starting with a comfortable doctor evaluation and blood panel.",
          yes: "Advanced protocol designed to bypass weak OTC pills and deliver real clinical results."
        },
        social: "Over 80 local male patients achieved outstanding results with this plan."
      },
      women: {
        tag: "Recommended Women's Plan",
        name: "The Female Intimacy Reset (O-Shot + HRT)",
        peptides: "Prescription O-Shot + Bio-Identical HRT",
        icon: "fa-venus",
        desc: "Restores natural lubrication, nerve sensitivity, and intimate desire using your body's own natural growth factors.",
        goalModifiers: {
          no: "Gentle starting plan supervised by compassionate medical doctors.",
          yes: "Targeted booster protocol for deep cellular arousal and lasting satisfaction."
        },
        social: "74 female patients restored their intimate confidence with this protocol."
      },
      balance: {
        tag: "Couples Reset Plan",
        name: "Total Passion & Hormonal Synergy Stack",
        peptides: "Prescription PT-141 / Kisspeptin + Hormone Panels",
        icon: "fa-heart",
        desc: "Comprehensive intimacy stack designed to trigger natural brain desire signals and boost physical energy.",
        goalModifiers: {
          no: "Full baseline health check to align both partner's energy and passion levels.",
          yes: "High-potency therapy built to revive deep intimacy and stamina."
        },
        social: "Over 65 couples have renewed their spark with this doctor-guided plan."
      }
    },
    timelineMap: {
      months: "4–6 weeks (Fast Track Plan)",
      years: "8–12 weeks (Full Reset Plan)"
    }
  },

  eligibility: {
    badge: "Who Is This For?",
    headline: "Are You a Candidate for Intimacy Care?",
    intro:
      "Our sexual wellness treatments are safe, effective prescription plans supervised by licensed medical doctors. We evaluate your health in a private, respectful clinic setting.",
    note: "Questions about candidacy? Our medical team will guide you during your consultation.",
    ctaText: "Call Us Now to Check Candidacy",
    items: [
      {
        label: "Low Drive & Desire",
        detail:
          "Men and women feeling a decline in natural intimacy, passion, or energy.",
      },
      {
        label: "Erectile & Stamina Issues",
        detail:
          "Men struggling with blood flow, maintaining firmness, or performance anxiety.",
      },
      {
        label: "Dryness & Low Sensation",
        detail:
          "Women experiencing low arousal, discomfort, or reduced intimacy sensitivity.",
      },
      {
        label: "Failed Blue Pills / OTC",
        detail:
          "Anyone tired of over-the-counter supplements or pills that cause bad side effects.",
      },
      {
        label: "Ready for Private MD Care",
        detail:
          "Looking for safe, discreet doctor-administered treatments in a private office.",
      },
    ],
  },

  protocols: {
    badge: "Prescription Options",
    sectionHeadline: "Simple Doctor-Guided Treatments",
    sectionSubheadline:
      "Doctor-prescribed intimacy options tailored to your body in a private medical clinic.",
    items: [
      {
        icon: "fa-mars",
        name: "P-Shot (Priapus Shot)",
        tag: "For Men",
        description:
          "Natural PRP treatment for men to improve blood flow, firmness, tissue health, and intimate confidence.",
      },
      {
        icon: "fa-venus",
        name: "O-Shot (Orgasm Shot)",
        tag: "For Women",
        description:
          "Natural PRP treatment for women that restores nerve sensitivity, natural lubrication, and intense arousal.",
      },
      {
        icon: "fa-syringe",
        name: "Doctor TRT for Men",
        tag: "Stamina Boost",
        description:
          "Physician-guided testosterone balancing to rebuild daily energy, muscle strength, and intimate stamina.",
      },
      {
        icon: "fa-heart",
        name: "Bio-Identical HRT for Women",
        tag: "Hormone Reset",
        description:
          "Natural bio-identical estrogen and progesterone balancing to fix mood slumps, night sweats, and low drive.",
      },
      {
        icon: "fa-brain",
        name: "PT-141 Desire Therapy",
        tag: "Brain Signal",
        description:
          "FDA-studied peptide treatment that acts directly on central brain pathways to trigger natural desire.",
      },
      {
        icon: "fa-vial",
        name: "Doctor Blood Check",
        tag: "Safety First",
        description:
          "Simple lab work to check your exact hormone markers and ensure safe, effective treatment.",
      },
    ],
  },

  science: {
    badge: "How It Works",
    headline: "Why It Works When<br><span class=\"text-primary\">Blue Pills Fail</span>",
    body: "Pills only temporarily force blood flow and often cause headaches or high blood pressure. Our doctor-guided treatments repair underlying tissues and balance natural hormones. Using natural growth factors (PRP) and brain desire signals (PT-141), we rebuild long-term stamina, sensitivity, and natural drive.",
    bullets: [
      "Prescribed & administered by licensed medical doctors",
      "100% natural bio-identical compounds with zero synthetic fillers",
      "Private, respectful, and discreet medical care",
    ],
    stats: [
      { value: "Discreet", label: "Private 1-on-1 doctor care" },
      { value: "Safe", label: "Doctor supervised & lab checked" },
      { value: "Natural", label: "Uses your body's growth factors" },
      { icon: "fa-user-md", label: "Rx Doctor Certified" },
    ],
    cards: [
      {
        icon: "fa-microscope",
        title: "Natural PRP Tissue Repair",
        detail:
          "The P-Shot and O-Shot use concentrated growth factors from your own blood to restore blood vessels and nerve sensitivity.",
      },
      {
        icon: "fa-bullseye",
        title: "Natural Brain Desire Signaling",
        detail:
          "Peptides like PT-141 work on central brain receptors to ignite natural passion without cardiovascular stress.",
      },
    ],
  },

  myths: [
    {
      myth: "Are intimacy injections painful?",
      reality:
        "No. Our doctors apply strong, prescription topical numbing before any procedure. Most patients report feeling only mild pressure and resume normal daily activities immediately."
    },
    {
      myth: "Do intimacy treatments only work for men?",
      reality:
        "Not at all! Women suffer from hormonal and tissue changes too. The O-Shot and bio-identical HRT restore lubrication, sensation, and arousal for women naturally."
    },
    {
      myth: "Is doctor-guided intimacy care safe?",
      reality:
        "Yes. All treatments use natural growth factors or FDA-studied compounds administered directly by licensed medical doctors under strict Florida health guidelines."
    }
  ],

  comparison: {
    headline: "Doctor-Guided Care vs. Doing It Alone",
    subheadline:
      "See why doctor supervision gets you better, safer, and longer-lasting results.",
    ctaText: "Call Our Clinic Today",
    mobileStats: [
      { icon: "fa-user-md", label: "Doctor Guided" },
      { icon: "fa-heart", label: "High Drive" },
      { icon: "fa-shield-alt", label: "Safe & Natural" },
      { icon: "fa-clock", label: "Lasting Results" },
    ],
    rows: [
      { metric: "How It Works", without: "Temporary pill mask", with: "Rebuilds tissue & balances hormones" },
      { metric: "Side Effect Risk", without: "Headaches & blood pressure spikes", with: "100% safe & bio-compatible" },
      { metric: "Sensory Feeling", without: "Unchanged or numb", with: "Restored nerve sensitivity & passion" },
      { metric: "Medical Oversight", without: "Gas station pills / web orders", with: "Licensed MD consultation & labs" },
      { metric: "Long-Term Outcome", without: "Wears off in hours", with: "Long-lasting natural performance" },
    ],
    stacks: [
      {
        name: "Men's Peak Intimacy Stack",
        tag: "Most Popular",
        compounds: "P-Shot + Doctor TRT Protocol",
        description:
          "Our top male protocol combining the P-Shot for blood flow with TRT for stamina and energy.",
      },
      {
        name: "Women's Vitality & Sensation Stack",
        tag: "For Women",
        compounds: "O-Shot + Bio-Identical HRT",
        description:
          "Complete female intimacy reset restoring nerve sensitivity, lubrication, and emotional balance.",
      },
      {
        name: "Couples Passion & Desire Booster",
        tag: "Desire Reset",
        compounds: "PT-141 + Hormone Check",
        description:
          "Central brain desire peptide therapy designed to ignite spontaneous passion and stamina.",
      },
    ],
  },

  faqs: [
    {
      question: "Do I need a doctor's consultation for sexual wellness treatments?",
      answer:
        "Yes. All P-Shot, O-Shot, PT-141, and hormone treatments require a medical consultation. You will speak privately with our licensed medical doctor who reviews your health before prescribing a safe, custom plan.",
    },
    {
      question: "What does the doctor-guided intimacy program include?",
      answer:
        "Your program includes a private 1-on-1 consultation with a board-certified doctor, baseline bloodwork, your customized in-office treatment with prescription numbing, and ongoing follow-up check-ins.",
    },
    {
      question: "Are P-Shot and O-Shot treatments painful?",
      answer:
        "Not at all! We apply strong medical-grade numbing cream before every treatment. Most patients feel only slight pressure and go right back to work or normal activities the same day.",
    },
    {
      question: "How fast will I notice results from intimacy therapy?",
      answer:
        "Many patients notice improved sensitivity, blood flow, and desire within 2 to 4 weeks. Full tissue regeneration and peak results build over 8 to 12 weeks.",
    },
    {
      question: "Are these treatments private and confidential?",
      answer:
        "100% yes. Your privacy is our top priority. All consultations and treatments take place in private rooms in our discreet St. Petersburg clinic.",
    },
    {
      question: "How do I get started with sexual wellness care?",
      answer:
        "Getting started is simple! Call our clinic today at (727) 476-8966 or click 'Book Your Doctor Consultation' online. Our doctor will answer all your questions in complete confidence and start your plan.",
    },
  ],
});
