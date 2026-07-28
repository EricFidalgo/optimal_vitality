// assets/js/main.js
// global js for backend style code 

function initMain() {

    // =========================================================================
    // HELPERS
    // =========================================================================

    /**
     * Helper to resolve relative page URLs depending on current page level
     */
    function resolveUrl(url) {
        if (!url || url === '#' || url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        const isSubpage = (typeof OVI_SERVICE_ID !== 'undefined');
        const serviceIds = ["hormone-optimization", "glp-1therapies", "regenerative-medicine", "sexual-wellness", "iv-wellness", "peptides", "detox", "advanced-labs"];
        const baseName = url.replace('.html', '').split('#')[0];

        if (isSubpage) {
            // We are inside services/
            if (serviceIds.includes(baseName)) {
                return url; // service stubs are in the same folder
            }
            return '../' + url; // root pages like index.html or team.html
        } else {
            // We are at root (index.html)
            if (url.startsWith('index.html')) {
                return url;
            }
            if (serviceIds.includes(baseName)) {
                return 'services/' + url;
            }
            return url;
        }
    }

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
    /**
     * Initializes a mobile swipe track by cloning desktop source elements.
     * Supports either infinite scroll snapping loop (cloning 20x + silent teleportation)
     * or standard scroll behavior (cloning 1x).
     */
    function initMobileTrack(desktopId, trackId, dotsId = null, isInfinite = false, initialIndex = 0) {
        window.initMobileTrack = initMobileTrack;
        const desktopContainer = document.getElementById(desktopId);
        const mobileTrack = document.getElementById(trackId);
        const mobileDots = dotsId ? document.getElementById(dotsId) : null;

        if (!desktopContainer || !mobileTrack) return;

        const originals = Array.from(desktopContainer.children);
        const numOriginals = originals.length;
        if (numOriginals === 0) return;

        const actualInfinite = numOriginals === 1 ? false : isInfinite;

        if (mobileDots) {
            if (numOriginals === 1) {
                const controls = mobileDots.closest('.custom-carousel-controls') || mobileDots;
                if (controls) controls.style.display = 'none';
                mobileTrack.style.justifyContent = 'center';
            } else {
                const controls = mobileDots.closest('.custom-carousel-controls') || mobileDots;
                if (controls) controls.style.display = '';
                mobileTrack.style.justifyContent = '';
            }

            // 1. Generate indicator dots — Force 1st dot active on start
            mobileDots.innerHTML = '';
            if (numOriginals > 1) {
                originals.forEach((_, index) => {
                    mobileDots.innerHTML += `<button type="button" aria-label="Slide ${index + 1}" data-index="${index}" class="${index === 0 ? 'active' : ''}"></button>`;
                });
            }
        }

        // 2. Clone items into the track
        const SETS = actualInfinite ? 20 : 1;
        mobileTrack.innerHTML = '';
        mobileTrack.style.opacity = '0';
        mobileTrack.style.transition = 'opacity 0.2s ease-in';

        for (let i = 0; i < SETS; i++) {
            originals.forEach((item, index) => {
                const clone = document.createElement('div');
                clone.className = 'native-scroll-item';
                clone.setAttribute('data-original-index', index);
                clone.innerHTML = item.className.match(/\bcol-/) ? item.innerHTML : '';
                if (!clone.innerHTML) clone.appendChild(item.cloneNode(true));
                mobileTrack.appendChild(clone);
            });
        }

        // 3. Force start all the way to the left (scrollLeft = 0)
        setTimeout(() => {
            const items = mobileTrack.querySelectorAll('.native-scroll-item');
            const dots = mobileDots ? mobileDots.querySelectorAll('button') : [];

            // Reset scroll position flush to left
            mobileTrack.style.scrollBehavior = 'auto';
            mobileTrack.scrollLeft = 0;

            if (items[0]) items[0].classList.add('active');
            if (dots[0]) {
                dots.forEach(d => d.classList.remove('active'));
                dots[0].classList.add('active');
            }

            setTimeout(() => {
                mobileTrack.scrollLeft = 0;
                mobileTrack.style.scrollBehavior = 'smooth';
                mobileTrack.style.opacity = '1';
            }, 50);

            // Left-aligned scroll calculation with right boundary detection for active dot sync
            let isTicking = false;
            const updateActiveState = () => {
                const scrollPos = mobileTrack.scrollLeft;
                const maxScroll = mobileTrack.scrollWidth - mobileTrack.clientWidth;
                let closestOriginalIdx = 0;
                let closestItemIndex = 0;

                if (maxScroll > 0 && scrollPos >= maxScroll - 15 && items.length > 0) {
                    closestItemIndex = items.length - 1;
                    closestOriginalIdx = (dots.length > 0) ? (dots.length - 1) : closestItemIndex;
                } else {
                    let minDiff = Infinity;
                    items.forEach((item, index) => {
                        const itemLeft = item.offsetLeft;
                        const diff = Math.abs(itemLeft - scrollPos);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closestItemIndex = index;
                            const attrVal = item.getAttribute('data-original-index');
                            const parsedVal = parseInt(attrVal, 10);
                            closestOriginalIdx = (attrVal !== null && !isNaN(parsedVal)) ? parsedVal : index;
                        }
                    });
                }

                items.forEach((item, index) => {
                    item.classList.toggle('active', index === closestItemIndex);
                });

                if (mobileDots && dots.length > 0) {
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === closestOriginalIdx);
                    });
                }
                isTicking = false;
            };

            // Force initial update on load
            updateActiveState();

            mobileTrack.addEventListener('scroll', () => {
                if (!isTicking) {
                    requestAnimationFrame(updateActiveState);
                    isTicking = true;
                }
            }, { passive: true });

            if (actualInfinite) {
                let scrollTimeout;
                mobileTrack.addEventListener('scroll', () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        const currentScroll = mobileTrack.scrollLeft;
                        const maxScroll = mobileTrack.scrollWidth - mobileTrack.clientWidth;
                        if (currentScroll < maxScroll * 0.15 || currentScroll > maxScroll * 0.85) {
                            const activeDot = mobileDots ? mobileDots.querySelector('.active') : null;
                            if (activeDot) {
                                const activeIdx = parseInt(activeDot.getAttribute('data-index'));
                                const middleStartIndex = Math.floor(SETS / 2) * numOriginals;
                                const targetItem = items[middleStartIndex + activeIdx];
                                mobileTrack.style.scrollBehavior = 'auto';
                                mobileTrack.scrollLeft = targetItem.offsetLeft;
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
                            if (diff < minDiff) { minDiff = diff; closestItem = item; }
                        });
                        if (closestItem) {
                            const maxScroll = mobileTrack.scrollWidth - mobileTrack.clientWidth;
                            mobileTrack.scrollTo({
                                left: Math.min(closestItem.offsetLeft, maxScroll),
                                behavior: 'smooth'
                            });
                        }
                    });
                });
            } else {
                dots.forEach((dot, idx) => {
                    dot.addEventListener('click', () => {
                        const targetItem = items[idx];
                        if (targetItem) {
                            const maxScroll = mobileTrack.scrollWidth - mobileTrack.clientWidth;
                            mobileTrack.scrollTo({
                                left: Math.min(targetItem.offsetLeft, maxScroll),
                                behavior: 'smooth'
                            });
                        }
                    });
                });
            }
        }, 100);
    }

    /**
     * Initializes indicator dots for swipe tracks whose cards are already in the HTML.
     */
    function initExistingTrack(trackId, dotsId) {
        const track = document.getElementById(trackId);
        const dotsContainer = document.getElementById(dotsId);
        if (!track || !dotsContainer) return;

        const items = Array.from(track.children);
        if (items.length === 0) return;

        // 1. Generate dots
        dotsContainer.innerHTML = '';
        items.forEach((_, index) => {
            dotsContainer.innerHTML += `<button type="button" aria-label="Slide ${index + 1}" data-index="${index}" class="${index === 0 ? 'active' : ''}"></button>`;
        });

        const dots = dotsContainer.querySelectorAll('button');

        // Mark initial active item & force scrollLeft = 0
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = 0;
        if (items[0]) items[0].classList.add('active');
        if (dots[0]) {
            dots.forEach(d => d.classList.remove('active'));
            dots[0].classList.add('active');
        }

        setTimeout(() => {
            track.scrollLeft = 0;
            track.style.scrollBehavior = 'smooth';
        }, 50);

        // 2. Left-aligned scroll calculation with right boundary detection
        let isTicking = false;
        const updateActiveState = () => {
            const scrollPos = track.scrollLeft;
            const maxScroll = track.scrollWidth - track.clientWidth;
            let closestItemIndex = 0;

            if (maxScroll > 0 && scrollPos >= maxScroll - 15 && items.length > 0) {
                closestItemIndex = items.length - 1;
            } else {
                let minDiff = Infinity;
                items.forEach((item, index) => {
                    const itemLeft = item.offsetLeft;
                    const diff = Math.abs(itemLeft - scrollPos);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestItemIndex = index;
                    }
                });
            }

            items.forEach((item, index) => {
                item.classList.toggle('active', index === closestItemIndex);
            });

            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === closestItemIndex);
                });
            }
            isTicking = false;
        };

        // Force initial update on load
        updateActiveState();

        track.addEventListener('scroll', () => {
            if (!isTicking) {
                requestAnimationFrame(updateActiveState);
                isTicking = true;
            }
        }, { passive: true });

        // 3. Dot clicks scroll to targets
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                const targetItem = items[idx];
                if (targetItem) {
                    const maxScroll = track.scrollWidth - track.clientWidth;
                    track.scrollTo({
                        left: Math.min(targetItem.offsetLeft, maxScroll),
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // =========================================================================
    // 1. RENDER DYNAMIC CONTENT
    // =========================================================================
    function renderDynamicContent() {
        const data = window.clinicData;
        if (!data) {
            console.error('clinicData not found. Ensure global.js is loaded before main.js.');
            return;
        }

        // --- Navigation ---
        const desktopNav = document.getElementById('main-navbar-links');
        const mobileNav = document.getElementById('mobile-navbar-links');

        if (data.navigation) {
            // Desktop nav: Bootstrap dropdown
            if (desktopNav) {
                desktopNav.innerHTML = data.navigation.map(link => {
                    if (link.dropdown) {
                        const items = link.dropdown.map(sub =>
                            `<li><a class="dropdown-item fw-bold text-uppercase" style="font-size: 0.85rem;" href="${resolveUrl(sub.href)}">${sub.label}</a></li>`
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
                    return `<li class="nav-item"><a class="nav-link" href="${resolveUrl(link.href)}">${link.label}</a></li>`;
                }).join('');

            }

            // Mobile nav: App-style sliding drill-down
            if (mobileNav) {
                mobileNav.className = 'w-100 position-relative flex-grow-1 d-flex flex-column';
                mobileNav.style.cssText = 'padding: 0; overflow: hidden; min-height: 250px; display: flex; flex-direction: column; height: 100%;';

                let mainLinks = '';
                let subPanels = '';

                const isEs = (window.OVI_I18N?.currentLang === 'es');
                const backText = isEs ? 'Volver al Menú' : 'Back to Menu';
                const ctaText = isEs ? 'Reservar Consulta' : 'Book Your Consultation';
                const currentLang = window.OVI_I18N?.currentLang || 'en';

                data.navigation.forEach((link, index) => {
                    if (link.dropdown) {
                        mainLinks += `
                            <div class="w-100 mb-3">
                                <a class="mobile-drill-open d-flex justify-content-center align-items-center gap-2 p-2 text-decoration-none text-white fw-bold" href="#" data-target="panel-${index}" style="font-size: 1.3rem; letter-spacing: 1px;">
                                    ${link.label} <i class="fas fa-chevron-right text-primary" style="font-size: 1rem;"></i>
                                </a>
                            </div>
                        `;
                        const dropItems = link.dropdown.map(sub =>
                            `<div class="w-100 mb-3"><a class="d-block p-2 text-decoration-none text-white text-center" href="${resolveUrl(sub.href)}" style="font-size: 1.1rem; letter-spacing: 1px; font-weight: 900; text-transform: uppercase;">${sub.label}</a></div>`
                        ).join('');
                        subPanels += `
                            <div id="panel-${index}" class="mobile-sub-panel">
                                <button class="btn mobile-drill-back text-primary fw-bold text-uppercase mb-4 mt-2 w-100 d-flex align-items-center justify-content-center gap-2" style="font-size: 1.1rem; letter-spacing: 1px; border: none; background: transparent;">
                                    <i class="fas fa-chevron-left"></i> ${backText}
                                </button>
                                <div class="p-0 m-0 w-100">${dropItems}</div>
                            </div>
                        `;
                    } else {
                        mainLinks += `
                            <div class="w-100 mb-3">
                                <a class="d-block p-2 text-decoration-none text-white fw-bold text-center" href="${resolveUrl(link.href)}" style="font-size: 1.3rem; letter-spacing: 1px;">${link.label}</a>
                            </div>
                        `;
                    }
                });

                mobileNav.innerHTML = `
                    <div class="mobile-nav-main w-100 d-flex flex-column flex-grow-1" style="transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); height: 100%;">
                        <div class="p-0 m-0 w-100 mt-3">${mainLinks}</div>
                        <div class="mt-auto pb-4 pt-3 w-100">
                            <div class="d-flex justify-content-center mb-3">
                              <button type="button" class="lang-toggle-btn py-2 px-3" onclick="window.OVI_I18N && window.OVI_I18N.setLanguage(window.OVI_I18N.currentLang === 'en' ? 'es' : 'en')" aria-label="Toggle Language">
                                <span class="${currentLang === 'en' ? 'lang-badge' : 'lang-inactive'}">EN</span>
                                <span class="lang-divider">|</span>
                                <span class="${currentLang === 'es' ? 'lang-badge' : 'lang-inactive'}">ES</span>
                              </button>
                            </div>
                            <a href="#consultation" class="btn cta-btn w-100">${ctaText}</a>
                        </div>
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

                    // Reset drill-down view when offcanvas menu is closed
                    const mobileMenuEl = document.getElementById('mobileMenu');
                    if (mobileMenuEl) {
                        mobileMenuEl.addEventListener('hidden.bs.offcanvas', () => {
                            if (mainView) mainView.style.transform = 'translateX(0)';
                            mobileNav.querySelectorAll('.mobile-sub-panel').forEach(p => p.classList.remove('active'));
                        });
                    }

                    // Direct auto-close offcanvas on mobile menu link clicks for iOS Safari compatibility
                    mobileNav.querySelectorAll('a').forEach(lnk => {
                        lnk.addEventListener('click', function () {
                            if (this.classList.contains('mobile-drill-open') || this.classList.contains('mobile-drill-back')) {
                                return;
                            }
                            if (this.getAttribute('href') === '#') { return; }
                            const offcanvasEl = document.getElementById('mobileMenu');
                            if (offcanvasEl && typeof bootstrap !== 'undefined') {
                                const inst = bootstrap.Offcanvas.getInstance(offcanvasEl) || bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
                                if (inst) {
                                    inst.hide();
                                }
                            }
                        });
                    });
                }, 100);
            }
        }

        // --- Hero Blob Menu ---
        const blobContainer = document.querySelector('.blob-menu-container');
        if (blobContainer && data.services) {
            const coreServices = data.services.filter(s => s.type === 'core');
            blobContainer.innerHTML = coreServices.map(service => `
                <a href="${resolveUrl(service.href)}" class="service-blob" style="animation-delay: ${service.delay};">
                    <i class="fas ${service.icon} icon"></i>
                    <span class="blob-title">${service.tabLabel}</span>
                </a>
            `).join('');
        }

        // --- Core Therapies Tabs ---
        const tabsContainer = document.getElementById('therapy-tabs');
        const contentContainer = document.getElementById('therapy-tabs-content');
        if (tabsContainer && contentContainer && data.services) {
            tabsContainer.innerHTML = '';
            contentContainer.innerHTML = '';
            const coreServices = data.services.filter(s => s.type === 'core');
            let tabsHtml = '';
            let contentHtml = '';
            coreServices.forEach((therapy, index) => {
                const isActive = index === 0 ? 'active' : '';
                const isShow = index === 0 ? 'show active' : '';
                const rowReverse = '';
                const focusClass = index % 2 !== 0 ? 'top-focus' : 'center-focus';
                const featuresHtml = therapy.features.map(f => `<li>${f}</li>`).join('');

                tabsHtml += `
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${isActive} premium-tab" id="${therapy.id}-tab" data-bs-toggle="pill" data-bs-target="#${therapy.id}" type="button" role="tab">${therapy.tabLabel}</button>
                    </li>
                `;
                contentHtml += `
                    <div class="tab-pane ${isShow}" id="${therapy.id}" role="tabpanel" tabindex="0">
                        <div class="row align-items-center ${rowReverse} gx-lg-5">
                            <div class="col-lg-6 mb-4 mb-lg-0">
                                <h2 class="mb-3 text-dark text-uppercase fw-bold">${therapy.title}</h2>
                                <p class="lead mb-4" style="font-size: 1.15rem; color: #4a5568;">${therapy.lead}</p>
                                <p class="text-muted mb-4">${therapy.description}</p>
                                <ul class="list-unstyled mb-0 feature-list">${featuresHtml}</ul>
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
            tabsContainer.innerHTML = tabsHtml;
            contentContainer.innerHTML = contentHtml;
        }

        // --- Additional Services (Desktop Grid) ---
        const servicesDesktop = document.getElementById('services-desktop');
        if (servicesDesktop && data.services) {
            const additionalServices = data.services.filter(s => s.type === 'additional');
            servicesDesktop.innerHTML = additionalServices.map(service => `
                <div class="col-lg-4 col-md-6">
                    <a href="${resolveUrl(service.href)}" class="text-decoration-none d-block h-100">
                        <div class="service-grid-card h-100 d-flex flex-column justify-content-between">
                            <div>
                                <div class="card-icon"><i class="fas ${service.icon}"></i></div>
                                <h4 class="card-title">${service.tabLabel}</h4>
                                <p class="card-text">${service.description}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `).join('');
        }

        // --- Team ---
        const teamList = document.getElementById('team-list');
        if (teamList && data.team) {
            teamList.innerHTML = data.team.map(member => `
                <div class="team-list-item">
                    <h4 class="team-name">${member.name}</h4>
                    <p class="team-role">${member.role}</p>
                    <p class="team-bio">${member.bio}</p>
                </div>
            `).join('');
        }

        // --- FAQs ---
        const faqAccordion = document.getElementById('faqAccordion');
        if (faqAccordion && data.faqs) {
            faqAccordion.innerHTML = data.faqs.map((faq, index) => `
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

        // --- Social Media Integration / Living Proof Video Showcase ---
        const videoProofTrack = document.getElementById('video-proof-track');
        if (videoProofTrack) {
            async function loadAndRenderVideos() {
                let videosList = [];
                const isSubpage = typeof OVI_SERVICE_ID !== 'undefined';
                
                try {
                    let fetchUrl = isSubpage ? `../assets/videos/${OVI_SERVICE_ID}.json` : `assets/videos/global.json`;
                    let response = await fetch(fetchUrl);
                    
                    if (!response.ok && isSubpage) {
                        // Fallback to global if service doesn't have custom videos
                        fetchUrl = '../assets/videos/global.json';
                        response = await fetch(fetchUrl);
                    }
                    
                    if (response.ok) {
                        videosList = await response.json();
                    }
                } catch (e) {
                    console.error("Failed to load videos JSON", e);
                }

                if (videosList && videosList.length > 0) {
                // Helper function to extract YouTube Video ID
                function getYouTubeId(url) {
                    if (!url) return null;
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    const match = url.match(regExp);
                    return (match && match[2].length === 11) ? match[2] : null;
                }

                videoProofTrack.innerHTML = videosList.map(video => {
                    const ytId = getYouTubeId(video.url);
                    let thumbnail = '';
                    let iconHTML = '<i class="fas fa-play"></i>';
                    let badgeIconHTML = '<i class="fas fa-video"></i>';
                    let cardStyle = '';
                    let placeholderHTML = '';

                    // Determine icons, placeholders, and badging based on destination URL
                    if (video.url.includes('instagram.com')) {
                        iconHTML = '<i class="fab fa-instagram"></i>';
                        badgeIconHTML = '<i class="fab fa-instagram"></i>';
                        if (!video.customThumbnail) {
                            cardStyle = 'background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);';
                            placeholderHTML = `
                                <div class="video-placeholder-overlay d-flex flex-column align-items-center justify-content-center w-100 h-100 position-absolute top-0 start-0 text-white" style="background: rgba(0,0,0,0.15);">
                                    <i class="fab fa-instagram" style="font-size: 2.8rem; filter: drop-shadow(0 2px 10px rgba(0,0,0,0.4));"></i>
                                </div>
                            `;
                        }
                    } else if (video.url.includes('tiktok.com')) {
                        iconHTML = '<i class="fab fa-tiktok"></i>';
                        badgeIconHTML = '<i class="fab fa-tiktok"></i>';
                        if (!video.customThumbnail) {
                            cardStyle = 'background: #010101;';
                            placeholderHTML = `
                                <div class="video-placeholder-overlay d-flex flex-column align-items-center justify-content-center w-100 h-100 position-absolute top-0 start-0 text-white" style=" inset 0 0 20px rgba(254,44,85,0.2);">
                                    <i class="fab fa-tiktok" style="font-size: 2.8rem; color: #fff; filter: drop-shadow(-2px -2px 0 #00f2fe) drop-shadow(2px 2px 0 #fe2c55) drop-shadow(0 2px 10px rgba(0,0,0,0.4));"></i>
                                </div>
                            `;
                        }
                    } else if (video.url.includes('facebook.com')) {
                        iconHTML = '<i class="fab fa-facebook-f"></i>';
                        badgeIconHTML = '<i class="fab fa-facebook-f"></i>';
                        if (!video.customThumbnail) {
                            cardStyle = 'background: linear-gradient(135deg, #1877F2 0%, #0d52b1 100%);';
                            placeholderHTML = `
                                <div class="video-placeholder-overlay d-flex flex-column align-items-center justify-content-center w-100 h-100 position-absolute top-0 start-0 text-white">
                                    <i class="fab fa-facebook-f" style="font-size: 2.8rem; filter: drop-shadow(0 2px 10px rgba(0,0,0,0.4));"></i>
                                </div>
                            `;
                        }
                    } else if (ytId) {
                        iconHTML = '<i class="fas fa-play"></i>';
                        badgeIconHTML = '<i class="fab fa-youtube"></i>';
                    }

                    if (video.customThumbnail) {
                        thumbnail = video.customThumbnail;
                    } else if (ytId) {
                        thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                    }

                    const imgTag = thumbnail ? `<img src="${thumbnail}" alt="${video.title} Thumbnail" class="video-thumbnail-img" loading="lazy">` : '';

                    return `
                        <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="video-proof-card">
                            <div class="video-thumbnail-container" style="${cardStyle}">
                                ${imgTag}
                                ${placeholderHTML}
                                <div class="video-play-btn">
                                    ${iconHTML}
                                </div>
                            </div>
                            <div class="video-info">
                                <span class="video-category-badge">
                                    ${badgeIconHTML}
                                    ${video.category || 'Clinical Showcase'}
                                </span>
                                <h4 class="video-card-title">${video.title}</h4>
                                <p class="video-card-desc">${video.description || ''}</p>
                            </div>
                        </a>
                    `;
                }).join('');

                // Initialize the indicator bubbles/dots for the video track
                initExistingTrack('video-proof-track', 'video-proof-indicators');
            }
        }
        
        loadAndRenderVideos();
    }

        // --- Testimonials ---
        const mobileInner = document.getElementById('mobile-testimonial-inner');
        const mobileIndicators = document.getElementById('mobile-testimonial-indicators');
        const desktopInner = document.getElementById('desktop-testimonial-inner');
        const desktopIndicators = document.getElementById('desktop-testimonial-indicators');

        const service = typeof OVI_SERVICE_ID !== 'undefined' ? data.services.find(s => s.id === OVI_SERVICE_ID) : null;
        const testimonialsList = (service && service.testimonials && service.testimonials.length > 0) 
            ? service.testimonials 
            : data.testimonials;

        if (testimonialsList) {
            // Mobile: Build a hidden source container, then hand off to initInfiniteTrack
            if (mobileInner && mobileIndicators) {
                mobileInner.innerHTML = '';
                mobileIndicators.innerHTML = '';
                // Populate the mobile track directly using the card builder
                const SETS = 20;
                const originals = testimonialsList;

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
                        items[middleStartIndex].classList.add('active');
                        mobileInner.style.scrollBehavior = 'auto';
                        mobileInner.scrollLeft = items[middleStartIndex].offsetLeft - (mobileInner.clientWidth - items[middleStartIndex].clientWidth) / 2;
                        setTimeout(() => { mobileInner.style.scrollBehavior = 'smooth'; mobileInner.style.opacity = '1'; }, 50);
                    }

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            entry.target.classList.toggle('active', entry.isIntersecting);
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
                desktopInner.innerHTML = '';
                desktopIndicators.innerHTML = '';
                let slideIndex = 0;
                for (let i = 0; i < testimonialsList.length; i += 2) {
                    const isActive = slideIndex === 0 ? 'active' : '';
                    const t1 = testimonialsList[i];
                    const t2 = testimonialsList[i + 1];

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
        if (footerServicesList && data.navigation && data.navigation[0] && data.navigation[0].dropdown) {
            const footerServices = data.navigation[0].dropdown;
            footerServicesList.innerHTML = footerServices.map((service, index) => `
                <li class="${index === footerServices.length - 1 ? 'mb-0' : 'mb-3'}">
                    <a href="${resolveUrl(service.href)}" class="footer-text-soft text-decoration-none footer-service-link">
                        <i class="fas ${service.icon} text-primary me-3 w-15px text-center"></i> ${service.label}
                    </a>
                </li>
            `).join('');
        }

        // --- Clinic Location (Homepage only) ---
        const locationAddress = document.getElementById('location-address');
        const locationHours = document.getElementById('location-hours');
        const locationContact = document.getElementById('location-contact');
        const getDirectionsBtn = document.getElementById('get-directions-btn');
        const googleMapIframe = document.getElementById('google-map-iframe');

        const contactData = data.contact || {};
        const addressData = contactData.address || data.address;
        const hoursData = contactData.hours || data.hours;

        if (addressData) {
            const addr = `${addressData.street}, ${addressData.city}, ${addressData.state} ${addressData.zip}`;
            const query = encodeURIComponent(addr);
            
            if (locationAddress) {
                locationAddress.innerHTML = `<a href="https://www.google.com/maps/dir/?api=1&destination=${query}" target="_blank" rel="noopener noreferrer" class="text-white text-decoration-none hover-gold">${addressData.street}<br>${addressData.city}, ${addressData.state} ${addressData.zip}</a>`;
            }

            if (locationHours && hoursData) {
                locationHours.innerHTML = hoursData.map(h => 
                    `<div class="d-flex justify-content-between gap-4" style="max-width: 280px; font-size: 0.95rem;">
                        <span class="text-white fw-semibold">${h.days}:</span>
                        <span class="text-white fw-semibold">${h.time}</span>
                    </div>`
                ).join('');
            }

            if (locationContact) {
                const phone = contactData.phone || '';
                const email = contactData.email || '';
                locationContact.innerHTML = `Phone: <a href="tel:${phone.replace(/\D/g, '')}" class="text-white text-decoration-none hover-gold fw-semibold">${phone}</a><br>Email: <a href="mailto:${email}" class="text-white text-decoration-none hover-gold fw-semibold">${email}</a>`;
            }

            if (getDirectionsBtn) {
                getDirectionsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
            }

            if (googleMapIframe) {
                googleMapIframe.src = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
            }
        }
    }

    // Run all renders when i18n locale data is ready; the guard inside
    // renderDynamicContent ensures it only executes once per page load.
    document.addEventListener('i18nLoaded', renderDynamicContent);

    // =========================================================================
    // 2. UI LOGIC
    // =========================================================================

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
        const modalitiesBadge = document.querySelector('.hero-modalities-badge');

        // Only trigger on the homepage where these elements exist simultaneously
        if (heroContent && heroActions && blobs.length > 0) {
            // Step 1: Temporarily hide actions and set content down to make it appear visually centered
            gsap.set(heroActions, { opacity: 0 });
            gsap.set(heroContent, { y: 120, opacity: 0 });
            gsap.set(blobs, { scale: 0, opacity: 0 });
            if (modalitiesBadge) {
                gsap.set(modalitiesBadge, { scale: 0, opacity: 0 });
            }

            const tl = gsap.timeline({ delay: 0.15 });

            // 1. Reveal main heading text directly in its lowered, "centered" position
            tl.to(heroContent, {
                opacity: 1,
                duration: 0,
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
            }, '-=0.15');

            // 4. Pop up the modalities badge as the hero's sleek focal anchor
            if (modalitiesBadge) {
                tl.to(modalitiesBadge, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(1.4)',
                    clearProps: 'transform,opacity'
                }, '+=0');
            }
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
    // 3. INITIALIZE ALL MOBILE TRACKS
    // =========================================================================
    initMobileTrack('transformations-desktop', 'transformations-mobile-track', 'transformations-mobile-indicators', false);
    initMobileTrack('protocols-desktop', 'protocols-mobile-track', 'protocols-mobile-indicators', true);
    initMobileTrack('stacks-desktop', 'stacks-mobile-track', 'stacks-mobile-indicators', false);
    initMobileTrack('services-desktop', 'services-mobile-track', 'services-mobile-indicators', false);
    initMobileTrack('treatments-desktop', 'treatments-mobile-track', 'treatments-mobile-indicators', false);

    // Initialize existing grid tracks
    initExistingTrack('myth-mobile-track', 'myth-mobile-indicators');

    // =========================================================================
    // INTERACTIVE SYMPTOM IDENTIFIER (index.html)
    // =========================================================================
    const symptomChips = document.querySelectorAll('.symptom-chip');
    const summaryContainer = document.getElementById('symptom-summary-container');
    const symptomCount = document.getElementById('symptom-count');
    const selectedList = document.getElementById('selected-symptoms-list');

    if (symptomChips.length > 0 && summaryContainer && symptomCount && selectedList) {
        symptomChips.forEach(chip => {
            chip.style.cursor = 'pointer';
            chip.addEventListener('click', function () {
                this.classList.toggle('active');
                
                const activeChips = document.querySelectorAll('.symptom-chip.active');
                const count = activeChips.length;
                
                if (count > 0) {
                    symptomCount.textContent = count;
                    selectedList.innerHTML = Array.from(activeChips).map(c => {
                        const name = c.querySelector('span').textContent;
                        const icon = c.querySelector('i').className;
                        return `
                            <span class="badge rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2" style="background-color: rgba(31, 64, 109, 0.05); color: var(--secondary-color); border: 1px solid rgba(31, 64, 109, 0.12); font-size: 0.8rem; text-transform: none;">
                                <i class="${icon}" style="font-size: 0.85rem; color: var(--primary-color);"></i>
                                ${name}
                            </span>
                        `;
                    }).join('');
                    
                    summaryContainer.classList.add('visible');
                } else {
                    summaryContainer.classList.remove('visible');
                }
            });
        });
    }

    // FAQs Link Scroll Interceptor
    document.querySelectorAll('a[href$="#faqs"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const faqSection = document.getElementById('faqs');
            if (faqSection) {
                e.preventDefault();
                faqSection.scrollIntoView({ behavior: 'smooth' });
                history.replaceState(null, document.title, window.location.pathname + window.location.search);

                // Auto-close mobile menu if open
                const offcanvasElement = document.getElementById('mobileMenu');
                if (offcanvasElement && typeof bootstrap !== 'undefined') {
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement) || bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
                    if (offcanvasInstance) {
                        offcanvasInstance.hide();
                    }
                }
            }
        });
    });

    // Handle initial hash scroll after components are loaded and rendered
    if (window.location.hash) {
        try {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                // Delay slightly to allow layout shifts from dynamic components to settle
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Clean URL hash so refreshing starts at the top
                    history.replaceState(null, document.title, window.location.pathname + window.location.search);
                }, 150);
            }
        } catch (err) {
            const target = window.location.hash;
            console.error("Failed to scroll to hash target:", err);
        }
    }
}

if (document.querySelector('[data-include-component]')) {
    document.addEventListener('componentsLoaded', initMain);
} else {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMain);
    } else {
        initMain();
    }
}