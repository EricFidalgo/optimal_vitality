window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
      // ─── Card data ────────────────────────────────────────────────────────
      id: "skin-aesthetics",
      type: "additional",
      tabLabel: "Skin & Aesthetics",
      href: "skin-aesthetics.html",
      title: "Medical Luxury Aesthetics",
      lead: "Look as young, vital, and high-performing as you feel internally.",
      description:
        "Clinical-grade face and skin interventions designed to optimize structural symmetry, volume, and dermis vitality.",
      icon: "fa-magic",
      delay: "-4s",
      features: [
        "Advanced Neurotoxins & Fillers",
        "Biostimulators (Sculptra / Radiesse)",
        "RF Microneedling Interventions",
        "Medical-Grade Skincare Regimens",
      ],
      image: "assets/images/photos/team-group.avif",
      ctaText: "Refine Your Look",

      // ─── Page meta ────────────────────────────────────────────────────────
      pageTitle: "Medical Luxury Aesthetics — OVI Wellness",
      pageDescription:
        "Neurotoxins, fillers, biostimulators, and RF microneedling in St. Petersburg, FL. Clinical-grade aesthetic medicine at OVI Wellness.",

      heroHeadline: "Look As Good As<br><span class=\"text-primary\">You Perform</span>",
      heroCTA: "Book a Consultation",

      eligibility: {
        badge: "Clinical Candidacy",
        headline: "Who Is This Right For?",
        intro:
          "Medical aesthetics at OVI Wellness is not a spa service. Every treatment is physician-reviewed, precision-dosed, and designed around your facial anatomy — not a generalized protocol.",
        note: "A complimentary aesthetic consultation is available to determine your ideal treatment plan.",
        ctaText: "Book Your Aesthetic Consultation",
        items: [
          {
            label: "Visible Aging Signs",
            detail:
              "Adults with dynamic lines, volume loss, skin laxity, or uneven skin tone seeking clinical-grade correction.",
          },
          {
            label: "Prevention-Minded",
            detail:
              "Younger adults (25+) looking to establish a proactive aesthetic baseline before significant aging occurs.",
          },
          {
            label: "Post-Weight Loss",
            detail:
              "Patients who have undergone significant weight loss and need volume restoration or structural support.",
          },
          {
            label: "Skin Health Goals",
            detail:
              "Those targeting acne scarring, textural irregularities, hyperpigmentation, or overall dermal quality improvement.",
          },
          {
            label: "Natural Result Priority",
            detail:
              "Patients who want refined, subtle enhancement — not an overdone or artificial appearance.",
          },
        ],
      },

      protocols: {
        badge: "Our Treatments",
        sectionHeadline: "Our Aesthetic Treatments",
        sectionSubheadline:
          "Every treatment is calibrated to your anatomy, goals, and skin biology — not a cookie-cutter menu.",
        items: [
          {
            icon: "fa-syringe",
            name: "Advanced Neurotoxins",
            tag: "Most Requested",
            description:
              "Botox, Dysport, and Daxxify precisely placed to soften dynamic lines, prevent deepening, and create natural facial relaxation without rigidity.",
          },
          {
            icon: "fa-magic",
            name: "Dermal Fillers",
            tag: "",
            description:
              "Hyaluronic acid fillers (Juvederm, Restylane) for lip enhancement, cheek volume, nasolabial correction, and facial contouring with anatomical precision.",
          },
          {
            icon: "fa-star",
            name: "Biostimulators",
            tag: "",
            description:
              "Sculptra and Radiesse collagen-stimulating injectables for long-lasting volumization and structural support — results that improve over months.",
          },
          {
            icon: "fa-circle-notch",
            name: "RF Microneedling",
            tag: "",
            description:
              "Radiofrequency microneedling to stimulate collagen production, tighten skin laxity, and improve texture and scarring across the face and body.",
          },
          {
            icon: "fa-leaf",
            name: "Medical-Grade Skincare",
            tag: "",
            description:
              "Curated pharmaceutical-grade skincare regimens — retinoids, peptides, and antioxidants — designed to complement and extend your in-clinic results.",
          },
          {
            icon: "fa-sparkles",
            name: "Chemical Peels & Resurfacing",
            tag: "",
            description:
              "Medical-strength peels and laser resurfacing to address pigmentation, fine lines, acne scarring, and uneven tone at the cellular level.",
          },
        ],
      },

      science: {
        badge: "The Clinical Method",
        headline: "The Science of<br><span class=\"text-primary\">Medical Aesthetics</span>",
        body: "Medical aesthetics at OVI Wellness goes beyond surface-level cosmetics. We address the underlying biology of aging — collagen degradation, volume deflation, and cellular turnover slowdown — using precision tools that work with your skin's own architecture. Every treatment is designed to enhance structure, not simply mask decline.",
        bullets: [
          "Anatomy-Guided Injection Technique",
          "Collagen Stimulation Protocols",
          "Medical-Grade Compounds Only",
        ],
        stats: [
          { value: "95%", label: "Patient satisfaction at 3-month follow-up" },
          { value: "6–18", label: "Months duration per treatment cycle" },
          { value: "0%", label: "Synthetic or non-clinical grade products" },
          { icon: "fa-shield-alt", label: "Physician-Supervised" },
        ],
        cards: [
          {
            icon: "fa-microscope",
            title: "Structural Approach",
            detail:
              "We treat the facial skeleton, fat compartments, and dermis as an integrated system — not individual lines and wrinkles.",
          },
          {
            icon: "fa-bullseye",
            title: "Natural Outcomes",
            detail:
              "Our injectors train in advanced anatomical technique to deliver refined, balanced results that enhance — not alter — your natural features.",
          },
        ],
      },

      comparison: {
        headline: "Medical Aesthetics vs. Med Spa",
        subheadline: "The clinical difference is measurable.",
        ctaText: "Discuss Your Aesthetic Goals",
        mobileStats: [
          { icon: "fa-user-md", label: "Physician-Led" },
          { icon: "fa-star", label: "Natural Results" },
          { icon: "fa-shield-alt", label: "Clinical Safety" },
          { icon: "fa-clock", label: "Lasting Outcomes" },
        ],
        rows: [
          { metric: "Provider Credentials", without: "Esthetician / nurse injector", with: "Physician-supervised protocol" },
          { metric: "Anatomical Approach", without: "Generalized technique", with: "Patient-specific mapping" },
          { metric: "Product Quality", without: "Varied sources", with: "FDA-approved medical grade" },
          { metric: "Safety Oversight", without: "Limited medical review", with: "Full clinical supervision" },
          { metric: "Result Duration", without: "3–4 months typical", with: "6–18 months optimized" },
        ],
        stacks: [
          {
            name: "The Refresh Protocol",
            tag: "Most Popular",
            compounds: "Neurotoxin + Filler",
            description:
              "The classic combination — neurotoxin softens dynamic lines while strategic filler restores lost volume and facial contour for a naturally refreshed appearance.",
          },
          {
            name: "The Collagen Revival",
            tag: "",
            compounds: "Biostimulator + RF Microneedling",
            description:
              "Long-game structural improvement. Sculptra or Radiesse layered with RF microneedling to rebuild collagen architecture and restore skin quality from within.",
          },
          {
            name: "The Full Restoration",
            tag: "Most Comprehensive",
            compounds: "Neurotoxin + Filler + Biostimulator + Skincare",
            description:
              "A complete medical aesthetic program addressing every dimension of facial aging — movement, volume, structure, and skin quality — in a sequenced protocol.",
          },
        ],
      },

      faqs: [
        {
          question: "How long do neurotoxin results last?",
          answer:
            "Most patients enjoy 3–4 months of results with first-time treatments. With consistent treatment cycles, many patients find their results extend to 5–6 months as the underlying muscle activity trains to reduce.",
        },
        {
          question: "Is there downtime after filler or neurotoxin treatments?",
          answer:
            "Neurotoxins have virtually no downtime — most patients return to normal activity immediately. Fillers may cause mild bruising or swelling for 24–72 hours depending on the treatment area and individual response.",
        },
        {
          question: "What is the difference between fillers and biostimulators?",
          answer:
            "Fillers (like Juvederm) provide immediate volumization using hyaluronic acid — they add volume instantly but are eventually absorbed. Biostimulators (like Sculptra) stimulate your own collagen production over time, providing structural improvement that lasts 2+ years.",
        },
        {
          question: "Do you use numbing for injections?",
          answer:
            "Yes. We apply topical anesthetic cream before all injection procedures and use the finest gauge needles available. The majority of our filler products also contain lidocaine for additional in-process comfort.",
        },
      ],
    });
