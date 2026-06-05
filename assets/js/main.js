// assets/js/main.js
document.addEventListener("DOMContentLoaded", function () {

    // =========================================================================
    // HELPERS
    // =========================================================================

    /**
     * Builds the HTML for a single testimonial card (used by both the mobile
     * infinite-track engine and the desktop carousel).
     */
    function createTestimonialCardHtml(testimony, originalIndex) {
        return `
            <div class="native-scroll-item" data-original-index="${originalIndex}">
                <div class="testimonial-box bg-white p-4 rounded-4 shadow-sm position-relative overflow-hidden h-100 d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                        <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px; background-color: rgba(230, 195, 129, 0.15); flex-shrink: 0;">
                            <span class="fs-6 fw-bold text-primary">${testimony.initials}</span>
                        </div>
                        <div>
                            <h5 class="mb-0 fs-6 fw-bold" style="color: var(--secondary-color); text-transform: uppercase; letter-spacing: 0.5px;">${testimony.name}</h5>
                            <small class="text-primary fw-bold" style="font-size: 0.70rem; text-transform: uppercase;">${testimony.tag}</small>
                        </div>
                        <div class="ms-auto align-self-start">
                            <span class="testimonial-verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
                        </div>
                    </div>
                    <div class="text-primary small mb-2" style="font-size: 0.85rem;">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="fst-italic text-secondary mb-0 flex-grow-1" style="font-size: 0.95rem; line-height: 1.6;">"${testimony.quote}"</p>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // INFINITE MOBILE SWIPE TRACK ENGINE
    // Clones desktop source children 20x into a horizontal scroll track,
    // then silently teleports the scroll position back to the center when the
    // user reaches either edge — creating an effectively infinite loop.
    // =========================================================================
    function initInfiniteTrack(desktopId, trackId, dotsId) {
        const desktopContainer = document.getElementById(desktopId);
        const mobileTrack = document.getElementById(trackId);
        const mobileDots = document.getElementById(dotsId);

        if (!desktopContainer || !mobileTrack || !mobileDots) return;

        const originals = Array.from(desktopContainer.children);
        const numOriginals = originals.length;
        if (numOriginals === 0) return;

        // 1. Generate indicator dots
        originals.forEach((_, index) => {
            mobileDots.innerHTML += `<button type="button" aria-label="Slide ${index + 1}" data-index="${index}" class="${index === 0 ? 'active' : ''}"></button>`;
        });

        // 2. Clone all items 20x into the track (JITTER FIX: hide while building)
        const SETS = 20;
        mobileTrack.style.opacity = '0';
        mobileTrack.style.transition = 'opacity 0.2s ease-in';

        for (let i = 0; i < SETS; i++) {
            originals.forEach((item, index) => {
                const clone = document.createElement('div');
                clone.className = 'native-scroll-item';
                clone.setAttribute('data-original-index', index);
                // Unwrap Bootstrap col-* wrappers so only inner card content is cloned
                clone.innerHTML = item.className.match(/\bcol-/) ? item.innerHTML : '';
                if (!clone.innerHTML) clone.appendChild(item.cloneNode(true));
                mobileTrack.appendChild(clone);
            });
        }

        // 3. Position, observe, and wire up scroll teleportation + dot clicks
        setTimeout(() => {
            const items = mobileTrack.querySelectorAll('.native-scroll-item');
            const dots = mobileDots.querySelectorAll('button');
            const middleStartIndex = Math.floor(SETS / 2) * numOriginals;

            // Snap to the middle set without animation, then reveal
            if (items[middleStartIndex]) {
                mobileTrack.style.scrollBehavior = 'auto';
                mobileTrack.scrollLeft = items[middleStartIndex].offsetLeft - (mobileTrack.clientWidth - items[middleStartIndex].clientWidth) / 2;
                setTimeout(() => {
                    mobileTrack.style.scrollBehavior = 'smooth';
                    mobileTrack.style.opacity = '1';
                }, 50);
            }

            // Sync indicator dots via Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const originalIdx = entry.target.getAttribute('data-original-index');
                        dots.forEach(dot => dot.classList.remove('active'));
                        if (dots[originalIdx]) dots[originalIdx].classList.add('active');
                    }
                });
            }, { root: mobileTrack, threshold: 0.6 });
            items.forEach(item => observer.observe(item));

            // Silently teleport to center when user reaches either edge (15% boundary)
            let scrollTimeout;
            mobileTrack.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const currentScroll = mobileTrack.scrollLeft;
                    const maxScroll = mobileTrack.scrollWidth - mobileTrack.clientWidth;
                    if (currentScroll < maxScroll * 0.15 || currentScroll > maxScroll * 0.85) {
                        const activeDot = mobileDots.querySelector('.active');
                        if (activeDot) {
                            const activeIdx = parseInt(activeDot.getAttribute('data-index'));
                            const targetItem = items[middleStartIndex + activeIdx];
                            mobileTrack.style.scrollBehavior = 'auto';
                            mobileTrack.scrollLeft = targetItem.offsetLeft - (mobileTrack.clientWidth - targetItem.clientWidth) / 2;
                            setTimeout(() => { mobileTrack.style.scrollBehavior = 'smooth'; }, 50);
                        }
                    }
                }, 150);
            });

            // Dot clicks scroll to the nearest clone of that index
            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    const currentScroll = mobileTrack.scrollLeft;
                    const matchingItems = Array.from(items).filter(item => parseInt(item.getAttribute('data-original-index')) === idx);
                    let closestItem = matchingItems[0];
                    let minDiff = Infinity;
                    matchingItems.forEach(item => {
                        const diff = Math.abs(item.offsetLeft - currentScroll);
                        if (diff < minDiff) { minDiff = diff; closestItem = item; }
                    });
                    if (closestItem) closestItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                });
            });
        }, 100);
    }

    // =========================================================================
    // 1. RENDER DYNAMIC CONTENT
    // =========================================================================
    function renderDynamicContent() {
        if (typeof clinicData === 'undefined') {
            console.error('clinicData not found. Ensure data.js is loaded before main.js.');
            return;
        }

        // --- Navigation ---
        const desktopNav = document.getElementById('main-navbar-links');
        const mobileNav = document.getElementById('mobile-navbar-links');

        if (clinicData.navigation) {
            // Desktop nav: Bootstrap dropdown
            if (desktopNav) {
                desktopNav.innerHTML = clinicData.navigation.map(link => {
                    if (link.dropdown) {
                        const items = link.dropdown.map(sub =>
                            `<li><a class="dropdown-item fw-bold text-uppercase" style="font-size: 0.85rem;" href="${sub.href}">${sub.label}</a></li>`
                        ).join('');
                        return `
                            <li class="nav-item dropdown custom-desktop-dropdown">
                                <a class="nav-link d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ${link.label} <i class="fas fa-chevron-down dropdown-icon" style="font-size: 0.75rem;"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-dark custom-desktop-menu shadow-lg">${items}</ul>
                            </li>
                        `;
                    }
                    return `<li class="nav-item"><a class="nav-link" href="${link.href}">${link.label}</a></li>`;
                }).join('');
            }

            // Mobile nav: App-style sliding drill-down
            if (mobileNav) {
                mobileNav.className = 'w-100 mt-4 position-relative flex-grow-1';
                mobileNav.style.cssText = 'list-style: none; padding: 0; overflow: hidden;';

                let mainLinks = '';
                let subPanels = '';

                clinicData.navigation.forEach((link, index) => {
                    if (link.dropdown) {
                        mainLinks += `
                            <li class="w-100 mb-3">
                                <a class="mobile-drill-open d-flex justify-content-center align-items-center gap-2 p-2 text-decoration-none text-white fw-bold" href="#" data-target="panel-${index}" style="font-size: 1.3rem; letter-spacing: 1px;">
                                    ${link.label} <i class="fas fa-chevron-right text-primary" style="font-size: 1rem;"></i>
                                </a>
                            </li>
                        `;
                        const dropItems = link.dropdown.map(sub =>
                            `<li class="w-100 mb-3"><a class="d-block p-2 text-decoration-none text-white text-center" href="${sub.href}" style="font-size: 1.1rem; letter-spacing: 1px; font-weight: 900; text-transform: uppercase;">${sub.label}</a></li>`
                        ).join('');
                        subPanels += `
                            <div id="panel-${index}" class="mobile-sub-panel">
                                <button class="btn mobile-drill-back text-primary fw-bold text-uppercase mb-4 mt-2 w-100 d-flex align-items-center justify-content-center gap-2" style="font-size: 1.1rem; letter-spacing: 1px; border: none; background: transparent;">
                                    <i class="fas fa-chevron-left"></i> Back to Menu
                                </button>
                                <ul class="p-0 m-0 w-100" style="list-style: none;">${dropItems}</ul>
                            </div>
                        `;
                    } else {
                        mainLinks += `
                            <li class="w-100 mb-3">
                                <a class="d-block p-2 text-decoration-none text-white fw-bold text-center" href="${link.href}" style="font-size: 1.3rem; letter-spacing: 1px;">${link.label}</a>
                            </li>
                        `;
                    }
                });

                mobileNav.innerHTML = `
                    <div class="mobile-nav-main w-100" style="transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);">
                        <ul class="p-0 m-0 w-100" style="list-style: none;">${mainLinks}</ul>
                    </div>
                    ${subPanels}
                `;

                // Wire up drill-down slide events
                setTimeout(() => {
                    const mainView = mobileNav.querySelector('.mobile-nav-main');
                    mobileNav.querySelectorAll('.mobile-drill-open').forEach(btn => {
                        btn.addEventListener('click', e => {
                            e.preventDefault();
                            const panel = document.getElementById(btn.getAttribute('data-target'));
                            if (panel) { panel.classList.add('active'); mainView.style.transform = 'translateX(-100%)'; }
                        });
                    });
                    mobileNav.querySelectorAll('.mobile-drill-back').forEach(btn => {
                        btn.addEventListener('click', e => {
                            e.preventDefault();
                            const panel = btn.closest('.mobile-sub-panel');
                            if (panel) { panel.classList.remove('active'); mainView.style.transform = 'translateX(0)'; }
                        });
                    });
                }, 50);
            }
        }

        // --- Hero Blob Menu ---
        const blobContainer = document.querySelector('.blob-menu-container');
        if (blobContainer && clinicData.services) {
            blobContainer.innerHTML = clinicData.services.map(service => `
                <a href="${service.href}" class="service-blob" style="animation-delay: ${service.delay};">
                    <i class="fas ${service.icon} icon"></i>
                    <span class="blob-title">${service.tabLabel}</span>
                </a>
            `).join('');
        }

        // --- Core Therapies Tabs ---
        const tabsContainer = document.getElementById('therapy-tabs');
        const contentContainer = document.getElementById('therapy-tabs-content');
        if (tabsContainer && contentContainer && clinicData.services) {
            const coreServices = clinicData.services.filter(s => s.type === 'core');
            coreServices.forEach((therapy, index) => {
                const isActive = index === 0 ? 'active' : '';
                const isShow = index === 0 ? 'show active' : '';
                const rowReverse = index % 2 !== 0 ? 'flex-lg-row-reverse' : '';
                const focusClass = index % 2 !== 0 ? 'top-focus' : 'center-focus';
                const featuresHtml = therapy.features.map(f => `<li><i class="fas fa-check-circle me-3"></i> ${f}</li>`).join('');

                tabsContainer.innerHTML += `
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${isActive} premium-tab" id="${therapy.id}-tab" data-bs-toggle="pill" data-bs-target="#${therapy.id}" type="button" role="tab">${therapy.tabLabel}</button>
                    </li>
                `;
                contentContainer.innerHTML += `
                    <div class="tab-pane fade ${isShow}" id="${therapy.id}" role="tabpanel" tabindex="0">
                        <div class="row align-items-center ${rowReverse} gx-lg-5">
                            <div class="col-lg-6 mb-4 mb-lg-0">
                                <h2 class="mb-3 text-secondary text-uppercase fw-bold">${therapy.title}</h2>
                                <p class="lead mb-4" style="font-size: 1.15rem; color: #4a5568;">${therapy.lead}</p>
                                <p class="text-muted mb-4">${therapy.description}</p>
                                <ul class="list-unstyled mb-4 feature-list">${featuresHtml}</ul>
                                <a href="${therapy.href}" class="btn cta-btn">${therapy.ctaText}</a>
                            </div>
                            <div class="col-lg-6">
                                <div class="premium-box premium-image-box rounded shadow-lg bg-white border position-relative overflow-hidden">
                                    <img src="${therapy.image}" alt="${therapy.tabLabel}" class="w-100 h-100 ${focusClass}" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // --- Additional Services (Desktop Grid) ---
        const servicesDesktop = document.getElementById('services-desktop');
        if (servicesDesktop && clinicData.services) {
            const additionalServices = clinicData.services.filter(s => s.type === 'additional');
            servicesDesktop.innerHTML = additionalServices.map(service => `
                <div class="col-lg-4 col-md-6">
                    <div class="service-grid-card h-100">
                        <div class="card-icon"><i class="fas ${service.icon}"></i></div>
                        <h4 class="card-title">${service.tabLabel}</h4>
                        <p class="card-text">${service.description}</p>
                        <a href="${service.href}" class="service-link">${service.ctaText} <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `).join('');
        }

        // --- Team ---
        const teamList = document.getElementById('team-list');
        if (teamList && clinicData.team) {
            teamList.innerHTML = clinicData.team.map(member => `
                <div class="team-list-item">
                    <h4 class="team-name">${member.name}</h4>
                    <p class="team-role">${member.role}</p>
                    <p class="team-bio">${member.bio}</p>
                </div>
            `).join('');
        }

        // --- FAQs ---
        const faqAccordion = document.getElementById('faqAccordion');
        if (faqAccordion && clinicData.faqs) {
            faqAccordion.innerHTML = clinicData.faqs.map((faq, index) => `
                <div class="accordion-item border-0 mb-3">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                            ${faq.question}
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">${faq.answer}</div>
                    </div>
                </div>
            `).join('');
        }

        // --- Testimonials ---
        const mobileInner = document.getElementById('mobile-testimonial-inner');
        const mobileIndicators = document.getElementById('mobile-testimonial-indicators');
        const desktopInner = document.getElementById('desktop-testimonial-inner');
        const desktopIndicators = document.getElementById('desktop-testimonial-indicators');

        if (clinicData.testimonials) {
            // Mobile: Build a hidden source container, then hand off to initInfiniteTrack
            if (mobileInner && mobileIndicators) {
                // Populate the mobile track directly using the card builder
                const SETS = 20;
                const originals = clinicData.testimonials;

                mobileIndicators.innerHTML = originals.map((_, i) =>
                    `<button type="button" aria-label="Slide ${i + 1}" data-index="${i}" class="${i === 0 ? 'active' : ''}"></button>`
                ).join('');

                mobileInner.style.opacity = '0';
                mobileInner.style.transition = 'opacity 0.2s ease-in';

                for (let i = 0; i < SETS; i++) {
                    originals.forEach((testimony, index) => {
                        mobileInner.innerHTML += createTestimonialCardHtml(testimony, index);
                    });
                }

                setTimeout(() => {
                    const items = mobileInner.querySelectorAll('.native-scroll-item');
                    const dots = mobileIndicators.querySelectorAll('button');
                    const middleStartIndex = Math.floor(SETS / 2) * originals.length;

                    if (items[middleStartIndex]) {
                        mobileInner.style.scrollBehavior = 'auto';
                        mobileInner.scrollLeft = items[middleStartIndex].offsetLeft - (mobileInner.clientWidth - items[middleStartIndex].clientWidth) / 2;
                        setTimeout(() => { mobileInner.style.scrollBehavior = 'smooth'; mobileInner.style.opacity = '1'; }, 50);
                    }

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const originalIdx = entry.target.getAttribute('data-original-index');
                                dots.forEach(dot => dot.classList.remove('active'));
                                if (dots[originalIdx]) dots[originalIdx].classList.add('active');
                            }
                        });
                    }, { root: mobileInner, threshold: 0.6 }); // Fixed: was referencing undefined `mobileTrack`
                    items.forEach(item => observer.observe(item));

                    let scrollTimeout;
                    mobileInner.addEventListener('scroll', () => {
                        clearTimeout(scrollTimeout);
                        scrollTimeout = setTimeout(() => {
                            const currentScroll = mobileInner.scrollLeft;
                            const maxScroll = mobileInner.scrollWidth - mobileInner.clientWidth;
                            if (currentScroll < maxScroll * 0.15 || currentScroll > maxScroll * 0.85) {
                                const activeDot = mobileIndicators.querySelector('.active');
                                if (activeDot) {
                                    const activeIdx = parseInt(activeDot.getAttribute('data-index'));
                                    const targetItem = items[middleStartIndex + activeIdx];
                                    mobileInner.style.scrollBehavior = 'auto';
                                    mobileInner.scrollLeft = targetItem.offsetLeft - (mobileInner.clientWidth - targetItem.clientWidth) / 2;
                                    setTimeout(() => { mobileInner.style.scrollBehavior = 'smooth'; }, 50);
                                }
                            }
                        }, 150);
                    });

                    dots.forEach((dot, idx) => {
                        dot.addEventListener('click', () => {
                            const currentScroll = mobileInner.scrollLeft;
                            const matchingItems = Array.from(items).filter(item => parseInt(item.getAttribute('data-original-index')) === idx);
                            let closestItem = matchingItems[0];
                            let minDiff = Infinity;
                            matchingItems.forEach(item => {
                                const diff = Math.abs(item.offsetLeft - currentScroll);
                                if (diff < minDiff) { minDiff = diff; closestItem = item; }
                            });
                            if (closestItem) closestItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        });
                    });
                }, 100);
            }

            // Desktop: 2 testimonials per carousel slide
            if (desktopInner && desktopIndicators) {
                let slideIndex = 0;
                for (let i = 0; i < clinicData.testimonials.length; i += 2) {
                    const isActive = slideIndex === 0 ? 'active' : '';
                    const t1 = clinicData.testimonials[i];
                    const t2 = clinicData.testimonials[i + 1];

                    desktopIndicators.innerHTML += `<button type="button" data-bs-target="#testimonialDesktop" data-bs-slide-to="${slideIndex}" class="${isActive}"></button>`;

                    const buildCard = t => `
                        <div class="testimonial-box bg-white p-4 rounded-4 shadow-sm position-relative overflow-hidden h-100">
                            <div class="d-flex align-items-center mb-2">
                                <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px; background-color: rgba(230, 195, 129, 0.15); flex-shrink: 0;"><span class="fs-6 fw-bold text-primary">${t.initials}</span></div>
                                <div>
                                    <h5 class="mb-0 fs-6 fw-bold" style="color: var(--secondary-color); text-transform: uppercase; letter-spacing: 0.5px;">${t.name}</h5>
                                    <small class="text-primary fw-bold" style="font-size: 0.70rem; letter-spacing: 1px; text-transform: uppercase;">${t.tag}</small>
                                </div>
                                <div class="ms-auto align-self-start"><span class="testimonial-verified-badge"><i class="fas fa-check-circle"></i> Verified</span></div>
                            </div>
                            <div class="text-primary small mb-2" style="font-size: 0.85rem;">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="fst-italic text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">"${t.quote}"</p>
                        </div>
                    `;

                    desktopInner.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row g-4 h-100">
                                <div class="col-6">${buildCard(t1)}</div>
                                <div class="col-6">${t2 ? buildCard(t2) : ''}</div>
                            </div>
                        </div>
                    `;
                    slideIndex++;
                }
            }
        }

        // --- Footer Services List ---
        const footerServicesList = document.getElementById('footer-services-list');
        if (footerServicesList && clinicData.services) {
            footerServicesList.innerHTML = clinicData.services.map((service, index) => `
                <li class="${index === clinicData.services.length - 1 ? 'mb-0' : 'mb-3'}">
                    <a href="${service.href}" class="text-white-50 text-decoration-none footer-service-link">
                        <i class="fas ${service.icon} text-primary me-3 w-15px text-center"></i> ${service.tabLabel}
                    </a>
                </li>
            `).join('');
        }
    }

    // Run all renders
    renderDynamicContent();

    // =========================================================================
    // 2. UI LOGIC
    // =========================================================================

    // Mobile Menu Auto-Close on nav link click
    const offcanvasElement = document.getElementById('mobileMenu');
    let offcanvasInstance = null;
    if (offcanvasElement) {
        offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    }
    document.querySelectorAll('a.nav-link, a.cta-btn, .hormone-cta a, .navbar-brand').forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.getAttribute('href') === '#') { event.preventDefault(); return; }
            if (this.hash !== '' && offcanvasElement && offcanvasElement.classList.contains('show')) {
                offcanvasInstance.hide();
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    function handleNavbarScroll() {
        navbar.classList.toggle('scrolled-nav', (window.scrollY || document.documentElement.scrollTop) > 50);
    }
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // GSAP Scroll Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.gs-reveal').forEach(elem => {
            gsap.fromTo(elem,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'quad.out', scrollTrigger: { trigger: elem, start: 'top 88%', once: true } }
            );
        });

        // ---------------------------------------------------------------------
        // HERO ENTRANCE SEQUENCE (index.html)
        // ---------------------------------------------------------------------
        const heroContent = document.querySelector('.hero-content');
        const heroActions = document.querySelector('.hero-actions');
        const blobs = document.querySelectorAll('.service-blob');

        // Only trigger on the homepage where these elements exist simultaneously
        if (heroContent && heroActions && blobs.length > 0) {
            // Step 1: Temporarily hide actions and set content down to make it appear visually centered
            gsap.set(heroActions, { opacity: 0 });
            gsap.set(heroContent, { y: 120, opacity: 0 });
            gsap.set(blobs, { scale: 0, opacity: 0 });

            const tl = gsap.timeline({ delay: 0.15 });

            // 1. Reveal main heading text directly in its lowered, "centered" position
            tl.to(heroContent, {
                opacity: 1,
                duration: .2,
                ease: 'power2.out'
            })
            // 2. Smoothly slide the text up to its natural location, fading in the button right behind it
            .to(heroContent, {
                y: 0,
                duration: 0.9,
                ease: 'power3.inOut'
            }, '+=0.3') // Brief pause in the center before swiping up
            .to(heroActions, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.5')
            // 3. Pop up the service menu bubbles sequentially one-by-one
            .to(blobs, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'back.out(1.4)',
                clearProps: 'transform,opacity' // Clears GSAP inline styles so CSS morphing and hovers work perfectly
            }, '-=0.3');
        }

        // Mobile Sticky CTA — show after the hero scrolls out of view
        const mobileCta = document.getElementById('mobile-sticky-cta');
        const heroHeader = document.querySelector('.hero');
        const mobileMenuEl = document.getElementById('mobileMenu');

        if (mobileCta && heroHeader) {
            ScrollTrigger.create({
                trigger: heroHeader,
                start: 'bottom top+=100',
                onEnter: () => mobileCta.classList.add('visible'),
                onLeaveBack: () => mobileCta.classList.remove('visible')
            });
            if (mobileMenuEl) {
                mobileMenuEl.addEventListener('show.bs.offcanvas', () => mobileCta.classList.add('menu-open'));
                mobileMenuEl.addEventListener('hidden.bs.offcanvas', () => mobileCta.classList.remove('menu-open'));
            }
        }
    }

    // Blob Animation Performance — pause when hero is off-screen
    const heroSection = document.querySelector('.hero');
    const blobs = document.querySelectorAll('.service-blob');
    if (heroSection && blobs.length > 0) {
        new IntersectionObserver((entries) => {
            const paused = !entries[0].isIntersecting;
            blobs.forEach(blob => blob.classList.toggle('paused-animation', paused));
        }, { threshold: 0 }).observe(heroSection);
    }

    // Auto-Cycling Core Therapy Tabs (every 15s, pauses on hover/touch)
    const tabs = document.querySelectorAll('#therapy-tabs .premium-tab');
    const tabContainer = document.getElementById('core-therapies');
    if (tabs.length > 0 && tabContainer) {
        let currentTabIndex = 0;
        let tabInterval;

        const cycleTabs = () => {
            currentTabIndex = (currentTabIndex + 1) % tabs.length;
            new bootstrap.Tab(tabs[currentTabIndex]).show();
        };
        const startInterval = () => { if (!tabInterval) tabInterval = setInterval(cycleTabs, 15000); };
        const stopInterval = () => { clearInterval(tabInterval); tabInterval = null; };

        startInterval();
        tabContainer.addEventListener('mouseenter', stopInterval);
        tabContainer.addEventListener('mouseleave', startInterval);
        tabContainer.addEventListener('touchstart', stopInterval);
        tabs.forEach((tab, index) => tab.addEventListener('shown.bs.tab', () => { currentTabIndex = index; }));
    }

    // Testimonial Box Height Equalizer — keeps all cards at a uniform min-height
    function setMaxTestimonialHeight() {
        document.querySelectorAll('.testimonial-box').forEach(box => {
            box.classList.remove('h-100');
            box.style.removeProperty('height');
            box.style.removeProperty('min-height');
        });
        ['#testimonialMobile', '#testimonialDesktop'].forEach(id => {
            const carousel = document.querySelector(id);
            if (!carousel || window.getComputedStyle(carousel).display === 'none') return;
            const items = carousel.querySelectorAll('.carousel-item');
            const boxes = carousel.querySelectorAll('.testimonial-box');
            let maxHeight = 0;
            // Temporarily reveal all items to measure heights
            items.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.style.setProperty('display', 'block', 'important');
                    item.style.setProperty('visibility', 'hidden', 'important');
                }
            });
            boxes.forEach(box => { if (box.offsetHeight > maxHeight) maxHeight = box.offsetHeight; });
            items.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.style.removeProperty('display');
                    item.style.removeProperty('visibility');
                }
            });
            if (maxHeight > 0) boxes.forEach(box => box.style.setProperty('min-height', `${maxHeight}px`, 'important'));
        });
    }
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(setMaxTestimonialHeight);
    } else {
        window.addEventListener('load', setMaxTestimonialHeight);
    }
    let resizeTimer;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(setMaxTestimonialHeight, 150); });

    // Sync Process Timeline desktop indicators with the carousel slide events
    const processSlideshow = document.getElementById('processSlideshow');
    if (processSlideshow) {
        processSlideshow.addEventListener('slide.bs.carousel', function (event) {
            document.querySelectorAll('.custom-timeline-indicators .process-step').forEach((step, index) => {
                const isActive = index === event.to;
                step.classList.toggle('active', isActive);
                isActive ? step.setAttribute('aria-current', 'true') : step.removeAttribute('aria-current');
            });
        });
    }

    // =========================================================================
    // PROTOCOL QUIZ — 3-Step Guided Assessment (peptides.html)
    // =========================================================================
    function initProtocolQuiz() {
        const quizContainer = document.querySelector('.quiz-container');
        if (!quizContainer) return;

        const answers = { step1: null, step2: null, step3: null };

        const protocols = {
            pain: {
                tag: 'Injury & Tissue Recovery',
                name: 'The Wolverine Matrix',
                peptides: 'BPC-157 + TB500',
                icon: 'fa-shield-alt',
                desc: 'A systemic repair blend engineered to accelerate soft tissue healing at the cellular level. Manages tendon inflammation, joint degradation, and post-surgical recovery faster than any conventional approach.',
                goalModifiers: {
                    train: 'Designed to get you back under the bar. Most patients in this profile return to full training capacity within the protocol window.',
                    muscle: 'Combines repair acceleration with a pro-anabolic environment — letting you rebuild stronger than your pre-injury baseline.',
                    feel: 'Addresses the root inflammatory cascade that drives fatigue and brain fog during injury. You will feel the shift within weeks.',
                    fat: 'As tissue heals, metabolic output normalizes. Many patients see measurable body composition improvements as a secondary outcome.'
                },
                social: '61 patients with your profile completed this protocol in the last 90 days.'
            },
            performance: {
                tag: 'Athletic Output & Growth',
                name: 'The Growth & Output Stack',
                peptides: 'Ipamorelin + Tesamorelin',
                icon: 'fa-dumbbell',
                desc: 'Designed to push past hard-coded performance ceilings by optimizing your natural growth factor output. Supports lean tissue accretion, faster recovery between sessions, and measurable strength gains.',
                goalModifiers: {
                    train: 'Eliminates the ceiling effect. Patients routinely report PR lifts and faster cardio pacing within the first 8 weeks.',
                    muscle: 'Directly supports lean muscle accretion by establishing the hormonal environment for peak protein synthesis.',
                    feel: 'Growth hormone optimization produces deeper sleep architecture and substantially improved daytime cognitive output.',
                    fat: 'Tesamorelin specifically targets visceral adipose tissue — body recomposition is a primary, documented outcome of this protocol.'
                },
                social: '88 patients with your profile are currently running this protocol.'
            },
            energy: {
                tag: 'Cellular Energy & Cognition',
                name: 'The Bioenergetic Protocol',
                peptides: 'NAD+ Infusion Therapy',
                icon: 'fa-bolt',
                desc: 'Addresses mitochondrial dysfunction at its source. NAD+ is the rate-limiting cofactor in cellular energy production — restoring it directly reverses the fatigue-fog cycle at the biochemical level.',
                goalModifiers: {
                    train: 'Cellular energy output determines athletic endurance. Most patients notice a tangible difference in their second week of the protocol.',
                    muscle: 'Optimized mitochondrial function means faster recovery, better protein utilization, and more energy available for training output.',
                    feel: 'This protocol was built specifically for what you are describing. Clinical-level fatigue and cognitive decline resolve as the primary outcome.',
                    fat: 'Improved metabolic efficiency accelerates fat oxidation — particularly the stubborn visceral deposits that resist diet alone.'
                },
                social: '44 patients with your profile started this protocol in the last 60 days.'
            },
            body: {
                tag: 'Lipolytic Optimization',
                name: 'The Recomposition Stack',
                peptides: 'Tesamorelin + Ipamorelin',
                icon: 'fa-fire',
                desc: 'Targets the hormonal root cause of stubborn body fat — specifically visceral adipose tissue that diet-resistant patients cannot move through training alone. Promotes active lipolysis while protecting lean mass.',
                goalModifiers: {
                    train: 'Leaner body composition directly improves VO2 max, power-to-weight ratio, and sustained endurance output.',
                    muscle: 'Simultaneously drives visceral fat loss while supporting lean muscle accretion — a true clinical recomposition protocol.',
                    feel: 'Hormonal optimization from this stack produces a notable, documented improvement in energy, mood, and cognitive clarity.',
                    fat: 'This protocol was precisely engineered for diet-resistant fat loss. It is the most direct clinical path to your stated goal.'
                },
                social: '73 patients with your profile have completed this protocol.'
            }
        };

        const timelineMap = {
            short: '6–8 weeks',
            medium: '8–12 weeks',
            long: '12–16 weeks'
        };

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
                dot.classList.remove('active', 'completed');
                if (stepNum > i + 1) dot.classList.add('completed');
                else if (stepNum === i + 1) dot.classList.add('active');
            });

            lines.forEach((line, i) => {
                line.classList.toggle('active', stepNum > i + 1);
            });
        }

        function goToStep(target) {
            const currentActive = quizContainer.querySelector('.quiz-step-panel.active');
            updateProgress(target);

            // Global Back Button Visibility and State Management
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
                // Wait for the fade-out animation duration (200ms)
                setTimeout(() => {
                    currentActive.classList.remove('active', 'fade-out');
                    const panel = document.getElementById(`quiz-step-${target}`);
                    if (panel) {
                        panel.classList.add('active');
                    }
                }, 200);
            } else {
                const panel = document.getElementById(`quiz-step-${target}`);
                if (panel) {
                    panel.classList.add('active');
                }
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
            const protocol = protocols[answers.step1];
            if (!protocol) return;
            const timeline = timelineMap[answers.step2] || '8–12 weeks';
            const goalDesc = protocol.goalModifiers[answers.step3] || '';

            const resultEl = document.getElementById('quiz-step-result');
            resultEl.innerHTML = `
                <div class="quiz-result-inner">
                    <div class="d-flex align-items-start gap-3 mb-1 flex-wrap">
                        <div class="flex-grow-1">
                            <div class="quiz-protocol-tag">${protocol.tag}</div>
                            <div class="quiz-protocol-name">${protocol.name}</div>
                            <div class="quiz-protocol-peptides">${protocol.peptides}</div>
                        </div>
                        <div class="d-none d-sm-flex align-items-center justify-content-center flex-shrink-0"
                             style="width:64px;height:64px;background:rgba(32,77,87,0.06);border-radius:50%;">
                            <i class="fas ${protocol.icon} fs-3 text-primary"></i>
                        </div>
                    </div>
                    <div class="quiz-timeline-badge mb-4">
                        <i class="fas fa-clock text-primary"></i>
                        Initial results in ${timeline}
                    </div>
                    <p class="quiz-result-desc">${protocol.desc}</p>
                    <p class="quiz-result-desc"><strong style="color:var(--secondary-color);">For your goal:</strong> ${goalDesc}</p>
                    <div class="quiz-social-proof mb-4">
                        <i class="fas fa-users text-primary me-2"></i>${protocol.social}
                    </div>
                    <div class="quiz-result-actions">
                        <a href="#consultation" class="btn cta-btn">Get My Custom Protocol</a>
                        <button class="quiz-restart" id="quiz-restart-btn">Start Over</button>
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

        // Wire option clicks via delegation
        quizContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('[data-quiz-step]');
            if (!btn) return;
            selectOption(btn, btn.getAttribute('data-quiz-step'));
        });

        // Wire global back button click
        const globalBackBtn = document.getElementById('global-quiz-back-btn');
        if (globalBackBtn) {
            globalBackBtn.addEventListener('click', () => {
                const targetStep = parseInt(globalBackBtn.getAttribute('data-quiz-back'));
                if (targetStep) {
                    goToStep(targetStep);
                }
            });
        }

        // Initialize
        goToStep(1);
    }

    initProtocolQuiz();

    // =========================================================================
    // 3. INITIALIZE ALL INFINITE TRACKS
    // =========================================================================
    initInfiniteTrack('transformations-desktop', 'transformations-mobile-track', 'transformations-mobile-indicators');
    initInfiniteTrack('portfolio-desktop', 'portfolio-mobile-track', 'portfolio-mobile-indicators');
    initInfiniteTrack('stacks-desktop', 'stacks-mobile-track', 'stacks-mobile-indicators');
    initInfiniteTrack('services-desktop', 'services-mobile-track', 'services-mobile-indicators');
});