/**
 * home-renderer.js
 * Reads window.clinicData.pages.home (loaded by i18n.js) and fills
 * all translatable sections of index.html via data-i18n attributes.
 * High cohesion: one job — render home page text from JSON.
 * Low coupling: reads only from window.clinicData.pages.home, touches only [data-i18n] elements and known container IDs.
 */
(function () {
  'use strict';

  function renderHome(t) {
    if (!t) return;

    // Hero
    setHTML('[data-i18n="hero.headline"]',    t.hero && t.hero.headline);
    setText('[data-i18n="hero.subheadline"]', t.hero && t.hero.subheadline);
    setText('[data-i18n="hero.cta"]',         t.hero && t.hero.cta);
    setText('[data-i18n="hero.exploreBtn"]',  t.hero && t.hero.exploreBtn);

    // Core Therapies
    setText('[data-i18n="coreTherapies.sectionTitle"]', t.coreTherapies && t.coreTherapies.sectionTitle);

    // Memberships
    setText('[data-i18n="memberships.sectionTitle"]',      t.memberships && t.memberships.sectionTitle);
    setText('[data-i18n="memberships.ivBanner.title"]',    t.memberships && t.memberships.ivBanner && t.memberships.ivBanner.title);
    setHTML('[data-i18n="memberships.ivBanner.body"]',     t.memberships && t.memberships.ivBanner && t.memberships.ivBanner.body);
    setText('[data-i18n="memberships.ivBanner.callBtn"]',  t.memberships && t.memberships.ivBanner && t.memberships.ivBanner.callBtn);
    setText('[data-i18n="memberships.ivBanner.bookBtn"]',  t.memberships && t.memberships.ivBanner && t.memberships.ivBanner.bookBtn);

    if (t.memberships && t.memberships.plans) {
      renderMembershipPlans(t.memberships.plans);
    }

    // Why Us
    setText('[data-i18n="whyUs.sectionTitle"]', t.whyUs && t.whyUs.sectionTitle);
    setText('[data-i18n="whyUs.teamBadge"]',    t.whyUs && t.whyUs.teamBadge);
    setText('[data-i18n="whyUs.teamSub"]',      t.whyUs && t.whyUs.teamSub);
    setHTML('[data-i18n="whyUs.meetBtn"]',      t.whyUs && t.whyUs.meetBtn);

    if (t.whyUs && t.whyUs.benefits) {
      renderBenefits(t.whyUs.benefits);
    }

    // Additional Services
    setText('[data-i18n="additionalServices.sectionTitle"]', t.additionalServices && t.additionalServices.sectionTitle);

    // FAQs
    setText('[data-i18n="faqs.sectionTitle"]', t.faqs && t.faqs.sectionTitle);

    // Social Proof
    setText('[data-i18n="socialProof.sectionTitle"]', t.socialProof && t.socialProof.sectionTitle);
  }

  function renderMembershipPlans(plans) {
    var desktopGrid  = document.getElementById('memberships-desktop');
    var mobileAccord = document.getElementById('mobilePlanAccordion');
    if (!desktopGrid && !mobileAccord) return;

    var planMeta = {
      essential: {
        cardClass: 'membership-card h-100 p-4 p-xl-5 rounded-4 border bg-white shadow-sm d-flex flex-column justify-content-between position-relative transition-all',
        btnClass: 'btn btn-outline-secondary w-100 rounded-pill py-3 fw-bold text-uppercase',
        mobileBtnClass: 'btn btn-outline-secondary w-100 rounded-pill py-2 fw-bold text-uppercase',
        badgeClass: 'badge bg-light text-dark border px-3 py-1 rounded-pill fw-semibold',
        mobileItemClass: 'accordion-item border rounded-4 bg-white overflow-hidden shadow-sm',
        featured: false,
        accordionId: 'Essential',
        collapseDefault: false
      },
      vip: {
        cardClass: 'membership-card vip-executive-card h-100 p-4 p-xl-5 rounded-4 border shadow-sm d-flex flex-column justify-content-between position-relative transition-all',
        btnClass: 'btn btn-outline-secondary w-100 rounded-pill py-3 fw-bold text-uppercase',
        mobileBtnClass: 'btn btn-outline-secondary w-100 rounded-pill py-2 fw-bold text-uppercase',
        badgeClass: 'badge badge-vip-executive px-3 py-1 rounded-pill',
        mobileItemClass: 'accordion-item border rounded-4 vip-executive-card overflow-hidden shadow-sm',
        featured: false,
        accordionId: 'Executive',
        collapseDefault: false
      },
      optimal: {
        cardClass: 'membership-card featured-membership h-100 p-4 p-xl-5 rounded-4 border bg-dark text-white d-flex flex-column justify-content-between position-relative transition-all',
        cardStyle: 'background: linear-gradient(135deg, #1c3838 0%, var(--secondary-color) 100%) !important; border-color: var(--primary-color) !important;',
        btnClass: 'btn cta-btn w-100 rounded-pill py-3 fw-bold text-uppercase',
        mobileBtnClass: 'btn cta-btn w-100 rounded-pill py-2 fw-bold text-uppercase',
        badgeClass: 'badge badge-best-value px-3 py-1 rounded-pill',
        mobileItemClass: 'accordion-item border rounded-4 text-white overflow-hidden position-relative shadow-md',
        mobileItemStyle: 'background: linear-gradient(135deg, #1c3838 0%, var(--secondary-color) 100%) !important; border-color: var(--primary-color) !important;',
        featured: true,
        accordionId: 'Optimal',
        collapseDefault: true
      }
    };

    if (desktopGrid) {
      desktopGrid.innerHTML = '';
      plans.forEach(function(plan) {
        var meta = planMeta[plan.id] || planMeta.essential;
        var styleAttr = meta.cardStyle ? ' style="' + meta.cardStyle + '"' : '';
        var textColor = meta.featured ? 'text-white' : 'text-dark';
        var titleStyle = meta.featured ? '' : ' style="color:var(--secondary-color) !important;"';
        var descColor = meta.featured ? 'text-white-50' : 'text-muted';
        var liColor   = meta.featured ? 'text-white-50' : 'text-muted';
        var spanAttr  = meta.featured ? ' class="text-white"' : '';
        var mtClass   = meta.featured ? ' mt-2' : '';
        var features = plan.features.map(function(f) {
          var badgeClass = meta.featured ? 'check-badge-featured' : (plan.id === 'vip' ? 'check-badge-vip' : 'check-badge-standard');
          var textStyle  = meta.featured ? 'color: #ffffff !important; font-weight: 500;' : 'color: #1e2d17 !important; font-weight: 500;';
          return '<li class="d-flex align-items-start gap-3" style="font-size:0.95rem; line-height:1.55;">' +
                   '<div class="plan-check-badge ' + badgeClass + ' flex-shrink-0"><i class="fas fa-check"></i></div>' +
                   '<span style="' + textStyle + '">' + f + '</span>' +
                 '</li>';
        }).join('');

        desktopGrid.insertAdjacentHTML('beforeend',
          '<div class="col-lg-4 col-md-6">' +
            '<div class="' + meta.cardClass + '"' + styleAttr + '>' +
              '<div>' +
                '<h3 class="h4 fw-bold ' + textColor + ' mb-1' + mtClass + ' text-center"' + titleStyle + '>' + plan.name + '</h3>' +
                '<div class="mb-3 text-center"><span class="' + meta.badgeClass + '" style="font-size:0.75rem;">' + plan.badge + '</span></div>' +
                '<p class="' + descColor + ' mb-4 text-center" style="font-size:0.95rem;line-height:1.5;">' + plan.description + '</p>' +
                '<ul class="list-unstyled d-flex flex-column gap-3 mb-4">' + features + '</ul>' +
              '</div>' +
              '<div class="pt-3"><a href="#consultation" class="' + meta.btnClass + '" style="font-size:0.85rem;letter-spacing:0.8px;">' + plan.cta + '</a></div>' +
            '</div>' +
          '</div>'
        );
      });
    }

    if (mobileAccord) {
      mobileAccord.innerHTML = '';
      plans.forEach(function(plan) {
        var meta = planMeta[plan.id] || planMeta.essential;
        var itemStyleAttr  = meta.mobileItemStyle ? ' style="' + meta.mobileItemStyle + '"' : '';
        var btnBg     = meta.featured ? 'bg-transparent text-white' : 'bg-white text-dark';
        var titleColor = meta.featured ? 'text-white' : '';
        var titleStyle = meta.featured ? '' : ' style="color:var(--secondary-color);"';
        var descColor = meta.featured ? 'text-white-50' : 'text-muted';
        var showClass = meta.collapseDefault ? 'collapse show' : 'collapse';
        var expanded  = meta.collapseDefault ? 'true' : 'false';
        var collapsedClass = meta.collapseDefault ? '' : 'collapsed';
        var features  = plan.features.map(function(f) {
          var badgeClass = meta.featured ? 'check-badge-featured' : (plan.id === 'vip' ? 'check-badge-vip' : 'check-badge-standard');
          var textStyle  = meta.featured ? 'color: #ffffff !important; font-weight: 500;' : 'color: #1e2d17 !important; font-weight: 500;';
          return '<li class="d-flex align-items-start gap-3 small mb-2">' +
                   '<div class="plan-check-badge ' + badgeClass + ' flex-shrink-0" style="width:22px;height:22px;font-size:0.65rem;"><i class="fas fa-check"></i></div>' +
                   '<span style="' + textStyle + '">' + f + '</span>' +
                 '</li>';
        }).join('');
        mobileAccord.insertAdjacentHTML('beforeend',
          '<div class="' + meta.mobileItemClass + '"' + itemStyleAttr + '>' +
            '<h3 class="accordion-header" id="heading' + meta.accordionId + '">' +
              '<button class="accordion-button ' + collapsedClass + ' px-4 py-3 ' + btnBg + ' d-flex align-items-center justify-content-between w-100 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + meta.accordionId + '" aria-expanded="' + expanded + '" aria-controls="collapse' + meta.accordionId + '">' +
                '<div class="d-flex align-items-center gap-2 pt-1">' +
                  '<span class="fw-bold fs-5 ' + titleColor + '"' + titleStyle + '>' + plan.name + '</span>' +
                  '<span class="' + meta.badgeClass + '">' + plan.badge + '</span>' +
                '</div>' +
              '</button>' +
            '</h3>' +
            '<div id="collapse' + meta.accordionId + '" class="accordion-collapse ' + showClass + '" aria-labelledby="heading' + meta.accordionId + '" data-bs-parent="#mobilePlanAccordion">' +
              '<div class="accordion-body px-4 pt-1 pb-4">' +
                '<p class="' + descColor + ' small mb-3" style="line-height:1.5;">' + plan.description + '</p>' +
                '<ul class="list-unstyled d-flex flex-column gap-2 mb-4">' + features + '</ul>' +
                '<a href="#consultation" class="' + meta.mobileBtnClass + '" style="font-size:0.8rem;letter-spacing:0.8px;">' + plan.cta + '</a>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      });
    }
  }

  function renderBenefits(benefits) {
    var desktopEl = document.getElementById('why-us-desktop');
    var mobileEl  = document.querySelector('#why-us .d-lg-none .card .d-flex.flex-column.gap-3');

    if (desktopEl) {
      desktopEl.innerHTML = benefits.map(function(b) {
        return '<div class="col-12"><div class="d-flex align-items-start gap-3 p-3 rounded-4 bg-white border border-light-subtle shadow-sm hover-lift h-100"><div class="rounded-3 d-none d-lg-flex align-items-center justify-content-center flex-shrink-0" style="width:48px;height:48px;background:rgba(230,195,129,0.2);color:var(--primary-color);font-size:1.25rem;"><i class="fas ' + b.icon + '"></i></div><div><h4 class="h6 fw-bold mb-1" style="color:var(--secondary-color);">' + b.title + '</h4><p class="small text-secondary mb-0" style="line-height:1.5;">' + b.detail + '</p></div></div></div>';
      }).join('');
    }

    if (mobileEl) {
      mobileEl.innerHTML = benefits.map(function(b, i) {
        var hr = (i < benefits.length - 1) ? '<hr class="my-0 border-secondary opacity-10">' : '';
        return '<div class="d-flex align-items-start gap-3"><div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:38px;height:38px;background:rgba(230,195,129,0.2);color:var(--primary-color);font-size:1.05rem;"><i class="fas ' + b.icon + '"></i></div><div><h5 class="fw-bold mb-1 text-dark" style="font-size:0.88rem;color:var(--secondary-color) !important;">' + b.title + '</h5><p class="small text-muted mb-0" style="font-size:0.78rem;line-height:1.35;">' + b.detail + '</p></div></div>' + hr;
      }).join('');
    }
  }

  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function(el) { el.textContent = value; });
  }

  function setHTML(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function(el) { el.innerHTML = value; });
  }

  var _rendered = false;

  function boot() {
    if (_rendered) return;
    var homeData = window.clinicData && window.clinicData.pages && window.clinicData.pages.home;
    if (!homeData) return;
    _rendered = true;
    renderHome(homeData);
  }

  // i18nLoaded fires once locale JSON is ready; componentsLoaded fires once
  // injected components (navbar, footer, location) are in the DOM.
  // Listen to both independently — the guard above ensures only one render.
  document.addEventListener('i18nLoaded', boot);
  document.addEventListener('componentsLoaded', boot);

  // Sync fallback: if clinicData is already populated when this script runs
  if (window.clinicData && window.clinicData.pages && window.clinicData.pages.home) {
    boot();
  }
})();
