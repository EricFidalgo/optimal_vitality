window.clinicData = window.clinicData || {};
window.clinicData.services = window.clinicData.services || [];

window.clinicData.services.push({
  id: "advanced-labs",
  type: "additional",
  tabLabel: "Advanced Labs",
  href: "advanced-labs.html",
  title: "Precision Diagnostics & Biomarker Testing",
  lead: "Uncover the root cause of your symptoms with comprehensive clinical panels.",
  description: "We utilize cutting-edge diagnostics including MTHFR gene testing, micronutrient analysis, heavy metal screening, cardiac biomarkers, and complete hormone panels to map your biological health.",
  icon: "fa-flask",
  delay: "-3s",
  features: [
    "MTHFR gene & methylation testing",
    "Comprehensive micronutrient profiles",
    "Heavy metal screening",
    "Advanced cardiac & hormone panels"
  ],
  image: "assets/images/photos/team-group.avif",
  ctaText: "Schedule Your Lab Draw",

  pageTitle: "Advanced Diagnostic Labs — OVI Wellness",
  pageDescription: "Comprehensive diagnostic testing including MTHFR, micronutrients, heavy metals, cardiac markers, and hormone panels in St. Petersburg, FL.",

  heroHeadline: "Data-Driven<br><span class=\"text-primary\">Health Intelligence</span>",
  heroCTA: "Book Your Assessment",

  transformations: null,
  quiz: null,
  eligibility: null,
  comparison: null,
  protocols: {
    sectionHeadline: "Our Diagnostic Capabilities",
    sectionSubheadline: "Identify deficiencies, genetic markers, and hidden health risks.",
    items: [
      {
        icon: "fa-dna",
        name: "MTHFR Gene Testing",
        tag: "Genetics",
        description: "Identify key genetic variants (C677T/A1298C) that affect your body's methylation pathways and ability to process folate, allowing for precise supplementation."
      },
      {
        icon: "fa-apple-alt",
        name: "Comprehensive Micronutrient Testing",
        tag: "Nutrition",
        description: "Measure intracellular levels of essential vitamins, minerals, amino acids, and antioxidants to optimize your nutritional foundation."
      },
      {
        icon: "fa-industry",
        name: "Heavy Metal Testing",
        tag: "Toxicity",
        description: "Accurately screen for toxic elements such as lead, mercury, and arsenic that can disrupt endocrine function and cognitive health."
      },
      {
        icon: "fa-heartbeat",
        name: "Advanced Cardiac Biomarkers",
        tag: "Cardiovascular",
        description: "Beyond standard cholesterol testing: analyze ApoB, Lp(a), hs-CRP, and lipid subfractions to accurately assess cardiovascular risk."
      },
      {
        icon: "fa-syringe",
        name: "Complete Hormone Panels",
        tag: "Endocrinology",
        description: "In-depth evaluation of total and free testosterone, estradiol, thyroid function, cortisol, and DHEA to guide your optimization protocol."
      }
    ]
  },
  science: null,
  faqs: []
});
