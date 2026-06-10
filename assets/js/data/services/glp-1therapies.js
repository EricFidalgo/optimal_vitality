window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
      // ─── Card data ────────────────────────────────────────────────────────
      id: "glp-1therapies",
      type: "core",
      tabLabel: "GLP-1 Therapies",
      href: "glp-1therapies.html",
      title: "Metabolic Optimization & Weight Loss",
      lead: "Advanced, medically supervised protocols utilizing next-generation metabolic therapies.",
      description:
        "We look beyond the scale at your direct metabolic markers to shed adipose tissue while preserving vital lean muscle mass.",
      icon: "fa-weight-scale",
      delay: "-1s",
      features: [
        "Retatrutide Protocols",
        "Tirzepatide & Semaglutide",
        "Metabolic Optimization Panels",
        "Nutritional Architecture",
      ],
      image: "assets/images/photos/PA.png",
      ctaText: "Optimize Metabolism",

      // ─── Page meta ────────────────────────────────────────────────────────
      pageTitle: "Medical Weight Loss & GLP-1 Therapies — OVI Wellness",
      pageDescription:
        "Medically supervised GLP-1 and metabolic weight loss protocols in St. Petersburg, FL. Semaglutide, Tirzepatide, and Retatrutide — doctor-led and biomarker-driven.",

      heroHeadline: "Metabolic<br><span class=\"text-primary\">Optimization</span> Redefined",
      heroCTA: "Start Your Protocol",

      transformations: {
        headline: "Clinical Transformations",
        subheadline: "Visual evidence of optimized body composition and metabolic health.",
        items: [
          {
            imageAfter: "assets/images/photos/glp-after.jpg",
            imageBefore: "assets/images/photos/glp-before.jpg",
            badgeAfter: "Week 16",
            badgeBefore: "Baseline",
            title: "Sustainable Weight Loss",
            protocol: "Tirzepatide Optimization",
            description: "Patient achieved a 15% reduction in total body weight while preserving lean muscle mass and improving metabolic markers."
          }
        ]
      },
      
      quiz: {
        badge: "Clinical Self-Assessment",
        headline: "Find Your Protocol",
        subheadline: "Answer 3 quick questions to help us identify the best GLP-1 strategy for you.",
        step1: {
          question: "What's your primary goal?",
          sub: "Your goal dictates the compound and dosing strategy.",
          options: [
            { value: "weight", icon: "fa-weight", title: "Weight Loss", desc: "Significant reduction in body fat." },
            { value: "metabolic", icon: "fa-heartbeat", title: "Metabolic Health", desc: "Improve A1C, insulin sensitivity, and overall markers." }
          ]
        },
        step2: {
          question: "Have you tried GLP-1s before?",
          sub: "Past experience helps us adjust your starting dose.",
          options: [
            { value: "no", icon: "fa-times-circle", title: "Never", desc: "First time using these therapies." },
            { value: "yes", icon: "fa-check-circle", title: "Yes", desc: "Have used Semaglutide or Tirzepatide in the past." }
          ]
        },
        step3: {
          question: "How much weight do you want to lose?",
          sub: "Sets realistic timelines for your protocol.",
          options: [
            { value: "moderate", icon: "fa-arrow-down", title: "10-20 lbs", desc: "Targeted fat loss." },
            { value: "significant", icon: "fa-arrow-circle-down", title: "20+ lbs", desc: "Major body recomposition." }
          ]
        },
        protocols: {
          weight: {
            tag: "Active Weight Management",
            name: "The Metabolic Recomposition Protocol",
            peptides: "Semaglutide or Tirzepatide",
            icon: "fa-weight-scale",
            desc: "A precision dosing schedule paired with lipotropic agents to target stubborn fat stores while actively preserving lean muscle tissue.",
            goalModifiers: {
              moderate: "Targeted for 10-20 lbs of fat loss, focusing on metabolic efficiency and sustainable lifestyle integration.",
              significant: "Indicates a 20+ lbs weight loss goal, using progressive titration for long-term body recomposition."
            },
            social: "112 patients with your profile are currently running this protocol."
          },
          metabolic: {
            tag: "Metabolic Optimization",
            name: "The Systemic Balance Protocol",
            peptides: "Tirzepatide + Bio-Identical Support",
            icon: "fa-heartbeat",
            desc: "Designed specifically to address cellular insulin sensitivity, stabilize blood glucose markers, and optimize lipid profiles.",
            goalModifiers: {
              moderate: "Focused on correcting moderate metabolic stall and improving baseline daily energy.",
              significant: "Designed for significant metabolic restoration, aiming to reset systemic inflammatory markers and pancreatic efficiency."
            },
            social: "84 patients with your profile completed this protocol in the last 90 days."
          }
        },
        timelineMap: {
          no: "12–16 weeks (Standard Titration)",
          yes: "8–12 weeks (Accelerated Titration)"
        }
      },

      eligibility: {
        badge: "Clinical Candidacy",
        headline: "Who Is This Right For?",
        intro:
          "Our metabolic protocols are precision clinical tools — not crash diets. We evaluate your full metabolic panel before prescribing anything, ensuring every intervention is evidence-based and safe.",
        note: "Not sure if you qualify? Our clinical team reviews every case individually.",
        ctaText: "Am I a Candidate? Let's Talk",
        items: [
          {
            label: "BMI & Weight Profile",
            detail:
              "Adults with a BMI of 27+ with at least one metabolic comorbidity, or BMI 30+ seeking medically supervised fat loss.",
          },
          {
            label: "Stalled Fat Loss",
            detail:
              "Individuals who have hit a plateau despite consistent caloric management and structured exercise routines.",
          },
          {
            label: "Metabolic Risk Factors",
            detail:
              "Elevated triglycerides, insulin resistance, pre-diabetes, or elevated fasting glucose markers.",
          },
          {
            label: "Muscle Preservation Priority",
            detail:
              "Those who want to lose adipose tissue while maintaining or building lean muscle mass — not just 'weight loss.'",
          },
          {
            label: "Diagnostics Ready",
            detail:
              "Willing to complete metabolic bloodwork and engage with ongoing nutritional and medical supervision.",
          },
        ],
      },

      protocols: {
        badge: "Our Protocols",
        sectionHeadline: "Our Metabolic Protocols",
        sectionSubheadline:
          "Next-generation compounds prescribed based on your metabolic markers — not a generic plan.",
        items: [
          {
            icon: "fa-weight-scale",
            name: "Semaglutide (Ozempic®)",
            tag: "Most Prescribed",
            description:
              "GLP-1 receptor agonist that reduces appetite signaling and improves insulin sensitivity. Weekly subcutaneous injection with consistent, measurable fat loss results.",
          },
          {
            icon: "fa-fire",
            name: "Tirzepatide (Mounjaro®)",
            tag: "",
            description:
              "Dual GIP/GLP-1 agonist delivering superior fat loss versus single-mechanism agents. Clinically demonstrated 20%+ body weight reduction in trials.",
          },
          {
            icon: "fa-dna",
            name: "Retatrutide",
            tag: "Cutting Edge",
            description:
              "Triple receptor agonist (GLP-1, GIP, glucagon) representing the next frontier of metabolic medicine. Highest efficacy of any current weight loss compound.",
          },
          {
            icon: "fa-leaf",
            name: "Lipotropic Injections",
            tag: "",
            description:
              "MIC and B12 lipotropic injectables to accelerate fat metabolism, liver detoxification, and energy production — a powerful complement to GLP-1 protocols.",
          },
          {
            icon: "fa-chart-line",
            name: "Metabolic Optimization Panels",
            tag: "",
            description:
              "Advanced lab work including insulin resistance scores, fasting glucose, lipid panels, and thyroid markers to establish your true metabolic baseline.",
          },
          {
            icon: "fa-utensils",
            name: "Nutritional Architecture",
            tag: "",
            description:
              "Clinical nutritional guidance designed to preserve lean muscle during fat loss, calibrated around your protocol and biomarker response.",
          },
        ],
      },

      science: {
        badge: "The Clinical Method",
        headline: "The Science of<br><span class=\"text-primary\">Metabolic Medicine</span>",
        body: "GLP-1 receptor agonists work by mimicking natural gut hormones that regulate appetite, insulin secretion, and gastric emptying. Unlike stimulant-based diet pills, they work with your body's own signaling pathways — reducing hunger at the neurological level, not through willpower. The result is sustainable, medically supervised fat loss that preserves lean tissue.",
        bullets: [
          "Pharmacy-Grade Compounded Compounds",
          "Biomarker-Driven Dosing",
          "Muscle-Preserving Protocols",
        ],
        stats: [
          { value: "20%", label: "Average body weight reduction in clinical trials" },
          { value: "2×", label: "Faster fat loss vs. diet and exercise alone" },
          { value: "0%", label: "Stimulants — no crash, no dependency" },
          { icon: "fa-shield-alt", label: "FDA Rx" },
        ],
        cards: [
          {
            icon: "fa-brain",
            title: "Neurological Appetite Control",
            detail:
              "GLP-1 agonists directly signal the brain's satiety centers — reducing hunger at the source, not masking it.",
          },
          {
            icon: "fa-dumbbell",
            title: "Muscle-First Fat Loss",
            detail:
              "Our protocols pair metabolic agents with protein targets and peptides to ensure lean mass is preserved throughout fat loss.",
          },
        ],
      },

      comparison: {
        headline: "Medically Supervised vs. On Your Own",
        subheadline:
          "The difference between a clinical metabolic protocol and unsupervised weight loss.",
        ctaText: "Discuss Your Weight Loss Goals",
        mobileStats: [
          { icon: "fa-fire", label: "Active Fat Burn" },
          { icon: "fa-dumbbell", label: "Muscle Preserved" },
          { icon: "fa-brain", label: "Hunger Controlled" },
          { icon: "fa-chart-line", label: "Progress Tracked" },
        ],
        rows: [
          { metric: "Fat Loss Rate", without: "Slow, inconsistent", with: "Accelerated, consistent" },
          { metric: "Muscle Retention", without: "Often sacrificed", with: "Actively preserved" },
          { metric: "Hunger Control", without: "Willpower-dependent", with: "Neurologically managed" },
          { metric: "Metabolic Markers", without: "Unmonitored", with: "Lab-tracked monthly" },
          { metric: "Protocol Adjustments", without: "None", with: "Data-driven and ongoing" },
        ],
        stacks: [
          {
            name: "The Accelerator Protocol",
            tag: "Most Popular",
            compounds: "Tirzepatide + Lipotropics",
            description:
              "Dual-mechanism fat loss with lipotropic support. Maximizes adipose reduction while protecting lean muscle — the clinical gold standard for rapid, sustainable results.",
          },
          {
            name: "The Foundation Protocol",
            tag: "",
            compounds: "Semaglutide + Nutritional Architecture",
            description:
              "Proven GLP-1 therapy paired with structured nutritional guidance. Ideal for first-time patients seeking medically supervised, steady-state fat loss.",
          },
          {
            name: "The Elite Metabolic Stack",
            tag: "Cutting Edge",
            compounds: "Retatrutide + Full Metabolic Panel",
            description:
              "The most advanced metabolic protocol available. Triple receptor activation for maximum efficacy, guided by comprehensive metabolic bloodwork.",
          },
        ],
      },

      faqs: [
        {
          question: "How does the Metabolic Weight Loss program work?",
          answer:
            "We utilize advanced metabolic therapies like Semaglutide or Tirzepatide combined with lipotropic injectables. Your protocol is guided by metabolic lab markers and includes medical supervision, nutritional advising, and progress tracking to accelerate fat loss while preserving lean muscle.",
        },
        {
          question: "What is the difference between Semaglutide and Tirzepatide?",
          answer:
            "Semaglutide is a single GLP-1 receptor agonist, while Tirzepatide activates both GIP and GLP-1 receptors. Clinical trials show Tirzepatide produces greater weight loss on average. Your clinician will recommend the right agent based on your metabolic panel and health history.",
        },
        {
          question: "Will I lose muscle mass on these medications?",
          answer:
            "Not with our protocol. We actively pair metabolic agents with protein targets, resistance training guidance, and where appropriate, peptide support to ensure lean muscle is preserved while adipose tissue is reduced.",
        },
        {
          question: "How long do I need to stay on GLP-1 therapy?",
          answer:
            "Protocol duration is highly individual. Most patients achieve their target weight in 6–18 months. We then work on a maintenance and tapering plan to sustain results long-term without indefinite medication dependence.",
        },
      ],
    });
