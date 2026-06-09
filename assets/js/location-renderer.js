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
    
    if (l.heroBadge) {
      const badge = document.querySelector('[data-slot="heroBadge"]');
      if (badge) {
        badge.innerHTML = l.heroBadge;
        badge.style.display = 'inline-block';
      }
    }
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
            <div class="d-flex align-items-center gap-2">
                <i class="fas fa-check-circle text-primary"></i>
                <span class="fw-semibold text-dark">${b}</span>
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
            <div class="differentiator-card bg-white p-4 rounded-4 border shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                    <div class="differentiator-icon mb-3"><i class="fas ${t.icon}"></i></div>
                    <h4 class="fw-bold mb-2 h5" style="color: #204d57;">${t.title}</h4>
                    <p class="small text-muted mb-4">${t.desc}</p>
                </div>
                <a href="${t.link}" class="btn btn-outline-primary rounded-pill w-100 fw-bold">${t.linkText}</a>
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
