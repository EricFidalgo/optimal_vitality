/**
 * location-renderer.js
 *
 * Populates data-slot elements for location landing pages (St. Pete, Tampa).
 * Listens to both componentsLoaded and i18nLoaded to ensure real-time translation updates.
 */
(function () {
  'use strict';
  if (typeof OVI_LOCATION_ID === "undefined") return;

  function render() {
    const loc = window.clinicData?.locations?.[OVI_LOCATION_ID];
    if (!loc) return;
    populateLocationPage(loc);
  }

  function populateLocationPage(l) {
    // --- Hero ---
    setSlot("heroHeadline", l.heroHeadline);
    
    if (l.heroSubheadline) {
      const sub = document.querySelector('[data-slot="heroSubheadline"]');
      if (sub) {
        sub.innerHTML = l.heroSubheadline;
        sub.style.display = 'block';
      }
    }

    const isEs = (window.OVI_I18N?.currentLang === 'es');
    setSlot("heroCTA", l.heroCTA || (isEs ? "Reservar Consulta" : "Book Consultation"));

    // --- Advantage ---
    setSlot("advantageHeadline", l.advantageHeadline);
    setSlot("advantageText", l.advantageText);

    const img = document.getElementById("advantage-image");
    if (img && l.advantageImage) {
      img.src = l.advantageImage;
    }

    const bulletsContainer = document.getElementById("advantage-bullets");
    if (bulletsContainer && l.advantageBullets) {
      bulletsContainer.innerHTML = l.advantageBullets.map(b => `<li>${b}</li>`).join('');
    }

    // --- Treatments ---
    setSlot("treatmentsHeadline", l.treatmentsHeadline);
    setSlot("treatmentsSubheadline", l.treatmentsSubheadline);

    const treatmentsGrid = document.getElementById("treatments-desktop") || document.getElementById("treatments-grid");
    if (treatmentsGrid && l.treatmentsGrid) {
      treatmentsGrid.innerHTML = l.treatmentsGrid.map(t => `
        <div class="col-md-6 col-lg-4">
            <a href="${t.link}" class="text-decoration-none d-block h-100">
                <div class="service-grid-card h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="card-icon"><i class="fas ${t.icon}"></i></div>
                        <h4 class="card-title">${t.title}</h4>
                        <p class="card-text">${t.desc}</p>
                    </div>
                </div>
            </a>
        </div>
      `).join('');

      if (typeof window.initMobileTrack === 'function') {
        window.initMobileTrack('treatments-desktop', 'treatments-mobile-track', 'treatments-mobile-indicators', false);
      }
    }
  }

  function setSlot(slotName, content) {
    if (!content) return;
    const el = document.querySelector(`[data-slot="${slotName}"]`);
    if (!el) return;
    el.innerHTML = content;
  }

  document.addEventListener("componentsLoaded", render);
  document.addEventListener("i18nLoaded", render);

  if (window.clinicData?.locations?.[OVI_LOCATION_ID]) {
    render();
  }
})();
