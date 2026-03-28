gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Smooth Scroll Setup (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    // 2. Hero Text Reveal
    const heroLines = document.querySelectorAll(".line-mask span");
    if(heroLines.length > 0) {
        gsap.to(heroLines, { y: 0, duration: 1.5, stagger: 0.15, ease: "power4.out", delay: 0.2 });
    }

    // 3. Hero Scroll Indicator Animation
    if(document.querySelector(".scroll-indicator")) {
        gsap.to(".scroll-indicator", { opacity: 1, duration: 1, delay: 1.5 });
        gsap.to(".scroll-dot", { y: 64, duration: 1.5, repeat: -1, ease: "power2.inOut" });
    }

    // 4. Hero Background Parallax
    if(document.querySelector(".parallax-bg")) {
        gsap.to(".parallax-bg", {
            yPercent: 15, ease: "none",
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
        });
    }

    // 5. Section Title Fade In
    if(document.querySelector(".section-title")) {
        gsap.to(".section-title", {
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: "#features", start: "top 80%" }
        });
    }

    // 6. Staggered Card Reveal (Premium Entrance)
    const artifactCards = gsap.utils.toArray('.artifact-card');
    if(artifactCards.length > 0) {
        artifactCards.forEach((card, i) => {
            gsap.to(card, {
                y: 0, opacity: 1, duration: 1.2, ease: "expo.out",
                scrollTrigger: { trigger: card, start: "top 85%" },
                delay: i * 0.15 
            });
        });
    }

    // 7. MAGNETIC BUTTONS 
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((elem) => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(elem, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: "power3.out" });
        });
        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    });

    // 8. SWIPER SLIDERS
    const commonSwiperConfig = {
        loop: true,
        grabCursor: true,
        speed: 1000, 
    };

    if(document.querySelector('.outside-swiper')) {
        new Swiper('.outside-swiper', { ...commonSwiperConfig, autoplay: { delay: 4000, disableOnInteraction: false }, pagination: { el: '.outside-pagination', clickable: true } });
    }
    if(document.querySelector('.inside-swiper')) {
        new Swiper('.inside-swiper', { ...commonSwiperConfig, autoplay: { delay: 4500, disableOnInteraction: false }, pagination: { el: '.inside-pagination', clickable: true } });
    }
    if(document.querySelector('.night-swiper')) {
        new Swiper('.night-swiper', { ...commonSwiperConfig, autoplay: { delay: 5000, disableOnInteraction: false }, pagination: { el: '.night-pagination', clickable: true } });
    }
});
