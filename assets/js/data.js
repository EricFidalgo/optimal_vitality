// scripts/data.js
const clinicData = {
    navigation: [
        { label: "Treatments", href: "index.html#core-therapies" },
        { label: "Team", href: "index.html#team" },
        { label: "FAQs", href: "index.html#faqs" }
    ],
    services: [
        {
            id: "hormone-optimization",
            type: "core",
            tabLabel: "Hormone Optimization",
            href: "hormone-optimization.html",
            title: "Precision Hormone Optimization",
            lead: "Reclaim your edge, build lean muscle, and target cognitive vitality.",
            description: "Bespoke bio-identical protocols tailored directly to your biomarker data to optimize physical and systemic performance.",
            icon: "fa-syringe",
            delay: "0s",
            features: [
                "TRT (Testosterone Replacement)",
                "Women’s Hormone Therapy",
                "Peptide-Assisted Optimization",
                "Sexual Wellness Protocols"
            ],
            image: "assets/images/photos/TRT.jpg",
            ctaText: "Optimize Hormones"
        },
        {
            id: "weight-loss",
            type: "core",
            tabLabel: "Medical Weight Loss",
            href: "weight-loss.html",
            title: "Metabolic Optimization & Weight Loss",
            lead: "Advanced, medically supervised protocols utilizing next-generation metabolic therapies.",
            description: "We look beyond the scale at your direct metabolic markers to shed adipose tissue while preserving vital lean muscle mass.",
            icon: "fa-weight-scale",
            delay: "-1s",
            features: [
                "Retatrutide Protocols",
                "Tirzepatide & Semaglutide",
                "Metabolic Optimization Panels",
                "Nutritional Architecture"
            ],
            image: "assets/images/photos/PA.png",
            ctaText: "Optimize Metabolism"
        },
        {
            id: "peptides",
            type: "core",
            tabLabel: "Peptide Therapy",
            href: "peptides.html",
            title: "Peptide Therapy & Cellular Signaling",
            lead: "Targeted amino acid sequences engineered to direct specific cellular functions.",
            description: "Pure, pharmacy-grade peptide stacks designed for tissue repair, accelerated healing, and acute cellular optimization.",
            icon: "fa-vial",
            delay: "-2s",
            features: [
                "Tissue Repair & Regeneration (BPC-157 / TB500)",
                "Growth Hormone Secretagogues (Tesamorelin / Ipamorelin)",
                "Cellular Energy & Longevity (NAD+)",
                "Specialized Recovery Protocols"
            ],
            image: "assets/images/photos/peptide.jpg",
            ctaText: "Explore Peptides"
        },
        {
            id: "regenerative-medicine",
            type: "additional",
            tabLabel: "Regenerative Medicine",
            href: "regenerative-medicine.html",
            title: "Advanced Regenerative Modalities",
            lead: "Harness your body's native biological markers for deep cellular repair.",
            description: "Cutting-edge anti-aging and autologous tissue therapies engineered to reverse systemic degradation and restore structural health.",
            icon: "fa-heartbeat",
            delay: "-3s",
            features: [
                "Exosome Cellular Therapies",
                "Platelet-Rich Plasma (PRP)",
                "P-Shot & O-Shot Performance",
                "Advanced Hair Restoration"
            ],
            image: "assets/images/photos/IV.jpg",
            ctaText: "Explore Regeneration"
        },
        {
            id: "skin-aesthetics",
            type: "additional",
            tabLabel: "Skin & Aesthetics",
            href: "skin-aesthetics.html",
            title: "Medical Luxury Aesthetics",
            lead: "Look as young, vital, and high-performing as you feel internally.",
            description: "Clinical-grade face and skin interventions designed to optimize structural symmetry, volume, and dermis vitality.",
            icon: "fa-magic",
            delay: "-4s",
            features: [
                "Advanced Neurotoxins & Fillers",
                "Biostimulators (Sculptra / Radiesse)",
                "RF Microneedling Interventions",
                "Medical-Grade Skincare Regimens"
            ],
            image: "assets/images/photos/team-group.avif",
            ctaText: "Refine Your Look"
        },
        {
            id: "iv-wellness",
            type: "additional",
            tabLabel: "IV & Wellness",
            href: "iv-wellness.html",
            title: "Drip Culture: Total Hydration & Nutrients",
            lead: "Bypass your digestive ecosystem for immediate 100% nutrient bioavailability.",
            description: "Intravenous delivery systems that supply vital antioxidants, clean hydration, and micronutrients straight to the cell matrix.",
            icon: "fa-tint",
            delay: "-5s",
            features: [
                "Custom IV Micronutrient Therapy",
                "High-Dose NAD+ Infusions",
                "Vitamin Co-Factor Injections",
                "Athletic & Performance Recovery"
            ],
            image: "assets/images/photos/IV.jpg",
            ctaText: "Join The Membership"
        }
    ],

    team: [
        {
            name: "Dr. Marcus Vance",
            role: "Chief Medical Officer",
            bio: "Board-certified specialist in anti-aging medicine and bio-identical hormone optimization, guiding precision protocols for systemic longevity.",
            image: "images/med-director.jpg"
        },
        {
            name: "Sarah Jenkins, FNP-C",
            role: "Lead Clinical Specialist",
            bio: "Expert in targeted peptide therapies and advanced metabolic weight loss programming to preserve lean muscle mass.",
            image: "images/clin-specialist.jpg"
        },
        {
            name: "David Chen, RN",
            role: "Infusion Director",
            bio: "Overseeing our Drip Culture division, ensuring perfect bioavailability and safety for all NAD+ and Glutathione longevity infusions.",
            image: "images/iv-specialist.jpg"
        }
    ],

    testimonials: [
        {
            initials: "JT",
            name: "James T.",
            tag: "TRT PATIENT",
            quote: "The TRT program completely changed my life. Within two months, my brain fog lifted and my energy levels are back to where they were in my 20s. The medical team here is incredibly thorough and precise with the bloodwork."
        },
        {
            initials: "SM",
            name: "Sarah M.",
            tag: "METABOLIC OPTIMIZATION",
            quote: "I've struggled with weight loss for years. The metabolic protocol, combined with their nutritional guidance, helped me drop 35 pounds while keeping my muscle. It's the first time a clinic actually looked at my metabolic markers instead of just a scale."
        },
        {
            initials: "MR",
            name: "Michael R.",
            tag: "IV THERAPY MEMBER",
            quote: "The Drip Culture membership is my secret weapon. As a frequent traveler, the NAD+ and Glutathione IVs keep my immune system bulletproof and my energy perfectly balanced. The infusion suite is a fantastic experience."
        },
        {
            initials: "DL",
            name: "David L.",
            tag: "PEPTIDE THERAPY",
            quote: "The targeted protocols accelerated my recovery faster than anything else I've tried. They truly focus on precision and getting your body to operate efficiently. Highly recommend this clinic."
        },
        {
            initials: "EK",
            name: "Elena K.",
            tag: "LONGEVITY PROTOCOLS",
            quote: "A truly concierge medical experience. I feel ten years younger after consistently utilizing their aesthetic and wellness treatments. The staff is incredible."
        },
        {
            initials: "KT",
            name: "Kyle T.",
            tag: "TRT PATIENT",
            quote: "These peptides are truly the bomb. I feel like I'm 20 years old again."
        }
    ],

    faqs: [
        {
            question: "What does the TRT program include?",
            answer: "Our TRT program provides comprehensive, medically supervised hormone optimization. It includes ongoing physician consultations, extensive routine biomarker blood panels, and custom-dosed, pharmacy-grade bio-identical testosterone to ensure your levels remain precisely optimized."
        },
        {
            question: "How does the Metabolic Weight Loss program work?",
            answer: "We utilize advanced metabolic therapies like Semaglutide or Tirzepatide combined with lipotropic injectables. Your protocol is guided by metabolic lab markers and includes medical supervision, nutritional advising, and progress tracking to accelerate fat loss while preserving lean muscle."
        },
        {
            question: "How long does it take to see results?",
            answer: "Results depend entirely on the therapy. IV Therapy yields immediate improvements in hydration and energy. For TRT and Peptides, patients often notice enhanced mental clarity and sleep within weeks, while profound changes in body composition and tissue repair typically require 3 to 6 months of consistent adherence."
        },
        {
            question: "Are peptide therapies safe and how are they administered?",
            answer: "Yes, peptides are extremely well-tolerated because they are naturally occurring compounds within your body. We exclusively prescribe rigorously tested, pharmacy-grade peptides. Most are administered via a virtually painless subcutaneous injection using a micro-needle, though some protocols use topical or oral alternatives."
        }
    ]
};