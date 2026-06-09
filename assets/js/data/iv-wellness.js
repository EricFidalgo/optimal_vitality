window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
      // ─── Card data ────────────────────────────────────────────────────────
      id: "iv-wellness",
      type: "additional",
      tabLabel: "IV & Wellness",
      href: "iv-wellness.html",
      title: "Drip Culture: Total Hydration & Nutrients",
      lead: "Bypass your digestive ecosystem for immediate 100% nutrient bioavailability.",
      description:
        "Intravenous delivery systems that supply vital antioxidants, clean hydration, and micronutrients straight to the cell matrix.",
      icon: "fa-tint",
      delay: "-5s",
      features: [
        "Custom IV Micronutrient Therapy",
        "High-Dose NAD+ Infusions",
        "Vitamin Co-Factor Injections",
        "Athletic & Performance Recovery",
      ],
      image: "assets/images/photos/IV.jpg",
      ctaText: "Join The Membership",

      // ─── Page meta ────────────────────────────────────────────────────────
      pageTitle: "IV Therapy & Wellness Infusions — OVI Wellness",
      pageDescription:
        "Custom IV micronutrient therapy, NAD+ infusions, and vitamin injections in St. Petersburg, FL. 100% bioavailability — direct cellular delivery at OVI Wellness.",

      heroHeadline: "100% Bioavailability.<br><span class=\"text-primary\">Zero Compromise.</span>",
      heroCTA: "Book Your Infusion",

      transformations: {
        headline: "Clinical Transformations",
        subheadline: "Real outcomes from targeted intravenous therapy and wellness protocols.",
        items: [
          {
            imageAfter: "assets/images/photos/IV.jpg",
            imageBefore: "assets/images/photos/IV.jpg",
            badgeAfter: "Post-Infusion",
            badgeBefore: "Depleted",
            title: "Rapid Cellular Hydration",
            protocol: "NAD+ & Meyers Cocktail",
            description: "Immediate restoration of cellular hydration, energy levels, and cognitive clarity."
          }
        ]
      },
      
      quiz: {
        badge: "Clinical Self-Assessment",
        headline: "Find Your Infusion",
        subheadline: "Answer 3 quick questions to match you with the ideal IV therapy.",
        step1: {
          question: "What brings you in today?",
          sub: "Select your primary reason for seeking IV therapy.",
          options: [
            { value: "energy", icon: "fa-bolt", title: "Energy & Focus", desc: "Need a boost in vitality and clarity." },
            { value: "recovery", icon: "fa-first-aid", title: "Recovery", desc: "Athletic recovery or hangover relief." },
            { value: "immunity", icon: "fa-shield-alt", title: "Immunity", desc: "Feeling run down or fighting a bug." }
          ]
        },
        step2: {
          question: "How often do you get IV treatments?",
          sub: "Helps us plan your long-term wellness strategy.",
          options: [
            { value: "first", icon: "fa-star", title: "First Time", desc: "New to IV therapy." },
            { value: "regular", icon: "fa-sync", title: "Regularly", desc: "Part of my routine." }
          ]
        },
        step3: {
          question: "Are you interested in NAD+?",
          sub: "NAD+ is our premier anti-aging and cognitive therapy.",
          options: [
            { value: "yes", icon: "fa-brain", title: "Yes", desc: "Want to explore longevity protocols." },
            { value: "no", icon: "fa-times", title: "Not today", desc: "Just need standard hydration/vitamins." }
          ]
        },
        protocols: {
          energy: {
            tag: "Mitochondrial Support",
            name: "The Peak Performance Infusion",
            peptides: "High-Dose NAD+ + B-Complex + Amino Stacks",
            icon: "fa-bolt",
            desc: "Upregulates cellular ATP production and clears cognitive fog by supplying essential cofactors directly to your bloodstream.",
            goalModifiers: {
              yes: "Includes our premier NAD+ longevity infusion, maximizing mitochondrial repair and cellular ATP output.",
              no: "Focuses on our core B-Complex, Vitamin C, and hydration blend for clean, jitter-free vitality."
            },
            social: "89 patients with your profile received this infusion recently."
          },
          recovery: {
            tag: "Systemic Restoration",
            name: "The Athletic Hydration & Detox Protocol",
            peptides: "Glutathione + Amino Acids + Electrolyte Infusion",
            icon: "fa-first-aid",
            desc: "Flushes out lactic acid, restores glycogen balance, and aids muscle cell recovery while detoxifying the liver for rapid systemic relief.",
            goalModifiers: {
              yes: "Adds NAD+ to boost post-training muscle repair and systemic recovery pacing.",
              no: "Provides immediate hydration, amino acids, and high-dose glutathione to reduce soreness and oxidative stress."
            },
            social: "114 patients with your profile run this protocol post-training."
          },
          immunity: {
            tag: "Defensive Optimization",
            name: "The Immune Defense Shield",
            peptides: "High-Dose Vitamin C + Zinc + Myers Cocktail",
            icon: "fa-shield-alt",
            desc: "A potent concentration of systemic antioxidants and mineral cofactors designed to stimulate white blood cell production and combat viral load.",
            goalModifiers: {
              yes: "Combines immune defense with NAD+ to resolve systemic fatigue from being run down.",
              no: "Provides our maximum concentration of Vitamin C and Zinc to quickly fortify your immune response."
            },
            social: "95 patients with your profile choose this shield when feeling run down."
          }
        },
        timelineMap: {
          first: "1–2 hours (Immediate hydration)",
          regular: "2–4 weeks (Cumulative benefits)"
        }
      },

      eligibility: {
        badge: "Clinical Candidacy",
        headline: "Who Is This Right For?",
        intro:
          "IV therapy delivers nutrients directly into the bloodstream, bypassing digestive absorption entirely. Whether you're recovering from illness, training hard, or investing in longevity — IV therapy is one of the fastest-acting wellness modalities available.",
        note: "A quick intake assessment is all we need to design your perfect infusion protocol.",
        ctaText: "Book Your First Infusion",
        items: [
          {
            label: "High Performers & Athletes",
            detail:
              "Individuals with demanding physical or cognitive output who require accelerated recovery and peak nutrient status.",
          },
          {
            label: "Chronic Fatigue",
            detail:
              "Adults experiencing persistent low energy, immune compromise, or post-viral fatigue that supplements haven't resolved.",
          },
          {
            label: "Frequent Travelers",
            detail:
              "High-frequency travelers who struggle with dehydration, jet lag, and immune stress from constant environmental changes.",
          },
          {
            label: "Longevity-Focused",
            detail:
              "Individuals investing in long-term cellular health who want direct access to NAD+, glutathione, and key antioxidants.",
          },
          {
            label: "Recovery Support",
            detail:
              "Post-surgery, post-illness, or post-event recovery support requiring rapid repletion of hydration and micronutrients.",
          },
        ],
      },

      protocols: {
        badge: "Our Infusions",
        sectionHeadline: "Our IV Protocols",
        sectionSubheadline:
          "Every infusion is compounded fresh and tailored to your specific recovery, performance, or longevity goals.",
        items: [
          {
            icon: "fa-bolt",
            name: "NAD+ Infusion",
            tag: "Most Transformative",
            description:
              "High-dose intravenous NAD+ to restore mitochondrial energy production, support DNA repair, and combat cellular aging at the molecular level.",
          },
          {
            icon: "fa-star",
            name: "Glutathione Push",
            tag: "",
            description:
              "The master antioxidant, delivered intravenously for immune enhancement, liver detoxification, and luminous skin brightening.",
          },
          {
            icon: "fa-tint",
            name: "Myers' Cocktail",
            tag: "Most Popular",
            description:
              "The clinical gold standard IV — magnesium, B vitamins, vitamin C, and calcium delivered in a precisely balanced infusion for energy, immunity, and vitality.",
          },
          {
            icon: "fa-dumbbell",
            name: "Athletic Recovery IV",
            tag: "",
            description:
              "Amino acids, electrolytes, and anti-inflammatory compounds for rapid post-training or post-competition muscle recovery and rehydration.",
          },
          {
            icon: "fa-shield-alt",
            name: "Immune Fortification",
            tag: "",
            description:
              "High-dose vitamin C, zinc, B12, and immune-supporting co-factors to bolster defenses against illness, especially during seasonal or travel stress.",
          },
          {
            icon: "fa-syringe",
            name: "Vitamin Injections",
            tag: "",
            description:
              "Targeted intramuscular B12, D3, MIC/B12 lipotropics, and other co-factor injections for rapid nutrient delivery without a full IV session.",
          },
        ],
      },

      science: {
        badge: "The Clinical Method",
        headline: "The Science of<br><span class=\"text-primary\">IV Nutrient Therapy</span>",
        body: "When you consume vitamins orally, your digestive system filters, degrades, and limits how much reaches your cells — often absorbing less than 20% of the dose. Intravenous delivery bypasses this entirely. Nutrients arrive at 100% bioavailability, saturating your bloodstream and reaching cells immediately — making IV therapy the most efficient nutrient delivery system available.",
        bullets: [
          "100% Bioavailability vs. ~20% Oral Absorption",
          "Compounded Fresh Per Protocol",
          "Immediate Cellular Delivery",
        ],
        stats: [
          { value: "100%", label: "Bioavailability vs. ~20% oral average" },
          { value: "45m", label: "Average infusion session time" },
          { value: "0%", label: "Digestive degradation" },
          { icon: "fa-shield-alt", label: "RN-Administered" },
        ],
        cards: [
          {
            icon: "fa-microscope",
            title: "Bypassing Digestion",
            detail:
              "IV delivery sidesteps the GI tract entirely — nutrients hit your bloodstream at full concentration and reach every cell immediately.",
          },
          {
            icon: "fa-bullseye",
            title: "NAD+ Cellular Power",
            detail:
              "NAD+ cannot be meaningfully absorbed orally at therapeutic doses. IV is the only clinically effective delivery method for high-dose NAD+ therapy.",
          },
        ],
      },

      comparison: {
        headline: "IV Therapy vs. Oral Supplements",
        subheadline: "The absorption difference changes everything.",
        ctaText: "Book Your First Infusion",
        mobileStats: [
          { icon: "fa-bolt", label: "Instant Effect" },
          { icon: "fa-tint", label: "Full Hydration" },
          { icon: "fa-star", label: "100% Absorbed" },
          { icon: "fa-heartbeat", label: "Cellular Delivery" },
        ],
        rows: [
          { metric: "Absorption Rate", without: "10–30% oral average", with: "100% IV delivery" },
          { metric: "Onset of Effect", without: "Hours to days", with: "During infusion" },
          { metric: "NAD+ Delivery", without: "Ineffective orally at dose", with: "Only viable at therapeutic IV dose" },
          { metric: "Hydration", without: "Digestive bottleneck", with: "Direct vascular repletion" },
          { metric: "Consistency", without: "Variable digestion", with: "Precise, exact dosing" },
        ],
        stacks: [
          {
            name: "The Peak Performance Stack",
            tag: "Most Popular",
            compounds: "Myers' Cocktail + Glutathione Push",
            description:
              "The ultimate wellness infusion combination. Myers' delivers foundational energy and immunity while glutathione handles detoxification and cellular protection.",
          },
          {
            name: "The Longevity Infusion",
            tag: "Most Transformative",
            compounds: "NAD+ + Vitamin C + Glutathione",
            description:
              "A powerful anti-aging and cellular optimization stack. High-dose NAD+ restores mitochondrial function while vitamin C and glutathione protect and detoxify.",
          },
          {
            name: "The Recovery Protocol",
            tag: "",
            compounds: "Athletic Recovery IV + B12 Injection",
            description:
              "Designed for post-training or post-competition recovery. Amino acids, electrolytes, and anti-inflammatories paired with a B12 injection for rapid cellular rebound.",
          },
        ],
      },

      faqs: [
        {
          question: "How long does an IV infusion take?",
          answer:
            "Most infusions run 30–60 minutes depending on the protocol. NAD+ infusions take longer — typically 2–4 hours — due to the slow infusion rate required for optimal tolerance and efficacy.",
        },
        {
          question: "How often should I get IV therapy?",
          answer:
            "Frequency depends on your goals. General wellness patients typically come once or twice monthly. Athletes or those in intensive recovery phases may benefit from weekly sessions. Our membership tiers are designed to optimize value for consistent patients.",
        },
        {
          question: "Is IV therapy safe?",
          answer:
            "Yes. All infusions are administered by registered nurses under physician oversight. We screen all patients before their first session to ensure IV therapy is appropriate for their health profile.",
        },
        {
          question: "What does NAD+ IV therapy actually do?",
          answer:
            "NAD+ (nicotinamide adenine dinucleotide) is a critical co-enzyme involved in energy metabolism and DNA repair. Levels decline significantly with age. IV NAD+ restores mitochondrial function, combats brain fog, reduces fatigue, and supports anti-aging pathways — effects that cannot be achieved with oral supplements at therapeutic doses.",
        },
      ],
    });
