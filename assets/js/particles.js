function initParticles() {
    const canvasEl = document.getElementById("particle-canvas");
    if (!canvasEl) return;
    if (canvasEl.hasAttribute('data-particles-loaded')) return;
    canvasEl.setAttribute('data-particles-loaded', 'true');

    const particleCount = window.innerWidth < 768 ? 20 : 50; // Reduced for performance

    if (typeof tsParticles !== "undefined") {
        tsParticles.load("particle-canvas", {
            fullScreen: { enable: false },
            background: {
                color: { value: "transparent" }
            },
            particles: {
                number: {
                    value: particleCount,
                    density: { enable: true, area: 800 }
                },
                color: { value: ["#ffd977", "#ffffff"] },
                shape: { type: "circle" },
                opacity: {
                    value: 0.15, 
                    random: true
                },
                size: {
                    value: { min: 2, max: 5 },
                },
                links: {
                    enable: true, 
                    distance: 140,
                    color: "#ffd977",
                    opacity: 0.05, 
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 0.8, 
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: { default: "bounce" } 
                }
            },
            interactivity: {
                detectsOn: "canvas", 
                events: {
                    onHover: { enable: false },
                    onClick: { enable: false }, 
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

document.addEventListener("DOMContentLoaded", initParticles);
document.addEventListener("componentsLoaded", initParticles);