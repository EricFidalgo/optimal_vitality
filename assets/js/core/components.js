// assets/js/components.js
// Injects shared structural components (navbar, footer, mobile CTA) into every page.
// This eliminates duplicated HTML across all pages.

// Google Tag Manager | Mack Media Group — loads site-wide; do not remove.
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N75755JZ');
// End Google Tag Manager

(function () {
  "use strict";

  // Service pages (services/) and generated blog post pages (blog/) sit one folder below the site root.
  const isSubpage = typeof OVI_SERVICE_ID !== "undefined" || typeof OVI_BLOG_PAGE !== "undefined";
  const prefix = isSubpage ? "../" : "";

  // -------------------------------------------------------------------------
  // NAVBAR
  // -------------------------------------------------------------------------
  function renderNavbar() {
    const root = document.getElementById("navbar-root");
    if (!root) return;

    const c = window.clinicData?.contact;

    let marqueeHTML = "";
    if (window.clinicData?.marquee) {
      const singlePass = clinicData.marquee
        .map(
          (item) =>
            `<span><i class="fas ${item.icon}"></i> ${item.label}</span><span>•</span>`,
        )
        .join("");
      const repeatedContent = singlePass + singlePass + singlePass;

      marqueeHTML = `
                <!-- Top Announcement Marquee Bar -->
                <div class="top-marquee-bar">
                    <div class="marquee-track">
                        <div class="marquee-content">
                            ${repeatedContent}
                        </div>
                        <div class="marquee-content" aria-hidden="true">
                            ${repeatedContent}
                        </div>
                    </div>
                </div>
            `;
    }

    root.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top d-flex flex-column p-0" aria-label="Main Navigation">
                ${marqueeHTML}
                <div class="container navbar-container">
                    <a class="navbar-brand d-flex align-items-center" href="/">
                        <img src="${prefix}assets/images/icons/logo.svg" alt="OVI Wellness Logo" class="logo-img">
                    </a>

                    <div class="collapse navbar-collapse d-none d-lg-flex align-items-center" id="navbarNav">
                        <ul class="navbar-nav ms-auto align-items-center" id="main-navbar-links"></ul>
                        ${window.OVI_I18N ? window.OVI_I18N.renderDropdown("ms-lg-3 me-lg-2") : ""}
                        <a href="#consultation" class="btn cta-btn ms-lg-2">Book Your Consultation</a>
                    </div>

                    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Toggle Navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="offcanvas offcanvas-end d-lg-none" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
                        <div class="offcanvas-header border-bottom border-secondary bg-transparent">
                            <a class="navbar-brand d-flex align-items-center m-0" href="/">
                                <img src="${prefix}assets/images/icons/logo.svg" alt="OVI Wellness Logo" class="logo-img">
                            </a>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body d-flex flex-column text-center p-3">
                            <div class="navbar-nav w-100 flex-grow-1 position-relative d-flex flex-column" id="mobile-navbar-links" style="overflow: hidden; height: 100%;">
                                <div class="mobile-nav-main w-100 d-flex flex-column flex-grow-1" style="transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); height: 100%;">
                                    <div class="p-0 m-0 w-100 mt-3">
                                        <div class="w-100 mb-3"><a class="d-block p-2 text-decoration-none text-white fw-bold text-center" style="font-size: 1.3rem; letter-spacing: 1px;" href="/#treatments">Treatments</a></div>
                                        <div class="w-100 mb-3"><a class="d-block p-2 text-decoration-none text-white fw-bold text-center" style="font-size: 1.3rem; letter-spacing: 1px;" href="${prefix}team">Team</a></div>
                                        <div class="w-100 mb-3"><a class="d-block p-2 text-decoration-none text-white fw-bold text-center" style="font-size: 1.3rem; letter-spacing: 1px;" href="/#faqs">FAQs</a></div>
                                        <div class="mobile-menu-hours py-2 px-3 mx-auto my-3 rounded-3 text-center" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(230, 195, 129, 0.25); max-width: 290px;">
                                            <div class="d-flex align-items-center justify-content-center gap-2 mb-1" style="color: var(--primary-color, #e6c381); font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; font-weight: 700;">
                                                <i class="fas fa-clock"></i> <span>${window.OVI_I18N?.currentLang === "es" ? "Horario de Atención" : "Hours of Operation"}</span>
                                            </div>
                                            <div class="text-white fw-bold" style="font-size: 0.95rem; letter-spacing: 0.5px;">
                                                ${window.OVI_I18N?.currentLang === "es" ? "Lunes – Jueves" : "Monday – Thursday"}: 9:00 AM – 7:00 PM
                                            </div>
                                            <div class="text-white-50 small mt-1" style="font-size: 0.8rem;">
                                                ${window.OVI_I18N?.currentLang === "es" ? "Viernes – Domingo: Cerrado" : "Friday – Sunday: Closed"}
                                            </div>
                                        </div>
                                        <div class="w-100 mb-3"><a class="d-block p-2 text-decoration-none text-white fw-bold text-center" style="font-size: 1.3rem; letter-spacing: 1px;" href="${prefix}blog">The Science</a></div>
                                        <div class="w-100 mb-3"><a class="d-block p-2 text-decoration-none text-white fw-bold text-center" style="font-size: 1.3rem; letter-spacing: 1px;" href="https://www.carecredit.com/apply/?_gl=1*hpf3u3*_ga*MjcxMzY2MjgwLjE3OTIwMjYyMTQ.*_ga_SHD5X90J3V*czE3OTIwMjYyMTQkbzEkZzEkdDE3OTIwMjcyOTIkajU1JGwwJGgw" target="_blank" rel="noopener noreferrer">Care Credit</a></div>
                                    </div>
                                    <div class="mt-auto pb-4 pt-3 w-100">
                                        <a href="#consultation" class="btn cta-btn w-100">${window.OVI_I18N?.currentLang === "es" ? "Reservar Consulta" : "Book Your Consultation"}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        `;
  }

  // -------------------------------------------------------------------------
  // FOOTER + MOBILE STICKY CTA
  // -------------------------------------------------------------------------
  function renderFooter() {
    const root = document.getElementById("footer-root");
    if (!root) return;

    const c = window.clinicData?.contact;
    if (!c) {
      console.error("Clinic contact data is missing!");
      return;
    }

    const isEs = window.OVI_I18N?.currentLang === "es";
    const ctaBtnText = isEs ? "Reservar Consulta" : "Secure Your Consultation";
    const readyTitle = isEs
      ? "¿Listo para Transformar su Salud?"
      : "Ready to Transform Your Health?";
    const readyDesc = isEs
      ? "Dé el primer paso hacia su revitalización. Reserve su consulta para que nuestros expertos diseñen su protocolo personalizado."
      : "Take the first step towards a revitalized you. Book your consultation to have our medical experts design your personalized protocol.";
    const ourServicesTitle = isEs ? "Nuestros Servicios" : "Our Services";
    const clinicInfoTitle = isEs
      ? "Información de la Clínica"
      : "Clinic Information";

    const disclaimerTitle = isEs ? "Aviso Médico:" : "Medical Disclaimer:";
    const disclaimerText = isEs
      ? "Todo el contenido proporcionado en este sitio web —incluidos texto, gráficos, imágenes, testimonios y otros materiales— es solo para fines informativos y educativos y no constituye asesoramiento médico, diagnóstico o tratamiento. El acceso o revisión de esta información no crea una relación clínico-paciente.<br><br>Los tratamientos con receta y los planes de atención personalizados se administran estrictamente tras una evaluación directa y exhaustiva por parte de un proveedor de atención médica licenciado. No ignore el asesoramiento médico profesional ni demore en buscar tratamiento a causa de algo que haya leído en este sitio. Consulte siempre a un médico calificado sobre cualquier condición o tratamiento médico.<br><br><strong>Aviso de Medicamentos Compuestos:</strong> Algunas opciones de tratamiento pueden incluir un medicamento compuesto preparado para un paciente individual por una farmacia con licencia cuando un prescriptor con licencia determina que un producto aprobado por la FDA no satisface las necesidades clínicas de ese paciente. Los medicamentos compuestos no están aprobados por la FDA, y la FDA no los revisa en cuanto a seguridad, eficacia o calidad antes de su comercialización. Su disponibilidad está sujeta a la elegibilidad clínica, la ley aplicable y la dispensación de la farmacia."
      : "All content provided on this website—including text, graphics, images, testimonials, and other materials—is for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment. Accessing or reviewing this information does not create a clinician-patient relationship.<br><br>Prescription treatments and personalized care plans are provided strictly following a direct, thorough evaluation and diagnostic review by a licensed healthcare provider. Do not disregard professional medical advice, delay seeking treatment, or make decisions regarding your health based solely on the contents of this site. Always consult a qualified physician or healthcare professional regarding any medical condition, treatment, or health opinion expressed herein.<br><br><strong>Compounded Medication Disclosure:</strong> Some treatment options may involve a compounded medication prepared for an individual patient by a licensed pharmacy when a licensed prescriber determines that an FDA-approved product does not meet that patient’s clinical needs. Compounded medications are not FDA-approved, and FDA does not review them for safety, effectiveness, or quality before marketing. Availability is subject to clinical eligibility, applicable law, and pharmacy fulfillment.";

    const copyrightText = isEs
      ? "&copy; 2026 OVI Wellness. Todos los derechos reservados."
      : "&copy; 2026 OVI Wellness. All rights reserved.";

    const legalPrivacy = isEs ? "Política de Privacidad" : "Privacy Policy";
    const legalTerms = isEs ? "Términos y Condiciones" : "Terms & Conditions";
    const legalHipaa = isEs ? "Aviso de HIPAA" : "HIPAA Notice";
    const legalMedical = isEs ? "Aviso Médico" : "Medical Disclaimer";
    const legalSms = isEs
      ? "Divulgación de Consentimiento SMS"
      : "SMS Consent Disclosure";
    const legalTelehealth = isEs
      ? "Divulgación de Telesalud"
      : "Telehealth Disclosure";
    const legalFinancing = isEs
      ? "Divulgación de Financiamiento"
      : "Financing Disclosure";
    const legalForm = isEs
      ? "Descargo de Consentimiento de Formulario"
      : "Form Consent Disclaimer";
    const legalResults = isEs ? "Descargo de Resultados" : "Results Disclaimer";

    root.innerHTML = `
            <footer class="footer py-5 text-center text-md-start" id="consultation">
                <div class="container py-4">
                    <div class="row align-items-stretch g-4">
                        <div class="col-lg-4 align-self-center mb-5 mb-lg-0 text-center text-lg-start">
                            <h2 class="mb-4 text-white">${readyTitle}</h2>
                            <p class="mb-4 text-white-50 mx-auto mx-lg-0" style="max-width: 500px;">${readyDesc}</p>
                            <a href="#consultation" class="btn cta-btn btn-lg mt-2">${ctaBtnText}</a>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div class="bg-dark bg-opacity-25 p-4 rounded border border-secondary text-start mx-auto shadow-sm h-100" style="max-width: 400px;">
                                <h4 class="text-primary mb-4 font-family-bebas">${ourServicesTitle}</h4>
                                <ul class="list-unstyled mb-0" id="footer-services-list"></ul>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div class="bg-dark bg-opacity-25 p-4 rounded border border-secondary text-start mx-auto shadow-sm h-100" style="max-width: 400px;">
                                <h4 class="text-primary mb-4 font-family-bebas">${clinicInfoTitle}</h4>
                                <p class="mb-3">
                                    <a href="${c.address.mapUrl || "https://maps.app.goo.gl/SFCiAXwWWKjuANvf8"}" target="_blank" rel="noopener noreferrer" class="footer-text-soft text-decoration-none">
                                        <i class="fas fa-map-marker-alt text-primary me-3 w-15px text-center"></i> ${(c.address.street || "").replace(/,+$/, "")}<br><span class="ms-4 ps-2">${(c.address.city || "").replace(/,+$/, "")}, ${c.address.state} ${c.address.zip}</span>
                                    </a>
                                </p>
                                <p class="mb-3">
                                    <a href="tel:${c.phone.replace(/\D/g, "")}" class="footer-text-soft text-decoration-none">
                                        <i class="fas fa-phone-alt text-primary me-3 w-15px text-center"></i> ${c.phone}
                                    </a>
                                </p>
                                ${
                                  c.fax
                                    ? `
                                <p class="mb-3">
                                    <span class="footer-text-soft text-decoration-none">
                                        <i class="fas fa-fax text-primary me-3 w-15px text-center"></i> ${c.fax}
                                    </span>
                                </p>`
                                    : ""
                                }
                                <p class="mb-3">
                                    <a href="mailto:${c.email}" class="footer-text-soft text-decoration-none">
                                        <i class="fas fa-envelope text-primary me-3 w-15px text-center"></i> ${c.email}
                                    </a>
                                </p>
                                <p class="mb-0"><a href="${c.socials.instagram.url}" target="_blank" rel="noopener noreferrer" class="footer-text-soft text-decoration-none"><i class="fab fa-instagram text-primary me-3 w-15px text-center"></i> ${c.socials.instagram.handle}</a></p>
                                ${c?.socials?.facebook ? `<p class="mb-0 mt-2"><a href="${c.socials.facebook.url}" target="_blank" rel="noopener noreferrer" class="footer-text-soft text-decoration-none"><i class="fab fa-facebook-f text-primary me-3 w-15px text-center"></i> ${c.socials.facebook.handle}</a></p>` : ""}
                                <hr class="border-secondary my-4">
                                <p class="footer-text-soft mb-2"><i class="fas fa-clock text-primary me-3 w-15px text-center"></i> <strong>${c.hours[0].days}:</strong> ${c.hours[0].time}</p>
                                <p class="footer-text-soft mb-0"><i class="fas fa-clock text-primary me-3 w-15px text-center opacity-0"></i> <strong>${c.hours[1].days}:</strong> ${c.hours[1].time}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 pt-4 border-top border-secondary text-center">
                        <p class="text-white-50 max-w-950 mx-auto mb-3" style="font-size: 0.78rem; line-height: 1.6;">
                            <strong>${disclaimerTitle}</strong> ${disclaimerText}
                        </p>
                        <p class="mb-1 text-white-50"><small><strong>Optimal Vitality Institute, LLC d/b/a OVI Wellness</strong></small></p>
                        <p class="mb-1 text-white-50"><small>${isEs ? "Con licencia en el Estado de Florida" : "Licensed in the State of Florida"}</small></p>
                        <p class="mb-3 text-white-50"><small>${copyrightText}</small></p>
                        <div class="d-flex flex-wrap justify-content-center align-items-center mb-0 text-white-50" style="font-size: 0.75rem; gap: 8px 12px;">
                            <a href="${prefix}legal#privacy" class="text-white-50 text-decoration-none hover-white">${legalPrivacy}</a> &bull;
                            <a href="${prefix}legal#hipaa" class="text-white-50 text-decoration-none hover-white">${legalHipaa}</a>
                        </div>
                    </div>
                </div>
            </footer>

            <div id="mobile-sticky-cta" class="d-lg-none position-fixed bottom-0 start-0 w-100 p-3" style="z-index: 1040; pointer-events: none;">
                <a href="#consultation" class="btn cta-btn w-100 py-3 shadow-lg fs-6 fw-bold text-uppercase d-flex align-items-center justify-content-center" style="border-radius: 50px; pointer-events: auto; letter-spacing: 1px;">
                    <i class="fas fa-calendar-check me-2"></i>
                </a>
            </div>
        `;
  }

  // -------------------------------------------------------------------------
  // CLINICAL DISCLOSURES
  // -------------------------------------------------------------------------
  function populateDisclosures() {
    const data = window.clinicData?.i18nComponents?.disclosures;
    if (!data) return;
    const setEl = (selector, text) => {
      const el = document.querySelector(selector);
      if (el && text) el.innerHTML = text;
    };
    setEl('[data-i18n="disclosures.title"]', data.title);
    setEl('[data-i18n="disclosures.intro"]', data.intro);
    setEl('[data-i18n="disclosures.physicianTitle"]', data.physicianTitle);
    setEl('[data-i18n="disclosures.physicianText"]', data.physicianText);
    setEl('[data-i18n="disclosures.diagnosticTitle"]', data.diagnosticTitle);
    setEl('[data-i18n="disclosures.diagnosticText"]', data.diagnosticText);
    setEl('[data-i18n="disclosures.disclaimerTitle"]', data.disclaimerTitle);
    setEl('[data-i18n="disclosures.disclaimerText"]', data.disclaimerText);
  }

  function renderDisclosures() {
    const root = document.getElementById("disclosures-root");
    if (!root) return;

    fetch(`${prefix}assets/components/disclosures.html`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load disclosures component");
        return res.text();
      })
      .then((html) => {
        root.innerHTML = html;
        populateDisclosures();
      })
      .catch((err) => console.error(err));
  }

  // -------------------------------------------------------------------------
  // LOCAL SCHEMA INJECTION (DRY)
  // -------------------------------------------------------------------------
  function injectLocalSchema() {
    const path = window.location.pathname.toLowerCase();
    // Matches "/st-pete", "/st-pete/" and "/st-pete.html" alike
    const page = path
      .replace(/\.html$/, "")
      .replace(/\/+$/, "")
      .split("/")
      .pop();
    let schemaKey = null;
    if (path.includes("/blog/")) {
      // A blog post whose address happens to match a location name is not a location page.
    } else if (page === "st-pete") {
      schemaKey = "stPete";
    } else if (page === "tampa") {
      schemaKey = "tampa";
    }

    const loc = window.clinicData?.locations?.[schemaKey];
    const c = window.clinicData?.contact;

    if (schemaKey && loc && c) {
      // Build the full schema by merging base clinic properties with page-specific ones
      const fullSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: loc.name,
        alternateName: "OVI Wellness",
        description: loc.description,
        url: loc.url,
        telephone: c.phone,
        image: "https://oviwellness.com/assets/images/photos/team-group.jpg",
        address: {
          "@type": "PostalAddress",
          streetAddress: c.address.street,
          addressLocality: c.address.city,
          addressRegion: c.address.state,
          postalCode: c.address.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 27.7725,
          longitude: -82.6347,
        },
        areaServed: loc.areaServed,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "19:00",
        },
        priceRange: "$$",
        medicalSpecialty: "Endocrinology",
      };

      if (document.getElementById("ovi-local-schema")) return;
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ovi-local-schema";
      script.text = JSON.stringify(fullSchema);
      document.head.appendChild(script);
    }
  }

  // -------------------------------------------------------------------------
  // SITE SCHEMA (JSON-LD)
  // One shared MedicalClinic entity (@id) plus the two providers on the home and team pages,
  // and a FAQPage built from the FAQs the page itself shows (home + service pages). Service pages also get a
  // WebSite, MedicalWebPage, Service and BreadcrumbList plus the clinic, so each page names who offers the service.
  // Location pages (/tampa, /st-pete) keep their own schema from injectLocalSchema().
  // -------------------------------------------------------------------------
  const SITE_URL = "https://oviwellness.com";
  const CLINIC_ID = SITE_URL + "/#clinic";

  function plainText(html) {
    const el = document.createElement("div");
    el.innerHTML = html == null ? "" : String(html);
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  // "Monday - Thursday" + "9:00 AM - 7:00 PM" (English or Spanish) -> OpeningHoursSpecification
  function openingHoursFrom(hours) {
    const DAYS = [
      ["Monday", "lunes"], ["Tuesday", "martes"], ["Wednesday", "miercoles"], ["Thursday", "jueves"],
      ["Friday", "viernes"], ["Saturday", "sabado"], ["Sunday", "domingo"],
    ];
    const fold = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const dayIndex = (name) => DAYS.findIndex(([en, es]) => fold(name) === fold(en) || fold(name) === es);
    const to24 = (t) => {
      const m = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(t);
      if (!m) return null;
      let h = parseInt(m[1], 10) % 12;
      if (m[3].toUpperCase() === "PM") h += 12;
      return String(h).padStart(2, "0") + ":" + m[2];
    };
    const specs = [];
    (hours || []).forEach((row) => {
      if (!row || /closed|cerrado/i.test(row.time || "")) return;
      const parts = String(row.days || "").split(/\s*[-–]\s*/);
      const a = dayIndex(parts[0]);
      const z = parts.length > 1 ? dayIndex(parts[1]) : a;
      const [opens, closes] = String(row.time || "").split(/\s*[-–]\s*/).map(to24);
      if (a < 0 || z < a || !opens || !closes) return;
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS.slice(a, z + 1).map(([en]) => en),
        opens,
        closes,
      });
    });
    return specs;
  }

  function clinicEntity(data) {
    const c = data.contact;
    const home = data.pages && data.pages.home && data.pages.home.seo;
    const coords = /!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/.exec((c.address && c.address.mapEmbedUrl) || "");
    const served = ((data.locations && data.locations.stPete && data.locations.stPete.areaServed) || []).map((name) => ({
      "@type": /county|condado/i.test(name) ? "AdministrativeArea" : "City",
      name,
    }));
    const sameAs = Object.values(c.socials || {}).map((s) => s && s.url).filter(Boolean);
    const entity = {
      "@type": "MedicalClinic",
      "@id": CLINIC_ID,
      name: "OVI Wellness",
      url: SITE_URL + "/",
      telephone: c.phone,
      email: c.email,
      image: SITE_URL + "/assets/images/photos/team-group.jpg",
      logo: SITE_URL + "/assets/images/icons/logo.svg",
      address: {
        "@type": "PostalAddress",
        streetAddress: c.address.street,
        addressLocality: c.address.city,
        addressRegion: c.address.state,
        postalCode: c.address.zip,
        addressCountry: "US",
      },
      priceRange: "$$",
      medicalSpecialty: "Endocrine",
    };
    if (home && home.description) entity.description = home.description;
    if (coords) entity.geo = { "@type": "GeoCoordinates", latitude: parseFloat(coords[2]), longitude: parseFloat(coords[1]) };
    if (c.address.mapUrl) entity.hasMap = c.address.mapUrl;
    if (served.length) entity.areaServed = served;
    const hours = openingHoursFrom(c.hours);
    if (hours.length) entity.openingHoursSpecification = hours;
    if (sameAs.length) entity.sameAs = sameAs;
    return entity;
  }

  // Dr. Craig and Sean Worix, matched by their photo file name so the order in team.json does not matter.
  // The type is Physician for both; Sean's job title and credential (PA-C) state what he actually is.
  function physicianEntities(data) {
    const team = data.team || [];
    const people = [
      { key: "craig", member: team.find((m) => /craig/i.test(m.image || "")) },
      { key: "worix", member: team.find((m) => /worix/i.test(m.image || "")) },
    ].filter((x) => x.member);
    return people.map(({ key, member }) => {
      const creds = (member.associations || []).reduce((out, a) => {
        if (/nccpa/i.test(a)) {
          out.push({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certification",
            name: member.credentials,
            recognizedBy: { "@type": "Organization", name: a.replace(/\s*\(.*\)\s*$/, "") },
          });
        } else if (/board|consejo|certif/i.test(a)) {
          out.push({ "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: a });
        }
        return out;
      }, []);
      const hasPrefix = /^dr\.?\s/i.test(member.name);
      const name = member.name
        .replace(/^dr\.?\s+/i, "")
        .replace(new RegExp(",\\s*" + String(member.credentials || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"), "")
        .trim();
      const person = {
        "@type": "Physician",
        "@id": SITE_URL + "/team#" + key,
        name,
        jobTitle: member.role,
        worksFor: { "@id": CLINIC_ID },
        url: SITE_URL + "/team",
      };
      if (hasPrefix) person.honorificPrefix = "Dr.";
      if (member.credentials) person.honorificSuffix = member.credentials;
      if (member.bio) person.description = plainText(member.bio);
      if (member.image) person.image = SITE_URL + "/" + member.image.replace(/^\//, "");
      if (creds.length) person.hasCredential = creds;
      return person;
    });
  }

  // FAQPage from the FAQ list the page renders (same source, same text, tags stripped).
  function faqSchema(faqs) {
    const items = (faqs || [])
      .map((f) => ({ q: plainText(f.question), a: plainText(f.answer) }))
      .filter((x) => x.q && x.a);
    if (!items.length) return null;
    return {
      "@type": "FAQPage",
      mainEntity: items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
    };
  }

  // Duplicate pages (e.g. specialty-labs, canonical to advanced-labs) must not repeat FAQ markup.
  function isCanonicalPage() {
    const link = document.querySelector('link[rel="canonical"]');
    if (!link) return true;
    try {
      const norm = (p) => p.replace(/\.html$/, "").replace(/\/+$/, "") || "/";
      return norm(new URL(link.href).pathname) === norm(window.location.pathname);
    } catch (e) {
      return true;
    }
  }

  // Service pages: the page, the service it describes, a breadcrumb and the site, next to the clinic and FAQPage.
  // Everything here repeats what the page itself says (title, description, service name); no ratings, prices or drug data.
  function servicePageNodes(svc, clinic) {
    const link = document.querySelector('link[rel="canonical"]');
    const pageUrl = (link && link.href) || SITE_URL + window.location.pathname.replace(/\.html$/, "");
    const lang = window.OVI_I18N && window.OVI_I18N.currentLang === "es" ? "es" : "en";
    const name = svc.tabLabel || plainText(svc.title);
    const websiteId = SITE_URL + "/#website";
    const webPageId = pageUrl + "#webpage";
    const serviceId = pageUrl + "#service";
    const breadcrumbId = pageUrl + "#breadcrumb";
    return [
      { "@type": "WebSite", "@id": websiteId, name: "OVI Wellness", url: SITE_URL + "/", publisher: { "@id": CLINIC_ID } },
      {
        "@type": "MedicalWebPage",
        "@id": webPageId,
        url: pageUrl,
        name: svc.pageTitle,
        description: svc.pageDescription,
        inLanguage: lang,
        isPartOf: { "@id": websiteId },
        about: { "@id": serviceId },
        breadcrumb: { "@id": breadcrumbId },
        publisher: { "@id": CLINIC_ID },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name,
        serviceType: name,
        url: pageUrl,
        description: svc.pageDescription,
        provider: { "@id": CLINIC_ID },
        areaServed: clinic.areaServed,
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name, item: pageUrl },
        ],
      },
    ];
  }

  function injectSiteSchema() {
    const data = window.clinicData;
    if (!data || !data.contact || document.getElementById("ovi-site-schema")) return;
    const path = window.location.pathname.toLowerCase().replace(/\.html$/, "").replace(/\/+$/, "");
    const page = path.split("/").pop();
    if (path.includes("/blog/") || page === "st-pete" || page === "tampa") return;

    const isHome = path === "" || page === "index";
    const isTeam = page === "team";
    const isService = typeof OVI_SERVICE_ID !== "undefined";
    if (!isHome && !isTeam && !isService) return;

    const graph = [];
    if (isHome || isTeam) {
      const clinic = clinicEntity(data);
      const doctors = physicianEntities(data);
      if (doctors.length) clinic.employee = doctors.map((d) => ({ "@id": d["@id"] }));
      graph.push(clinic, ...doctors);
    }
    if (isService && isCanonicalPage()) {
      const svc = (data.services || []).find((s) => s.id === OVI_SERVICE_ID);
      if (svc) {
        const clinic = clinicEntity(data);
        graph.push(clinic, ...servicePageNodes(svc, clinic));
      }
      const faq = faqSchema((svc && svc.faqs) || data.faqs);
      if (faq) graph.push(faq);
    } else if (isHome && isCanonicalPage()) {
      const faq = faqSchema(data.faqs);
      if (faq) graph.push(faq);
    }
    if (!graph.length) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ovi-site-schema";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
    document.head.appendChild(script);
  }

  function initNavbarBehavior() {
    // Mobile Menu Auto-Close on nav link click
    const offcanvasElement = document.getElementById("mobileMenu");
    let offcanvasInstance = null;
    if (offcanvasElement && typeof bootstrap !== "undefined") {
      offcanvasInstance =
        bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    }
    document
      .querySelectorAll("a.nav-link, a.cta-btn, .hormone-cta a, .navbar-brand")
      .forEach((link) => {
        link.addEventListener("click", function (event) {
          if (this.getAttribute("href") === "#") {
            event.preventDefault();
            return;
          }
          if (
            this.hash !== "" &&
            offcanvasElement &&
            offcanvasElement.classList.contains("show") &&
            offcanvasInstance
          ) {
            offcanvasInstance.hide();
          }
        });
      });

    // Auto-close mobile menu when clicking any link inside it (using event delegation to survive dynamic innerHTML updates)
    if (offcanvasElement && offcanvasInstance) {
      offcanvasElement.addEventListener("click", function (e) {
        const link = e.target.closest("a");
        if (!link) return;
        if (
          link.classList.contains("mobile-drill-open") ||
          link.classList.contains("mobile-drill-back")
        ) {
          return; // Don't close when navigating drill-down menus
        }
        if (link.getAttribute("href") === "#") {
          return;
        }
        offcanvasInstance.hide();
      });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      function handleNavbarScroll() {
        navbar.classList.toggle(
          "scrolled-nav",
          (window.scrollY || document.documentElement.scrollTop) > 50,
        );
      }
      window.addEventListener("scroll", handleNavbarScroll);
      handleNavbarScroll();
    }
  }

  // -------------------------------------------------------------------------
  // DYNAMIC CONTACT INJECTION
  // -------------------------------------------------------------------------
  function injectContactInfo() {
    const c = window.clinicData?.contact;
    if (!c) return;

    document.querySelectorAll('[data-global-contact="phone"]').forEach((el) => {
      el.innerHTML = `<i class="fas fa-phone-alt me-2"></i> ${c.phone}`;
      if (el.tagName === "A") el.href = "tel:" + c.phone.replace(/\D/g, "");
    });

    const isEs = window.OVI_I18N?.currentLang === "es";
    document.querySelectorAll('[data-global-contact="email"]').forEach((el) => {
      const label = isEs
        ? "Enviar Correo al Equipo Clínico"
        : "Email Clinical Team";
      // Preserve icon if already in innerHTML (e.g. cta.html has <i> before the slot)
      const icon = el.querySelector("i");
      if (icon) {
        el.innerHTML = "";
        el.appendChild(icon);
        el.innerHTML += ` ${label}`;
      } else {
        el.innerHTML = `<i class="fas fa-envelope me-2"></i> ${label}`;
      }
      if (el.tagName === "A") el.href = "mailto:" + c.email;
    });

    // Resolve data-i18n location.* labels injected by location.html component
    const loc = window.clinicData?.location;
    if (loc) {
      document
        .querySelectorAll('[data-i18n="location.sectionTitle"]')
        .forEach((el) => {
          el.textContent = loc.sectionTitle || "";
        });
      document
        .querySelectorAll('[data-i18n="location.clinicName"]')
        .forEach((el) => {
          el.textContent = loc.clinicName || "";
        });
      document
        .querySelectorAll('[data-i18n="location.labelAddress"]')
        .forEach((el) => {
          el.textContent = loc.labelAddress || "";
        });
      document
        .querySelectorAll('[data-i18n="location.labelHours"]')
        .forEach((el) => {
          el.textContent = loc.labelHours || "";
        });
      document
        .querySelectorAll('[data-i18n="location.labelContact"]')
        .forEach((el) => {
          el.textContent = loc.labelContact || "";
        });
      document
        .querySelectorAll('[data-i18n="location.getDirections"]')
        .forEach((el) => {
          el.textContent = loc.getDirections || "";
        });
    }

    populateDisclosures();
  }

  // -------------------------------------------------------------------------
  // DYNAMIC CONSULTATION MODAL & MULTI-STEP LOGIC
  // -------------------------------------------------------------------------
  function initConsultationModal() {
    // 1. Create and inject modal container to document body if it doesn't exist
    if (document.getElementById("consultationModal")) return;

    const modalHTML = `
        <div class="modal fade" id="consultationModal" tabindex="-1" aria-labelledby="consultationModalLabel" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
              <div class="modal-header border-0 d-flex justify-content-between align-items-center pb-2">
                <h5 class="modal-title font-family-bebas text-uppercase text-white" id="consultationModalLabel" style="font-size: 1.25rem; letter-spacing: 1px;">Request Your Consultation</h5>
                <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close" style="font-size: 0.8rem;"></button>
              </div>
              <div class="modal-body pt-0">
                <!-- Step Indicators -->
                <div class="form-step-indicators">
                  <div class="step-dot active" data-step="1"></div>
                  <div class="step-dot" data-step="2"></div>
                  <div class="step-dot" data-step="3"></div>
                </div>

                <form id="consultationForm" novalidate>
                  <input type="hidden" name="access_key" value="">
                  <input type="hidden" name="subject" value="New Consultation Lead from OVI Wellness">
                  <input type="hidden" name="from_name" value="OVI Website Lead Capture">

                  <!-- STEP 1: Treatment Interest -->
                  <div class="modal-step active" data-step="1">
                    <h6 class="text-white-50 text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">Step 1: What are you interested in?</h6>
                    <div class="interest-grid mb-3">
                      <div class="interest-card" data-interest="Hormone Optimization (TRT)">
                        <i class="fas fa-syringe"></i>
                        <span>Hormone Optimization</span>
                      </div>
                      <div class="interest-card" data-interest="Medical Weight Loss">
                        <i class="fas fa-weight-scale"></i>
                        <span>Weight Loss</span>
                      </div>
                      <div class="interest-card" data-interest="Peptide Therapy">
                        <i class="fas fa-vial"></i>
                        <span>Peptides</span>
                      </div>
                      <div class="interest-card" data-interest="IV Therapy">
                        <i class="fas fa-kit-medical"></i>
                        <span>IV Therapy</span>
                      </div>
                      <div class="interest-card" data-interest="Skin Aesthetics">
                        <i class="fas fa-magic"></i>
                        <span>Aesthetics</span>
                      </div>
                      <div class="interest-card" data-interest="Regenerative Medicine">
                        <i class="fas fa-heartbeat"></i>
                        <span>Regenerative Medicine</span>
                      </div>
                    </div>
                    <!-- Hidden input to store chosen interest -->
                    <input type="hidden" name="treatment_interest" id="input-treatment-interest" required>
                    <div class="text-danger small d-none mb-3" id="step1-error">Please select a treatment interest to continue.</div>
                    
                    <div class="d-flex justify-content-end mt-4">
                      <button type="button" class="btn btn-primary btn-modal-action px-4 py-2" id="next-to-step2" style="background-color: var(--primary-color); border: 0; color: #1b1b1b;">Continue</button>
                    </div>
                  </div>

                  <!-- STEP 2: Contact Info -->
                  <div class="modal-step" data-step="2">
                    <h6 class="text-white-50 text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">Step 2: Tell us how to reach you</h6>
                    
                    <div class="mb-3 text-start">
                      <label for="leadName" class="form-label small text-white-50 text-uppercase mb-1">Full Name</label>
                      <input type="text" class="form-control bg-dark text-white border-secondary shadow-none" id="leadName" name="name" placeholder="John Doe" required style="border-radius: 6px;">
                    </div>
                    <div class="mb-3 text-start">
                      <label for="leadEmail" class="form-label small text-white-50 text-uppercase mb-1">Email Address</label>
                      <input type="email" class="form-control bg-dark text-white border-secondary shadow-none" id="leadEmail" name="email" placeholder="john@example.com" required style="border-radius: 6px;">
                    </div>
                    <div class="mb-3 text-start">
                      <label for="leadPhone" class="form-label small text-white-50 text-uppercase mb-1">Phone Number</label>
                      <input type="tel" class="form-control bg-dark text-white border-secondary shadow-none" id="leadPhone" name="phone" placeholder="(727) 555-0199" required style="border-radius: 6px;">
                    </div>

                    <div class="text-danger small d-none mb-3" id="step2-error">Please fill out all contact fields with valid information.</div>

                    <div class="d-flex justify-content-between mt-4">
                      <button type="button" class="btn btn-outline-secondary text-white border-secondary btn-modal-action px-4 py-2" id="prev-to-step1">Back</button>
                      <button type="button" class="btn btn-primary btn-modal-action px-4 py-2" id="next-to-step3" style="background-color: var(--primary-color); border: 0; color: #1b1b1b;">Continue</button>
                    </div>
                  </div>

                  <!-- STEP 3: Special Offer & Consent -->
                  <div class="modal-step" data-step="3">
                    <h6 class="text-white-50 text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">Step 3: Select Offer & Confirm</h6>
                    
                    <div class="p-3 bg-dark bg-opacity-25 rounded border border-secondary mb-3 text-start">
                      <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="welcome_offer" id="offerFree" value="Consultation Request" checked>
                        <label class="form-check-label text-white small" for="offerFree">
                          Consultation Request
                        </label>
                      </div>
                    </div>

                    <div class="form-check mb-3 text-start">
                      <input class="form-check-input" type="checkbox" id="smsOptIn" name="sms_consent" value="Yes">
                      <label class="form-check-label text-white-50" for="smsOptIn" style="font-size: 0.72rem; line-height: 1.4;">
                        I agree to receive automated messages, updates, or text alerts regarding my inquiry from OVI Wellness at the number provided above. Consent is not a condition of purchase. Message/data rates apply. Message frequency varies. View our <a href="${prefix}legal#privacy" target="_blank" rel="noopener noreferrer" class="text-primary text-decoration-none">Privacy Policy</a>.
                      </label>
                      <div class="text-danger small d-none mt-1" id="step3-error">You must accept the SMS consent disclosure to continue.</div>
                    </div>

                    <div class="d-flex justify-content-between mt-4">
                      <button type="button" class="btn btn-outline-secondary text-white border-secondary btn-modal-action px-4 py-2" id="prev-to-step2">Back</button>
                      <button type="submit" class="btn btn-primary btn-modal-action px-4 py-2" id="submitFormBtn" style="background-color: var(--primary-color); border: 0; color: #1b1b1b;">Secure Offer & Book</button>
                    </div>
                  </div>

                  <!-- SUCCESS STEP -->
                  <div class="modal-step" data-step="success">
                    <div class="success-card">
                      <div class="success-icon-wrapper">
                        <i class="fas fa-check"></i>
                      </div>
                      <h4 class="text-white font-family-bebas text-uppercase mb-3">Offer Secured!</h4>
                      <p class="text-white-50 small mb-4" style="line-height: 1.6;">Thank you for reaching out to OVI Wellness. We've received your request for a <span class="text-white" id="success-chosen-service">consultation</span> and your welcome offer.</p>
                      <p class="text-primary fw-semibold mb-0" style="font-size: 0.85rem;"><i class="fas fa-sms me-2"></i> Our clinical team will text or call you shortly to schedule.</p>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                      <button type="button" class="btn btn-outline-secondary text-white border-secondary btn-modal-action px-4 py-2" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        `;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = modalHTML;
    const modalElement = tempDiv.firstElementChild;
    document.body.appendChild(modalElement);

    const bootstrapModal = new bootstrap.Modal(modalElement);

    // Intercept clicks to any #consultation button and open external booking link
    const BOOKING_URL =
      "https://www.optimantra.com/optimus/patient/patientaccess/prospects?pid=a2poUjdvMUpIY0I1S3ZSY2ZUaFRjZz09";
    document.addEventListener("click", function (e) {
      const targetLink = e.target.closest('a[href="#consultation"]');
      if (targetLink) {
        e.preventDefault();
        window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
      }
    });

    const form = document.getElementById("consultationForm");
    const steps = form.querySelectorAll(".modal-step");
    const dots = document.querySelectorAll(".step-dot");
    const inputInterest = document.getElementById("input-treatment-interest");
    const interestCards = form.querySelectorAll(".interest-card");

    let currentStep = 1;

    function showStep(stepNum) {
      steps.forEach((step) => {
        if (step.getAttribute("data-step") === String(stepNum)) {
          step.classList.add("active");
        } else {
          step.classList.remove("active");
        }
      });

      dots.forEach((dot) => {
        const dotStep = parseInt(dot.getAttribute("data-step"));
        if (dotStep === stepNum) {
          dot.classList.add("active");
          dot.classList.remove("completed");
        } else if (dotStep < stepNum) {
          dot.classList.remove("active");
          dot.classList.add("completed");
        } else {
          dot.classList.remove("active", "completed");
        }
      });

      currentStep = stepNum;
    }

    function resetForm() {
      form.reset();
      currentStep = 1;
      interestCards.forEach((card) => card.classList.remove("selected"));
      inputInterest.value = "";

      document.getElementById("step1-error").classList.add("d-none");
      document.getElementById("step2-error").classList.add("d-none");
      document.getElementById("step3-error").classList.add("d-none");

      showStep(1);

      const submitBtn = document.getElementById("submitFormBtn");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Secure Offer & Book";
    }

    interestCards.forEach((card) => {
      card.addEventListener("click", function () {
        this.classList.toggle("selected");

        const selectedCards = Array.from(interestCards).filter((c) =>
          c.classList.contains("selected"),
        );
        const selectedValues = selectedCards.map((c) =>
          c.getAttribute("data-interest"),
        );
        inputInterest.value = selectedValues.join(", ");

        if (selectedValues.length > 0) {
          document.getElementById("step1-error").classList.add("d-none");
        } else {
          inputInterest.value = "";
        }
      });
    });

    document
      .getElementById("next-to-step2")
      .addEventListener("click", function () {
        if (!inputInterest.value) {
          document.getElementById("step1-error").classList.remove("d-none");
          return;
        }
        showStep(2);
      });

    document
      .getElementById("next-to-step3")
      .addEventListener("click", function () {
        const name = document.getElementById("leadName");
        const email = document.getElementById("leadEmail");
        const phone = document.getElementById("leadPhone");
        const step2Error = document.getElementById("step2-error");

        let isValid = true;
        if (!name.value.trim()) isValid = false;
        if (!email.value.trim() || !email.value.includes("@")) isValid = false;
        if (!phone.value.trim() || phone.value.replace(/\D/g, "").length < 10)
          isValid = false;

        if (!isValid) {
          step2Error.classList.remove("d-none");
          return;
        }

        step2Error.classList.add("d-none");
        showStep(3);
      });

    document
      .getElementById("prev-to-step1")
      .addEventListener("click", () => showStep(1));
    document
      .getElementById("prev-to-step2")
      .addEventListener("click", () => showStep(2));

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // SMS opt-in is optional now, so no need to require it
      step3Error.classList.add("d-none");

      const submitBtn = document.getElementById("submitFormBtn");
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Securing...';

      const formData = new FormData(form);

      const selectedVal = inputInterest.value;
      const successText = selectedVal.includes(",")
        ? `consultation for: ${selectedVal}`
        : `${selectedVal} consultation`;
      document.getElementById("success-chosen-service").innerText = successText;

      try {
        console.warn(
          "Form submission: HIPAA-capable CRM endpoint not yet configured. Data captured locally only.",
        );
        console.log("Form data:", Object.fromEntries(formData.entries()));

        steps.forEach((step) => step.classList.remove("active"));
        const successStep = form.querySelector(
          '.modal-step[data-step="success"]',
        );
        successStep.classList.add("active");
        dots.forEach((dot) => dot.classList.add("completed"));
      } catch (err) {
        console.error("Submission error:", err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Secure Offer & Book";
        const errorMsg =
          form.querySelector("#step3-error") || document.createElement("div");

        const leadName =
          document.getElementById("leadName")?.value || "Patient";
        const leadPhone = document.getElementById("leadPhone")?.value || "";
        const service = inputInterest.value || "General Consultation";
        const subject = encodeURIComponent(`Inquiry from ${leadName}`);
        const body = encodeURIComponent(
          `Name: ${leadName}\nPhone: ${leadPhone}\nService: ${service}\n\nI am interested in booking a consultation.`,
        );

        errorMsg.innerHTML = `Something went wrong. Please try again or <a href="mailto:info@oviwellness.com?subject=${subject}&body=${body}" class="text-primary fw-bold text-decoration-underline" style="color:var(--primary-color) !important;">email us directly</a>.`;
        errorMsg.className = "text-danger small mt-2 text-center";
        errorMsg.id = "submit-error-msg";
        if (!form.querySelector("#submit-error-msg")) submitBtn.after(errorMsg);
      }
    });
  }

  // -------------------------------------------------------------------------
  // INIT — render components only after i18n/clinicData is ready
  // -------------------------------------------------------------------------
  // renderNavbar() and renderFooter() depend on window.clinicData.contact,
  // which is populated asynchronously by i18n.js fetching global.json.
  // DOMContentLoaded fires before that fetch completes, so we must wait for
  // the i18nLoaded event instead.  The once-flag prevents double execution
  // if clinicData is already populated by the time this script runs.
  var _componentsRendered = false;

  // CallRail - MMG. Loaded last so the number swap sees the phone numbers
  // rendered into the navbar, footer and contact slots above.
  function loadCallRail() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.callrail.com/companies/171158122/f1c2da7205062a31fcc8/12/swap.js";
    document.body.appendChild(script);
  }

  function initComponents() {
    if (_componentsRendered) return;
    _componentsRendered = true;
    renderNavbar();
    renderFooter();
    renderDisclosures();
    // Wait until every data file is loaded: the contact data arrives before the locations data, so running
    // this straight away could find no location data and silently skip the schema.
    (window.oviI18nPromise || Promise.resolve()).then(injectLocalSchema);
    // Wait until every data file is loaded (the contact data arrives before the team/services/faqs data).
    (window.oviI18nPromise || Promise.resolve()).then(injectSiteSchema);
    initNavbarBehavior();
    initConsultationModal();
    injectContactInfo();
    loadCallRail();
  }

  document.addEventListener("DOMContentLoaded", function () {
    // If clinicData is already populated (i18nLoaded already fired), run now.
    if (window.clinicData && window.clinicData.contact) {
      initComponents();
    }
    // Always register the i18nLoaded listener as a safety net.
    document.addEventListener("i18nLoaded", initComponents);
  });

  document.addEventListener("componentsLoaded", function () {
    // Re-run after components inject new DOM nodes that may contain contact slots.
    injectContactInfo();
  });
})();
