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
      ctaText: "Explore Peptides",
      pageTitle: "Advanced Peptide Therapy — OVI Wellness",
      pageDescription: "Targeted cellular signaling through clinical-grade peptide therapy at the Optimal Vitality Institute.",
      heroHeadline: "Targeted <br><span class=\"text-primary\">Cellular</span> Signaling",
      heroCTA: "Start Your Protocol",
      transformations: {
        headline: "Clinical Transformations",
        subheadline: "Visual evidence of optimized body composition, accelerated tissue repair, and complete metabolic restructuring.",
        items: [
          {
            imageAfter: "assets/images/photos/TRT.jpg",
            imageBefore: "assets/images/photos/IV.jpg",
            badgeAfter: "Week 16",
            badgeBefore: "Baseline",
            title: "Body Recomposition & Core Vitality",
            protocol: "Tesamorelin / Ipamorelin Stack",
            description: "Patient achieved a 12% reduction in visceral body fat while accelerating lean tissue recovery and deep sleep architecture."
          },
          {
            imageAfter: "assets/images/photos/process-results.jpg",
            imageBefore: "assets/images/photos/peptide.jpg",
            badgeAfter: "Week 8",
            badgeBefore: "Post-Injury",
            title: "Accelerated Tendon & Joint Repair",
            protocol: "BPC-157 / TB500 Blend",
            description: "Patient presented with severe joint inflammation. Achieved full return to athletic pacing and weightlifting within 8 weeks."
          }
        ]
      },
      eligibility: {
        badge: "Clinical Candidacy",
        headline: "Who Is This Right For?",
        intro: "Peptide therapy is a precision clinical tool — not a mass-market supplement. We optimize patient biology through data-driven protocols, requiring baseline bloodwork and ongoing medical supervision.",
        note: "Not sure if you qualify? Our medical team reviews every case individually to design your personalized protocol.",
        ctaText: "Am I a Candidate? Let's Talk",
        items: [
          {
            label: "Age & Profile",
            detail: "Between 25–65 years old, physically active, or committed to starting an active wellness lifestyle."
          },
          {
            label: "Suboptimal Biomarkers",
            detail: "Lab work indicates suboptimal hormone, metabolic, or inflammatory markers."
          },
          {
            label: "Persistent Symptoms",
            detail: "Persistent joint pain, fatigue, brain fog, or stalled body composition for 3+ months."
          },
          {
            label: "Prior Attempts",
            detail: "Tried diet adjustments, targeted training, or basic supplements without lasting results."
          },
          {
            label: "Diagnostics Ready",
            detail: "Willing to complete baseline diagnostic bloodwork before initiating any custom protocol."
          }
        ]
      },
      quiz: {
        badge: "Clinical Self-Assessment",
        headline: "Find Your Protocol",
        subheadline: "Answer 3 quick questions. Our clinical team uses this exact framework to determine which peptide sequence best matches your biology.",
        step1: {
          question: "What's your #1 problem right now?",
          sub: "Be honest — this single answer shapes your entire protocol recommendation.",
          options: [
            {
              value: "pain",
              icon: "fa-crutch",
              title: "Joint & Tissue Pain",
              desc: "Chronic soreness, tendon inflammation, slow injury recovery, or post-surgical healing."
            },
            {
              value: "performance",
              icon: "fa-stopwatch",
              title: "Athletic Plateau",
              desc: "Stuck on lifts, 5K times, court stamina — performance gains have stalled."
            },
            {
              value: "energy",
              icon: "fa-battery-quarter",
              title: "Fatigue & Brain Fog",
              desc: "Afternoon crashes, slow mornings, poor sleep, declining mental sharpness."
            },
            {
              value: "body",
              icon: "fa-fire",
              title: "Stubborn Body Composition",
              desc: "Holding visceral fat despite clean diet and training. Plateau at the same weight."
            }
          ]
        },
        step2: {
          question: "How long has this been going on?",
          sub: "Duration affects how aggressively we need to intervene — and what timeline you can realistically expect.",
          options: [
            {
              value: "short",
              icon: "fa-calendar",
              title: "Under 3 Months",
              desc: "Recent onset — acute intervention, faster response window."
            },
            {
              value: "medium",
              icon: "fa-calendar-alt",
              title: "3–12 Months",
              desc: "Established pattern — standard protocol duration applies."
            },
            {
              value: "long",
              icon: "fa-calendar-check",
              title: "1+ Years",
              desc: "Chronic — extended protocol with phased approach recommended."
            }
          ]
        },
        step3: {
          question: "What does success look like for you?",
          sub: "This personalizes the outcome description and the specific biomarkers we'll track during your protocol.",
          options: [
            {
              value: "train",
              icon: "fa-dumbbell",
              title: "Return to Full Training",
              desc: "I want to get back to heavy lifting, running, or competing at full capacity."
            },
            {
              value: "muscle",
              icon: "fa-chart-line",
              title: "Build Lean Muscle",
              desc: "I want to gain functional mass and improve my strength-to-weight ratio."
            },
            {
              value: "feel",
              icon: "fa-brain",
              title: "Feel Human Again",
              desc: "I want sustained energy, mental clarity, and to wake up actually rested."
            },
            {
              value: "fat",
              icon: "fa-weight",
              title: "Lose Stubborn Fat",
              desc: "I want to shed the visceral fat that diet and training alone haven't moved."
            }
          ]
        },
        protocols: {
          pain: {
            tag: "Injury & Tissue Recovery",
            name: "The Wolverine Matrix",
            peptides: "BPC-157 + TB500",
            icon: "fa-shield-alt",
            desc: "A systemic repair blend engineered to support soft tissue recovery at the cellular level. Designed to assist with tendon inflammation, joint health, and post-surgical recovery timelines.",
            goalModifiers: {
              train: "Designed to get you back under the bar. Most patients in this profile return to full training capacity within the protocol window.",
              muscle: "Combines repair acceleration with a pro-anabolic environment — letting you rebuild stronger than your pre-injury baseline.",
              feel: "Addresses the root inflammatory cascade that drives fatigue and brain fog during injury. You will feel the shift within weeks.",
              fat: "As tissue heals, metabolic output normalizes. Many patients see measurable body composition improvements as a secondary outcome."
            },
            social: "61 patients with your profile completed this protocol in the last 90 days."
          },
          performance: {
            tag: "Athletic Output & Growth",
            name: "The Growth & Output Stack",
            peptides: "Ipamorelin + Tesamorelin",
            icon: "fa-dumbbell",
            desc: "Designed to push past hard-coded performance ceilings by optimizing your natural growth factor output. Supports lean tissue accretion, faster recovery between sessions, and measurable strength gains.",
            goalModifiers: {
              train: "Eliminates the ceiling effect. Patients routinely report PR lifts and faster cardio pacing within the first 8 weeks.",
              muscle: "Directly supports lean muscle accretion by establishing the hormonal environment for peak protein synthesis.",
              feel: "Growth hormone optimization produces deeper sleep architecture and substantially improved daytime cognitive output.",
              fat: "Tesamorelin specifically targets visceral adipose tissue — body recomposition is a primary, documented outcome of this protocol."
            },
            social: "88 patients with your profile are currently running this protocol."
          },
          energy: {
            tag: "Cellular Energy & Cognition",
            name: "The Bioenergetic Protocol",
            peptides: "NAD+ Infusion Therapy",
            icon: "fa-bolt",
            desc: "Addresses mitochondrial dysfunction at its source. NAD+ is the rate-limiting cofactor in cellular energy production — restoring it directly reverses the fatigue-fog cycle at the biochemical level.",
            goalModifiers: {
              train: "Cellular energy output determines athletic endurance. Most patients notice a tangible difference in their second week of the protocol.",
              muscle: "Optimized mitochondrial function means faster recovery, better protein utilization, and more energy available for training output.",
              feel: "This protocol was built specifically for what you are describing. Clinical-level fatigue and cognitive decline resolve as the primary outcome.",
              fat: "Improved metabolic efficiency accelerates fat oxidation — particularly the stubborn visceral deposits that resist diet alone."
            },
            social: "44 patients with your profile started this protocol in the last 60 days."
          },
          body: {
            tag: "Lipolytic Optimization",
            name: "The Recomposition Stack",
            peptides: "Tesamorelin + Ipamorelin",
            icon: "fa-fire",
            desc: "Targets the hormonal root cause of stubborn body fat — specifically visceral adipose tissue that diet-resistant patients cannot move through training alone. Promotes active lipolysis while protecting lean mass.",
            goalModifiers: {
              train: "Leaner body composition directly improves VO2 max, power-to-weight ratio, and sustained endurance output.",
              muscle: "Simultaneously drives visceral fat loss while supporting lean muscle accretion — a true clinical recomposition protocol.",
              feel: "Hormonal optimization from this stack produces a notable, documented improvement in energy, mood, and cognitive clarity.",
              fat: "This protocol was precisely engineered for diet-resistant fat loss. It is the most direct clinical path to your stated goal."
            },
            social: "73 patients with your profile have completed this protocol."
          }
        },
        timelineMap: {
          short: "6–8 weeks",
          medium: "8–12 weeks",
          long: "12–16 weeks"
        }
      },
      comparison: {
        headline: "Engineered For <br><span class=\"text-primary\">Peak Performance</span>",
        subheadline: "Our medical team designs synergistic formulations. We blend advanced cellular triggers to complement rigorous physical output, heavy lifting routines, and dedicated rehabilitation pacing.",
        ctaText: "Discuss Your Training Goals",
        mobileStats: [
          {
            icon: "fa-bolt",
            label: "Recovery: 2–3 Days"
          },
          {
            icon: "fa-fire",
            label: "Active Fat Loss"
          },
          {
            icon: "fa-brain",
            label: "All-Day Energy"
          },
          {
            icon: "fa-shield-alt",
            label: "Managed Injury Risk"
          }
        ],
        rows: [
          {
            metric: "Recovery Time",
            without: "5–7 days",
            with: "<i class=\"fas fa-arrow-down text-primary\"></i>2–3 days"
          },
          {
            metric: "Visceral Fat",
            without: "Plateauing",
            with: "<i class=\"fas fa-fire text-primary\"></i>Actively reducing"
          },
          {
            metric: "Daily Energy",
            without: "Afternoon crashes",
            with: "<i class=\"fas fa-sun text-primary\"></i>Sustained output"
          },
          {
            metric: "Injury Risk",
            without: "Accumulating",
            with: "<i class=\"fas fa-shield-alt text-primary\"></i>Actively managed"
          },
          {
            metric: "Strength Gains",
            without: "Stalled",
            with: "<i class=\"fas fa-chart-line text-primary\"></i>Progressive"
          }
        ],
        stacks: [
          {
            tag: "Most Popular",
            name: "The Growth & Cellular Output Stack",
            compounds: "Tesamorelin + Ipamorelin",
            description: "Optimizes natural hormone output. Designed to support lean muscle accretion, lower stubborn visceral adipose tissue, and accelerate overall cellular adaptation."
          },
          {
            name: "The Wolverine Healing Matrix",
            compounds: "BPC-157 + TB500",
            description: "Advanced systemic repair blend. Directs rapid soft tissue recovery to manage torn ligaments, joint conditions, and acute structural layout modifications."
          },
          {
            name: "The Bioenergetic Co-Factor Protocol",
            compounds: "NAD+ + Specialized Recovery Protocols",
            description: "Upregulates critical cellular energy output. Restores key metabolic processing to clear mental fog, reverse fatigue, and boost overall physical performance."
          }
        ]
      },
      protocols: {
        sectionHeadline: "Our Elite Peptide Portfolio",
        sectionSubheadline: "Custom-tailored treatments built entirely around your biomarkers and recovery metrics.",
        items: [
          {
            icon: "fa-running",
            name: "BPC-157",
            tag: "Systemic Tissue Repair",
            description: "A targeted signaling molecule recognized for its capacity to accelerate the healing of tendons, internal epithelial layers, and dense muscle structures."
          },
          {
            icon: "fa-kit-medical",
            name: "TB500",
            tag: "Cellular Migration & Repair",
            description: "Works alongside healing pathways to upgrade joint flexibility, downregulate chronic structural inflammation, and build functional blood vessels in damaged areas."
          },
          {
            icon: "fa-dumbbell",
            name: "Ipamorelin",
            tag: "Selective GH Secretagogue",
            description: "Promotes natural, cyclical pulsatile waves of growth factors. Aids recovery metrics, bone structure integrity, and physical strength production."
          },
          {
            icon: "fa-bolt-lightning",
            name: "Tesamorelin",
            tag: "Lipolytic Optimization",
            description: "Potent option targeting visceral fat distribution. Promotes significant changes in metabolic body architecture while keeping base energy levels optimized."
          },
          {
            icon: "fa-battery-full",
            name: "NAD+",
            tag: "Mitochondrial Efficiency",
            description: "Essential cellular engine component. Directs high-level DNA maintenance, fights chronic programmatic fatigue, and restores vital energy cycles."
          },
          {
            icon: "fa-notes-medical",
            name: "Specialized Recovery",
            tag: "Synergistic Custom Programs",
            description: "Integrated combinations specifically managed by our medical staff to get high-level athletic parameters back online following physical trauma."
          }
        ]
      },
      science: {
        headline: "The Science of <br><span class=\"text-primary\">Peptides</span>",
        body: "Think of your cells as high-performance engines. Peptides are the specific fuel injectors they already know how to use. Unlike synthetic drugs that override your biology, peptide therapy speaks your body's native chemical language — delivering precision molecular signals designed to support your cells as they rebuild and energize themselves.",
        bullets: [
          "100% Bio-Identical Compounds",
          "Maximum Bioavailability",
          "Exceptionally Rare Side Effects"
        ],
        stats: [
          { value: "50+", label: "Protocols" },
          { value: "98%", label: "Uptake" },
          { value: "0%", label: "Synthetics" },
          { icon: "fa-shield-alt", label: "FDA Rx" }
        ],
        cards: [
          {
            icon: "fa-microscope",
            title: "Compounded & Verified",
            detail: "Every compound is rigorously tested for purity, sterility, and exact dosing before reaching your protocol."
          },
          {
            icon: "fa-bullseye",
            title: "Targeted Receptor Action",
            detail: "Unlike broad medications, peptides lock onto specific cellular receptors — no collateral systemic disruption."
          }
        ]
      },
      myths: [
        {
          myth: "Aren't these just steroids?",
          reality: "Peptides are short-chain amino acids — the same molecular signals your body already produces. They carry no anabolic steroid classification, no liver toxicity, and no hormonal suppression."
        },
        {
          myth: "Will I need to inject forever?",
          reality: "Most protocols run 8–16 weeks, then cycle. Your biology resets, results persist, and many patients need fewer sessions over time as their baseline improves."
        },
        {
          myth: "Is this even legal?",
          reality: "All compounds we prescribe are FDA-regulated, pharmacy-compounded, and dispensed under a licensed physician's supervision. This is legal, clinical-grade medicine."
        }
      ],
      faqs: [
        {
          question: "How are peptides administered?",
          answer: "Most peptide protocols use small, painless subcutaneous injections (similar to an insulin needle). Some specific peptides are available in oral or nasal spray forms, depending on the desired systemic or local effect."
        },
        {
          question: "When will I see results?",
          answer: "Acute injury peptides like BPC-157 can show pain reduction and tissue repair acceleration in 2-4 weeks. For anti-aging or body composition peptides (like Tesamorelin), visible changes typically emerge around weeks 6-12."
        },
        {
          question: "Do I need bloodwork for peptide therapy?",
          answer: "Yes. While peptides are highly safe, we require baseline labs to ensure optimal selection, rule out contraindications, and track progress over the course of your protocol."
        },
        {
          question: "Can I combine peptides with TRT or HRT?",
          answer: "Absolutely. In fact, peptides are often used synergistically with hormone optimization protocols to enhance the cellular response, improve recovery, and maximize overall results."
        }
      ]
});
