// assets/js/component-loader.js
(function () {
    "use strict";

    window.loadComponents = async function() {
        const elements = document.querySelectorAll('[data-include-component]');
        const isSubpage = (typeof OVI_SERVICE_ID !== 'undefined');
        const prefix = isSubpage ? '../' : '';

        const promises = Array.from(elements).map(async (el) => {
            const componentName = el.getAttribute('data-include-component');
            try {
                const response = await fetch(`${prefix}assets/components/${componentName}.html`);
                if (response.ok) {
                    let html = await response.text();
                    
                    if (isSubpage) {
                        // Parse, adjust local asset/page paths, and serialize back
                        const temp = document.createElement('div');
                        temp.innerHTML = html;
                        temp.querySelectorAll('[src], [href]').forEach(item => {
                            const src = item.getAttribute('src');
                            if (src && (src.startsWith('assets/') || src.startsWith('images/'))) {
                                item.setAttribute('src', '../' + src);
                            }
                            const href = item.getAttribute('href');
                            if (href && href.startsWith('index.html')) {
                                item.setAttribute('href', '../' + href);
                            }
                        });
                        html = temp.innerHTML;
                    }

                    // Replace the placeholder element with the actual HTML content
                    el.outerHTML = html; 
                } else {
                    console.error(`Failed to load component: ${componentName}`);
                }
            } catch (error) {
                console.error(`Error loading component: ${componentName}`, error);
            }
        });

        await Promise.all(promises);
        
        // Dispatch a custom event to notify other scripts (like service-renderer)
        // that the DOM structure has been fully constructed.
        document.dispatchEvent(new Event('componentsLoaded'));
    };

    document.addEventListener("DOMContentLoaded", function () {
        window.loadComponents();
    });
})();
