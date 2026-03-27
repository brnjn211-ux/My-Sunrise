// Setup GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById("navbar");
    if (navbar && navbar.classList.contains("nav-island") && !navbar.classList.contains("bg-background/80")) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
                navbar.classList.remove("text-white");
                
                // If logo is white on transparent, we might need to invert it on scroll, 
                // but currently we use a mix-blend or it's just a normal jpg logo.
                const logo = navbar.querySelector('img');
                if(logo) {
                    logo.classList.add('mix-blend-multiply');
                }
            } else {
                navbar.classList.remove("scrolled");
                navbar.classList.add("text-white");
                const logo = navbar.querySelector('img');
                if(logo) {
                    logo.classList.remove('mix-blend-multiply');
                }
            }
        });
    }

    // 2. HERO ANIMATIONS
    const heroTexts = document.querySelectorAll(".hero-text");
    if (heroTexts.length > 0) {
        gsap.to(heroTexts, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.3
        });
    }

    // 3. ARTIFACT CARDS ANIMATION (Soft fade up)
    const artifactCards = document.querySelectorAll(".artifact-card");
    if (artifactCards.length > 0) {
        gsap.to(artifactCards, {
            scrollTrigger: {
                trigger: "#features",
                start: "top 75%",
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // 4. IMAGE SLIDESHOW (Card 1)
    initSlideshow();

    // 5. GENTLE TEXT FADE (Card 2)
    initTextFade();

    // 6. PHILOSOPHY ANIMATION
    initPhilosophy();

    // 7. STICKY STACKING ARCHIVE (PROTOCOL)
    initProtocolSticking();
});

// FEATURE CARD 1: Gentle Image Crossfade
function initSlideshow() {
    const slides = document.querySelectorAll('.image-slideshow .slide-img');
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        slides[currentIndex].classList.remove('opacity-100');
        slides[currentIndex].classList.add('opacity-0');
        
        currentIndex = (currentIndex + 1) % slides.length;
        
        slides[currentIndex].classList.remove('opacity-0');
        slides[currentIndex].classList.add('opacity-100');
    }, 4000); // 4 seconds per slide
}

// FEATURE CARD 2: Gentle Text Fade
function initTextFade() {
    const texts = document.querySelectorAll('.gentle-fade-text .slide-text');
    if (texts.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        texts[currentIndex].classList.remove('opacity-100');
        texts[currentIndex].classList.add('opacity-0');
        
        currentIndex = (currentIndex + 1) % texts.length;
        
        texts[currentIndex].classList.remove('opacity-0');
        texts[currentIndex].classList.add('opacity-100');
    }, 3500);
}

// PHILOSOPHY MANIFESTO ANIMATION
function initPhilosophy() {
    const philosophyEl = document.getElementById("philosophy");
    if (!philosophyEl) return;

    // Soft fade up for lines
    gsap.to('.reveal-line', {
        scrollTrigger: {
            trigger: "#philosophy",
            start: "top 60%",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power2.out"
    });

    // Parallax background
    gsap.to('#philosophy-bg', {
        scrollTrigger: {
            trigger: "#philosophy",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: "15%",
        ease: "none"
    });
}

// ELEGANT PROTOCOL STICKY STACKING
function initProtocolSticking() {
    const cards = gsap.utils.toArray('.sticky-card');
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Don't animate the last card out
        
        const inner = card.querySelector('div');
        
        // Gentle scale and fade for the card underneath
        gsap.to(inner, {
            scale: 0.95,
            opacity: 0.4,
            scrollTrigger: {
                trigger: cards[index + 1],
                start: "top bottom", 
                end: "top top", 
                scrub: true,
            }
        });
    });
    
    // Parallax images inside protocol cards
    cards.forEach((card) => {
        const img = card.querySelector('img');
        if(img) {
            gsap.fromTo(img, 
                { scale: 1.1 },
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
    });
}
