window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
      // ─── Card data ────────────────────────────────────────────────────────
      id: "regenerative-medicine",
      type: "additional",
      tabLabel: "Regenerative Medicine",
      href: "regenerative-medicine.html",
      title: "Advanced Regenerative Modalities",
      lead: "Harness your body's native biological markers for deep cellular repair.",
      description:
        "Cutting-edge anti-aging and autologous tissue therapies engineered to reverse systemic degradation and restore structural health.",
      icon: "fa-heartbeat",
      delay: "-3s",
      features: [
        "Exosome Cellular Therapies",
        "Platelet-Rich Plasma (PRP)",
        "P-Shot & O-Shot Performance",
        "Advanced Hair Restoration",
      ],
      image: "assets/images/photos/IV.jpg",
      ctaText: "Explore Regeneration",

      // ─── Page meta ────────────────────────────────────────────────────────
      pageTitle: "Advanced Regenerative Medicine — OVI Wellness",
      pageDescription:
        "Exosome therapy, PRP, P-Shot, O-Shot, and hair restoration in St. Petersburg, FL. Doctor-led regenerative medicine protocols at OVI Wellness.",

      heroHeadline: "Regenerate.<br><span class=\"text-primary\">Restore.</span> Rebuild.",
      heroCTA: "Start Your Protocol",

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
              "PRP and exosome-assisted hair restoration protocols targeting follicle stimulation, scalp health, and androgenic hair loss reversal.",
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
