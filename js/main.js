gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ELITE NAVBAR SCROLL EFFECT
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const logoImg = document.getElementById("nav-logo");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                navbar.classList.add("scrolled");
                // Switch text colors for light background
                navLinks.forEach(link => {
                    link.classList.remove("text-white");
                    link.classList.add("text-[#1A1A1A]");
                });
                // Invert logo if needed (assuming black logo on white background is required, using CSS filter)
                if(logoImg) logoImg.style.filter = "invert(1) brightness(0.1)";
            } else {
                navbar.classList.remove("scrolled");
                // Revert text colors
                navLinks.forEach(link => {
                    link.classList.add("text-white");
                    link.classList.remove("text-[#1A1A1A]");
                });
                if(logoImg) logoImg.style.filter = "none";
            }
        });
    }

    // 2. HERO REVEAL (More dramatic bezier curves)
    const heroTexts = document.querySelectorAll(".hero-text");
    if (heroTexts.length > 0) {
        gsap.to(heroTexts, {
            y: 0,
            opacity: 1,
            duration: 1.8,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2
        });
    }

    // 3. ASYMMETRICAL CARD REVEAL
    const artifactCards = document.querySelectorAll(".artifact-card");
    if (artifactCards.length > 0) {
        gsap.to(artifactCards, {
            scrollTrigger: {
                trigger: "#features",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.25,
            ease: "expo.out"
        });
    }

    // 4. ELEGANT IMAGE CROSSFADE (Card 1)
    const slides = document.querySelectorAll('.image-slideshow .slide-img');
    if (slides.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.opacity = '1';
        }, 5000); // Slower, more luxurious pacing
    }

    // 5. PARALLAX EFFECT ON NIGHT CARD
    const nightCard = document.querySelector('.parallax-container');
    const nightImg = document.querySelector('.parallax-img');
    if (nightCard && nightImg) {
        gsap.to(nightImg, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: nightCard,
                start: "top bottom", 
                end: "bottom top",
                scrub: true
            } 
        });
    }
});
