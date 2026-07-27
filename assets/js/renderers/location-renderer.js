/**
 * location-renderer.js
 *
 * Populates data-slot elements for location landing pages (St. Pete, Tampa).
 */
(function () {
  if (typeof OVI_LOCATION_ID === "undefined") return;

  const loc = window.clinicData?.locations?.[OVI_LOCATION_ID];

  if (!loc) {
    console.error("[location-renderer] No location found for ID:", OVI_LOCATION_ID);
    return;
  }

  document.addEventListener("componentsLoaded", function () {
    populateLocationPage(loc);
  });

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

    setSlot("heroCTA", l.heroCTA || "Book Consultation");

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
                    <div class="service-link fw-bold text-decoration-none" style="color: var(--primary-color); font-size: 0.92rem; letter-spacing: 0.5px;">
                        ${t.linkText || 'Learn More'} <i class="fas fa-arrow-right ms-2"></i>
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
})();
