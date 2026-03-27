gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Smooth Scroll Setup
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

    // 2. Clean Nav Logic (No color inversions needed since we are light-themed)
    const navbar = document.getElementById("navbar");
    const logoImg = document.getElementById("nav-logo");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
            if(logoImg) logoImg.style.transform = "scale(0.8)";
        } else {
            navbar.classList.remove("scrolled");
            if(logoImg) logoImg.style.transform = "scale(1)";
        }
    });

    // 3. Hero Text Reveal
    const heroLines = document.querySelectorAll(".line-mask span");
    gsap.to(heroLines, { y: 0, duration: 1.5, stagger: 0.15, ease: "power4.out", delay: 0.2 });

    // 4. Fade Ups for cards
    gsap.utils.toArray('.artifact-card').forEach(card => {
        gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } }
        );
    });

    // 5. INITIALIZE SWIPER SLIDERS
    // All sliders are automated, loop, and the user can grab/swipe them.
    
    // Shared Swiper Options
    const commonSwiperConfig = {
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 800,
    };

    // Outside Slider (Linked to the custom arrows)
    const outsideSwiper = new Swiper('.outside-swiper', {
        ...commonSwiperConfig,
        pagination: { el: '.outside-pagination', clickable: true },
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
    });

    // Inside Slider
    const insideSwiper = new Swiper('.inside-swiper', {
        ...commonSwiperConfig,
        autoplay: { delay: 3500, disableOnInteraction: false }, // Slightly offset timing
        pagination: { el: '.inside-pagination', clickable: true },
    });

    // Night Slider
    const nightSwiper = new Swiper('.night-swiper', {
        ...commonSwiperConfig,
        autoplay: { delay: 4500, disableOnInteraction: false }, // Slightly offset timing
        pagination: { el: '.night-pagination', clickable: true },
    });
});
