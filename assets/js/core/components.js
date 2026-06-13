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

        const c = window.clinicData?.contact;

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
                                <p class="mb-3">
                                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${c.address.street}, ${c.address.city}, ${c.address.state} ${c.address.zip}`)}" target="_blank" rel="noopener noreferrer" class="text-white-50 text-decoration-none hover-white">
                                        <i class="fas fa-map-marker-alt text-primary me-3 w-15px text-center"></i> ${c.address.street}<br><span class="ms-4 ps-2">${c.address.city}, ${c.address.state} ${c.address.zip}</span>
                                    </a>
                                </p>
                                <p class="mb-3">
                                    <a href="tel:${c.phone.replace(/\D/g, '')}" class="text-white-50 text-decoration-none hover-white">
                                        <i class="fas fa-phone-alt text-primary me-3 w-15px text-center"></i> ${c.phone}
                                    </a>
                                </p>
                                <p class="mb-3">
                                    <a href="mailto:${c.email}" class="text-white-50 text-decoration-none hover-white">
                                        <i class="fas fa-envelope text-primary me-3 w-15px text-center"></i> ${c.email}
                                    </a>
                                </p>
                                <p class="mb-0"><a href="${c.socials.instagram.url}" target="_blank" rel="noopener noreferrer" class="text-white-50 text-decoration-none"><i class="fab fa-instagram text-primary me-3 w-15px text-center"></i> ${c.socials.instagram.handle}</a></p>
                                ${c?.socials?.facebook ? `<p class="mb-0 mt-2"><a href="${c.socials.facebook.url}" target="_blank" rel="noopener noreferrer" class="text-white-50 text-decoration-none"><i class="fab fa-facebook-f text-primary me-3 w-15px text-center"></i> ${c.socials.facebook.handle}</a></p>` : ''}
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
                        <p class="mb-3 text-white-50"><small>&copy; 2026 Optimal Vitality Institute. All rights reserved.</small></p>
                        <div class="d-flex flex-wrap justify-content-center align-items-center mb-0 text-white-50" style="font-size: 0.75rem; gap: 8px 12px;">
                            <a href="${prefix}legal.html#privacy" class="text-white-50 text-decoration-none hover-white">Privacy Policy</a> &bull;
                            <a href="${prefix}legal.html#terms" class="text-white-50 text-decoration-none hover-white">Terms & Conditions</a> &bull;
                            <a href="${prefix}legal.html#hipaa" class="text-white-50 text-decoration-none hover-white">HIPAA Notice</a> &bull;
                            <a href="${prefix}legal.html#medical" class="text-white-50 text-decoration-none hover-white">Medical Disclaimer</a> &bull;
                            <a href="${prefix}legal.html#sms" class="text-white-50 text-decoration-none hover-white">SMS Consent Disclosure</a> &bull;
                            <a href="${prefix}legal.html#telehealth" class="text-white-50 text-decoration-none hover-white">Telehealth Disclosure</a> &bull;
                            <a href="${prefix}legal.html#financing" class="text-white-50 text-decoration-none hover-white">Financing Disclosure</a> &bull;
                            <a href="${prefix}legal.html#form" class="text-white-50 text-decoration-none hover-white">Form Consent Disclaimer</a> &bull;
                            <a href="${prefix}legal.html#results" class="text-white-50 text-decoration-none hover-white">Results Disclaimer</a>
                        </div>
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
    // DYNAMIC CONSULTATION MODAL & MULTI-STEP LOGIC
    // -------------------------------------------------------------------------
    function initConsultationModal() {
        // 1. Create and inject modal container to document body if it doesn't exist
        if (document.getElementById('consultationModal')) return;

        const modalHTML = `
        <div class="modal fade" id="consultationModal" tabindex="-1" aria-labelledby="consultationModalLabel" aria-hidden="true" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
              <div class="modal-header border-0 d-flex justify-content-between align-items-center pb-2">
                <h5 class="modal-title font-family-bebas text-uppercase text-white" id="consultationModalLabel" style="font-size: 1.25rem; letter-spacing: 1px;">Request Your Consultation</h5>
                <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close" style="font-size: 0.8rem;"></button>
              </div>
              <div class="modal-body pt-0">
                <!-- Step Indicators -->
                <div class="form-step-indicators">
                  <div class="step-dot active" data-step="1"></div>
                  <div class="step-dot" data-step="2"></div>
                  <div class="step-dot" data-step="3"></div>
                </div>

                <form id="consultationForm" novalidate>
                  <input type="hidden" name="access_key" value="">
                  <input type="hidden" name="subject" value="New Consultation Lead from OVI Wellness">
                  <input type="hidden" name="from_name" value="OVI Website Lead Capture">

                  <!-- STEP 1: Treatment Interest -->
                  <div class="modal-step active" data-step="1">
                    <h6 class="text-white-50 text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">Step 1: What are you interested in?</h6>
                    <div class="interest-grid mb-3">
                      <div class="interest-card" data-interest="Hormone Optimization (TRT)">
                        <i class="fas fa-syringe"></i>
                        <span>Hormone Optimization</span>
                      </div>
                      <div class="interest-card" data-interest="Medical Weight Loss">
                        <i class="fas fa-weight-scale"></i>
                        <span>Weight Loss</span>
                      </div>
                      <div class="interest-card" data-interest="Peptide Therapy">
                        <i class="fas fa-vial"></i>
                        <span>Peptides</span>
                      </div>
                      <div class="interest-card" data-interest="IV Therapy">
                        <i class="fas fa-kit-medical"></i>
                        <span>IV Therapy</span>
                      </div>
                      <div class="interest-card" data-interest="Skin Aesthetics">
                        <i class="fas fa-magic"></i>
                        <span>Aesthetics</span>
                      </div>
                      <div class="interest-card" data-interest="Regenerative Medicine">
                        <i class="fas fa-heartbeat"></i>
                        <span>Regenerative Medicine</span>
                      </div>
                    </div>
                    <!-- Hidden input to store chosen interest -->
                    <input type="hidden" name="treatment_interest" id="input-treatment-interest" required>
                    <div class="text-danger small d-none mb-3" id="step1-error">Please select a treatment interest to continue.</div>
                    
                    <div class="d-flex justify-content-end mt-4">
                      <button type="button" class="btn btn-primary btn-modal-action px-4 py-2" id="next-to-step2" style="background-color: var(--primary-color); border: 0; color: #1b1b1b;">Continue</button>
                    </div>
                  </div>

                  <!-- STEP 2: Contact Info -->
                  <div class="modal-step" data-step="2">
                    <h6 class="text-white-50 text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">Step 2: Tell us how to reach you</h6>
                    
                    <div class="mb-3 text-start">
                      <label for="leadName" class="form-label small text-white-50 text-uppercase mb-1">Full Name</label>
                      <input type="text" class="form-control bg-dark text-white border-secondary shadow-none" id="leadName" name="name" placeholder="John Doe" required style="border-radius: 6px;">
                    </div>
                    <div class="mb-3 text-start">
                      <label for="leadEmail" class="form-label small text-white-50 text-uppercase mb-1">Email Address</label>
                      <input type="email" class="form-control bg-dark text-white border-secondary shadow-none" id="leadEmail" name="email" placeholder="john@example.com" required style="border-radius: 6px;">
                    </div>
                    <div class="mb-3 text-start">
                      <label for="leadPhone" class="form-label small text-white-50 text-uppercase mb-1">Phone Number</label>
                      <input type="tel" class="form-control bg-dark text-white border-secondary shadow-none" id="leadPhone" name="phone" placeholder="(727) 555-0199" required style="border-radius: 6px;">
                    </div>

                    <div class="text-danger small d-none mb-3" id="step2-error">Please fill out all contact fields with valid information.</div>

                    <div class="d-flex justify-content-between mt-4">
                      <button type="button" class="btn btn-outline-secondary text-white border-secondary btn-modal-action px-4 py-2" id="prev-to-step1">Back</button>
                      <button type="button" class="btn btn-primary btn-modal-action px-4 py-2" id="next-to-step3" style="background-color: var(--primary-color); border: 0; color: #1b1b1b;">Continue</button>
                    </div>
                  </div>

                  <!-- STEP 3: Special Offer & Consent -->
                  <div class="modal-step" data-step="3">
                    <h6 class="text-white-50 text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">Step 3: Select Offer & Confirm</h6>
                    
                    <div class="p-3 bg-dark bg-opacity-25 rounded border border-secondary mb-3 text-start">
                      <span class="badge px-2 py-1 text-uppercase mb-2 text-primary" style="font-size: 0.65rem; background-color: rgba(230, 195, 129, 0.12); border: 1px solid var(--primary-color);">First-Time Welcome Offer</span>
                      <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="welcome_offer" id="offerFree" value="Complimentary Initial Consultation" checked>
                        <label class="form-check-label text-white small" for="offerFree">
                          Complimentary Initial Consultation
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="welcome_offer" id="offerWelcome" value="$99 New Patient Welcome Special">
                        <label class="form-check-label text-white small" for="offerWelcome">
                          $99 New Patient Welcome Special (Includes body composition scan)
                        </label>
                      </div>
                    </div>

                    <div class="form-check mb-3 text-start">
                      <input class="form-check-input" type="checkbox" id="smsOptIn" name="sms_consent" value="Yes" checked required>
                      <label class="form-check-label text-white-50" for="smsOptIn" style="font-size: 0.72rem; line-height: 1.4;">
                        I agree to receive automated messages, updates, or text alerts regarding my inquiry from OVI Wellness at the number provided above. Consent is not a condition of purchase. Message/data rates apply. Message frequency varies. View our <a href="${prefix}legal.html#sms" target="_blank" rel="noopener noreferrer" class="text-primary text-decoration-none">SMS Consent Policy</a> and <a href="${prefix}legal.html#privacy" target="_blank" rel="noopener noreferrer" class="text-primary text-decoration-none">Privacy Policy</a>.
                      </label>
                      <div class="text-danger small d-none mt-1" id="step3-error">You must accept the SMS consent disclosure to continue.</div>
                    </div>

                    <div class="d-flex justify-content-between mt-4">
                      <button type="button" class="btn btn-outline-secondary text-white border-secondary btn-modal-action px-4 py-2" id="prev-to-step2">Back</button>
                      <button type="submit" class="btn btn-primary btn-modal-action px-4 py-2" id="submitFormBtn" style="background-color: var(--primary-color); border: 0; color: #1b1b1b;">Secure Offer & Book</button>
                    </div>
                  </div>

                  <!-- SUCCESS STEP -->
                  <div class="modal-step" data-step="success">
                    <div class="success-card">
                      <div class="success-icon-wrapper">
                        <i class="fas fa-check"></i>
                      </div>
                      <h4 class="text-white font-family-bebas text-uppercase mb-3">Offer Secured!</h4>
                      <p class="text-white-50 small mb-4" style="line-height: 1.6;">Thank you for reaching out to the Optimal Vitality Institute. We've received your request for a <span class="text-white" id="success-chosen-service">consultation</span> and your welcome offer.</p>
                      <p class="text-primary fw-semibold mb-0" style="font-size: 0.85rem;"><i class="fas fa-sms me-2"></i> Our clinical team will text or call you shortly to schedule.</p>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                      <button type="button" class="btn btn-outline-secondary text-white border-secondary btn-modal-action px-4 py-2" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        `;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalHTML;
        const modalElement = tempDiv.firstElementChild;
        document.body.appendChild(modalElement);

        const bootstrapModal = new bootstrap.Modal(modalElement);

        // Intercept clicks to any #consultation button
        document.addEventListener('click', function (e) {
            const targetLink = e.target.closest('a[href="#consultation"]');
            if (targetLink) {
                e.preventDefault();
                resetForm();
                bootstrapModal.show();
            }
        });

        const form = document.getElementById('consultationForm');
        const steps = form.querySelectorAll('.modal-step');
        const dots = document.querySelectorAll('.step-dot');
        const inputInterest = document.getElementById('input-treatment-interest');
        const interestCards = form.querySelectorAll('.interest-card');

        let currentStep = 1;

        function showStep(stepNum) {
            steps.forEach(step => {
                if (step.getAttribute('data-step') === String(stepNum)) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });

            dots.forEach(dot => {
                const dotStep = parseInt(dot.getAttribute('data-step'));
                if (dotStep === stepNum) {
                    dot.classList.add('active');
                    dot.classList.remove('completed');
                } else if (dotStep < stepNum) {
                    dot.classList.remove('active');
                    dot.classList.add('completed');
                } else {
                    dot.classList.remove('active', 'completed');
                }
            });

            currentStep = stepNum;
        }

        function resetForm() {
            form.reset();
            currentStep = 1;
            interestCards.forEach(card => card.classList.remove('selected'));
            inputInterest.value = '';
            
            document.getElementById('step1-error').classList.add('d-none');
            document.getElementById('step2-error').classList.add('d-none');
            document.getElementById('step3-error').classList.add('d-none');
            
            showStep(1);
            
            const submitBtn = document.getElementById('submitFormBtn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Secure Offer & Book';
        }

        interestCards.forEach(card => {
            card.addEventListener('click', function () {
                this.classList.toggle('selected');
                
                const selectedCards = Array.from(interestCards).filter(c => c.classList.contains('selected'));
                const selectedValues = selectedCards.map(c => c.getAttribute('data-interest'));
                inputInterest.value = selectedValues.join(', ');
                
                if (selectedValues.length > 0) {
                    document.getElementById('step1-error').classList.add('d-none');
                } else {
                    inputInterest.value = '';
                }
            });
        });

        document.getElementById('next-to-step2').addEventListener('click', function () {
            if (!inputInterest.value) {
                document.getElementById('step1-error').classList.remove('d-none');
                return;
            }
            showStep(2);
        });

        document.getElementById('next-to-step3').addEventListener('click', function () {
            const name = document.getElementById('leadName');
            const email = document.getElementById('leadEmail');
            const phone = document.getElementById('leadPhone');
            const step2Error = document.getElementById('step2-error');

            let isValid = true;
            if (!name.value.trim()) isValid = false;
            if (!email.value.trim() || !email.value.includes('@')) isValid = false;
            if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 10) isValid = false;

            if (!isValid) {
                step2Error.classList.remove('d-none');
                return;
            }

            step2Error.classList.add('d-none');
            showStep(3);
        });

        document.getElementById('prev-to-step1').addEventListener('click', () => showStep(1));
        document.getElementById('prev-to-step2').addEventListener('click', () => showStep(2));

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const smsOptIn = document.getElementById('smsOptIn');
            const step3Error = document.getElementById('step3-error');

            if (!smsOptIn.checked) {
                step3Error.classList.remove('d-none');
                return;
            }
            step3Error.classList.add('d-none');

            const submitBtn = document.getElementById('submitFormBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Securing...';

            const formData = new FormData(form);
            
            // Access Key from window config
            const accessKey = window.clinicData?.contact?.web3formsKey || "YOUR_ACCESS_KEY_HERE";
            formData.set('access_key', accessKey);

            const selectedVal = inputInterest.value;
            const successText = selectedVal.includes(',') 
                ? `consultation for: ${selectedVal}`
                : `${selectedVal} consultation`;
            document.getElementById('success-chosen-service').innerText = successText;

            try {
                // If the key is not configured yet, skip sending to avoid Web3Forms error responses.
                if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                    });
                    if (!response.ok) {
                        throw new Error(`Submission failed: ${response.status}`);
                    }
                } else {
                    console.log("Web3Forms Key is placeholder. Data stored locally:", Object.fromEntries(formData.entries()));
                }

                steps.forEach(step => step.classList.remove('active'));
                const successStep = form.querySelector('.modal-step[data-step="success"]');
                successStep.classList.add('active');
                dots.forEach(dot => dot.classList.add('completed'));
            } catch (err) {
                console.error("Submission error:", err);
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Secure Offer & Book';
                const errorMsg = form.querySelector('#step3-error') || document.createElement('div');
                
                const leadName = document.getElementById('leadName')?.value || 'Patient';
                const leadPhone = document.getElementById('leadPhone')?.value || '';
                const service = inputInterest.value || 'General Consultation';
                const subject = encodeURIComponent(`Inquiry from ${leadName}`);
                const body = encodeURIComponent(`Name: ${leadName}\nPhone: ${leadPhone}\nService: ${service}\n\nI am interested in booking a consultation.`);
                
                errorMsg.innerHTML = `Something went wrong. Please try again or <a href="mailto:info@oviwellness.com?subject=${subject}&body=${body}" class="text-primary fw-bold text-decoration-underline" style="color:var(--primary-color) !important;">email us directly</a>.`;
                errorMsg.className = 'text-danger small mt-2 text-center';
                errorMsg.id = 'submit-error-msg';
                if (!form.querySelector('#submit-error-msg')) submitBtn.after(errorMsg);
            }
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
        initConsultationModal();
        // injectContactInfo runs after componentsLoaded so dynamically
        // loaded component HTML is already in the DOM before we query it.
        // On pages with no data-include-component, componentsLoaded still
        // fires from component-loader.js, so this single listener covers both.
        injectContactInfo();
    });

    document.addEventListener("componentsLoaded", function() {
        // Re-run after components inject new DOM nodes that may contain contact slots.
        injectContactInfo();
    });
})();
