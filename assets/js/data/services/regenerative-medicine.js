window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
      /* 
    FUTURE: ADD SPECIFIC TESTIMONIALS
    testimonials: [
      {
        initials: "JD",
        name: "John D.",
        tag: "JOINT REPAIR",
        quote: "BPC-157 significantly supported my shoulder recovery in 6 weeks."
      }
    ], 
    */
      // ─── Card data ────────────────────────────────────────────────────────
      id: "regenerative-medicine",
      type: "additional",
      tabLabel: "Regenerative Medicine",
      href: "regenerative-medicine.html",
      title: "Fix Body Pain & Rebuild Cells Naturally",
      lead: "Stop letting joint stiffness or thinning hair hold you back from living fully.",
      description:
        "We use your body's own natural power to heal damaged joints, revive skin, and restore hair thick and strong—without invasive surgery.",
      icon: "fa-heartbeat",
      delay: "-3s",
      features: [
        "Relieve stubborn joint aches & stiffness",
        "Natural hair & skin rejuvenation",
        "Pure cellular repair from within",
        "Quick in-office treatments",
      ],
      image: "assets/images/photos/IV.jpg",
      ctaText: "Fix My Joints & Hair",

      // ─── Page meta ────────────────────────────────────────────────────────
      pageTitle: "Advanced Regenerative Medicine — OVI Wellness",
      pageDescription:
        "Exosome therapy, PRP, P-Shot, O-Shot, and hair restoration in St. Petersburg, FL. Doctor-led regenerative medicine protocols at OVI Wellness.",

      heroHeadline: "Regenerate.<br><span class=\"text-primary\">Restore.</span> Rebuild.",
      heroCTA: "Start Your Protocol",

      transformations: {
        headline: "Clinical Transformations",
        subheadline: "Real outcomes from regenerative treatments.",
        items: [
          {
            imageAfter: "assets/images/photos/regen-after.jpg",
            imageBefore: "assets/images/photos/regen-before.jpg",
            badgeAfter: "Post-Treatment",
            badgeBefore: "Baseline",
            title: "Joint & Tissue Repair",
            protocol: "PRP & Exosome Therapy",
            description: "Accelerated healing and restored function after targeted regenerative injections."
          }
        ]
      },
      
      quiz: {
        badge: "Clinical Self-Assessment",
        headline: "Find Your Protocol",
        subheadline: "Answer 3 quick questions to help us identify the best regenerative strategy for you.",
        step1: {
          question: "What is your main concern?",
          sub: "Your primary symptom guides our approach.",
          options: [
            { value: "joint", icon: "fa-bone", title: "Joint Pain", desc: "Chronic pain or acute injury." },
            { value: "hair", icon: "fa-cut", title: "Hair Thinning", desc: "Looking to restore hair density." },
            { value: "intimacy", icon: "fa-heart", title: "Sexual Wellness", desc: "Seeking P-Shot or O-Shot treatments." }
          ]
        },
        step2: {
          question: "How severe is your condition?",
          sub: "Severity dictates the compound used.",
          options: [
            { value: "mild", icon: "fa-thermometer-empty", title: "Mild", desc: "Preventative or early stage." },
            { value: "severe", icon: "fa-thermometer-full", title: "Severe", desc: "Significant pain or noticeable loss." }
          ]
        },
        step3: {
          question: "Have you tried regenerative therapies before?",
          sub: "Helps us plan the protocol.",
          options: [
            { value: "no", icon: "fa-times", title: "Never", desc: "First time." },
            { value: "yes", icon: "fa-check", title: "Yes", desc: "Have had PRP or similar." }
          ]
        },
        protocols: {
          joint: {
            tag: "Structural Rehabilitation",
            name: "The Cellular Joint Repair Protocol",
            peptides: "Platelet-Rich Plasma (PRP) + Exosomes",
            icon: "fa-bone",
            desc: "Targets chronic pain and tissue degradation by injecting high-concentration cellular growth factors directly into affected areas to promote active healing.",
            goalModifiers: {
              no: "As a first-time candidate, we recommend starting with a baseline orthopedic evaluation.",
              yes: "Prior regenerative treatment indicates we can tailor cellular density for an enhanced repair response."
            },
            social: "55 patients with your profile are currently running this protocol."
          },
          hair: {
            tag: "Follicle Stimulation",
            name: "The Scalp Regeneration Matrix",
            peptides: "PRP / Exosomes + Scalp Micro-Channeling",
            icon: "fa-cut",
            desc: "Reverses androgenic alopecia and thinning by delivering biological growth signals directly to dormant hair follicles, stimulating density and strength.",
            goalModifiers: {
              no: "First-time therapy. A multi-session baseline approach is recommended for optimal follicle awakening.",
              yes: "Prior therapy suggests a maintenance or high-intensity booster protocol to sustain follicle activity."
            },
            social: "82 patients with your profile achieved visible density improvements."
          },
          intimacy: {
            tag: "Sexual Wellness Restoration",
            name: "The Cellular Intimacy Protocol (P-Shot / O-Shot)",
            peptides: "Autologous PRP + Cellular Growth Factors",
            icon: "fa-heart",
            desc: "Utilizes highly concentrated platelets to restore blood flow, tissue responsiveness, and localized nerve sensitivity for enhanced sexual wellness.",
            goalModifiers: {
              no: "A baseline mapping session will help us determine target areas for optimal response.",
              yes: "Prior treatments allow us to adjust density for enhanced longevity of results."
            },
            social: "69 patients with your profile completed this treatment recently."
          }
        },
        timelineMap: {
          mild: "4–6 weeks",
          severe: "8–12 weeks"
        }
      },

      eligibility: {
        badge: "Clinical Candidacy",
        headline: "Who Is This Right For?",
        intro:
          "Regenerative medicine leverages your body's own biological intelligence — and cutting-edge cellular science — to repair what time and injury have degraded. These are precision, medical-grade interventions requiring clinical evaluation.",
        note: "Not sure if you qualify? Our medical team evaluates every case to determine the ideal regenerative pathway.",
        ctaText: "Am I a Candidate? Let's Talk",
        items: [
          {
            label: "Chronic Pain & Injury",
            detail:
              "Adults managing long-standing joint pain, tendon injuries, arthritis, or post-surgical recovery that hasn't fully resolved.",
          },
          {
            label: "Sexual Health Concerns",
            detail:
              "Men and women seeking enhanced sexual function, sensation, and wellness through the P-Shot or O-Shot protocols.",
          },
          {
            label: "Hair Loss",
            detail:
              "Individuals experiencing androgenic alopecia or diffuse thinning who want clinically backed, non-surgical restoration.",
          },
          {
            label: "Anti-Aging & Longevity",
            detail:
              "High performers seeking cellular rejuvenation and systemic repair beyond what conventional medicine offers.",
          },
          {
            label: "Diagnostics Ready",
            detail:
              "Willing to complete a clinical consultation and, where required, baseline lab work before initiating any protocol.",
          },
        ],
      },

      protocols: {
        badge: "Our Modalities",
        sectionHeadline: "Our Regenerative Modalities",
        sectionSubheadline:
          "Precision biological therapies designed to repair, restore, and rejuvenate at the cellular level.",
        items: [
          {
            icon: "fa-dna",
            name: "Exosome Cellular Therapy",
            tag: "Most Advanced",
            description:
              "Next-generation signaling vesicles derived from mesenchymal stem cells. Delivered to direct cellular repair, reduce systemic inflammation, and accelerate tissue regeneration across multiple systems.",
          },
          {
            icon: "fa-tint",
            name: "Platelet-Rich Plasma (PRP)",
            tag: "",
            description:
              "Autologous plasma concentrated with your own growth factors. Applied to joints, scalp, or tissue to stimulate native healing and structural repair.",
          },
          {
            icon: "fa-mars",
            name: "P-Shot (Priapus Shot)",
            tag: "",
            description:
              "PRP-based sexual wellness protocol for men targeting erectile function, sensitivity enhancement, and Peyronie's disease management.",
          },
          {
            icon: "fa-venus",
            name: "O-Shot (Orgasm Shot)",
            tag: "",
            description:
              "PRP-based female sexual wellness protocol addressing arousal, sensation, orgasmic function, and urinary stress incontinence.",
          },
          {
            icon: "fa-leaf",
            name: "Advanced Hair Restoration",
            tag: "",
            description:
              "PRP and exosome-assisted hair restoration protocols targeting follicle stimulation, scalp health, and supporting hair density.",
          },
          {
            icon: "fa-heartbeat",
            name: "Joint & Tissue Recovery",
            tag: "",
            description:
              "Targeted PRP and exosome injections for knee, shoulder, hip, and spine conditions — reducing pain and restoring function without surgery.",
          },
        ],
      },

      science: {
        badge: "The Clinical Method",
        headline: "The Science of<br><span class=\"text-primary\">Regenerative Medicine</span>",
        body: "Regenerative medicine works by amplifying your body's own repair intelligence. Whether through autologous PRP — concentrated with your own growth factors — or exosome signaling vesicles that instruct cells to rebuild and reduce inflammation, these therapies don't mask symptoms. They direct biological repair at the source.",
        bullets: [
          "Autologous & Bio-Compatible Compounds",
          "Growth Factor Amplification",
          "Clinically Supervised Protocols",
        ],
        stats: [
          { value: "PRP", label: "Your own growth factors, concentrated" },
          { value: "3B+", label: "Exosomes per therapeutic dose" },
          { value: "0%", label: "Synthetic pharmaceuticals required" },
          { icon: "fa-shield-alt", label: "Physician-Led" },
        ],
        cards: [
          {
            icon: "fa-microscope",
            title: "Autologous Precision",
            detail:
              "PRP uses your own blood — eliminating rejection risk while delivering concentrated native growth factors directly to the target tissue.",
          },
          {
            icon: "fa-bullseye",
            title: "Exosome Signaling",
            detail:
              "Exosomes carry molecular instructions that tell damaged cells exactly how to repair themselves — the most advanced regenerative tool available.",
          },
        ],
      },

      comparison: {
        headline: "Regenerative vs. Conventional",
        subheadline: "How regenerative medicine changes the outcome equation.",
        ctaText: "Discuss Your Regenerative Options",
        mobileStats: [
          { icon: "fa-dna", label: "Cellular Repair" },
          { icon: "fa-shield-alt", label: "Natural Compounds" },
          { icon: "fa-bolt", label: "Faster Recovery" },
          { icon: "fa-heart", label: "Long-Term Results" },
        ],
        rows: [
          { metric: "Mechanism", without: "Symptom suppression", with: "Root-level cellular repair" },
          { metric: "Compounds Used", without: "Synthetic pharmaceuticals", with: "Your own biology + exosomes" },
          { metric: "Recovery Timeline", without: "Long, unpredictable", with: "Accelerated, measurable" },
          { metric: "Side Effect Profile", without: "High", with: "Minimal — bio-compatible" },
          { metric: "Long-Term Outcomes", without: "Dependency risk", with: "Durable structural improvement" },
        ],
        stacks: [
          {
            name: "The Full Repair Protocol",
            tag: "Most Comprehensive",
            compounds: "Exosomes + PRP",
            description:
              "The most advanced regenerative stack available. Combines exosome cellular signaling with concentrated growth factor delivery for maximum structural repair.",
          },
          {
            name: "Sexual Wellness Package",
            tag: "",
            compounds: "P-Shot or O-Shot + Hormone Review",
            description:
              "Comprehensive sexual health protocol pairing PRP therapy with a hormonal review to address function, sensation, and wellness from every angle.",
          },
          {
            name: "Hair Restoration Protocol",
            tag: "",
            compounds: "PRP + Exosome Scalp Therapy",
            description:
              "Dual-modality hair restoration targeting follicle activation and scalp cellular health for visible, measurable hair density improvement.",
          },
        ],
      },

      faqs: [
        {
          question: "What are exosomes and how are they different from stem cells?",
          answer:
            "Exosomes are signaling vesicles secreted by stem cells — they carry the molecular instructions that direct cellular repair. Unlike stem cells, they don't engraft or replicate. They simply deliver biological 'messages' that instruct your own cells to heal, reduce inflammation, and regenerate.",
        },
        {
          question: "Is PRP therapy painful?",
          answer:
            "PRP involves a simple blood draw and targeted injection. Topical numbing is applied to all injection sites. Most patients report minimal discomfort and return to normal activity the same day.",
        },
        {
          question: "How many sessions do I need to see results?",
          answer:
            "This depends on the indication. Most hair restoration and joint protocols require 3 sessions spaced 4–6 weeks apart. Sexual wellness protocols often show results after a single treatment, with optimal outcomes at 3 months.",
        },
        {
          question: "Is regenerative medicine covered by insurance?",
          answer:
            "Most regenerative therapies are not yet covered by standard insurance as they are elective or emerging treatments. We offer flexible financing options to make these protocols accessible.",
        },
      ],
    });
