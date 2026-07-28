/**
 * legal-renderer.js
 *
 * Dynamically updates legal.html content when language changes.
 * High cohesion: one job — populate legal page from clinicData.pages.legal.
 * Low coupling: reads window.clinicData.pages.legal, updates only legal DOM elements.
 */
(function () {
  'use strict';

  function renderLegal() {
    const data = window.clinicData?.pages?.legal;
    if (!data) return;

    // Page title
    const mainTitle = document.querySelector('h1.font-family-bebas');
    if (mainTitle && data.title) mainTitle.textContent = data.title;

    // Effective date
    const effDate = document.querySelector('.tab-content')?.previousElementSibling;
    if (effDate && data.effectiveDate) effDate.textContent = data.effectiveDate;

    // Nav pills & Content panes
    if (data.tabs) {
      Object.keys(data.tabs).forEach(key => {
        const tabData = data.tabs[key];
        
        // Nav button
        const navBtn = document.getElementById(`v-pills-${key}-tab`);
        if (navBtn && tabData.nav) navBtn.textContent = tabData.nav;

        // Pane
        const pane = document.getElementById(`v-pills-${key}`);
        if (pane) {
          const h3 = pane.querySelector('h3');
          const p = pane.querySelector('p');
          if (h3 && tabData.title) h3.textContent = tabData.title;
          if (p && tabData.content) p.textContent = tabData.content;
        }
      });
    }
  }

  document.addEventListener('i18nLoaded', renderLegal);
  document.addEventListener('componentsLoaded', renderLegal);

  if (window.clinicData?.pages?.legal) {
    renderLegal();
  }
})();
