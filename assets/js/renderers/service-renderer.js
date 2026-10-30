/**
 * service-renderer.js
 *
 * Populates all data-slot elements and builds dynamic content sections
 * for service pages after components have been loaded by component-loader.js.
 *
 * Each service page needs (paths are relative to the services/ subdirectory):
 *   1. const OVI_SERVICE_ID = "service-id"; (inline script)
 *   2. <script src="../assets/js/data/global.js"></script>
 *   3. <script src="../assets/js/data/services/SERVICE-ID.js"></script>
 *   4. <script src="../assets/js/core/component-loader.js"></script>
 *   5. <script src="../assets/js/core/components.js"></script>
 *   6. <script src="../assets/js/renderers/service-renderer.js"></script>
 *   7. <script src="../assets/js/core/main.js"></script>
 *
 * To change content: edit assets/js/data/services/SERVICE-ID.js
 * To change layout:  edit assets/components/*.html
 */
(function () {
  // ─── Populate on componentsLoaded ─────────────────────────────────────────
  document.addEventListener("componentsLoaded", function () {
    const service = window.clinicData?.services?.find((s) => s.id === OVI_SERVICE_ID);

    if (!service) {
      console.error("[service-renderer] No service found for ID:", typeof OVI_SERVICE_ID !== "undefined" ? OVI_SERVICE_ID : "undefined");
      return;
    }

    populatePage(service);
  });

  // ─── 3. Main population function ──────────────────────────────────────────
  function populatePage(s) {
    // --- Page meta ---
    if (s.pageTitle) {
      document.title = s.pageTitle;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", s.pageTitle);
      const twTitle = document.querySelector('meta[property="twitter:title"]');
      if (twTitle) twTitle.setAttribute("content", s.pageTitle);
    }
    if (s.pageDescription) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", s.pageDescription);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", s.pageDescription);
      const twDesc = document.querySelector('meta[property="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", s.pageDescription);
    }

    // --- Hero ---
    setSlot("heroBadge", s.heroBadge);
    setSlot("heroHeadline", s.heroHeadline);
    setSlot("heroTitle", s.heroTitle);
    setSlot("heroSubheadline", s.heroSubheadline);
    setSlot("heroCTA", s.heroCTA || "Book Your Doctor Call Today");

    // --- Transformations ---
    if (s.transformations) {
      setSlot("transformationsHeadline", s.transformations.headline);
      setSlot("transformationsSubheadline", s.transformations.subheadline);
      buildTransformations(s.transformations.items);
    } else {
      hide("transformations");
    }

    // --- Eligibility ---
    if (s.eligibility) {
      setSlot("eligibilityBadge", s.eligibility.badge);
      setSlot("eligibilityHeadline", s.eligibility.headline);
      setSlot("eligibilityIntro", s.eligibility.intro);
      setSlot("eligibilityNote", s.eligibility.note);
      setSlot("eligibilityCTA", s.eligibility.ctaText);
      setSlot("eligibilityCTAMobile", s.eligibility.ctaText);
      buildEligibilityItems(s.eligibility.items);
    } else {
      hide("eligibility");
    }

    // --- Comparison ---
    if (s.comparison) {
      setSlot("comparisonHeadline", s.comparison.headline);
      setSlot("comparisonSubheadline", s.comparison.subheadline);
      setSlot("comparisonCTA", s.comparison.ctaText);
      buildComparisonMobileStats(s.comparison.mobileStats);
      buildComparisonTableRows(s.comparison.rows);
      buildStacks(s.comparison.stacks);
    } else {
      hide("comparison");
    }

    // --- Quiz ---
    if (s.quiz) {
      setSlot("quizBadge", s.quiz.badge);
      setSlot("quizHeadline", s.quiz.headline);
      setSlot("quizSubheadline", s.quiz.subheadline);
      buildQuiz(s.quiz);
    } else {
      hide("quiz");
    }

    // --- Protocols ---
    if (s.protocols) {
      setSlot("protocolsHeadline", s.protocols.sectionHeadline);
      setSlot("protocolsSubheadline", s.protocols.sectionSubheadline);
      buildProtocols(s.protocols.items);
      if (s.labsGuide) buildLabsGuide(s.labsGuide);
    } else {
      hide("protocols");
    }

    // --- Science ---
    if (s.science) {
      setSlot("scienceHeadline", s.science.headline);
      setSlot("scienceBody", s.science.body);
      buildScienceBullets(s.science.bullets);
      buildScienceStats(s.science.stats);
      buildScienceCards(s.science.cards);
    } else {
      hideById("science");
    }

    // --- Myths ---
    if (s.myths && s.myths.length > 0) {
      const mythsContainer = document.getElementById("myths-container");
      if (mythsContainer) mythsContainer.style.display = "block";
      buildMyths(s.myths);
    } else {
      hideById("myths-container");
    }

    // --- CTA Title, Subheadline & Badges ---
    const isEs = (window.OVI_I18N?.currentLang === 'es');

    const ctaTitle = s.ctaHeadline || (isEs ? "¿Listo para Optimizar?" : "Ready to Optimize?");
    setSlot("ctaTitle", ctaTitle);

    const ctaSub =
      s.ctaSubheadline ||
      (isEs
        ? `Deje de conformarse con lo común. Obtenga tratamientos de nivel clínico de ${s.tabLabel || "optimización"} dirigidos por profesionales médicos.`
        : `Stop settling for average. Get clinical-grade ${s.tabLabel || "treatment"} directed by medical professionals.`);
    setSlot("ctaSubheadline", ctaSub);

    setSlot("ctaBadge1", isEs ? "Clínica Licenciada" : "Licensed Clinic");
    setSlot("ctaBadge2", isEs ? "Ubicada en Florida" : "Florida-Based");
    setSlot("ctaBadge3", isEs ? "Credenciales Verificadas" : "Verified Credentials");
    setSlot("ctaBookBtn", isEs ? "Reservar Consulta" : "Book Your Consultation");
    setSlot("ctaEmailBtn", isEs ? "Enviar Correo al Equipo Clínico" : "Email Clinical Team");

    // --- FAQs Title & Subheadline ---
    buildFAQs(s.faqs || window.clinicData?.faqs || []);

    const faqTitle = s.faqHeadline || (isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions");
    setSlot("faqHeadline", faqTitle);

    const faqSub =
      s.faqSubheadline ||
      (isEs
        ? `Todo lo que necesita saber sobre nuestros protocolos de ${s.tabLabel || ""}.`
        : `Everything you need to know about our ${s.tabLabel || ""} protocols.`);
    setSlot("faqSubheadline", faqSub);

    buildRelatedArticles(s.id);

    // Re-init Bootstrap carousels that were injected dynamically
    document.querySelectorAll(".carousel").forEach((el) => {
      if (window.bootstrap) new bootstrap.Carousel(el);
    });
  }

  // ─── 4. Helper — set slot content ─────────────────────────────────────────
  function setSlot(slotName, content) {
    const el = document.querySelector(`[data-slot="${slotName}"]`);
    if (!el) return;
    if (!content) {
      el.innerHTML = "";
      el.style.display = "none";
      return;
    }
    el.innerHTML = content;
    el.style.display = "";
  }

  // ─── 5. Helper — hide a data-section ──────────────────────────────────────
  function hide(sectionName) {
    const el = document.querySelector(`[data-section="${sectionName}"]`);
    if (el) el.style.display = "none";
  }

  function hideById(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

  // ─── 6. Build eligibility checklist ───────────────────────────────────────
  function buildEligibilityItems(items) {
    const container = document.getElementById("eligibility-items");
    if (!container || !items) return;
    container.innerHTML = items
      .map(
        (item) => `
      <div class="eligibility-card-row">
        <div class="eligibility-icon-wrapper"><i class="fas fa-check"></i></div>
        <div class="eligibility-row-content">
          <strong>${item.label || item.title || ""}</strong>
          <p>${item.detail || item.desc || ""}</p>
        </div>
      </div>`
      )
      .join("");
  }

  // ─── 7. Build comparison mobile stat pills ────────────────────────────────
  function buildComparisonMobileStats(stats) {
    const container = document.getElementById("comparison-mobile-stats");
    if (!container || !stats) return;
    container.innerHTML = stats
      .map(
        (s) =>
          `<div class="perf-stat-pill"><i class="fas ${s.icon}"></i> ${s.label}</div>`
      )
      .join("");
  }

  // ─── 8. Build comparison table rows ───────────────────────────────────────
  function buildComparisonTableRows(rows) {
    const tbody = document.getElementById("comparison-table-rows");
    if (!tbody || !rows) return;
    tbody.innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td>${r.metric}</td>
        <td class="cell-without">${r.without}</td>
        <td class="cell-with">${r.with}</td>
      </tr>`
      )
      .join("");
  }

  // ─── 9. Build protocol stacks ─────────────────────────────────────────────
  function buildStacks(stacks) {
    if (!stacks) return;
    const desktop = document.getElementById("stacks-desktop");
    const mobileTrack = document.getElementById("stacks-mobile-track");
    const mobileIndicators = document.getElementById("stacks-mobile-indicators");

    const cardInner = (stack) => {
      const badge = stack.tag
        ? `<div class="stack-popular-badge">${stack.tag}</div>`
        : "";
      return `
        ${badge}
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4 class="fw-bold mb-0 fs-6" style="color: var(--secondary-color);">${stack.name}</h4>
        </div>
        <p class="text-muted small fw-bold mb-2">${stack.compounds}</p>
        <p class="text-secondary small mb-0">${stack.description}</p>`;
    };

    if (desktop) {
      desktop.innerHTML = stacks
        .map((s) => `<div class="stack-card">${cardInner(s)}</div>`)
        .join("");
    }


  }

  // ─── Related articles: the newest posts tagged with this service; the section stays hidden when there are none ───
  function buildRelatedArticles(serviceId) {
    const section = document.getElementById("related-articles");
    const list = document.getElementById("related-articles-list");
    if (!section || !list) return;
    const posts = ((window.clinicData && window.clinicData.blog) || []).filter((p) => p.service === serviceId).slice(0, 2);
    if (!posts.length) {
      section.style.display = "none";
      return;
    }
    const ui = (window.clinicData && window.clinicData.blogPage && window.clinicData.blogPage.ui) || {};
    const esc = (v) => String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    setSlot("relatedArticlesHeadline", ui.relatedArticles || "Related articles");
    setSlot("relatedArticlesSubheadline", ui.relatedArticlesSub);
    const col = posts.length === 1 ? "col-md-8 col-lg-6" : "col-md-6";
    list.innerHTML = posts
      .map(
        (p) => `
        <div class="${col}">
          <div class="card h-100 border-0 shadow-sm hover-lift" style="border-radius: 14px; border-top: 3px solid var(--primary-color) !important; background: #ffffff;">
            <div class="card-body d-flex flex-column p-4 text-start">
              <span class="badge align-self-start py-2 px-3 mb-3 fw-semibold" style="font-size: 0.725rem; letter-spacing: 0.5px; text-transform: uppercase; background-color: rgba(5, 20, 17, 0.05); color: var(--secondary-color); border: 1px solid rgba(5, 20, 17, 0.12); border-radius: 4px;">${esc(p.category)}</span>
              <h3 class="card-title h6 fw-bold mb-3 lh-base text-uppercase" style="color: var(--secondary-color); font-size: 1.05rem; letter-spacing: 0.3px;">${esc(p.title)}</h3>
              <p class="card-text text-muted mb-4 small" style="line-height: 1.6;">${esc(p.excerpt)}</p>
              <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                <span class="text-muted small">${esc(p.date)}</span>
                <a href="/blog/${esc(p.id)}" class="fw-semibold text-decoration-none small stretched-link" style="color: var(--secondary-color);">${esc(ui.readArticle || "Read Article")} <i class="fas fa-arrow-right ms-1" style="color: var(--primary-color);"></i></a>
              </div>
            </div>
          </div>
        </div>`
      )
      .join("");
    section.style.display = "";
  }

  // ─── 10. Build protocols grid ──────────────────────────────────────────────
  function buildProtocols(items) {
    if (items && !Array.isArray(items)) items = items.value; // tolerate PowerShell-wrapped arrays
    if (!Array.isArray(items)) return;
    const desktop = document.getElementById("protocols-desktop");
    const mobileTrack = document.getElementById("protocols-mobile-track");
    const mobileIndicators = document.getElementById("protocols-mobile-indicators");
    const isEs = (window.OVI_I18N?.currentLang === 'es');
    const hasSpecialty = items.some((item) => item.price && item.biomarkers);

    const cardInner = (item, index) => {
      if (item.price && item.biomarkers) {
        const highlightsHtml = item.highlights
          ? `<div class="biomarker-chip-preview mb-3">
              ${item.highlights.map(h => `<span class="biomarker-chip highlight"><i class="fas fa-check text-primary me-1" style="font-size:0.65rem;"></i>${h}</span>`).join('')}
            </div>`
          : '';

        const methodBadge = item.method
          ? `<span class="badge bg-light text-muted border px-2 py-1 small mb-2"><i class="fas fa-microscope text-primary me-1"></i>${item.method}</span>`
          : '';

        const viewBioLabel = isEs ? `Ver los ${item.biomarkers.length} biomarcadores` : `View All Biomarkers (${item.biomarkers.length})`;
        const bookLabel = isEs ? 'Consultar con el Médico' : 'Request This Panel';

        return `
        <div class="specialty-lab-card h-100 d-flex flex-column">
          <div class="specialty-card-header">
            <div>
              <div class="text-primary fw-bold text-uppercase small mb-1" style="letter-spacing: 1.5px; font-size: 0.75rem;">${item.tag || 'Diagnostic Panel'}</div>
              <h3 class="specialty-card-title mb-1">${item.name}</h3>
              ${methodBadge}
            </div>
            <div class="specialty-price-box">
              <span class="specialty-price-amount">${item.price}</span>
              <span class="specialty-price-label">${isEs ? 'Precio Paciente' : 'Patient Price'}</span>
            </div>
          </div>
          <p class="specialty-card-desc flex-grow-1">${item.description}</p>
          <div class="mt-auto">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="biomarker-count-pill"><i class="fas fa-dna"></i> ${item.biomarkers.length} ${isEs ? 'Biomarcadores Evaluados' : 'Biomarkers Tested'}</span>
              <span class="small text-muted">${isEs ? 'Revisión Médica Incluida' : 'Doctor-Reviewed'}</span>
            </div>
            ${highlightsHtml}
            <div class="row g-2 mt-2">
              <div class="col-sm-7">
                <button type="button" class="btn btn-outline-dark btn-sm rounded-pill w-100 fw-semibold py-2" data-bs-toggle="modal" data-bs-target="#biomarkersModal-${index}">
                  <i class="fas fa-list-check text-primary me-1"></i> ${viewBioLabel}
                </button>
              </div>
              <div class="col-sm-5">
                <a href="#consultation" class="btn btn-primary cta-btn btn-sm rounded-pill w-100 fw-semibold py-2 d-flex align-items-center justify-content-center">
                  ${bookLabel}
                </a>
              </div>
            </div>
          </div>
        </div>`;
      }

      const badge = item.tag
        ? `<h6 class="text-primary fw-bold text-uppercase mb-3" style="font-size: 0.75rem; letter-spacing: 2px;">${item.tag}</h6>`
        : "";
      return `
        <div class="protocol-light-card h-100">
          <div class="card-icon"><i class="fas ${item.icon}"></i></div>
          <h4 class="card-title">${item.name}</h4>
          ${badge}
          <p class="card-text">${item.description}</p>
        </div>`;
    };

    const colClass = hasSpecialty ? "col-lg-6 mb-4" : "col-md-6 col-lg-4";

    if (desktop) {
      desktop.innerHTML = items
        .map((item, index) => `<div class="${colClass}">${cardInner(item, index)}</div>`)
        .join("");
    }

    if (hasSpecialty) {
      let modalsContainer = document.getElementById("protocols-modals");
      if (!modalsContainer) {
        modalsContainer = document.createElement("div");
        modalsContainer.id = "protocols-modals";
        document.body.appendChild(modalsContainer);
      }

      modalsContainer.innerHTML = items
        .filter((item) => item.biomarkers && item.biomarkers.length > 0)
        .map((item) => {
          const originalIndex = items.indexOf(item);
          const searchPlaceholder = isEs ? "Filtrar biomarcadores..." : "Search biomarkers (e.g., Candida, Zonulin, ApoB)...";
          const modalPills = item.biomarkers
            .map((b) => `<span class="biomarker-modal-pill" data-name="${b.toLowerCase()}"><i class="fas fa-check-circle"></i>${b}</span>`)
            .join("");

          return `
          <div class="modal fade" id="biomarkersModal-${originalIndex}" tabindex="-1" aria-labelledby="bioLabel-${originalIndex}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
              <div class="modal-content biomarker-modal-content">
                <div class="modal-header biomarker-modal-header d-flex justify-content-between align-items-center">
                  <div>
                    <div class="text-warning small text-uppercase fw-bold letter-spacing-1">${item.tag || "Specialty Diagnostic"}</div>
                    <h4 class="modal-title h5 fw-bold text-white mb-0" id="bioLabel-${originalIndex}">${item.name}</h4>
                  </div>
                  <div class="d-flex align-items-center gap-3">
                    <span class="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill fw-bold">${item.price}</span>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                </div>
                <div class="modal-body biomarker-modal-body">
                  <div class="p-3 rounded-4 mb-3" style="background: rgba(230, 195, 129, 0.08); border: 1px solid rgba(230, 195, 129, 0.25);">
                    <div class="small text-muted mb-1 fw-bold text-uppercase" style="letter-spacing: 0.5px;"><i class="fas fa-microscope text-primary me-1"></i> ${isEs ? "Metodología Clínica" : "Testing Methodology"}</div>
                    <p class="small text-dark mb-0">${item.description}</p>
                  </div>

                  <div class="d-flex justify-content-between align-items-center mb-2 px-1">
                    <span class="fw-bold text-dark small"><i class="fas fa-dna text-primary me-1"></i> ${isEs ? "Directorio Completo de Biomarcadores" : "Full Biomarker Directory"} (<span id="bio-count-${originalIndex}">${item.biomarkers.length}</span>)</span>
                    <span class="badge bg-light text-muted border">${item.method || "Clinical Lab"}</span>
                  </div>

                  <div class="input-group mb-3 shadow-xs">
                    <span class="input-group-text bg-white border-end-0 rounded-start-pill"><i class="fas fa-search text-muted"></i></span>
                    <input type="text" class="form-control border-start-0 rounded-end-pill py-2 biomarker-search-input" placeholder="${searchPlaceholder}" oninput="window.filterBiomarkers(${originalIndex}, this.value)">
                  </div>

                  <div class="biomarker-modal-list" id="bio-list-${originalIndex}">
                    ${modalPills}
                  </div>
                </div>
                <div class="modal-footer bg-light d-flex justify-content-between align-items-center py-3 px-4">
                  <div class="small text-muted">
                    <i class="fas fa-user-md text-primary me-1"></i> ${isEs ? "Todos los paneles incluyen revisión con un médico con licencia." : "All panels include 1-on-1 review with a licensed clinician."}
                  </div>
                  <div class="d-flex gap-2">
                    <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-3" data-bs-dismiss="modal">${isEs ? "Cerrar" : "Close"}</button>
                    <a href="#consultation" class="btn btn-primary cta-btn btn-sm rounded-pill px-4" data-bs-dismiss="modal">${isEs ? "Reservar Consulta" : "Book Consultation"}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        })
        .join("");
    }

    if (typeof window.initMobileTrack === "function") {
      window.initMobileTrack("protocols-desktop", "protocols-mobile-track", "protocols-mobile-indicators", hasSpecialty ? false : true);
    }
  }

  // ─── 10b. Build labs guide popup (button + modal) ─────────────────────────
  function buildLabsGuide(g) {
    const sub = document.querySelector('[data-slot="protocolsSubheadline"]');
    if (sub && !document.getElementById("labs-guide-btn")) {
      sub.insertAdjacentHTML(
        "afterend",
        `<button type="button" id="labs-guide-btn" class="btn btn-primary cta-btn rounded-pill px-4 mt-2" data-bs-toggle="modal" data-bs-target="#labs-guide-modal"><i class="fas fa-flask me-2"></i>${g.buttonLabel}</button>`
      );
    }

    const tests = g.tests
      .map(
        (t, i) => `
        <section class="labs-guide-test">
          <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-2">
            <h3 class="labs-guide-test-title">${i + 1}. ${t.name}</h3>
            <span class="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill fw-bold">${t.price}</span>
          </div>
          <p class="labs-guide-subtitle">${t.subtitle}</p>
          <p>${t.intro}</p>
          <h4 class="labs-guide-label">${g.evaluatesLabel}</h4>
          <ul class="labs-guide-list">${t.evaluates.map((e) => `<li>${e}</li>`).join("")}</ul>
          <h4 class="labs-guide-label">${g.whyLabel}</h4>
          <p class="mb-0">${t.why}</p>
        </section>`
      )
      .join("");

    const html = `
      <div class="modal fade" id="labs-guide-modal" tabindex="-1" aria-labelledby="labs-guide-title" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content biomarker-modal-content">
            <div class="modal-header biomarker-modal-header">
              <div>
                <div class="small text-uppercase fw-bold" style="letter-spacing: 1px; color: #e6c381;">${g.eyebrow}</div>
                <h2 class="h4 text-white mb-0 mt-1" id="labs-guide-title">${g.title}</h2>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="${g.close}"></button>
            </div>
            <div class="modal-body labs-guide-body">
              ${g.intro.map((p) => `<p>${p}</p>`).join("")}
              ${tests}
              <section class="labs-guide-closing text-center">
                <h3 class="labs-guide-test-title">${g.closing.title}</h3>
                <p>${g.closing.body}</p>
                <p class="fw-bold mb-1">${g.closing.ready}</p>
                <p>${g.closing.explore}</p>
                <a href="#consultation" class="btn btn-primary cta-btn rounded-pill px-4" data-bs-dismiss="modal">${g.closing.cta}</a>
              </section>
              <p class="labs-guide-disclaimer">${g.disclaimer}</p>
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-3" data-bs-dismiss="modal">${g.close}</button>
            </div>
          </div>
        </div>
      </div>`;

    let container = document.getElementById("labs-guide-modal-root");
    if (!container) {
      container = document.createElement("div");
      container.id = "labs-guide-modal-root";
      document.body.appendChild(container);
    }
    container.innerHTML = html;
  }

  window.filterBiomarkers = function (index, query) {
    const list = document.getElementById("bio-list-" + index);
    const countEl = document.getElementById("bio-count-" + index);
    if (!list) return;
    const q = (query || "").toLowerCase().trim();
    const pills = list.querySelectorAll(".biomarker-modal-pill");
    let visible = 0;
    pills.forEach((p) => {
      const name = p.getAttribute("data-name") || "";
      if (!q || name.includes(q)) {
        p.style.display = "";
        visible++;
      } else {
        p.style.display = "none";
      }
    });
    if (countEl) countEl.textContent = visible;
  };

  // ─── 11. Build science section ────────────────────────────────────────────
  function buildScienceBullets(bullets) {
    const ul = document.getElementById("science-bullets");
    if (!ul || !bullets) return;
    ul.innerHTML = bullets
      .map(
        (b) =>
          `<li><i class="fas fa-check-circle text-primary me-3"></i>${b}</li>`
      )
      .join("");
  }

  function buildScienceStats(stats) {
    const row = document.getElementById("science-stats-row");
    if (!row || !stats) return;
    const statsHTML = stats
      .map((s) => {
        const val = s.icon
          ? `<div class="fs-3 fw-bold mb-1 text-primary"><i class="fas ${s.icon}"></i></div>`
          : `<div class="fs-3 fw-bold mb-1 text-primary">${s.value}</div>`;
        return `
        <div class="col-6 col-md-3">
          <div class="p-3 text-center rounded-4 h-100 border hover-lift" style="background-color: #f5eee3 !important; border-color: rgba(230, 195, 129, 0.45) !important;">
            ${val}
            <div class="fw-bold text-uppercase text-muted" style="font-size: 0.65rem; letter-spacing: 1px;">${s.label}</div>
          </div>
        </div>`;
      })
      .join("");
    row.innerHTML = statsHTML;
  }

  function buildScienceCards(cards) {
    const row = document.getElementById("science-bento-row");
    if (!row || !cards) return;
    const cardsHTML = cards
      .map(
        (c) => `
      <div class="col-md-6 d-none d-lg-block">
        <div class="p-4 rounded-4 h-100 shadow-sm border hover-lift" style="background-color: #f5eee3 !important; border-color: rgba(230, 195, 129, 0.45) !important;">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0"
              style="width: 45px; height: 45px; background: rgba(230,195,129,0.15); color: var(--secondary-color);">
              <i class="fas ${c.icon} fs-5"></i>
            </div>
            <h5 class="fw-bold mb-0 fs-6" style="color: var(--secondary-color);">${c.title}</h5>
          </div>
          <p class="text-muted small mb-0" style="line-height: 1.6;">${c.detail}</p>
        </div>
      </div>`
      )
      .join("");
    row.innerHTML = cardsHTML;
  }

  // ─── 12. Build Myths ──────────────────────────────────────────────────────
  function buildMyths(myths) {
    const mobileTrack = document.getElementById("myth-mobile-track");
    const mobileIndicators = document.getElementById("myth-mobile-indicators");
    if (!mobileTrack || !myths) return;
    
    mobileTrack.innerHTML = myths.map(m => `
      <div class="myth-card">
          <div class="myth-label">Common Myth</div>
          <p class="myth-text">"${m.myth}"</p>
          <div class="reality-label">Clinical Reality</div>
          <p class="reality-text">${m.reality}</p>
      </div>
    `).join("");
    
  }


  // ─── 13. Build FAQs ───────────────────────────────────────────────────────
  function buildFAQs(faqs) {
    const container = document.getElementById("serviceFaqAccordion");
    if (!container || !faqs) return;
    container.innerHTML = faqs
      .map((faq, idx) => {
        const i = idx + 100;
        return `
      <div class="accordion-item border-0 mb-3">
        <h2 class="accordion-header" id="heading${i}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
            ${faq.question}
          </button>
        </h2>
        <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#serviceFaqAccordion">
          <div class="accordion-body">
            ${faq.answer}
          </div>
        </div>
      </div>`;
      })
      .join("");
  }

  // ─── 16. Build Transformations ────────────────────────────────────────────
  function buildTransformations(items) {
    const section = document.querySelector('[data-section="transformations"]');
    if (!items || items.length === 0) {
      if (section) section.style.display = "none";
      return;
    }
    const desktop = document.getElementById("transformations-desktop");
    const mobileTrack = document.getElementById("transformations-mobile-track");
    const mobileIndicators = document.getElementById("transformations-mobile-indicators");

    const buildCard = (item) => `
      <div class="ba-card d-flex flex-column position-relative rounded-4 overflow-hidden shadow-sm border h-100">
          <div class="ba-slider-container position-relative w-100 overflow-hidden" style="aspect-ratio: 16/10;">
              <img src="../${item.imageAfter}" alt="Patient After" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
              <span class="badge bg-primary position-absolute top-0 end-0 m-3 shadow-sm" style="z-index: 1;">${item.badgeAfter}</span>
              <div class="ba-before-wrapper position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style="clip-path: inset(0 50% 0 0); z-index: 2;">
                  <img src="../${item.imageBefore}" alt="Patient Before" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style="filter: grayscale(30%);">
                  <span class="badge bg-dark bg-opacity-75 position-absolute top-0 start-0 m-3 shadow-sm">${item.badgeBefore}</span>
              </div>
              <input type="range" min="0" max="100" value="50" class="ba-slider position-absolute top-0 start-0 w-100 h-100 m-0" oninput="this.closest('.ba-slider-container').querySelector('.ba-before-wrapper').style.clipPath = 'inset(0 ' + (100 - this.value) + '% 0 0)'; this.closest('.ba-slider-container').querySelector('.ba-slider-line').style.left = this.value + '%';">
              <div class="ba-slider-line position-absolute top-0 h-100" style="left: 50%; width: 3px; background: rgba(255,255,255,0.9); pointer-events: none; transform: translateX(-50%); z-index: 3; box-shadow: 0 0 6px rgba(0,0,0,0.4);">
                  <div class="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex align-items-center justify-content-center shadow" style="width: 36px; height: 36px; border: 2px solid var(--primary-color); color: var(--secondary-color);">
                      <i class="fas fa-arrows-alt-h" style="font-size: 0.9rem;"></i>
                  </div>
              </div>
          </div>
          <div class="p-4 bg-light flex-grow-1">
              <h5 class="fw-bold mb-2" style="color: var(--secondary-color);">${item.title}</h5>
              <p class="small text-muted mb-3"><strong>Protocol:</strong> ${item.protocol}</p>
              <p class="small text-secondary mb-0">${item.description}</p>
          </div>
      </div>
    `;

    if (desktop) {
      desktop.innerHTML = items.map(item => `<div class="col-lg-6">${buildCard(item)}</div>`).join('');
    }

  }

  // ─── 17. Build Quiz ───────────────────────────────────────────────────────
  function buildQuiz(quizData) {
    const section = document.querySelector('[data-section="quiz"]');
    if (!quizData) {
      if (section) section.style.display = "none";
      return;
    }
    const container = document.getElementById("quiz-panels-container");
    if (!container) return;

    const buildStep = (stepObj, stepNum, colsClass) => `
      <div class="quiz-step-panel" id="quiz-step-${stepNum}">
          <p class="quiz-question">${stepObj.question}</p>
          <p class="quiz-sub">${stepObj.sub}</p>
          <div class="quiz-options ${colsClass}">
              ${stepObj.options.map(opt => `
              <button class="quiz-option" data-quiz-step="step${stepNum}" data-value="${opt.value}">
                  <i class="fas ${opt.icon} quiz-option-icon"></i>
                  <span class="quiz-option-title">${opt.title}</span>
                  <span class="quiz-option-desc">${opt.desc}</span>
              </button>`).join('')}
          </div>
      </div>
    `;

    const getColsClass = (stepObj) => {
      if (!stepObj || !stepObj.options) return '';
      return `opts-${stepObj.options.length}`;
    };

    container.innerHTML = `
      ${buildStep(quizData.step1, 1, getColsClass(quizData.step1))}
      ${buildStep(quizData.step2, 2, getColsClass(quizData.step2))}
      ${buildStep(quizData.step3, 3, getColsClass(quizData.step3))}
      <div class="quiz-step-panel" id="quiz-step-result"></div>
    `;

    initQuizLogic(quizData);
  }

  function initQuizLogic(quizData) {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    const answers = { step1: null, step2: null, step3: null };

    function updateProgress(activeStep) {
        const dots = [
            document.getElementById('dot-1'),
            document.getElementById('dot-2'),
            document.getElementById('dot-3')
        ];
        const lines = [
            document.getElementById('line-1'),
            document.getElementById('line-2')
        ];
        const stepNum = activeStep === 'result' ? 4 : parseInt(activeStep);

        dots.forEach((dot, i) => {
            if(!dot) return;
            dot.classList.remove('active', 'completed');
            if (stepNum > i + 1) dot.classList.add('completed');
            else if (stepNum === i + 1) dot.classList.add('active');
        });

        lines.forEach((line, i) => {
            if(!line) return;
            line.classList.toggle('active', stepNum > i + 1);
        });
    }

    function goToStep(target) {
        const currentActive = quizContainer.querySelector('.quiz-step-panel.active');
        updateProgress(target);

        const globalBackBtn = document.getElementById('global-quiz-back-btn');
        if (globalBackBtn) {
            if (target === 1 || target === 'result') {
                globalBackBtn.style.visibility = 'hidden';
            } else {
                globalBackBtn.style.visibility = 'visible';
                globalBackBtn.setAttribute('data-quiz-back', target - 1);
            }
        }

        if (currentActive) {
            currentActive.classList.add('fade-out');
            setTimeout(() => {
                currentActive.classList.remove('active', 'fade-out');
                const panel = document.getElementById(`quiz-step-${target}`);
                if (panel) panel.classList.add('active');
            }, 200);
        } else {
            const panel = document.getElementById(`quiz-step-${target}`);
            if (panel) panel.classList.add('active');
        }
    }

    function selectOption(btn, stepKey) {
        btn.closest('.quiz-step-panel').querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        answers[stepKey] = btn.getAttribute('data-value');

        setTimeout(() => {
            if (stepKey === 'step1') goToStep(2);
            else if (stepKey === 'step2') goToStep(3);
            else if (stepKey === 'step3') showResult();
        }, 350);
    }

    function showResult() {
        if (!quizData || !quizData.protocols) return;
        const protocol = quizData.protocols[answers.step1];
        if (!protocol) return;

        const isEs = (window.OVI_I18N?.currentLang === 'es');
        const timeline = quizData.timelineMap ? (quizData.timelineMap[answers.step2] || (isEs ? '8–12 semanas' : '8–12 weeks')) : (isEs ? '8–12 semanas' : '8–12 weeks');
        const goalDesc = protocol.goalModifiers ? (protocol.goalModifiers[answers.step3] || '') : '';

        const resultEl = document.getElementById('quiz-step-result');
        if (!resultEl) return;
        
        resultEl.innerHTML = `
            <div class="quiz-result-inner">
                <div class="d-flex align-items-center justify-content-between gap-3 mb-3">
                    <div class="flex-grow-1">
                        <div class="quiz-protocol-tag">${protocol.tag}</div>
                        <div class="quiz-protocol-name">${protocol.name}</div>
                        <div class="quiz-protocol-peptides">${protocol.peptides}</div>
                    </div>
                    <div class="d-none d-sm-flex align-items-center justify-content-center flex-shrink-0"
                         style="width:64px;height:64px;background:rgba(31, 64, 109, 0.06);border-radius:50%;">
                        <i class="fas ${protocol.icon} fs-3 text-primary"></i>
                    </div>
                </div>
                <div class="quiz-timeline-badge mb-4">
                    <i class="fas fa-clock text-primary"></i>
                    ${isEs ? 'Resultados iniciales en' : 'Initial results in'} ${timeline}
                </div>
                <p class="quiz-result-desc">${protocol.desc}</p>
                <p class="quiz-result-desc"><strong style="color:var(--secondary-color);">${isEs ? 'Para su objetivo:' : 'For your goal:'}</strong> ${goalDesc}</p>
                <div class="quiz-social-proof mb-4">
                    <i class="fas fa-users text-primary me-2"></i>${protocol.social}
                </div>
                <div class="quiz-result-actions">
                    <a href="#consultation" class="btn cta-btn">${isEs ? 'Obtener Mi Protocolo Personalizado' : 'Get My Custom Protocol'}</a>
                    <button class="quiz-restart" id="quiz-restart-btn">${isEs ? 'Volver a Empezar' : 'Start Over'}</button>
                </div>
            </div>
        `;

        document.getElementById('quiz-restart-btn').addEventListener('click', () => {
            answers.step1 = answers.step2 = answers.step3 = null;
            document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
            goToStep(1);
        });

        goToStep('result');
    }

    quizContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-quiz-step]');
        if (!btn) return;
        selectOption(btn, btn.getAttribute('data-quiz-step'));
    });

    const globalBackBtn = document.getElementById('global-quiz-back-btn');
    if (globalBackBtn) {
        const newBtn = globalBackBtn.cloneNode(true);
        globalBackBtn.parentNode.replaceChild(newBtn, globalBackBtn);
        newBtn.addEventListener('click', () => {
            const targetStep = parseInt(newBtn.getAttribute('data-quiz-back'));
            if (targetStep) goToStep(targetStep);
        });
    }

    goToStep(1);
  }

})();
