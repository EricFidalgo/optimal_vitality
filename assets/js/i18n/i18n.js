/**
 * assets/js/i18n/i18n.js
 *
 * Client-side internationalization manager with High Cohesion & Low Coupling.
 * Single source of truth for loading English ('en') or Spanish ('es') locale JSON data,
 * populating window.clinicData, and translating static & component DOM elements.
 */
(function () {
  const STORAGE_KEY = "ovi_lang";
  const DEFAULT_LANG = "en";

  // Determine current language
  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  if (!["en", "es"].includes(currentLang)) {
    currentLang = DEFAULT_LANG;
  }

  window.clinicData = window.clinicData || {};
  window.OVI_I18N = {
    currentLang: currentLang,
    setLanguage: function (lang) {
      if (lang !== "en" && lang !== "es") return;
      localStorage.setItem(STORAGE_KEY, lang);
      window.location.reload();
    }
  };

  // Helper to resolve base path depending on whether page is inside services/ or root
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes("/services/")) {
      return "../assets/js/i18n/";
    }
    return "assets/js/i18n/";
  }

  const basePath = getBasePath() + currentLang + "/";

  // Spanish Static Translation Dictionary for hardcoded HTML elements
  const spanishDomMap = [
    // Top marquee
    ["Doctor-Led Protocols", "Protocolos Dirigidos por Médicos"],
    ["St. Petersburg, FL", "St. Petersburg, FL"],
    ["Licensed Medical Clinic", "Clínica Médica Licenciada"],
    ["HIPAA Compliant", "Cumplimiento HIPAA"],
    ["Tailored Protocols", "Protocolos Personalizados"],

    // Hero Section
    ["Human Performance", "Rendimiento Humano"],
    ["Optimized", "Optimizado"],
    ["Reclaim Your", "Recupere Su"],
    ["Energy & Strength", "Energía y Fuerza"],
    ["Advanced Wellness & Regenerative Aesthetics Designed for Optimal Vitality.", "Bienestar Avanzado y Estética Regenerativa Diseñados para la Vitalidad Óptima."],
    ["Explore More Protocols", "Explorar Más Protocolos"],
    ["Prescription TRT & Bio-Identical Hormone therapy medically supervised by Board-Certified Doctors in St. Petersburg, FL.", "Terapia de TRT y Hormonas Bioidénticas bajo receta médica supervisada por Médicos Certificados en St. Petersburg, FL."],

    // Service Treatments & Cards
    ["Simple Doctor-Guided Treatments", "Tratamientos Sencillos Guiados por Médicos"],
    ["Doctor-prescribed treatments tailored to your body after a medical blood check.", "Tratamientos prescriptos por médicos adaptados a su cuerpo tras un examen médico de sangre."],
    ["Testosterone Therapy (TRT)", "Terapia de Testosterona (TRT)"],
    ["Doctor-calibrated testosterone treatment for men with low energy, brain fog, or muscle loss. Simple weekly routine under medical supervision.", "Tratamiento de testosterona calibrado por médicos para hombres con baja energía, niebla mental o pérdida muscular. Rutina semanal sencilla bajo supervisión médica."],
    ["Women's Bio-Identical HRT", "TRH Bioidéntica para Mujeres"],
    ["For Women", "Para Mujeres"],
    ["Natural bio-identical estrogen and progesterone balancing for women managing mood changes, night sweats, or low energy.", "Equilibrio natural de estrógenos y progesterona bioidéntica para mujeres que manejan cambios de humor, sudores nocturnos o baja energía."],
    ["Peptide Support Boosters", "Impulsores de Péptidos"],
    ["Cell Recovery", "Recuperación Celular"],
    ["Special peptide boosters layered with your plan to speed up recovery, support joint health, and enhance cellular repair.", "Impulsores de péptidos especiales combinados con su plan para acelerar la recuperación, apoyar la salud articular y mejorar la reparación celular."],
    ["Sexual Wellness Therapy", "Terapia de Bienestar Sexual"],
    ["Vitality Boost", "Aumento de Vitalidad"],
    ["Prescription treatments designed to restore healthy drive, blood flow, and intimate confidence for men and women.", "Tratamientos bajo receta diseñados para restaurar el impulso saludable, el flujo sanguíneo y la confianza íntima para hombres y mujeres."],
    ["Thyroid & Adrenal Balance", "Equilibrio Tiroideo y Adrenal"],
    ["Energy Core", "Núcleo de Energía"],
    ["Complete thyroid and adrenal support to fix midday crashes and keep your body's energy engine running strong.", "Soporte tiroideo y adrenal completo para corregir caídas de energía a mitad del día y mantener fuerte el motor energético de su cuerpo."],
    ["Doctor Blood Check", "Chequeo Médico de Sangre"],
    ["Safety First", "Seguridad Primero"],
    ["Simple lab tests so your doctor can check your exact hormone levels and customize your starting dose safely.", "Análisis de laboratorio sencillos para que su médico verifique sus niveles hormonales exactos y personalice su dosis inicial de forma segura."],
    ["Fast joint, tendon & muscle recovery", "Rápida recuperación articular, tendinosa y muscular"],
    ["Deeper, restful night sleep", "Sueño nocturno profundo y reparador"],
    ["Supercharge gut & immune health", "Potencie la salud intestinal e inmunológica"],
    ["100% doctor-checked for your safety", "100% verificado por médicos para su seguridad"],
    ["Licensed Florida Concierge Clinic", "Clínica Concierge Licenciada en Florida"],
    ["100% Medically Supervised & Blood Calibrated", "100% Supervisado Médicamente y Calibrado por Sangre"],

    // Quiz Section
    ["Find Your Best Hormone Plan", "Encuentre Su Mejor Plan Hormonal"],
    ["Answer 3 quick questions so our doctors can help you pick the right plan.", "Responda 3 preguntas rápidas para que nuestros médicos le ayuden a elegir el plan adecuado."],
    ["What is your biggest daily struggle?", "¿Cuál es su mayor lucha diaria?"],
    ["Pick what you want to fix first.", "Elija lo que desea solucionar primero."],
    ["Low Energy & Brain Fog", "Baja Energía y Niebla Mental"],
    ["Feeling tired all day with midday energy crashes.", "Sentirse cansado todo el día con caídas de energía a mitad del día."],
    ["Low Drive & Passion", "Bajo Impulso y Pasión"],
    ["Want to bring back intimacy, drive, and confidence.", "Desea recuperar la intimidad, el impulso y la confianza."],
    ["Stubborn Weight & Muscle Loss", "Peso Rebelde y Pérdida Muscular"],
    ["Hard to build muscle or lose belly fat.", "Dificultad para ganar músculo o perder grasa abdominal."],

    // Eligibility Section
    ["Are You a Candidate for Hormone Care?", "¿Es Usted Candidato para la Atención Hormonal?"],
    ["Our hormone treatments are safe, effective prescription plans supervised by licensed medical doctors. We check your bloodwork first so you get the exact right dose for your body.", "Nuestros tratamientos hormonales son planes seguros y efectivos bajo receta médica supervisados por médicos licenciados. Revisamos sus análisis de sangre primero para darle la dosis exacta para su cuerpo."],
    ["Questions about candidacy? Our medical team will guide you during your consultation.", "¿Preguntas sobre su elegibilidad? Nuestro equipo médico le guiará durante su consulta."],
    ["Feeling Worn Out", "Sentirse Agotado"],
    ["Adults struggling with daily fatigue, brain fog, low drive, or stubborn weight.", "Adultos que luchan con fatiga diaria, niebla mental, bajo impulso o peso rebelde."],
    ["Low Hormone Levels", "Niveles Hormonales Bajos"],
    ["Anyone with low testosterone, thyroid, or energy hormones confirmed by simple bloodwork.", "Cualquier persona con baja testosterona, tiroides o hormonas energéticas confirmadas por análisis de sangre."],
    ["Unsuccessful Supplements", "Suplementos Sin Éxito"],
    ["People who tried over-the-counter vitamins or workouts without getting real results.", "Personas que probaron vitaminas de venta libre o ejercicios sin obtener resultados reales."],
    ["Want Muscle & Energy", "Desea Músculo y Energía"],
    ["Men and women ready to burn fat, keep strong muscle, and feel young again.", "Hombres y mujeres listos para quemar grasa, mantener músculo fuerte y sentirse jóvenes nuevamente."],
    ["Ready for Doctor Care", "Listo para Atención Médica"],
    ["Looking for a safe, doctor-prescribed plan with regular blood checks and check-ins.", "Buscando un plan seguro prescrito por médicos con chequeos sanguíneos periódicos."],

    // Callouts & Disclosures
    ["Ready to Optimize?", "¿Listo para Optimizar?"],
    ["Stop settling for average. Get clinical-grade Hormone Optimization directed by medical professionals.", "Deje de conformarse con lo común. Obtenga optimización hormonal de grado clínico dirigida por profesionales médicos."],
    ["Email Clinical Team", "Enviar Correo al Equipo Clínico"],
    ["Licensed Clinic", "Clínica Licenciada"],
    ["Florida-Based", "Basada en Florida"],
    ["Verified Credentials", "Credenciales Verificadas"],
    ["Everything you need to know about our Hormone Optimization protocols.", "Todo lo que necesita saber sobre nuestros protocolos de Optimización Hormonal."],
    ["Do I need a doctor's prescription for hormone therapy?", "¿Necesito una receta médica para la terapia hormonal?"],
    ["What does the doctor-guided hormone program include?", "¿Qué incluye el programa hormonal guiado por médicos?"],
    ["How fast will I feel results from hormone therapy?", "¿Qué tan rápido sentiré resultados con la terapia hormonal?"],
    ["Is hormone therapy safe for both men and women?", "¿Es segura la terapia hormonal tanto para hombres como para mujeres?"],
    ["Will I get bad side effects or dangerous steroid effects?", "¿Tendré efectos secundarios graves o efectos de esteroides peligrosos?"],
    ["How do I get started with hormone optimization?", "¿Cómo empiezo con la optimización hormonal?"],
    ["Clinical Oversight &", "Supervisión Clínica y"],
    ["Medical Safety", "Seguridad Médica"],
    ["At Optimal Vitality Institute, we operate under the strictest standards of medical safety and absolute compliance with Florida state licensing regulations. All treatments are prescribed and monitored by fully licensed medical professionals following rigorous, evidence-based diagnostic evaluation.", "En Optimal Vitality Institute operamos bajo los estándares más estrictos de seguridad médica y cumplimiento de licencias en el estado de Florida. Todos los tratamientos son prescriptos y monitoreados por profesionales de la salud licenciados tras una evaluación diagnóstica rigurosa."],
    ["Physician Collaboration", "Colaboración Médica"],
    ["Every protocol is overseen by our Chief Medical Officer. Our licensed mid-level practitioners (NPs and PAs) practice under active collaborative agreements, ensuring a multi-disciplinary review of your health markers.", "Cada protocolo es supervisado por nuestro Director Médico Principal. Nuestros profesionales licenciados operan bajo acuerdos colaborativos activos, garantizando una revisión multidisciplinaria de sus marcadores de salud."],
    ["Diagnostic Mandate", "Mandato Diagnóstico"],
    ["No hormone or peptide therapy is dispensed without comprehensive preliminary lab panels, a thorough medical history review, and an active doctor-patient relationship.", "Ninguna terapia hormonal o de péptidos se entrega sin análisis de laboratorio previos exhaustivos, revisión de historial médico y una relación médico-paciente activa."],
    ["Prescription Medicine & Trademark Disclaimers", "Deslinde de Marcas Registradas y Medicamentos con Receta"],
    ["Prescription Medicine &amp; Trademark Disclaimers", "Deslinde de Marcas Registradas y Medicamentos con Receta"],
    ["GLP-1 medications (including Semaglutide and Tirzepatide) are prescription drugs that require a consultation with a licensed medical professional who evaluates your health history to determine medical candidacy. Ozempic®, Wegovy®, Mounjaro®, and Zepbound® are registered trademarks of their respective brand owners (Novo Nordisk and Eli Lilly). Optimal Vitality Institute is an independent medical practice and is not affiliated with, sponsored by, or endorsed by Novo Nordisk or Eli Lilly. Individual weight loss results vary based on medical history, diet, exercise, and personal compliance.", "Los medicamentos GLP-1 (incluyendo Semaglutida y Tirzepatida) son fármacos bajo receta que requieren consulta con un profesional médico licenciado. Ozempic®, Wegovy®, Mounjaro® y Zepbound® son marcas registradas de sus respectivos dueños (Novo Nordisk y Eli Lilly). Optimal Vitality Institute es una práctica médica independiente."],

    // Location Card
    ["Find Our Clinic", "Encuentre Nuestra Clínica"],
    ["Address", "Dirección"],
    ["Hours of Operation", "Horario de Atención"],
    ["Contact", "Contacto"],
    ["Get Directions", "Obtener Direcciones"],

    // Footer & Disclaimer
    ["Connect with Us on Social Media", "Conéctese con Nosotros en Redes Sociales"],
    ["Frequently Asked Questions", "Preguntas Frecuentes"],
    ["Ready to Optimize?", "¿Listo para Optimizar?"],
    ["Licensed Clinic", "Clínica Licenciada"],
    ["Florida-Based", "Ubicada en Florida"],
    ["Verified Credentials", "Credenciales Verificadas"],
    ["Ready to Transform Your Health?", "¿Listo para Transformar su Salud?"],
    ["Take the first step towards a revitalized you. Book your consultation to have our medical experts design your personalized protocol.", "Dé el primer paso hacia su revitalización. Reserve su consulta para que nuestros expertos diseñen su protocolo personalizado."],
    ["Our Services", "Nuestros Servicios"],
    ["Clinic Information", "Información de la Clínica"],
    ["Medical Disclaimer: All content provided on this website—including text, graphics, images, testimonials, and other materials—is for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment. Accessing or reviewing this information does not create a clinician-patient relationship. Prescription treatments and personalized care plans are provided strictly following a direct, thorough evaluation and diagnostic review by a licensed healthcare provider. Do not disregard professional medical advice, delay seeking treatment, or make decisions regarding your health based solely on the contents of this site. Always consult a qualified physician or healthcare professional regarding any medical condition, treatment, or health opinion expressed herein.", "Aviso Médico: Todo el contenido proporcionado en este sitio web —incluidos texto, gráficos, imágenes y testimonios— es solo para fines informativos y educativos y no constituye asesoramiento médico. El acceso a esta información no crea una relación médico-paciente. Los tratamientos médicos se administran estrictamente tras una evaluación directa por parte de un profesional de la salud licenciado."],
    ["Privacy Policy", "Política de Privacidad"],
    ["Terms & Conditions", "Términos y Condiciones"],
    ["HIPAA Notice", "Aviso de HIPAA"],
    ["Medical Disclaimer", "Aviso Médico"],

    // Buttons
    ["Back to Menu", "Volver al Menú"],
    ["Book Appointment", "Reservar Cita"],
    ["Meet the Doctors & View Credentials", "Conozca a los Médicos y Vea Credenciales"],
    ["Meet the Doctors &amp; View Credentials", "Conozca a los Médicos y Vea Credenciales"],
    ["Book Executive VIP", "Reservar Plan VIP Ejecutivo"],
    ["Book Optimal Plan", "Reservar Plan Óptimo"],
    ["Book Essential Plan", "Reservar Plan Esencial"],
    ["Book Your Consultation Now", "Reservar Consulta"],
    ["Book Your Consultation", "Reservar Consulta"],
    ["Secure Your Consultation", "Reservar Consulta"],
    ["Book Doctor Call", "Reservar Cita"]
  ];

  function applyDomTranslations() {
    if (currentLang !== "es") return;

    // Helper to replace text nodes recursively
    function translateNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        let val = node.nodeValue;
        if (!val || !val.trim()) return;
        const trimmed = val.trim();

        spanishDomMap.forEach(([en, es]) => {
          if (trimmed === en) {
            node.nodeValue = val.replace(en, es);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Avoid script and style tags
        if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(node.tagName)) return;
        node.childNodes.forEach(translateNode);
      }
    }

    translateNode(document.body);
  }

  // Fetch locale JSON files prior to component rendering
  async function loadLocaleData() {
    try {
      const [globalRes, servicesRes, teamRes, locationsRes, blogRes, componentsRes, homePageRes] = await Promise.all([
        fetch(basePath + "global.json").catch(() => null),
        fetch(basePath + "services.json").catch(() => null),
        fetch(basePath + "team.json").catch(() => null),
        fetch(basePath + "locations.json").catch(() => null),
        fetch(basePath + "blog.json").catch(() => null),
        fetch(basePath + "components.json").catch(() => null),
        fetch(basePath + "pages/home.json").catch(() => null)
      ]);

      if (globalRes && globalRes.ok) {
        const globalData = await globalRes.json();
        Object.assign(window.clinicData, globalData);
      }

      if (servicesRes && servicesRes.ok) {
        const servicesData = await servicesRes.json();
        window.clinicData.services = servicesData;
      }

      if (teamRes && teamRes.ok) {
        const teamData = await teamRes.json();
        if (teamData.team) window.clinicData.team = teamData.team;
        // Expose page-level labels (hero text, UI strings) separately for team-renderer.js
        window.clinicData.teamPage = {
          heroHeadline:          teamData.heroHeadline,
          heroHeadlineHighlight: teamData.heroHeadlineHighlight,
          heroSubheadline:       teamData.heroSubheadline,
          ui:                    teamData.ui
        };
      }

      if (locationsRes && locationsRes.ok) {
        const locationsData = await locationsRes.json();
        window.clinicData.locations = locationsData;
      }

      if (blogRes && blogRes.ok) {
        const blogData = await blogRes.json();
        if (blogData.posts) window.clinicData.blog = blogData.posts;
        window.clinicData.blogPage = {
          heroEyebrow:    blogData.heroEyebrow,
          heroHeadline:   blogData.heroHeadline,
          heroSubheadline:blogData.heroSubheadline,
          ui:             blogData.ui
        };
      }

      if (componentsRes && componentsRes.ok) {
        window.clinicData.i18nComponents = await componentsRes.json();
      }

      if (homePageRes && homePageRes.ok) {
        const homePageData = await homePageRes.json();
        window.clinicData.pages = window.clinicData.pages || {};
        window.clinicData.pages.home = homePageData;
      }

      document.dispatchEvent(new CustomEvent("i18nLoaded", { detail: { lang: currentLang } }));
    } catch (err) {
      console.warn("[i18n] Failed loading locale JSON files, falling back to static JS data:", err);
    }
  }

  // Initiate loading immediately
  window.oviI18nPromise = loadLocaleData();

  // Run DOM translation once DOM and components load
  document.addEventListener("DOMContentLoaded", () => {
    applyDomTranslations();
    setTimeout(applyDomTranslations, 300);
    setTimeout(applyDomTranslations, 1000);
  });

  document.addEventListener("componentsLoaded", () => {
    applyDomTranslations();
    setTimeout(applyDomTranslations, 300);
    setTimeout(applyDomTranslations, 800);
  });
})();
