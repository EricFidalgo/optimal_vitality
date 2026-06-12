// assets/js/components.js
// Injects shared structural components (navbar, footer, mobile CTA) into every page.
// This eliminates duplicated HTML across all pages.

(function () {
    "use strict";

    const isSubpage = (typeof OVI_SERVICE_ID !== 'undefined');
    const prefix = isSubpage ? '../' : '';

    // -------------------------------------------------------------------------
    // NAVBAR
    // -------------------------------------------------------------------------
    function renderNavbar() {
        const root = document.getElementById("navbar-root");
        if (!root) return;

        let marqueeHTML = '';
        if (window.clinicData?.marquee) {
            const singlePass = clinicData.marquee.map(item => 
                `<span><i class="fas ${item.icon}"></i> ${item.label}</span><span>•</span>`
            ).join('');
            const repeatedContent = singlePass + singlePass + singlePass;
            
            marqueeHTML = `
                <!-- Top Announcement Marquee Bar -->
                <div class="top-marquee-bar">
                    <div class="marquee-track">
                        <div class="marquee-content">
                            ${repeatedContent}
                        </div>
                        <div class="marquee-content" aria-hidden="true">
                            ${repeatedContent}
                        </div>
                    </div>
                </div>
            `;
        }

        root.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top d-flex flex-column p-0" aria-label="Main Navigation">
                ${marqueeHTML}
                <div class="container navbar-container">
                    <a class="navbar-brand d-flex align-items-center" href="${prefix}index.html">
                        <img src="${prefix}assets/images/icons/logo.svg" alt="Optimal Vitality Institute Logo" class="logo-img">
                    </a>

                    <div class="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
                        <ul class="navbar-nav ms-auto" id="main-navbar-links"></ul>
                        <a href="#consultation" class="btn cta-btn ms-lg-3">Book Your Consultation</a>
                    </div>

                    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Toggle Navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="offcanvas offcanvas-end d-lg-none" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
                        <div class="offcanvas-header border-bottom border-secondary bg-white">
                            <a class="navbar-brand d-flex align-items-center m-0" href="${prefix}index.html">
                                <img src="${prefix}assets/images/icons/logo.svg" alt="Optimal Vitality Institute Logo" class="logo-img">
                            </a>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body d-flex flex-column text-center">
                            <ul class="navbar-nav mb-auto mt-4" id="mobile-navbar-links"></ul>
                            <div class="mt-auto pb-4">
                                <a href="#consultation" class="btn cta-btn w-100">Book Your Consultation</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    // -------------------------------------------------------------------------
    // FOOTER + MOBILE STICKY CTA
    // -------------------------------------------------------------------------
    function renderFooter() {
        const root = document.getElementById("footer-root");
        if (!root) return;

        const c = window.clinicData?.contact;
        if (!c) {
            console.error("Clinic contact data is missing!");
            return;
        }

        root.innerHTML = `
            <footer class="footer py-5 text-center text-md-start" id="consultation">
                <div class="container py-4">
                    <div class="row align-items-stretch g-4">
                        <div class="col-lg-4 align-self-center mb-5 mb-lg-0 text-center text-lg-start">
                            <h2 class="mb-4 text-white">Ready to Transform Your Health?</h2>
                            <p class="mb-4 text-white-50 mx-auto mx-lg-0" style="max-width: 500px;">Take the first step towards a revitalized you. Book your consultation to have our medical experts design your personalized protocol.</p>
                            <a href="#consultation" class="btn cta-btn btn-lg mt-2">Secure Your Consultation</a>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div class="bg-dark bg-opacity-25 p-4 rounded border border-secondary text-start mx-auto shadow-sm h-100" style="max-width: 400px;">
                                <h4 class="text-primary mb-4 font-family-bebas">Our Services</h4>
                                <ul class="list-unstyled mb-0" id="footer-services-list"></ul>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div class="bg-dark bg-opacity-25 p-4 rounded border border-secondary text-start mx-auto shadow-sm h-100" style="max-width: 400px;">
                                <h4 class="text-primary mb-4 font-family-bebas">Clinic Information</h4>
                                <p class="text-white-50 mb-3"><i class="fas fa-map-marker-alt text-primary me-3 w-15px text-center"></i> ${c.address.street}<br><span class="ms-4 ps-2">${c.address.city}, ${c.address.state} ${c.address.zip}</span></p>
                                <p class="text-white-50 mb-3"><i class="fas fa-phone-alt text-primary me-3 w-15px text-center"></i> ${c.phone}</p>
                                <p class="text-white-50 mb-3"><i class="fas fa-envelope text-primary me-3 w-15px text-center"></i> ${c.email}</p>
                                <p class="mb-0"><a href="${c.socials.instagram.url}" target="_blank" class="text-white-50 text-decoration-none"><i class="fab fa-instagram text-primary me-3 w-15px text-center"></i> ${c.socials.instagram.handle}</a></p>
                                <hr class="border-secondary my-4">
                                <p class="text-white-50 mb-2"><i class="fas fa-clock text-primary me-3 w-15px text-center"></i> <strong>${c.hours[0].days}:</strong> ${c.hours[0].time}</p>
                                <p class="text-white-50 mb-0"><i class="fas fa-clock text-primary me-3 w-15px text-center opacity-0"></i> <strong>${c.hours[1].days}:</strong> ${c.hours[1].time}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 pt-4 border-top border-secondary text-center">
                        <p class="text-white-50 max-w-700 mx-auto mb-3" style="font-size: 0.8rem; line-height: 1.6;">
                            <strong>Medical Disclaimer:</strong> Prescription treatments are provided only after a thorough clinician evaluation and diagnostic review. The content on this website is for informational purposes only and does not substitute professional medical advice, diagnosis, or treatment.
                        </p>
                        <p class="mb-0 text-white-50"><small>&copy; 2026 Optimal Vitality Institute. All rights reserved.</small></p>
                    </div>
                </div>
            </footer>

            <div id="mobile-sticky-cta" class="d-lg-none position-fixed bottom-0 start-0 w-100 p-3" style="z-index: 1040; pointer-events: none;">
                <a href="#consultation" class="btn cta-btn w-100 py-3 shadow-lg fs-6 fw-bold text-uppercase d-flex align-items-center justify-content-center" style="border-radius: 50px; pointer-events: auto; letter-spacing: 1px;">
                    <i class="fas fa-calendar-check me-2"></i>
                </a>
            </div>
        `;
    }
 
    // -------------------------------------------------------------------------
    // CLINICAL DISCLOSURES
    // -------------------------------------------------------------------------
    function renderDisclosures() {
        const root = document.getElementById("disclosures-root");
        if (!root) return;

        fetch(`${prefix}assets/components/disclosures.html`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load disclosures component");
                return res.text();
            })
            .then(html => {
                root.innerHTML = html;
            })
            .catch(err => console.error(err));
    }

    // -------------------------------------------------------------------------
    // LOCAL SCHEMA INJECTION (DRY)
    // -------------------------------------------------------------------------
    function injectLocalSchema() {
        const path = window.location.pathname.toLowerCase();
        let schemaKey = null;
        if (path.endsWith("/st-pete.html") || path.endsWith("/st-pete")) {
            schemaKey = "stPete";
        } else if (path.endsWith("/tampa.html") || path.endsWith("/tampa")) {
            schemaKey = "tampa";
        }

        const loc = window.clinicData?.locations?.[schemaKey];
        const c = window.clinicData?.contact;

        if (schemaKey && loc && c) {
            if (!c) {
                console.error("Clinic contact data is missing for schema injection!");
                return;
            }
            
            // Build the full schema by merging base clinic properties with page-specific ones
            const fullSchema = {
                "@context": "https://schema.org",
                "@type": "MedicalClinic",
                "name": loc.name,
                "alternateName": "OVI Wellness",
                "description": loc.description,
                "url": loc.url,
                "telephone": c.phone,
                "image": "https://oviwellness.com/assets/images/photos/team-group.avif",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": c.address.street,
                    "addressLocality": c.address.city,
                    "addressRegion": c.address.state,
                    "postalCode": c.address.zip,
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 27.7725,
                    "longitude": -82.6347
                },
                "areaServed": loc.areaServed,
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "08:00",
                    "closes": "18:00"
                },
                "priceRange": "$$",
                "medicalSpecialty": "Endocrinology"
            };

            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.text = JSON.stringify(fullSchema);
            document.head.appendChild(script);
        }
    }

    function initNavbarBehavior() {
        // Mobile Menu Auto-Close on nav link click
        const offcanvasElement = document.getElementById('mobileMenu');
        let offcanvasInstance = null;
        if (offcanvasElement && typeof bootstrap !== 'undefined') {
            offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        }
        document.querySelectorAll('a.nav-link, a.cta-btn, .hormone-cta a, .navbar-brand').forEach(link => {
            link.addEventListener('click', function (event) {
                if (this.getAttribute('href') === '#') { event.preventDefault(); return; }
                if (this.hash !== '' && offcanvasElement && offcanvasElement.classList.contains('show') && offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            });
        });

        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            function handleNavbarScroll() {
                navbar.classList.toggle('scrolled-nav', (window.scrollY || document.documentElement.scrollTop) > 50);
            }
            window.addEventListener('scroll', handleNavbarScroll);
            handleNavbarScroll();
        }
    }

    // -------------------------------------------------------------------------
    // DYNAMIC CONTACT INJECTION
    // -------------------------------------------------------------------------
    function injectContactInfo() {
        const c = window.clinicData?.contact;
        if (!c) return;

        document.querySelectorAll('[data-global-contact="phone"]').forEach(el => {
            el.innerHTML = `<i class="fas fa-phone-alt me-2"></i> ${c.phone}`;
        });
        document.querySelectorAll('[data-global-contact="email"]').forEach(el => {
            el.innerHTML = `<i class="fas fa-envelope me-2"></i> Email Clinical Team`;
            if (el.tagName === 'A') el.href = "mailto:" + c.email;
        });
    }

    // -------------------------------------------------------------------------
    // INIT — render components before anything else fires
    // -------------------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
        renderNavbar();
        renderFooter();
        renderDisclosures();
        injectLocalSchema();
        initNavbarBehavior();
        injectContactInfo();
    });

    document.addEventListener("componentsLoaded", function() {
        injectContactInfo();
    });
})();
