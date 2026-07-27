window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
  id: "detox",
  type: "additional",
  tabLabel: "Detox Protocols",
  href: "detox.html",
  title: "Clinical Detoxification & Parasite Cleansing",
  lead: "Restore systemic health and gut function with medical-grade detox protocols.",
  description: "Comprehensive protocols including mycotoxin testing, antifungal treatments, and parasite clearance to restore systemic health and gut function.",
  icon: "fa-leaf",
  delay: "-2s",
  features: [
    "Mycotoxin urine analysis testing",
    "Treatment with clinical antifungals",
    "Comprehensive parasite and ovum testing",
    "Targeted treatment with Ivermectin and Mebendazole"
  ],
  image: "assets/images/photos/team-group.avif",
  ctaText: "Start Your Detox Protocol",

  pageTitle: "Medical Detox & Cleansing Protocols — OVI Wellness",
  pageDescription: "Clinical detoxification programs including mycotoxin testing, antifungal treatments, and parasite clearance in St. Petersburg, FL.",

  heroHeadline: "Restore Your<br><span class=\"text-primary\">Systemic Health</span>",
  heroCTA: "Book Your Assessment",

  /*
  transformations: {
    headline: "Clinical Outcomes",
    subheadline: "Real results from comprehensive detoxification.",
    items: [
      {
        imageAfter: "assets/images/photos/team-group.avif",
        imageBefore: "assets/images/photos/team-group.avif",
        badgeAfter: "Optimized",
        badgeBefore: "Baseline",
        title: "Systemic Cleansing",
        protocol: "Mold & Parasite Detox",
        description: "Significant improvement in energy levels, cognitive clarity, and digestive health after completing a targeted antifungal and antiparasitic protocol."
      }
    ]
  },
  */

  quiz: null,
  eligibility: null,
  comparison: null,
  protocols: {
    sectionHeadline: "Our Core Detox Protocols",
    sectionSubheadline: "Targeted clinical treatments for mold and parasitic infections.",
    items: [
      {
        icon: "fa-vial",
        name: "Mycotoxin Analysis & Treatment",
        tag: "Mold Detox",
        description: "Comprehensive mycotoxin urine analysis testing followed by a tailored protocol utilizing prescription antifungals to eliminate mold toxins from your system."
      },
      {
        icon: "fa-bug",
        name: "Parasite & Ovum Eradication",
        tag: "Gut Health",
        description: "Advanced parasite and ovum testing combined with precise treatments using highly effective agents like Ivermectin and Mebendazole to restore gut function."
      }
    ]
  },
  science: null,
  faqs: []
});
