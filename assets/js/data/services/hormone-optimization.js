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
      // ─── Card data (used on index.html) ───────────────────────────────────
      id: "hormone-optimization",
      type: "core",
      tabLabel: "Hormone Optimization",
      href: "hormone-optimization.html",
      title: "Feel Young, Strong & Full of Energy Again",
      lead: "Tired of feeling worn out? We balance your body’s natural energy so you can thrive every day.",
      description:
        "When your hormones drop, you feel tired, gain weight, and lose focus. Our doctors run simple blood tests and create a custom plan to give you back your strength, focus, and drive.",
      icon: "fa-syringe",
      delay: "0s",
      features: [
        "Reclaim high daily energy & focus",
        "Build lean muscle & burn body fat",
        "Enjoy deep sleep & better mood",
        "100% doctor-checked for your safety",
      ],
      image: "assets/images/photos/trt-therapy.jpg",
      ctaText: "Book Your Consultation",

      // ─── Page-level meta ──────────────────────────────────────────────────
      pageTitle: "Precision Hormone Optimization — OVI Wellness",
      pageDescription:
        "Doctor-led bio-identical hormone therapy in St. Petersburg, FL. TRT, women's HRT, and peptide-assisted optimization protocols tailored to your biomarkers.",

      // ─── Hero ─────────────────────────────────────────────────────────────
      heroHeadline: "Reclaim Your<br><span class=\"text-primary\">Hormonal</span> Edge",
      heroCTA: "Start Your Protocol",

      /*
      transformations: {
        headline: "Clinical Transformations",
        subheadline: "Visual evidence of optimized hormone levels and body composition.",
        items: [
          {
            imageAfter: "assets/images/photos/TRT.jpg",
            imageBefore: "assets/images/photos/TRT.jpg",
            badgeAfter: "Optimized",
            badgeBefore: "Baseline",
            title: "Hormonal Rebalance",
            protocol: "TRT Protocol",
            description: "Patient experienced significant improvements in lean mass, energy levels, and cognitive function after 12 weeks of therapy."
          }
        ]
      },
      */
      
      quiz: {
        badge: "Clinical Self-Assessment",
        headline: "Find Your Protocol",
        subheadline: "Answer 3 quick questions to help us identify the best hormone strategy for you.",
        step1: {
          question: "What is your main symptom?",
          sub: "Your primary symptom guides our initial evaluation.",
          options: [
            { value: "energy", icon: "fa-battery-quarter", title: "Low Energy", desc: "Chronic fatigue and midday crashes." },
            { value: "libido", icon: "fa-fire", title: "Decreased Libido", desc: "Loss of intimacy and sexual drive." },
            { value: "muscle", icon: "fa-dumbbell", title: "Muscle Loss", desc: "Decreased strength and increased body fat." }
          ]
        },
        step2: {
          question: "How long have you felt this way?",
          sub: "Understanding the timeline is critical.",
          options: [
            { value: "months", icon: "fa-calendar", title: "A few months", desc: "Recent decline in vitality." },
            { value: "years", icon: "fa-calendar-alt", title: "Years", desc: "Long-term sub-optimal performance." }
          ]
        },
        step3: {
          question: "Have you had your hormones tested recently?",
          sub: "Recent labs give us a starting point.",
          options: [
            { value: "yes", icon: "fa-vial", title: "Yes", desc: "Within the last 6 months." },
            { value: "no", icon: "fa-times", title: "No", desc: "Need full baseline panel." }
          ]
        },
        protocols: {
          energy: {
            tag: "Vitality & Focus",
            name: "The Endocrine Rejuvenation Stack",
            peptides: "Bio-Identical Testosterone / Hormone Therapy",
            icon: "fa-battery-quarter",
            desc: "Built to resolve systemic fatigue by restoring bio-identical hormone levels to their physiologic peak. Promotes mental sharpness, all-day stamina, and better sleep.",
            goalModifiers: {
              yes: "Since you have recent labs, we will review them immediately to establish a personalized starting dose.",
              no: "We will arrange a comprehensive baseline biomarker panel to identify exact deficiencies before beginning treatment."
            },
            social: "94 patients with your profile started this protocol in the last 60 days."
          },
          libido: {
            tag: "Sexual Wellness & Intimacy",
            name: "The Peak Intimacy Protocol",
            peptides: "Hormone Therapy + Growth Factor Support",
            icon: "fa-fire",
            desc: "Targeted therapy to restore physical responsiveness, intimate drive, and overall vitality using precise, individual hormone balancing.",
            goalModifiers: {
              yes: "We can expedite your optimization plan by review of your existing lab panel.",
              no: "We will prescribe a customized diagnostic lab order to pinpoint underlying hormone imbalances."
            },
            social: "73 patients with your profile completed this protocol recently."
          },
          muscle: {
            tag: "Anabolic Optimization",
            name: "The Recomposition & Strength Stack",
            peptides: "TRT / Bio-Identical HRT + Growth Hormone Peptides",
            icon: "fa-dumbbell",
            desc: "Formulated to reverse age-related muscle loss, accelerate exercise recovery times, and decrease abdominal fat deposition.",
            goalModifiers: {
              yes: "Your recent labs will guide initial dosing to safely trigger optimal protein synthesis and fat metabolism.",
              no: "A baseline hormone panel will be ordered to map your total and free hormone levels before designing the stack."
            },
            social: "104 patients with your profile are currently running this protocol."
          }
        },
        timelineMap: {
          months: "8–12 weeks",
          years: "12–16 weeks"
        }
      },

      // ─── Eligibility (Who Is This Right For) ─────────────────────────────
      eligibility: {
        badge: "Clinical Candidacy",
        headline: "Who Is This Right For?",
        intro:
          "Hormone optimization is a precision clinical tool — not a generic supplement. We design bespoke protocols driven entirely by your biomarker data, requiring baseline bloodwork and ongoing medical supervision.",
        note: "Not sure if you qualify? Our medical team reviews every case individually to design your personalized protocol.",
        ctaText: "Am I a Candidate? Let's Talk",
        items: [
          {
            label: "Age & Symptoms",
            detail:
              "Adults 30–65 experiencing fatigue, brain fog, low libido, weight gain, or mood changes without a clear cause.",
          },
          {
            label: "Suboptimal Lab Results",
            detail:
              "Lab work indicating low or imbalanced testosterone, estrogen, progesterone, cortisol, or thyroid markers.",
          },
          {
            label: "Prior Treatment Failures",
            detail:
              "Tried lifestyle adjustments, supplements, or primary care interventions without lasting hormonal improvement.",
          },
          {
            label: "Performance Plateau",
            detail:
              "Athletes or high-performers whose training output, recovery speed, or cognitive focus has stagnated.",
          },
          {
            label: "Diagnostics Ready",
            detail:
              "Willing to complete baseline bloodwork and follow a medically supervised protocol for full optimization.",
          },
        ],
      },

      // ─── Protocols (service options cards) ────────────────────────────────
      protocols: {
        badge: "Our Protocols",
        sectionHeadline: "Our Hormone Protocols",
        sectionSubheadline:
          "Every protocol is engineered around your specific bloodwork — not a one-size-fits-all approach.",
        items: [
          {
            icon: "fa-syringe",
            name: "Testosterone Replacement (TRT)",
            tag: "Most Popular",
            description:
              "Clinically calibrated testosterone protocols for men experiencing andropause, low energy, or performance decline. Subcutaneous or IM injection formats.",
          },
          {
            icon: "fa-venus",
            name: "Women's Hormone Therapy",
            tag: "",
            description:
              "Bio-identical estrogen, progesterone, and testosterone balancing for women managing perimenopause, menopause, or hormonal dysregulation.",
          },
          {
            icon: "fa-vial",
            name: "Peptide-Assisted Optimization",
            tag: "",
            description:
              "Synergistic peptide stacks layered on top of hormone protocols to amplify recovery, growth hormone output, and systemic cellular repair.",
          },
          {
            icon: "fa-heart",
            name: "Sexual Wellness Protocols",
            tag: "",
            description:
              "PT-141, Kisspeptin, and hormone-balancing therapies designed to restore libido, function, and intimate wellness for both men and women.",
          },
          {
            icon: "fa-shield-alt",
            name: "Thyroid & Adrenal Support",
            tag: "",
            description:
              "Comprehensive thyroid optimization and adrenal fatigue recovery protocols to restore energy regulation and metabolic function.",
          },
          {
            icon: "fa-flask",
            name: "Longevity Panels",
            tag: "",
            description:
              "Full advanced biomarker panels to establish baselines and track optimization progress across all systemic hormone levels.",
          },
        ],
      },

      // ─── Science / How It Works ───────────────────────────────────────────
      science: {
        badge: "The Clinical Method",
        headline: "The Science of<br><span class=\"text-primary\">Hormone Optimization</span>",
        body: "Think of hormones as your body's operating system. When levels drop below optimal thresholds — through aging, stress, or lifestyle — every system degrades. Bio-identical hormone therapy replaces exactly what's missing using compounds molecularly identical to what your body naturally produces, restoring the precise chemical environment for peak function.",
        bullets: [
          "100% Bio-Identical Compounds",
          "Biomarker-Driven Dosing",
          "Ongoing Lab Monitoring",
        ],
        stats: [
          { value: "87%", label: "Report improved energy within 6 weeks" },
          { value: "3×", label: "Average increase in treatment satisfaction vs. OTC" },
          { value: "0%", label: "Synthetic fillers — pharmacy-grade only" },
          { icon: "fa-shield-alt", label: "FDA Rx" },
        ],
        cards: [
          {
            icon: "fa-microscope",
            title: "Biomarker-Driven",
            detail:
              "Every dose is calculated from your specific blood panels — not population averages or guesswork.",
          },
          {
            icon: "fa-bullseye",
            title: "Systemic Precision",
            detail:
              "Unlike synthetic drugs, bio-identical hormones match your body's exact molecular signature for seamless integration.",
          },
        ],
      },

      // ─── Myths ──────────────────────────────────────────────────────────────
      myths: [
        {
          myth: "Aren't these just steroids?",
          reality: "Hormone optimization uses bio-identical hormones—exact molecular matches to what your body naturally produces. We target healthy clinical levels, not supra-physiological 'steroid' levels, designed to promote safety and natural function."
        },
        {
          myth: "Will I need to do this forever?",
          reality: "While optimization is a long-term commitment to feeling your best, protocols are managed around your goals. If you stop, your body simply returns to its pre-treatment baseline. Most patients feel so much better they choose to continue."
        },
        {
          myth: "Is this safe for long-term health?",
          reality: "Clinical data indicates that maintaining optimized hormone levels may provide supportive benefits for cardiovascular health, bone density, and cognitive function as we age, provided it is managed through rigorous physician oversight."
        }
      ],

      // ─── Comparison table ──────────────────────────────────────────────────
      comparison: {
        headline: "Optimized vs. Unoptimized",
        subheadline:
          "See the measurable difference a data-driven hormone protocol makes.",
        ctaText: "Discuss Your Hormone Goals",
        mobileStats: [
          { icon: "fa-bolt", label: "Energy: Restored" },
          { icon: "fa-brain", label: "Mental Clarity" },
          { icon: "fa-dumbbell", label: "Muscle Retention" },
          { icon: "fa-moon", label: "Deep Sleep Restored" },
        ],
        rows: [
          { metric: "Energy Levels", without: "Chronic fatigue", with: "Sustained daily output" },
          { metric: "Body Composition", without: "Fat gain, muscle loss", with: "Lean mass preserved" },
          { metric: "Cognitive Function", without: "Brain fog, poor focus", with: "Sharp, clear thinking" },
          { metric: "Sleep Quality", without: "Disrupted, non-restorative", with: "Deep, regenerative sleep" },
          { metric: "Libido", without: "Significantly reduced", with: "Fully restored" },
        ],
        stacks: [
          {
            name: "The Male Performance Protocol",
            tag: "Most Popular",
            tagIcon: "",
            compounds: "TRT + Peptide-Assisted Stack",
            description:
              "Foundational testosterone optimization layered with growth-factor peptides. Targets lean muscle, energy, mental acuity, and sexual wellness simultaneously.",
          },
          {
            name: "Women's Vitality Protocol",
            tag: "",
            compounds: "Estrogen + Progesterone + Low-Dose T",
            description:
              "Comprehensive female hormone balance for perimenopause and post-menopause. Addresses mood, energy, body composition, and cognitive clarity.",
          },
          {
            name: "The Longevity & Recovery Stack",
            tag: "",
            compounds: "Full Panel + Thyroid + Adrenal Support",
            description:
              "A complete systems-level hormone audit and optimization protocol for those seeking long-term anti-aging and health span extension.",
          },
        ],
      },

      // ─── FAQs ──────────────────────────────────────────────────────────────
      faqs: [
        {
          question: "What does the TRT program include?",
          answer:
            "Our TRT program provides comprehensive, medically supervised hormone optimization. It includes ongoing physician consultations, extensive routine biomarker blood panels, and custom-dosed, pharmacy-grade bio-identical testosterone to ensure your levels remain precisely optimized.",
        },
        {
          question: "How long until I feel results from hormone therapy?",
          answer:
            "Most patients report improved energy and mood within 2–4 weeks. Significant changes in body composition, libido, and cognitive function typically emerge at 6–12 weeks as hormone levels stabilize at optimal ranges.",
        },
        {
          question: "Is hormone therapy safe for women?",
          answer:
            "Yes. Bio-identical hormone therapy for women is extensively studied and, when properly dosed and monitored, carries an excellent safety profile. Our protocols are guided by current clinical guidelines and your individual lab results.",
        },
        {
          question: "Do I need bloodwork before starting?",
          answer:
            "Absolutely. We never prescribe without baseline diagnostics. Bloodwork is the foundation of your entire protocol — it defines your starting point and allows us to measure your optimization progress precisely.",
        },
      ],
    });
