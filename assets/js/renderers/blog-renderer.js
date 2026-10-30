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
            ${article.image ? `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" loading="lazy" class="card-img-top" style="aspect-ratio: 16 / 9; object-fit: cover; border-radius: 12px 12px 0 0;">` : ""}
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
                <a href="blog/${article.id}" class="fw-semibold text-decoration-none small stretched-link d-flex align-items-center group" style="color: var(--secondary-color);">
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
    // Generated post pages (article-<slug>.html) carry their id on <body>; the legacy article?id=... URL uses the query string.
    const articleId = urlParams.get("id") || document.body.dataset.articleId || null;

    const ui = blogPage?.ui || {};

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
              <a href="/blog" class="btn cta-btn btn-lg rounded-pill px-4 py-3">
                <i class="fas fa-arrow-left me-2"></i>${returnBtnText}
              </a>
            </div>
          </section>
        `;
      }
      fadeInPage();
      return;
    }

    setText('[data-i18n="article.readyTitle"]',       ui.readyTitle);
    setText('[data-i18n="article.readyDesc"]',        ui.readyDesc);
    setText('[data-i18n="article.bookConsultation"]', ui.bookConsultation);

    // Update page meta
    document.title = article.seoTitle || `${article.title} — OVI Wellness`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", article.metaDescription || article.excerpt);

    // Old article?id=... links point search engines at the post's own page.
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && !document.body.dataset.articleId) {
      canonical.setAttribute("href", `https://oviwellness.com/blog/${article.id}`);
    }

    // Populate standard text slots
    setSlot("articleCategory", article.category);
    setSlot("articleTitle", article.title);
    setSlot("articleDate", article.date);

    // Dynamically render content sections from the array
    const sectionsContainer = document.getElementById("article-sections-container");
    if (sectionsContainer && Array.isArray(article.content)) {
      let sectionsHtml = article.image ? figureHtml(article.image, article.imageAlt, true) : "";
      sectionsHtml += tocHtml(article, ui.tableOfContents || "Table of Contents");
      const ids = sectionIds(article.content);
      const parts = [];
      article.content.forEach((section, index) => {
        const sectionImage = section.image ? figureHtml(section.image, section.imageAlt) : "";
        if (index === 0) {
          // First item is the lead overview (no heading). Section text arrives as ready-made HTML from the build.
          parts.push(`<div class="article-section">${sectionImage}${section.body}</div>`);
        } else {
          parts.push(`
            <div class="article-section${sectionClass(section.title)}">
              ${sectionImage}<h3 id="${escapeHtml(ids[index])}">${section.title}</h3>
              ${section.body}
            </div>`);
        }
      });
      const related = relatedServiceHtml(article, ui);
      if (related) parts.splice(relatedInsertIndex(article.content), 0, related);
      sectionsHtml += parts.join("");
      sectionsContainer.innerHTML = sectionsHtml;
    }

    fadeInPage();
  }

  // --- Helpers ---
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Keep figureHtml, sectionIds and tocHtml identical to the same helpers in scripts/build-blog.js (the prerendered page).
  const RESERVED_IDS = ["consultation", "faqs", "home", "navbar-root", "footer-root", "lower-content"];

  function headingSlug(t) {
    return (
      String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") ||
      "section"
    );
  }

  function sectionIds(content) {
    const used = new Set(RESERVED_IDS);
    return content.map((s) => {
      const base = headingSlug(s.title);
      let id = base;
      for (let n = 2; used.has(id); n++) id = base + "-" + n;
      used.add(id);
      return id;
    });
  }

  function sectionClass(title) {
    return /^(sources|fuentes|references|referencias)\b/i.test(String(title).trim()) ? " article-sources" : "";
  }

  // "Related service" card: before any Disclaimer / Sources section, otherwise at the end (same as build-blog.js).
  function relatedInsertIndex(content) {
    const i = content.findIndex((s, idx) => idx > 0 && /^(disclaimer|sources|descargo|fuentes|references|referencias)\b/i.test(String(s.title).trim()));
    return i === -1 ? content.length : i;
  }

  function relatedServiceHtml(article, ui) {
    const services = (window.clinicData && window.clinicData.services) || [];
    const svc = article.service && services.find((s) => s.id === article.service);
    if (!svc) return "";
    const label = ui.relatedService || "Related service";
    const learn = ui.learnMoreAbout || "Learn more about";
    return (
      `<aside class="article-related-service" aria-label="${escapeHtml(label)}"><p class="article-related-label">${escapeHtml(label)}</p>` +
      `<a class="article-related-link" href="/services/${escapeHtml(article.service)}"><span class="article-related-name">${escapeHtml(svc.tabLabel)}</span>` +
      `<span class="article-related-desc">${escapeHtml(svc.lead || "")}</span>` +
      `<span class="article-related-cta">${escapeHtml(learn)} ${escapeHtml(svc.tabLabel)} &rarr;</span></a></aside>`
    );
  }

  function tocHtml(article, label) {
    if (!article.toc) return "";
    const ids = sectionIds(article.content);
    const items = article.content
      .map((s, i) => ({ s, id: ids[i], i }))
      .filter(({ s, i }) => i > 0 && s.title && !/^(disclaimer|sources|descargo|fuentes)\b/i.test(s.title.trim()));
    if (items.length < 2) return "";
    return (
      `<nav class="article-toc" aria-label="${escapeHtml(label)}"><p class="article-toc-title">${escapeHtml(label)}</p><ol>` +
      items.map(({ s, id }) => `<li><a href="#${escapeHtml(id)}">${escapeHtml(s.title)}</a></li>`).join("") +
      "</ol></nav>"
    );
  }

  function figureHtml(src, alt, eager) {
    return `<figure class="article-figure"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${eager ? "" : ' loading="lazy"'}></figure>`;
  }

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
