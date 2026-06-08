// assets/js/component-loader.js
(function () {
    "use strict";

    window.loadComponents = async function() {
        const elements = document.querySelectorAll('[data-include-component]');
        const promises = Array.from(elements).map(async (el) => {
            const componentName = el.getAttribute('data-include-component');
            try {
                const response = await fetch(`assets/components/${componentName}.html`);
                if (response.ok) {
                    const html = await response.text();
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
