/**
 * blog-renderer.js
 *
 * Handles the dynamic rendering of both the Blog Index page (blog.html)
 * and individual article pages (article.html).
 * High cohesion: one job — render blog index & article details from JSON data.
 * Low coupling: reads only from window.clinicData, updates only specified DOM elements.
 */
(function () {
  'use strict';

  let blogData = [];
  let blogPage = null;

  function parseArticleDate(dateStr) {
    if (!dateStr) return 0;
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.getTime();

    const spanishMonths = {
      enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
      julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };

    const match = String(dateStr).toLowerCase().match(/(\d{1,2})\s+de\s+([a-z]+)[,\s]+(\d{4})/);
    if (match) {
      const day = parseInt(match[1], 10);
      const month = spanishMonths[match[2]];
      const year = parseInt(match[3], 10);
      if (month !== undefined) {
        return new Date(year, month, day).getTime();
      }
    }
    return 0;
  }

  function init() {
    if (!window.clinicData?.blog || window.clinicData.blog.length === 0) {
      return;
    }

    blogData = window.clinicData.blog;
    blogPage = window.clinicData.blogPage || null;

    // Sort articles by date descending (newest first)
    blogData.sort((a, b) => parseArticleDate(b.date) - parseArticleDate(a.date));

    // Determine which page we are on
    if (document.getElementById("blog-grid-container")) {
      renderBlogIndex();
    } else if (document.getElementById("article-content-container")) {
      renderArticlePage();
    }
  }

  function getCategoryIcon(category) {
    if (!category) return "fas fa-stethoscope";
    const cat = category.toLowerCase();
    if (cat.includes("weight loss") || cat.includes("pérdida de peso")) return "fas fa-weight-hanging";
    if (cat.includes("iv") || cat.includes("hidratación")) return "fas fa-vial";
    if (cat.includes("peptide") || cat.includes("péptidos")) return "fas fa-dna";
    if (cat.includes("hormone") || cat.includes("hormonal")) return "fas fa-heartbeat";
    if (cat.includes("diagnostic") || cat.includes("laboratorio")) return "fas fa-notes-medical";
    if (cat.includes("regenerative") || cat.includes("regenerativa")) return "fas fa-atom";
    if (cat.includes("detox") || cat.includes("desintoxicación")) return "fas fa-leaf";
    return "fas fa-stethoscope";
  }

  function renderBlogIndex() {
    const container = document.getElementById("blog-grid-container");
    if (!container) return;

    const ui = blogPage?.ui || {};
    const heroEyebrow    = blogPage?.heroEyebrow;
    const heroHeadline   = blogPage?.heroHeadline;
    const heroSubheadline= blogPage?.heroSubheadline;

    // Update hero text if elements exist with data-i18n
    setText('[data-i18n="blog.heroEyebrow"]',    heroEyebrow);
    setHtml('[data-i18n="blog.heroHeadline"]',   heroHeadline);
    setText('[data-i18n="blog.heroSubheadline"]', heroSubheadline);

    const readArticleText = ui.readArticle || "Read Article";
    const emptyBlogText   = ui.emptyBlog   || "Check back soon for new educational content.";

    if (blogData.length === 0) {
      container.innerHTML = `<p class="text-center text-muted w-100 py-5">${emptyBlogText}</p>`;
      fadeInPage();
      return;
    }

    let gridHtml = "";
    blogData.forEach((article) => {
      gridHtml += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100 border-0 shadow-sm hover-lift ovi-card" style="border-radius: 14px; border-top: 3px solid var(--primary-color) !important; background: #ffffff;">
            <div class="card-body d-flex flex-column p-4">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="badge py-2 px-3 fw-semibold" style="font-size: 0.725rem; letter-spacing: 0.5px; text-transform: uppercase; background-color: rgba(5, 20, 17, 0.05); color: var(--secondary-color); border: 1px solid rgba(5, 20, 17, 0.12); border-radius: 4px;">
                  <i class="${getCategoryIcon(article.category)} me-1 text-primary"></i> ${article.category}
                </span>
              </div>
              <h4 class="card-title h6 fw-bold mb-3 lh-base text-uppercase" style="color: var(--secondary-color); font-size: 1.05rem; letter-spacing: 0.3px;">${article.title}</h4>
              <p class="card-text text-muted mb-4 small" style="line-height: 1.6; font-size: 0.88rem;">${article.excerpt}</p>
              <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center" style="border-color: rgba(0,0,0,0.06) !important;">
                <span class="text-muted small" style="font-size: 0.8rem;"><i class="far fa-calendar-alt me-1 text-muted"></i> ${article.date}</span>
                <a href="article.html?id=${article.id}" class="fw-semibold text-decoration-none small stretched-link d-flex align-items-center group" style="color: var(--secondary-color);">
                  ${readArticleText} <i class="fas fa-arrow-right ms-2 transition-transform group-hover-translate-x" style="color: var(--primary-color);"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = `<div class="row g-4">${gridHtml}</div>`;
    fadeInPage();
  }

  function renderArticlePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    const ui = blogPage?.ui || {};
    const byText = ui.byAuthor || "By";

    // If no articleId is specified, fallback to the first article in the dataset
    let article = blogData.find((a) => a.id === articleId);
    if (!article && !articleId && blogData.length > 0) {
      article = blogData[0];
    }

    if (!article) {
      const notFoundTitle = ui.articleNotFound || "Article Not Found";
      const notFoundDesc  = ui.articleNotFoundDesc || "The clinical article you are looking for does not exist or has been moved.";
      const returnBtnText = ui.returnToBlog || "Return to Blog";

      document.title = `${notFoundTitle} — OVI Wellness`;
      const container = document.getElementById("article-content-container");
      if (container) {
        container.innerHTML = `
          <section class="section-light py-5 d-flex align-items-center justify-content-center" style="min-height: 60vh; padding-top: 140px !important;">
            <div class="container text-center py-5">
              <h1 class="display-4 fw-bold mb-3 text-uppercase" style="color: var(--secondary-color); font-size: 2.5rem;">${notFoundTitle}</h1>
              <p class="text-muted mb-4 lead mx-auto" style="max-width: 550px;">${notFoundDesc}</p>
              <a href="blog.html" class="btn cta-btn btn-lg rounded-pill px-4 py-3">
                <i class="fas fa-arrow-left me-2"></i>${returnBtnText}
              </a>
            </div>
          </section>
        `;
      }
      fadeInPage();
      return;
    }

    // Update section titles via UI dictionary
    if (ui.sections) {
      setText('[data-i18n="article.consumerSafety"]',       ui.sections.consumerSafety);
      setText('[data-i18n="article.candidacyRequirements"]', ui.sections.candidacyRequirements);
      setText('[data-i18n="article.timelineExpectations"]',  ui.sections.timelineExpectations);
      setText('[data-i18n="article.expectedResults"]',       ui.sections.expectedResults);
      setText('[data-i18n="article.downtime"]',              ui.sections.downtime);
      setText('[data-i18n="article.clinicalRisks"]',          ui.sections.clinicalRisks);
    }
    setText('[data-i18n="article.readyTitle"]',       ui.readyTitle);
    setText('[data-i18n="article.readyDesc"]',        ui.readyDesc);
    setText('[data-i18n="article.bookConsultation"]', ui.bookConsultation);

    // Update page meta
    document.title = `${article.title} — OVI Wellness`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", article.excerpt);

    // Populate standard text slots
    setSlot("articleCategory", article.category);
    setSlot("articleTitle", article.title);
    setSlot("articleAuthor", `${byText} ${article.author}`);
    setSlot("articleDate", article.date);

    // Populate content sections
    if (article.content) {
      setHtmlSlot("contentOverview", article.content.overview);
      setHtmlSlot("contentSafety", article.content.consumerSafety);
      setHtmlSlot("contentCandidacy", article.content.candidacyRequirements);
      setHtmlSlot("contentTimeline", article.content.timelineExpectations);
      setHtmlSlot("contentDowntime", article.content.downtime);
      setHtmlSlot("contentResults", article.content.expectedResults);
      setHtmlSlot("contentRisks", article.content.clinicalRisks);
    }

    fadeInPage();
  }

  // --- Helpers ---
  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
  }

  function setHtml(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(el => { el.innerHTML = value; });
  }

  function setSlot(id, value) {
    const el = document.getElementById(id);
    if (el && value) {
      el.textContent = value;
    } else if (el && !value) {
      el.style.display = "none";
    }
  }

  function setHtmlSlot(id, htmlValue) {
    const el = document.getElementById(id);
    if (el && htmlValue) {
      el.innerHTML = htmlValue;
    } else if (el && !htmlValue) {
      const parentSection = el.closest(".article-section");
      if (parentSection) {
        parentSection.style.display = "none";
      } else {
        el.style.display = "none";
      }
    }
  }

  function fadeInPage() {
    setTimeout(() => {
      const lowerContent = document.getElementById('lower-content');
      const footerRoot = document.getElementById('footer-root');
      if (lowerContent) {
        lowerContent.style.transition = 'opacity 0.25s ease-in-out';
        lowerContent.style.opacity = '1';
      }
      if (footerRoot) {
        footerRoot.style.transition = 'opacity 0.25s ease-in-out';
        footerRoot.style.opacity = '1';
      }
    }, 60);
  }

  // Listen for i18nLoaded event (when locale JSON finished loading over network)
  document.addEventListener("i18nLoaded", init);

  // Fallback: run on DOMContentLoaded if clinicData is already loaded
  document.addEventListener("DOMContentLoaded", init);
})();
