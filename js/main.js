gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.5, // Slower, heavier luxury feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    // 2. Nav Logic (Adjusted for the massive logo)
    const navbar = document.getElementById("navbar");
    const logoImg = document.getElementById("nav-logo");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 120) {
            navbar.classList.add("scrolled");
            // Scale logo down slightly on scroll so it doesn't eat the screen
            if(logoImg) logoImg.style.transform = "scale(0.7)";
            navLinks.forEach(l => { l.classList.remove("text-white"); l.classList.add("text-charcoal"); });
            if(logoImg) logoImg.style.filter = "invert(1) brightness(0)"; // Assuming white SVG, turning it dark
        } else {
            navbar.classList.remove("scrolled");
            if(logoImg) logoImg.style.transform = "scale(1)";
            navLinks.forEach(l => { l.classList.add("text-white"); l.classList.remove("text-charcoal"); });
            if(logoImg) logoImg.style.filter = "none";
        }
    });

    // 3. Hero Reveal
    const heroLines = document.querySelectorAll(".line-mask span");
    gsap.to(heroLines, {
        y: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3
    });

    // 4. Parallax
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

    // 5. Fade Ups
    gsap.utils.toArray('.artifact-card').forEach(card => {
        gsap.fromTo(card, 
            { y: 80, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.8, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%" }
            }
        );
    });
});
