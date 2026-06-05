// scripts/main.js 
document.addEventListener("DOMContentLoaded", function() {
    // Dynamic Blob Container Menu Builder
    const blobContainer = document.querySelector('.blob-menu-container');
    if (blobContainer && clinicData.services) {
        blobContainer.innerHTML = '';          
        clinicData.services.forEach(service => {
            blobContainer.innerHTML += `
                <a href="${service.href}" class="service-blob" style="animation-delay: ${service.delay};">
                    <i class="fas ${service.icon} icon"></i>
                    <span class="blob-title">${service.tabLabel}</span>
                </a>
            `;
        });
    }
         
    // --- 1. RENDER DYNAMIC DATA ---
    // --- 1. RENDER DYNAMIC DATA ---
    function renderDynamicContent() {
        const desktopNav = document.getElementById('main-navbar-links');
        const mobileNav = document.getElementById('mobile-navbar-links');

        if (clinicData.navigation) {
            
            // 1. DESKTOP NAV (Standard Bootstrap Dropdown + Smooth CSS)
            if (desktopNav) {
                desktopNav.innerHTML = clinicData.navigation.map(link => {
                    if (link.dropdown) {
                        const dropdownItems = link.dropdown.map(subLink => 
                            `<li><a class="dropdown-item fw-bold text-uppercase" style="font-size: 0.85rem;" href="${subLink.href}">${subLink.label}</a></li>`
                        ).join('');
                        
                        return `
                            <li class="nav-item dropdown custom-desktop-dropdown">
                                <a class="nav-link d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ${link.label} <i class="fas fa-chevron-down dropdown-icon" style="font-size: 0.75rem;"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-dark custom-desktop-menu shadow-lg">
                                    ${dropdownItems}
                                </ul>
                            </li>
                        `;
                    } else {
                        return `<li class="nav-item"><a class="nav-link" href="${link.href}">${link.label}</a></li>`;
                    }
                }).join('');
            }

            // 2. MOBILE NAV (App-Style Sliding Folder Drill-Down)
            if (mobileNav) {
                mobileNav.className = 'w-100 mt-4 position-relative flex-grow-1';
                mobileNav.style.listStyle = 'none';
                mobileNav.style.padding = '0';
                mobileNav.style.overflow = 'hidden';

                let mainLinks = '';
                let subPanels = '';

                clinicData.navigation.forEach((link, index) => {
                    if (link.dropdown) {
                        // Fixed: Centered flexbox to match the other links
                        mainLinks += `
                            <li class="w-100 mb-3">
                                <a class="mobile-drill-open d-flex justify-content-center align-items-center gap-2 p-2 text-decoration-none text-white fw-bold" href="#" data-target="panel-${index}" style="font-size: 1.3rem; letter-spacing: 1px;">
                                    ${link.label} <i class="fas fa-chevron-right text-primary" style="font-size: 1rem;"></i>
                                </a>
                            </li>
                        `;
                        const dropdownItems = link.dropdown.map(subLink =>
                            `<li class="w-100 mb-3">
                                <a class="d-block p-2 text-decoration-none text-white text-center" href="${subLink.href}" style="font-size: 1.1rem; letter-spacing: 1px;">${subLink.label}</a>
                            </li>`
                        ).join('');
                        
                        subPanels += `
                            <div id="panel-${index}" class="mobile-sub-panel">
                                <button class="btn mobile-drill-back text-primary fw-bold text-uppercase mb-4 mt-2 w-100 d-flex align-items-center justify-content-center gap-2" style="font-size: 1.1rem; letter-spacing: 1px; border: none; background: transparent;">
                                    <i class="fas fa-chevron-left"></i> Back to Menu
                                </button>
                                <ul class="p-0 m-0 w-100" style="list-style: none;">
                                    ${dropdownItems}
                                </ul>
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
                        <ul class="p-0 m-0 w-100" style="list-style: none;">
                            ${mainLinks}
                        </ul>
                    </div>
                    ${subPanels}
                `;

                // Attach Slide-In / Slide-Out Events
                setTimeout(() => {
                    const mainView = mobileNav.querySelector('.mobile-nav-main');
                    
                    mobileNav.querySelectorAll('.mobile-drill-open').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const targetId = btn.getAttribute('data-target');
                            const panel = document.getElementById(targetId);
                            if(panel) {
                                panel.classList.add('active');
                                mainView.style.transform = 'translateX(-100%)';
                            }
                        });
                    });

                    mobileNav.querySelectorAll('.mobile-drill-back').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const panel = btn.closest('.mobile-sub-panel');
                            if(panel) {
                                panel.classList.remove('active');
                                mainView.style.transform = 'translateX(0)';
                            }
                        });
                    });
                }, 50);
            }
        }
                 
        if (typeof clinicData === 'undefined') {
            console.error("clinicData not found. Ensure data.js is loaded before main.js.");
            return;
        }
        // Core Therapies Tabs & Content
        const tabsContainer = document.getElementById('therapy-tabs');
        const contentContainer = document.getElementById('therapy-tabs-content');
                 
        if (tabsContainer && contentContainer && clinicData.services) {
            const coreServices = clinicData.services.filter(s => s.type === 'core');
            coreServices.forEach((therapy, index) => {
                const isActive = index === 0 ? 'active' : '';
                const isShow = index === 0 ? 'show active' : '';
                const rowReverse = index % 2 !== 0 ? 'flex-lg-row-reverse' : '';
                const focusClass = index % 2 !== 0 ? 'top-focus' : 'center-focus';
                                 
                tabsContainer.innerHTML += `
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${isActive} premium-tab" id="${therapy.id}-tab" data-bs-toggle="pill" data-bs-target="#${therapy.id}" type="button" role="tab">${therapy.tabLabel}</button>
                    </li>
                `;
                const featuresHtml = therapy.features.map(f => `<li><i class="fas fa-check-circle me-3"></i> ${f}</li>`).join('');
                contentContainer.innerHTML += `
                    <div class="tab-pane fade ${isShow}" id="${therapy.id}" role="tabpanel" tabindex="0">
                        <div class="row align-items-center ${rowReverse} gx-lg-5">
                            <div class="col-lg-6 mb-4 mb-lg-0">
                                <h2 class="mb-3 text-secondary text-uppercase fw-bold">${therapy.title}</h2>
                                <p class="lead mb-4" style="font-size: 1.15rem; color: #4a5568;">${therapy.lead}</p>
                                <p class="text-muted mb-4">${therapy.description}</p>
                                <ul class="list-unstyled mb-4 feature-list">
                                    ${featuresHtml}
                                </ul>
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
        // Additional Services
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid && clinicData.services) {
            const additionalServices = clinicData.services.filter(s => s.type === 'additional');
            additionalServices.forEach(service => {
                servicesGrid.innerHTML += `
                    <div class="col-lg-5 col-md-6">
                        <div class="service-grid-card">
                            <div class="card-icon">
                                <i class="fas ${service.icon}"></i>
                            </div>
                            <h4 class="card-title">${service.tabLabel}</h4>
                            <p class="card-text">${service.description}</p>
                            <a href="${service.href}" class="service-link">${service.ctaText} <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `;
            });
        }
        // Team 
        const teamList = document.getElementById('team-list');
        if (teamList && clinicData.team) {
            clinicData.team.forEach(member => {
                teamList.innerHTML += `
                    <div class="team-list-item">
                        <h4 class="team-name">${member.name}</h4>
                        <p class="team-role">${member.role}</p>
                        <p class="team-bio">${member.bio}</p>
                    </div>
                `;
            });
        }
        // FAQs
        const faqAccordion = document.getElementById('faqAccordion');
        if (faqAccordion && clinicData.faqs) {
            clinicData.faqs.forEach((faq, index) => {
                const headingId = `heading${index}`;
                const collapseId = `collapse${index}`;
                faqAccordion.innerHTML += `
                    <div class="accordion-item border-0 mb-3">
                        <h2 class="accordion-header" id="${headingId}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
                                ${faq.question}
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                ${faq.answer}
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        // Testimonials (Mobile & Desktop)
        const mobileInner = document.getElementById('mobile-testimonial-inner');
        const mobileIndicators = document.getElementById('mobile-testimonial-indicators');
        const desktopInner = document.getElementById('desktop-testimonial-inner');
        const desktopIndicators = document.getElementById('desktop-testimonial-indicators');
        if (mobileInner && desktopInner && clinicData.testimonials) {
                         
            // 1. Mobile: Native Momentum Scroll Cards & Indicators (Mega-Track Infinite Loop)
            mobileInner.innerHTML = '';
            if (mobileIndicators) mobileIndicators.innerHTML = '';
            const originals = clinicData.testimonials;
            const numOriginals = originals.length;
            // Generate Dots for the original testimonials only
            originals.forEach((testimony, index) => {
                if (mobileIndicators) {
                    const isActive = index === 0 ? 'active' : '';
                    mobileIndicators.innerHTML += `<button type="button" aria-label="Slide ${index + 1}" data-index="${index}" class="${isActive}"></button>`;
                }
            });
            // Helper to generate consistent card HTML structures
            function createCardHtml(testimony, originalIndex) {
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
            // Render 20 repeating sets to create an unbreakable infinite track
            const SETS = 20;
            
            // JITTER FIX: Hide track while it builds and positions
            mobileInner.style.opacity = '0';
            mobileInner.style.transition = 'opacity 0.2s ease-in';
            
            for (let i = 0; i < SETS; i++) {
                originals.forEach((testimony, index) => {
                    mobileInner.innerHTML += createCardHtml(testimony, index);
                });
            }
            // Initialize Mobile Scroll Sync & Seamless Teleportation
            setTimeout(() => {
                const items = mobileInner.querySelectorAll('.native-scroll-item');
                const dots = mobileIndicators ? mobileIndicators.querySelectorAll('button') : [];
                                 
                // Start exactly in the middle set
                const middleStartIndex = Math.floor(SETS / 2) * numOriginals;
                if (items[middleStartIndex]) {
                    mobileInner.style.scrollBehavior = 'auto'; 
                    mobileInner.scrollLeft = items[middleStartIndex].offsetLeft - (mobileInner.clientWidth - items[middleStartIndex].clientWidth) / 2;
                    setTimeout(() => { 
                        mobileInner.style.scrollBehavior = 'smooth'; 
                        mobileInner.style.opacity = '1'; // Reveal track smoothly
                    }, 50); 
                }
                // Sync indicators via Intersection Observer
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const originalIdx = entry.target.getAttribute('data-original-index');
                            dots.forEach(dot => dot.classList.remove('active'));
                            if (dots[originalIdx]) dots[originalIdx].classList.add('active');
                        }
                    });
                }, { root: mobileInner, threshold: 0.6 });
                                 
                items.forEach(item => observer.observe(item));
                // Silently teleport back to the middle when scrolling completely stops
                let scrollTimeout;
                mobileInner.addEventListener('scroll', () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        const currentScroll = mobileInner.scrollLeft;
                        const maxScroll = mobileInner.scrollWidth - mobileInner.clientWidth;
                                                 
                        // If scrolled into the outer 15% boundaries of the mega-track
                        if (currentScroll < maxScroll * 0.15 || currentScroll > maxScroll * 0.85) {
                            const activeDot = mobileIndicators.querySelector('.active');
                            if (activeDot) {
                                const activeIdx = parseInt(activeDot.getAttribute('data-index'));
                                const centerTargetIndex = middleStartIndex + activeIdx;
                                const targetItem = items[centerTargetIndex];
                                                                 
                                mobileInner.style.scrollBehavior = 'auto'; // Temporarily disable smooth scroll
                                mobileInner.scrollLeft = targetItem.offsetLeft - (mobileInner.clientWidth - targetItem.clientWidth) / 2;
                                setTimeout(() => { mobileInner.style.scrollBehavior = 'smooth'; }, 50);
                            }
                        }
                    }, 150);
                });
                // Indicator pill clicks navigate to the closest identical clone
                dots.forEach((dot, idx) => {
                    dot.addEventListener('click', () => {
                        const currentScroll = mobileInner.scrollLeft;
                        const matchingItems = Array.from(items).filter(item => parseInt(item.getAttribute('data-original-index')) === idx);
                                                 
                        let closestItem = matchingItems[0];
                        let minDiff = Infinity;
                                                 
                        matchingItems.forEach(item => {
                            const diff = Math.abs(item.offsetLeft - currentScroll);
                            if (diff < minDiff) {
                                minDiff = diff;
                                closestItem = item;
                            }
                        });
                        if (closestItem) {
                            closestItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    });
                });
            }, 100);
            // 2. Desktop Carousel (2 per slide)
            let desktopIndex = 0;
            for (let i = 0; i < clinicData.testimonials.length; i += 2) {
                const isActive = desktopIndex === 0 ? 'active' : '';
                const t1 = clinicData.testimonials[i];
                const t2 = clinicData.testimonials[i + 1];
                                 
                desktopIndicators.innerHTML += `<button type="button" data-bs-target="#testimonialDesktop" data-bs-slide-to="${desktopIndex}" class="${isActive}"></button>`;
                                 
                let t2Html = t2 ? `
                    <div class="col-6">
                        <div class="testimonial-box bg-white p-4 rounded-4 shadow-sm position-relative overflow-hidden h-100">
                            <div class="d-flex align-items-center mb-2">
                                <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px; background-color: rgba(230, 195, 129, 0.15); flex-shrink: 0;"><span class="fs-6 fw-bold text-primary">${t2.initials}</span></div>
                                <div>
                                    <h5 class="mb-0 fs-6 fw-bold" style="color: var(--secondary-color); text-transform: uppercase; letter-spacing: 0.5px;">${t2.name}</h5>
                                    <small class="text-primary fw-bold" style="font-size: 0.70rem; letter-spacing: 1px; text-transform: uppercase;">${t2.tag}</small>
                                </div>
                                <div class="ms-auto align-self-start">
                                    <span class="testimonial-verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
                                </div>
                            </div>
                            <div class="text-primary small mb-2" style="font-size: 0.85rem;">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="fst-italic text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">"${t2.quote}"</p>
                        </div>
                    </div>
                ` : `<div class="col-6"></div>`;
                desktopInner.innerHTML += `
                    <div class="carousel-item ${isActive}">
                        <div class="row g-4 h-100">
                            <div class="col-6">
                                <div class="testimonial-box bg-white p-4 rounded-4 shadow-sm position-relative overflow-hidden h-100">
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px; background-color: rgba(230, 195, 129, 0.15); flex-shrink: 0;"><span class="fs-6 fw-bold text-primary">${t1.initials}</span></div>
                                        <div>
                                            <h5 class="mb-0 fs-6 fw-bold" style="color: var(--secondary-color); text-transform: uppercase; letter-spacing: 0.5px;">${t1.name}</h5>
                                            <small class="text-primary fw-bold" style="font-size: 0.70rem; letter-spacing: 1px; text-transform: uppercase;">${t1.tag}</small>
                                        </div>
                                        <div class="ms-auto align-self-start">
                                            <span class="testimonial-verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
                                        </div>
                                    </div>
                                    <div class="text-primary small mb-2" style="font-size: 0.85rem;">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                                    </div>
                                    <p class="fst-italic text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">"${t1.quote}"</p>
                                </div>
                            </div>
                            ${t2Html}
                        </div>
                    </div>
                `;
                desktopIndex++;
            }
        }
        // Footer Services Navigation List Builder (Includes All 6 Services)
        const footerServicesList = document.getElementById('footer-services-list');
        if (footerServicesList && clinicData.services) {
            footerServicesList.innerHTML = ''; 
            clinicData.services.forEach((service, index) => {
                const isLast = index === clinicData.services.length - 1;
                                 
                footerServicesList.innerHTML += `
                    <li class="${isLast ? 'mb-0' : 'mb-3'}">
                        <a href="${service.href}" class="text-white-50 text-decoration-none footer-service-link">
                            <i class="fas ${service.icon} text-primary me-3 w-15px text-center"></i> ${service.tabLabel}
                        </a>
                    </li>
                `;
            });
        }
    }
    // Call render first
    renderDynamicContent();

    // --- 2. UI LOGIC ---
    // Mobile Menu Auto-Close
    const navLinks = document.querySelectorAll('a.nav-link, a.cta-btn, .hormone-cta a, .navbar-brand');
    const offcanvasElement = document.getElementById('mobileMenu');
    let offcanvasInstance = null;
    if (offcanvasElement) {
        offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    }
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (this.getAttribute('href') === '#') {
                event.preventDefault();
                return;
            }
            if (this.hash !== "" && offcanvasElement && offcanvasElement.classList.contains('show')) {
                offcanvasInstance.hide();
            }
        });
    });
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    function handleNavbarScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled-nav');
        } else {
            navbar.classList.remove('scrolled-nav');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
                 
        // Universal Scroll Reveal Animation - Smoothed & Shortened
        const revealElements = document.querySelectorAll('.gs-reveal');
        if (revealElements.length > 0) {
            revealElements.forEach((elem) => {
                gsap.fromTo(elem, 
                    { y: 15, opacity: 0 }, 
                    {
                        y: 0, 
                        opacity: 1, 
                        duration: 0.8, 
                        ease: "quad.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 88%",
                            once: true
                        }
                    }
                );
            });
        }
        // Mobile Sticky CTA Tracker
        const mobileCta = document.getElementById('mobile-sticky-cta');
        const heroHeader = document.querySelector('.hero');
        const mobileMenuEl = document.getElementById('mobileMenu');
                 
        if (mobileCta && heroHeader) {
            ScrollTrigger.create({
                trigger: heroHeader,
                start: "bottom top+=100", 
                onEnter: () => mobileCta.classList.add('visible'),
                onLeaveBack: () => mobileCta.classList.remove('visible')
            });
            // Hide sticky button when mobile offcanvas nav opens, restore when it closes
            if (mobileMenuEl) {
                mobileMenuEl.addEventListener('show.bs.offcanvas', () => {
                    mobileCta.classList.add('menu-open');
                });
                mobileMenuEl.addEventListener('hidden.bs.offcanvas', () => {
                    mobileCta.classList.remove('menu-open');
                });
            }
        }
    }
    // Blob Performance Optimizer
    const heroSection = document.querySelector('.hero');
    const blobs = document.querySelectorAll('.service-blob');
    if (heroSection && blobs.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    blobs.forEach(blob => blob.classList.add('paused-animation'));
                } else {
                    blobs.forEach(blob => blob.classList.remove('paused-animation'));
                }
            });
        }, { threshold: 0 });
        observer.observe(heroSection);
    }
    // Auto-Cycling Tabs
    const tabs = document.querySelectorAll('#therapy-tabs .premium-tab');
    const tabContainer = document.getElementById('core-therapies');
    if (tabs.length > 0 && tabContainer) {
        let currentTabIndex = 0;
        let tabInterval;
        const intervalTime = 15000;
        function cycleTabs() {
            currentTabIndex = (currentTabIndex + 1) % tabs.length;
            const nextTab = new bootstrap.Tab(tabs[currentTabIndex]);
            nextTab.show();
        }
        function startInterval() {
            if (!tabInterval) {
                tabInterval = setInterval(cycleTabs, intervalTime);
            }
        }
        function stopInterval() {
            clearInterval(tabInterval);
            tabInterval = null;
        }
        startInterval();
        tabContainer.addEventListener('mouseenter', stopInterval);
        tabContainer.addEventListener('mouseleave', startInterval);
        tabContainer.addEventListener('touchstart', stopInterval);
        tabs.forEach((tab, index) => {
            tab.addEventListener('shown.bs.tab', () => {
                currentTabIndex = index;
            });
        });
    }
    // Testimonial Height Matcher
    function setMaxTestimonialHeight() {
        document.querySelectorAll('.testimonial-box').forEach(box => {
            box.classList.remove('h-100'); 
            box.style.removeProperty('height');
            box.style.removeProperty('min-height');
        });
        ['#testimonialMobile', '#testimonialDesktop'].forEach(id => {
            const carousel = document.querySelector(id);
            if (carousel && window.getComputedStyle(carousel).display !== 'none') {
                const items = carousel.querySelectorAll('.carousel-item');
                const boxes = carousel.querySelectorAll('.testimonial-box');
                let maxHeight = 0;
                items.forEach(item => {
                    if (!item.classList.contains('active')) {
                        item.style.setProperty('display', 'block', 'important');
                        item.style.setProperty('visibility', 'hidden', 'important');
                    }
                });
                boxes.forEach(box => {
                    if (box.offsetHeight > maxHeight) {
                        maxHeight = box.offsetHeight;
                    }
                });
                items.forEach(item => {
                    if (!item.classList.contains('active')) {
                        item.style.removeProperty('display');
                        item.style.removeProperty('visibility');
                    }
                });
                if (maxHeight > 0) {
                    boxes.forEach(box => {
                        box.style.setProperty('min-height', `${maxHeight}px`, 'important');
                    });
                }
            }
        });
    }
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(setMaxTestimonialHeight);
    } else {
        window.addEventListener('load', setMaxTestimonialHeight);
    }
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setMaxTestimonialHeight, 150);
    });

    // ==========================================================================
    // MULTI-SECTION DYNAMIC MOBILE INFINITE SWIPE TRACKS Engine
    // ==========================================================================
    function initInfiniteTrack(desktopId, trackId, dotsId) {
        const desktopContainer = document.getElementById(desktopId);
        const mobileTrack = document.getElementById(trackId);
        const mobileDots = document.getElementById(dotsId);

        if (!desktopContainer || !mobileTrack || !mobileDots) return;

        const originals = Array.from(desktopContainer.children);
        const numOriginals = originals.length;
        if (numOriginals === 0) return;

        // 1. Generate active dot metrics
        originals.forEach((_, index) => {
            const isActive = index === 0 ? 'active' : '';
            mobileDots.innerHTML += `<button type="button" aria-label="Slide ${index + 1}" data-index="${index}" class="${isActive}"></button>`;
        });

        // 2. Map structure clones 20 times for infinite track scaling
        const SETS = 20;
        
        // JITTER FIX: Hide track while it builds and positions
        mobileTrack.style.opacity = '0';
        mobileTrack.style.transition = 'opacity 0.2s ease-in';
        
        for (let i = 0; i < SETS; i++) {
            originals.forEach((item, index) => {
                const clone = document.createElement('div');
                clone.className = 'native-scroll-item';
                clone.setAttribute('data-original-index', index);
                
                if (item.className.match(/\bcol-/)) {
                    clone.innerHTML = item.innerHTML;
                } else {
                    clone.appendChild(item.cloneNode(true));
                }
                mobileTrack.appendChild(clone);
            });
        }

        // 3. Coordinate telemetry teleportation & position indexes
        setTimeout(() => {
            const items = mobileTrack.querySelectorAll('.native-scroll-item');
            const dots = mobileDots.querySelectorAll('button');
            
            const middleStartIndex = Math.floor(SETS / 2) * numOriginals;
            if (items[middleStartIndex]) {
                mobileTrack.style.scrollBehavior = 'auto';
                mobileTrack.scrollLeft = items[middleStartIndex].offsetLeft - (mobileTrack.clientWidth - items[middleStartIndex].clientWidth) / 2;
                setTimeout(() => { 
                    mobileTrack.style.scrollBehavior = 'smooth'; 
                    mobileTrack.style.opacity = '1'; // Reveal track smoothly
                }, 50);
            }

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
                            const centerTargetIndex = middleStartIndex + activeIdx;
                            const targetItem = items[centerTargetIndex];
                            
                            mobileTrack.style.scrollBehavior = 'auto';
                            mobileTrack.scrollLeft = targetItem.offsetLeft - (mobileTrack.clientWidth - targetItem.clientWidth) / 2;
                            setTimeout(() => { mobileTrack.style.scrollBehavior = 'smooth'; }, 50);
                        }
                    }
                }, 150);
            });

            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    const currentScroll = mobileTrack.scrollLeft;
                    const matchingItems = Array.from(items).filter(item => parseInt(item.getAttribute('data-original-index')) === idx);
                    
                    let closestItem = matchingItems[0];
                    let minDiff = Infinity;
                    
                    matchingItems.forEach(item => {
                        const diff = Math.abs(item.offsetLeft - currentScroll);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closestItem = item;
                        }
                    });
                    
                    if (closestItem) {
                        closestItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            });
        }, 100);
    }

    // Process infinite track mapping for layout instances
    initInfiniteTrack('transformations-desktop', 'transformations-mobile-track', 'transformations-mobile-indicators');
    initInfiniteTrack('portfolio-desktop', 'portfolio-mobile-track', 'portfolio-mobile-indicators');
    initInfiniteTrack('stacks-desktop', 'stacks-mobile-track', 'stacks-mobile-indicators');
});