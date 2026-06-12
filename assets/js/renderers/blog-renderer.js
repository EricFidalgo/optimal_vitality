/**
 * blog-renderer.js
 *
 * Handles the dynamic rendering of both the Blog Index page (blog.html)
 * and individual article pages (article.html).
 */
(function () {
  let blogData = [];

  document.addEventListener("DOMContentLoaded", function () {
    blogData = window.clinicData?.blog || [];
    
    // Sort articles by date descending (newest first)
    blogData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Determine which page we are on based on an element or URL
    if (document.getElementById("blog-grid-container")) {
      renderBlogIndex();
    } else if (document.getElementById("article-content-container")) {
      renderArticlePage();
    }
  });

  function renderBlogIndex() {
    const container = document.getElementById("blog-grid-container");
    if (!container) return;

    if (blogData.length === 0) {
      container.innerHTML = `<p class="text-center text-muted w-100 py-5">Check back soon for new educational content.</p>`;
      fadeInPage();
      return;
    }

    let html = "";
    blogData.forEach((article) => {
      html += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100 border-0 shadow-sm hover-lift ovi-card">
            <img src="${article.image}" class="card-img-top article-card-img" alt="${article.title}" style="height: 240px; object-fit: cover;">
            <div class="card-body d-flex flex-column p-4">
              <span class="badge bg-primary text-white bg-opacity-75 mb-3 align-self-start py-2 px-3 fw-normal" style="font-size: 0.75rem; letter-spacing: 0.5px;">${article.category}</span>
              <h4 class="card-title h5 fw-semibold mb-3">${article.title}</h4>
              <p class="card-text text-muted mb-4 small" style="line-height: 1.6;">${article.excerpt}</p>
              <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                <span class="text-muted small">${article.date}</span>
                <a href="article.html?id=${article.id}" class="text-primary fw-semibold text-decoration-none small stretched-link d-flex align-items-center group">
                  Read Article <i class="fas fa-arrow-right ms-2 transition-transform group-hover-translate-x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = `<div class="row g-4">${html}</div>`;
    fadeInPage();
  }

  function renderArticlePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    const article = blogData.find((a) => a.id === articleId);

    if (!article) {
      document.title = "Article Not Found — OVI Wellness";
      const container = document.getElementById("article-content-container");
      if (container) {
        container.innerHTML = `
          <div class="text-center py-5 my-5">
            <h1 class="display-5 fw-bold mb-3">Article Not Found</h1>
            <p class="text-muted mb-4">The clinical article you are looking for does not exist or has been moved.</p>
            <a href="blog.html" class="btn btn-primary px-4 py-2">Return to Blog</a>
          </div>
        `;
      }
      fadeInPage();
      return;
    }

    // Update page meta
    document.title = `${article.title} — OVI Wellness`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", article.excerpt);

    // Populate standard text slots
    setSlot("articleCategory", article.category);
    setSlot("articleTitle", article.title);
    setSlot("articleAuthor", `By ${article.author}`);
    setSlot("articleDate", article.date);

    // Set background image
    const heroSection = document.getElementById("article-hero-section");
    if (heroSection) {
      heroSection.style.backgroundImage = `linear-gradient(180deg, rgba(15, 32, 54, 0.6) 0%, rgba(15, 32, 54, 0.85) 100%), url('${article.image}')`;
      heroSection.style.backgroundSize = "cover";
      heroSection.style.backgroundPosition = "center";
    }

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

  // --- Helper Functions ---
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
      // If the content is missing, hide its container (the parent section) if possible
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
})();
