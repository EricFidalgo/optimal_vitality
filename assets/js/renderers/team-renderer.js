// assets/js/renderers/team-renderer.js
// Reads window.clinicData.team and window.clinicData.teamPage (UI labels)
// to render team cards fully in whichever language is active.
// High cohesion: one job — render team page from JSON data.
// Low coupling: reads only from window.clinicData, touches only known DOM IDs.

(function () {
  "use strict";

  function renderTeamPage() {
    const teamData = window.clinicData?.team;
    const t = window.clinicData?.teamPage; // UI label strings

    // ── Hero headline & subheadline ──────────────────────────────────
    const headlineEl = document.querySelector(
      '[data-i18n="team.heroHeadline"]',
    );
    const highlightEl = document.querySelector(
      '[data-i18n="team.heroHeadlineHighlight"]',
    );
    const subEl = document.querySelector('[data-i18n="team.heroSubheadline"]');

    if (headlineEl && t?.heroHeadline) headlineEl.textContent = t.heroHeadline;
    if (highlightEl && t?.heroHeadlineHighlight)
      highlightEl.textContent = t.heroHeadlineHighlight;
    if (subEl && t?.heroSubheadline) subEl.textContent = t.heroSubheadline;

    // ── Team cards ───────────────────────────────────────────────────
    const teamContainer = document.getElementById("team-list-full");
    if (!teamContainer || !teamData) return;

    // UI labels — fall back to English if not loaded
    const labels = {
      viewProfile: t?.ui?.viewProfile || "View Full Profile",
      professionalAssociations:
        t?.ui?.professionalAssociations || "Professional Associations",
      professionalBio: t?.ui?.professionalBio || "Professional Bio",
      philosophyOfCare: t?.ui?.philosophyOfCare || "Philosophy of Care",
      clinicalExpertise: t?.ui?.clinicalExpertise || "Clinical Expertise",
    };

    teamContainer.innerHTML = teamData
      .map((member, index) => {
        const modalExpertiseHtml = member.expertise
          ? member.expertise
              .map(
                (exp) =>
                  `<span class="badge bg-light text-dark border fw-medium px-3 py-2 me-2 mb-2">${exp}</span>`,
              )
              .join("")
          : "";

        const modalAssociationsHtml = member.associations
          ? member.associations
              .map(
                (assoc) =>
                  `<li class="mb-2 text-muted small"><i class="fas fa-check text-primary me-2"></i>${assoc}</li>`,
              )
              .join("")
          : "";

        return `
        <!-- Provider Grid Card -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100 border-0 shadow-sm provider-card rounded-4 overflow-hidden bg-white d-flex flex-column">
            <div class="position-relative overflow-hidden">
              <img src="${member.image}" alt="${member.name}" class="pfp-1x1" onerror="this.src='assets/images/photos/team-group.jpg'">
              <div class="provider-img-overlay"></div>
            </div>
            <div class="card-body p-4 d-flex flex-column flex-grow-1">
              <div class="mb-3">
                <h3 class="h5 fw-bold text-dark mb-1">${member.name}</h3>
                <div class="text-primary fw-medium small text-uppercase tracking-wider mb-2" style="font-size:0.8rem;letter-spacing:0.5px;">${member.role}</div>
                ${member.credentials ? `<span class="badge bg-light text-muted border fw-normal py-1 px-2 small"><i class="fas fa-id-card me-1"></i> ${member.credentials}</span>` : ""}
              </div>
              <p class="card-text small text-muted lh-relaxed mb-4 flex-grow-1">${member.bio}</p>
              <button class="btn btn-team-profile btn-sm rounded-pill w-100 fw-medium mt-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#providerModal-${index}">
                ${labels.viewProfile}
              </button>
            </div>
          </div>
        </div>

        <!-- Provider Detailed Modal -->
        <div class="modal fade" id="providerModal-${index}" tabindex="-1" aria-labelledby="providerModalLabel-${index}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden position-relative bg-white">
              <button type="button" class="btn-close position-absolute modal-close-btn" data-bs-dismiss="modal" aria-label="Close" style="z-index:1055;"></button>
              <div class="modal-body p-4 p-md-5">
                <div class="row g-4">
                  <!-- Left: Profile Image & Affiliations -->
                  <div class="col-md-5 text-center text-md-start pt-4 pt-md-0">
                    <div class="rounded-4 overflow-hidden mb-3 shadow-sm">
                      <img src="${member.image}" alt="${member.name}" class="pfp-1x1" onerror="this.src='assets/images/photos/team-group.jpg'">
                    </div>
                    <h4 class="fw-bold text-dark mb-1">${member.name}</h4>
                    <p class="text-primary fw-medium text-uppercase small mb-3" style="letter-spacing:0.5px;">${member.role}</p>
                    ${
                      modalAssociationsHtml
                        ? `
                      <div class="mt-4 pt-3 border-top text-start">
                        <h6 class="text-uppercase fw-bold text-dark mb-3" style="font-size:0.75rem;letter-spacing:1px;">${labels.professionalAssociations}</h6>
                        <ul class="list-unstyled mb-0">${modalAssociationsHtml}</ul>
                      </div>`
                        : ""
                    }
                  </div>

                  <!-- Right: Bio, Philosophy, Expertise -->
                  <div class="col-md-7 border-start-md ps-md-4">
                    <div class="mb-4">
                      <h6 class="text-uppercase fw-bold text-muted mb-2" style="font-size:0.7rem;letter-spacing:1px;">${labels.professionalBio}</h6>
                      ${
                        Array.isArray(member.bioFull)
                          ? member.bioFull
                              .map(
                                (p) =>
                                  `<p class="text-muted lh-lg mb-3" style="font-size:0.95rem;">${p}</p>`,
                              )
                              .join("")
                          : `<p class="text-muted lh-lg mb-0" style="font-size:0.95rem;">${member.bioFull || member.bio}</p>`
                      }
                    </div>
                    ${
                      member.philosophy
                        ? `
                      <div class="mb-4 p-4 bg-light rounded-4" style="border-left:3px solid var(--primary-color) !important;">
                        <h6 class="text-uppercase fw-bold text-primary mb-2" style="font-size:0.7rem;letter-spacing:1px;">${labels.philosophyOfCare}</h6>
                        <p class="fst-italic text-secondary mb-0" style="font-size:0.95rem;">"${member.philosophy}"</p>
                      </div>`
                        : ""
                    }
                    ${
                      modalExpertiseHtml
                        ? `
                      <div class="mb-4">
                        <h6 class="text-uppercase fw-bold text-dark mb-3" style="font-size:0.75rem;letter-spacing:1px;">${labels.clinicalExpertise}</h6>
                        <div class="d-flex flex-wrap">${modalExpertiseHtml}</div>
                      </div>`
                        : ""
                    }
                    ${
                      member.personalDetail
                        ? `
                      <div class="bg-light rounded-3 p-3 mt-3">
                        <p class="mb-0 text-muted small"><i class="fas fa-info-circle text-primary me-2"></i>${member.personalDetail}</p>
                      </div>`
                        : ""
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      })
      .join("");

    // Fade in content after render
    setTimeout(() => {
      const lowerContent = document.getElementById("lower-content");
      const footerRoot = document.getElementById("footer-root");
      if (lowerContent) {
        lowerContent.style.transition = "opacity 0.25s ease-in-out";
        lowerContent.style.opacity = "1";
      }
      if (footerRoot) {
        footerRoot.style.transition = "opacity 0.25s ease-in-out";
        footerRoot.style.opacity = "1";
      }
    }, 60);
  }

  // Boot: wait for i18nLoaded so clinicData.teamPage is populated
  document.addEventListener("i18nLoaded", renderTeamPage);

  // Fallback: if i18nLoaded already fired, run immediately
  if (window.clinicData?.team) renderTeamPage();
})();
