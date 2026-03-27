// Register GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LENIS SMOOTH SCROLL (The Secret to Premium Feel)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    // 2. ELITE NAVBAR LOGIC
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const logoImg = document.getElementById("nav-logo");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
            navLinks.forEach(l => { l.classList.remove("text-white"); l.classList.add("text-charcoal"); });
            if(logoImg) logoImg.style.filter = "invert(1) brightness(0)";
        } else {
            navbar.classList.remove("scrolled");
            navLinks.forEach(l => { l.classList.add("text-white"); l.classList.remove("text-charcoal"); });
            if(logoImg) logoImg.style.filter = "none";
        }
    });

    // 3. HERO TEXT REVEAL
    const heroLines = document.querySelectorAll(".line-mask span");
    gsap.to(heroLines, {
        y: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
    });

    // 4. IMAGE PARALLAX ENGINE
    document.querySelectorAll('.img-wrap').forEach(wrap => {
        const img = wrap.querySelector('img');
        gsap.to(img, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 5. ASYMMETRICAL CARD REVEAL
    const artifactCards = document.querySelectorAll(".artifact-card");
    artifactCards.forEach((card, i) => {
        gsap.fromTo(card, 
            { y: 100, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                }
            }
        );
    });
});
