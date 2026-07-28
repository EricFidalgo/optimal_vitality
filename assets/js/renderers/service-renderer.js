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
    // --- Page meta (in the current document, not the fetched one) ---
    document.title = s.pageTitle || "OVI Wellness";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && s.pageDescription) metaDesc.setAttribute("content", s.pageDescription);

    // --- Hero ---
    setSlot("heroBadge", s.heroBadge);
    setSlot("heroHeadline", s.heroHeadline);
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

  // ─── 10. Build protocols grid ──────────────────────────────────────────────
  function buildProtocols(items) {
    if (!items) return;
    const desktop = document.getElementById("protocols-desktop");
    const mobileTrack = document.getElementById("protocols-mobile-track");
    const mobileIndicators = document.getElementById("protocols-mobile-indicators");

    const cardInner = (item) => {
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

    if (desktop) {
      desktop.innerHTML = items
        .map((item) => `<div class="col-md-6 col-lg-4">${cardInner(item)}</div>`)
        .join("");
    }

    if (typeof window.initMobileTrack === "function") {
      window.initMobileTrack("protocols-desktop", "protocols-mobile-track", "protocols-mobile-indicators", true);
    }
  }

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
    const row = document.getElementById("science-bento-row");
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
    row.innerHTML += statsHTML;
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
    row.innerHTML += cardsHTML;
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
