window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
  // ─── Card data (used on index.html & cards) ───────────────────────────
  id: "peptides",
  type: "core",
  tabLabel: "Peptide Therapy",
  href: "peptides.html",
  title: "Heal Faster & Feel Like Yourself Again",
  lead: "Supercharge your body's natural healing power to fix joint pain, recover fast, and feel full of life.",
  description:
    "Peptides are natural signals that tell your body to repair damaged muscles, joints, and gut tissue. Wake up without joint stiffness, bounce back from workouts, and feel energized every day.",
  icon: "fa-vial",
  delay: "-2s",
  features: [
    "Fast joint, tendon & muscle recovery",
    "Deeper, restful night sleep",
    "Supercharge gut & immune health",
    "100% doctor-checked for your safety",
  ],
  image: "assets/images/photos/peptide-therapy.jpg",
  ctaText: "Book Your Doctor Consultation",

  // ─── Page-level meta ──────────────────────────────────────────────────
  pageTitle: "Doctor-Guided Peptide Therapy — OVI Wellness",
  pageDescription:
    "Doctor-guided peptide therapy in St. Petersburg, FL. BPC-157, TB-500, and Ipamorelin protocols prescribed by licensed medical providers.",

  // ─── Hero ─────────────────────────────────────────────────────────────
  heroHeadline: "Accelerate Healing &<br><span class=\"text-primary\">Cellular Recovery</span>",
  heroSubheadline:
    "Prescription Peptide protocols medically supervised by Board-Certified Doctors in St. Petersburg, FL.",
  heroCTA: "Book Your Doctor Call Today",

  // ─── Quiz ─────────────────────────────────────────────────────────────
  quiz: {
    badge: "Quick 1-Minute Assessment",
    headline: "Find Your Best Healing Plan",
    subheadline: "Answer 3 quick questions so our doctors can help you pick the right plan.",
    step1: {
      question: "What is your biggest daily struggle?",
      sub: "Pick what you want to fix first.",
      options: [
        { value: "pain", icon: "fa-crutch", title: "Joint & Muscle Pain", desc: "Sore joints, slow injury healing, or morning stiffness." },
        { value: "performance", icon: "fa-stopwatch", title: "Slow Workout Recovery", desc: "Stuck on progress, slow to bounce back after exercise." },
        { value: "energy", icon: "fa-battery-quarter", title: "Fatigue & Low Energy", desc: "Tired all day, poor sleep, or brain fog." },
        { value: "body", icon: "fa-fire", title: "Stubborn Belly Fat", desc: "Holding extra weight despite eating clean and exercising." }
      ]
    },
    step2: {
      question: "How long have you felt this way?",
      sub: "Helps our doctor choose your starting plan.",
      options: [
        { value: "short", icon: "fa-calendar", title: "Under 3 Months", desc: "Recent issue or new workout injury." },
        { value: "medium", icon: "fa-calendar-alt", title: "3–12 Months", desc: "Has been bothering me for several months." },
        { value: "long", icon: "fa-calendar-check", title: "1+ Years", desc: "Long-term joint pain or chronic fatigue." }
      ]
    },
    step3: {
      question: "What is your main goal right now?",
      sub: "Helps set a clear timeline for your results.",
      options: [
        { value: "train", icon: "fa-dumbbell", title: "Get Back to Workouts", desc: "Move without pain and exercise with full strength." },
        { value: "muscle", icon: "fa-chart-line", title: "Build Lean Muscle", desc: "Gain functional strength and recover faster." },
        { value: "feel", icon: "fa-brain", title: "Wake Up Energized", desc: "Enjoy deep sleep, clear focus, and high energy." },
        { value: "fat", icon: "fa-weight", title: "Burn Body Fat", desc: "Shed stubborn fat while keeping strong muscle." }
      ]
    },
    protocols: {
      pain: {
        tag: "Recommended Joint Repair Plan",
        name: "The Total Joint & Tissue Reset",
        peptides: "Prescription BPC-157 + TB-500 Protocol",
        icon: "fa-shield-alt",
        desc: "A simple doctor-prescribed treatment that signals your cells to repair joints, tendons, and muscles fast.",
        goalModifiers: {
          train: "Designed to get you back to active workouts without pain holding you back.",
          muscle: "Accelerates cellular tissue repair so you rebuild muscle stronger than before.",
          feel: "Calms joint inflammation so you wake up refreshed and move comfortably.",
          fat: "Helps your body heal so you can stay active and burn extra calories."
        },
        social: "Over 60 local patients completed this recovery plan in the last 90 days."
      },
      performance: {
        tag: "Strength & Growth Plan",
        name: "Peak Performance & Growth Stack",
        peptides: "Prescription Ipamorelin + Tesamorelin",
        icon: "fa-dumbbell",
        desc: "Boosts your natural growth hormones so you gain lean muscle, bounce back fast, and feel strong.",
        goalModifiers: {
          train: "Helps you push past plateaus and recover in half the time.",
          muscle: "Supports natural muscle building and protein absorption.",
          feel: "Promotes deep, restorative sleep so you wake up with high energy.",
          fat: "Targets stubborn belly fat while protecting your lean muscle."
        },
        social: "88 patients are currently running this doctor-prescribed stack."
      },
      energy: {
        tag: "Cellular Energy Plan",
        name: "Total Body Energy & Focus Reset",
        peptides: "NAD+ & Cellular Booster Protocol",
        icon: "fa-bolt",
        desc: "Recharges your cellular engines so you clear brain fog, fight fatigue, and feel energized all day.",
        goalModifiers: {
          train: "Increases cellular endurance so workouts feel lighter.",
          muscle: "Improves cellular recovery after tough training sessions.",
          feel: "Built specifically to turn off constant tiredness and restore mental clarity.",
          fat: "Boosts daily metabolic engine to burn fat steadily."
        },
        social: "44 local patients started this energy plan in the last 60 days."
      },
      body: {
        tag: "Fat Burn & Recomp Plan",
        name: "Lean Muscle & Fat Burn Reset",
        peptides: "Tesamorelin + Ipamorelin Protocol",
        icon: "fa-fire",
        desc: "Targets deep belly fat that diets miss, while protecting your lean, strong muscle.",
        goalModifiers: {
          train: "Improves endurance and stamina for longer workouts.",
          muscle: "Burns fat tissue while preserving lean muscle mass.",
          feel: "Improves overall body confidence, sleep, and daytime focus.",
          fat: "Designed specifically for stubborn fat that won't move with diet alone."
        },
        social: "73 patients completed this fat burn protocol recently."
      }
    },
    timelineMap: {
      short: "6–8 weeks (Fast Recovery Plan)",
      medium: "8–12 weeks (Standard Doctor Plan)",
      long: "12–16 weeks (Full Reset Plan)"
    }
  },

  // ─── Eligibility (Who Is This Right For) ─────────────────────────────
  eligibility: {
    badge: "Who Is This For?",
    headline: "Are You a Candidate for Peptide Care?",
    intro:
      "Our peptide treatments are safe, effective prescription plans supervised by licensed medical doctors. We check your health and bloodwork first so you get the best plan for your body.",
    note: "Questions about candidacy? Our medical team will guide you during your consultation.",
    ctaText: "Call Us Now to Check Candidacy",
    items: [
      {
        label: "Joint & Muscle Pain",
        detail:
          "Adults dealing with joint stiffness, slow injury healing, or tendon pain.",
      },
      {
        label: "Tired & Slow Recovery",
        detail:
          "Anyone taking days to recover from exercise or feeling constantly worn out.",
      },
      {
        label: "Tried OTC Supplements",
        detail:
          "People who took store vitamins or joint pills without getting real relief.",
      },
      {
        label: "Want Muscle & Deep Sleep",
        detail:
          "Active men and women ready to burn fat, sleep deeply, and heal faster.",
      },
      {
        label: "Ready for Doctor Care",
        detail:
          "Looking for safe, pharmacy-grade doctor treatments with regular check-ins.",
      },
    ],
  },

  // ─── Protocols (service options cards) ────────────────────────────────
  protocols: {
    badge: "Prescription Options",
    sectionHeadline: "Simple Doctor-Guided Treatments",
    sectionSubheadline:
      "Doctor-prescribed peptide options tailored to your body after a medical consultation.",
    items: [
      {
        icon: "fa-running",
        name: "BPC-157 Protocol",
        tag: "Joint Repair",
        description:
          "Targeted prescription peptide that tells your cells to repair joints, tendons, gut lining, and torn muscle tissue.",
      },
      {
        icon: "fa-kit-medical",
        name: "TB-500 Protocol",
        tag: "Tissue Healing",
        description:
          "Works alongside BPC-157 to reduce chronic inflammation, improve joint flexibility, and speed up recovery.",
      },
      {
        icon: "fa-dumbbell",
        name: "Ipamorelin Protocol",
        tag: "Growth & Sleep",
        description:
          "Natural growth secretagogue that improves deep sleep, speeds up muscle recovery, and keeps bones strong.",
      },
      {
        icon: "fa-bolt-lightning",
        name: "Tesamorelin Protocol",
        tag: "Belly Fat Burn",
        description:
          "Targeted prescription peptide engineered to burn stubborn belly fat while protecting lean muscle mass.",
      },
      {
        icon: "fa-battery-full",
        name: "NAD+ Therapy",
        tag: "Cellular Energy",
        description:
          "Recharges your cellular batteries to clear brain fog, boost daily energy, and fight systemic fatigue.",
      },
      {
        icon: "fa-flask",
        name: "Doctor Blood Check",
        tag: "Safety First",
        description:
          "Simple lab work so your doctor can check your baseline health and build your exact starting dose safely.",
      },
    ],
  },

  // ─── Science / How It Works ───────────────────────────────────────────
  science: {
    badge: "How It Works",
    headline: "Why It Works When<br><span class=\"text-primary\">Supplements Fail</span>",
    body: "Think of your cells as engines. Peptides are natural signals your body already understands. Store vitamins pass right through your gut. Our doctor-prescribed bio-identical peptides deliver direct molecular signals to your cells, telling them to rebuild, repair, and energize naturally.",
    bullets: [
      "Prescribed by real licensed medical doctors",
      "100% pharmacy-grade bio-identical compounds",
      "Safe, targeted action without synthetic fillers",
    ],
    stats: [
      { value: "Fast", label: "Notice joint relief in weeks" },
      { value: "Safe", label: "Doctor supervised & lab checked" },
      { value: "100%", label: "Pharmacy-grade quality" },
      { icon: "fa-user-md", label: "Rx Doctor Certified" },
    ],
    cards: [
      {
        icon: "fa-vial",
        title: "Compounded & Doctor Verified",
        detail:
          "Every dose is compounded in accredited pharmacies and prescribed by licensed healthcare providers.",
      },
      {
        icon: "fa-bullseye",
        title: "Targeted Cellular Action",
        detail:
          "Peptides send precise repair signals directly to damaged cells without disturbing other body systems.",
      },
    ],
  },

  // ─── Myths ──────────────────────────────────────────────────────────────
  myths: [
    {
      myth: "Are peptides just anabolic steroids?",
      reality:
        "No. Peptides are natural amino acid signals—the exact same signals your body already produces. They do not shut down your hormones, cause liver stress, or act like steroids."
    },
    {
      myth: "Do I have to do this forever?",
      reality:
        "No. Most peptide plans run for 8 to 16 weeks to reset your tissue and cellular health. Once healed, many patients maintain their results with simple lifestyle care."
    },
    {
      myth: "Is doctor-guided peptide therapy safe and legal?",
      reality:
        "Yes. All treatments we prescribe are legal, pharmacy-grade medications prescribed by licensed medical doctors following strict Florida medical standards."
    }
  ],

  // ─── Comparison table ──────────────────────────────────────────────────
  comparison: {
    headline: "Doctor-Guided Care vs. Doing It Alone",
    subheadline:
      "See why doctor supervision gets you better, safer, and longer-lasting results.",
    ctaText: "Call Our Clinic Today",
    mobileStats: [
      { icon: "fa-bolt", label: "Fast Recovery" },
      { icon: "fa-fire", label: "Fat Burn" },
      { icon: "fa-brain", label: "Clear Focus" },
      { icon: "fa-shield-alt", label: "Doctor Checked" },
    ],
    rows: [
      { metric: "Recovery Speed", without: "5–7 days of pain", with: "2–3 days fast recovery" },
      { metric: "Joint Comfort", without: "Stiff & sore", with: "Flexible & pain-free" },
      { metric: "Daily Energy", without: "Tired & brain fog", with: "High all-day energy" },
      { metric: "Sleep Quality", without: "Restless & tossing", with: "Deep, restorative sleep" },
      { metric: "Medical Safety", without: "Unregulated web pills", with: "Doctor-prescribed & lab checked" },
    ],
    stacks: [
      {
        name: "Joint & Tissue Repair Stack",
        tag: "Most Popular",
        compounds: "BPC-157 + TB-500 Protocol",
        description:
          "Combines twin repair peptides for fast joint relief, ligament repair, and tendon healing.",
      },
      {
        name: "Growth & Lean Muscle Stack",
        tag: "Strength Boost",
        compounds: "Tesamorelin + Ipamorelin Protocol",
        description:
          "Designed for active adults looking to burn stubborn belly fat, gain lean muscle, and sleep deeply.",
      },
      {
        name: "Total Bioenergetic Reset",
        tag: "Full Vitality",
        compounds: "NAD+ + Cellular Recovery Stack",
        description:
          "Recharges cellular power plants to eliminate chronic fatigue, restore focus, and boost endurance.",
      },
    ],
  },

  // ─── FAQs ──────────────────────────────────────────────────────────────
  faqs: [
    {
      question: "Do I need a doctor's prescription for peptide therapy?",
      answer:
        "Yes. All clinical peptide protocols are prescription medications. You will consult with our licensed medical doctor who evaluates your health and orders bloodwork before prescribing your custom plan.",
    },
    {
      question: "What does the doctor-guided peptide program include?",
      answer:
        "Your program includes direct medical consultations with a board-certified doctor, baseline blood testing, custom pharmacy-grade peptides, and ongoing check-ins to make sure you get optimal results safely.",
    },
    {
      question: "How are peptide treatments administered?",
      answer:
        "Most peptide protocols use tiny, virtually painless subcutaneous injections using micro-needles (done at home or in clinic). Some peptides are also available as oral capsules or nasal sprays based on doctor recommendations.",
    },
    {
      question: "How fast will I see results from peptide therapy?",
      answer:
        "Joint repair peptides like BPC-157 often show noticeable pain relief within 2 to 4 weeks. Muscle recovery, sleep quality, and fat loss benefits build over 6 to 12 weeks.",
    },
    {
      question: "Can I combine peptides with TRT or hormone therapy?",
      answer:
        "Yes! In fact, peptides work wonderfully alongside doctor-guided TRT or hormone therapy to boost cellular repair, speed up fat loss, and keep your energy high.",
    },
    {
      question: "How do I get started with peptide therapy?",
      answer:
        "Getting started is simple! Call our clinic today at (727) 476-8966 or click 'Book Your Doctor Consultation' online. Our doctor will review your health, order any necessary bloodwork, and start your custom healing plan.",
    },
  ],
});
