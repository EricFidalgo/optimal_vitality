/**
 * location-renderer.js
 *
 * Populates data-slot elements for location landing pages (St. Pete, Tampa).
 */
(function () {
  if (typeof OVI_LOCATION_ID === "undefined") return;

  const loc = window.clinicData.locations[OVI_LOCATION_ID];

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
    setSlot("heroCTA", l.heroCTA || "Schedule Consultation <i class='fas fa-calendar-alt ms-2'></i>");
    
    if (l.heroSubheadline) {
      const sub = document.querySelector('[data-slot="heroSubheadline"]');
      if (sub) {
        sub.innerHTML = l.heroSubheadline;
        sub.style.display = 'block';
      }
    }

    // --- Advantage ---
    setSlot("advantageHeadline", l.advantageHeadline);
    setSlot("advantageText", l.advantageText);
    
    if (l.advantageBadge) {
      const badge = document.querySelector('[data-slot="advantageBadge"]');
      if (badge) {
        badge.innerHTML = l.advantageBadge;
        badge.style.display = 'inline-block';
      }
    }

    const img = document.getElementById("advantage-image");
    if (img && l.advantageImage) {
      img.src = l.advantageImage;
    }

    const bulletsContainer = document.getElementById("advantage-bullets");
    if (bulletsContainer && l.advantageBullets) {
      bulletsContainer.innerHTML = l.advantageBullets.map(b => `
        <div class="col-sm-6">
            <div class="advantage-bullet-card d-flex align-items-start gap-3 p-3 rounded-4 border h-100 bg-white">
                <div class="bullet-icon-wrapper rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 28px; height: 28px; background-color: rgba(230, 195, 129, 0.08); color: var(--primary-color); border: 1px solid rgba(230, 195, 129, 0.15);">
                    <i class="fas fa-check" style="font-size: 0.78rem;"></i>
                </div>
                <div class="flex-grow-1">
                    <span class="fw-semibold text-dark" style="font-size: 0.95rem; line-height: 1.4; display: block; padding-top: 2px;">${b}</span>
                </div>
            </div>
        </div>
      `).join('');
    }

    // --- Treatments ---
    setSlot("treatmentsHeadline", l.treatmentsHeadline);
    setSlot("treatmentsSubheadline", l.treatmentsSubheadline);

    const treatmentsGrid = document.getElementById("treatments-grid");
    if (treatmentsGrid && l.treatmentsGrid) {
      treatmentsGrid.innerHTML = l.treatmentsGrid.map(t => `
        <div class="col-md-6 col-lg-4">
            <div class="treatment-card">
                <div>
                    <div class="treatment-icon-wrapper mb-3">
                        <i class="fas ${t.icon}"></i>
                    </div>
                    <h4 class="treatment-title fw-bold mb-2">${t.title}</h4>
                    <p class="treatment-desc text-muted mb-4">${t.desc}</p>
                </div>
                <a href="${t.link}" class="btn-treatment-card">${t.linkText} <i class="fas fa-arrow-right ms-2 transition-arrow"></i></a>
            </div>
        </div>
      `).join('');
    }
  }

  function setSlot(slotName, content) {
    if (!content) return;
    const el = document.querySelector(`[data-slot="${slotName}"]`);
    if (!el) return;
    el.innerHTML = content;
  }
})();
