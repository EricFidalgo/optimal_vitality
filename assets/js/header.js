document.addEventListener("DOMContentLoaded", function () {
    const particleCount = window.innerWidth < 768 ? 35 : 80;

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
                    speed: 1.2, 
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: { default: "bounce" } 
                }
            },
            interactivity: {
                detectsOn: "window", 
                events: {
                    onHover: {
                        enable: false
                    },
                    onClick: { enable: false }, 
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});