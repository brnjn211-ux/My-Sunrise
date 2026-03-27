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

    // 2. Navbar & Scroll State Logic
    const navbar = document.getElementById("navbar");
    const logoImg = document.getElementById("nav-logo");
    const navLinks = document.querySelectorAll(".nav-link");
    const navBtn = document.querySelector("#navbar .btn-premium");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
            if(logoImg) logoImg.style.transform = "scale(0.8)";
            
            // Switch text to dark when background turns white
            navLinks.forEach(link => { link.classList.remove("text-white", "drop-shadow-md"); link.classList.add("text-charcoal"); });
            if(navBtn) {
                navBtn.classList.remove("text-white", "border-white/50", "drop-shadow-md");
                navBtn.classList.add("text-charcoal", "border-charcoal");
            }
        } else {
            navbar.classList.remove("scrolled");
            if(logoImg) logoImg.style.transform = "scale(1)";
            
            // Revert back to white for the hero image
            navLinks.forEach(link => { link.classList.add("text-white", "drop-shadow-md"); link.classList.remove("text-charcoal"); });
            if(navBtn) {
                navBtn.classList.add("text-white", "border-white/50", "drop-shadow-md");
                navBtn.classList.remove("text-charcoal", "border-charcoal");
            }
        }
    });

    // 3. Hero Text Reveal
    const heroLines = document.querySelectorAll(".line-mask span");
    gsap.to(heroLines, { y: 0, duration: 1.5, stagger: 0.15, ease: "power4.out", delay: 0.2 });

    // 4. Hero Scroll Indicator Animation
    gsap.to(".scroll-indicator", { opacity: 1, duration: 1, delay: 1.5 });
    gsap.to(".scroll-dot", {
        y: 64, // Pushes the line down
        duration: 1.5,
        repeat: -1,
        ease: "power2.inOut"
    });

    // 5. Hero Background Parallax
    gsap.to(".parallax-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 6. MAGNETIC BUTTONS (High-end Interaction)
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((elem) => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            // Calculate distance from center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(elem, {
                x: x * 0.3, // Pull strength
                y: y * 0.3,
                duration: 0.6,
                ease: "power3.out"
            });
        });

        elem.addEventListener('mouseleave', () => {
            // Snap back to center
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 7. SWIPER SLIDERS
    const commonSwiperConfig = {
        loop: true,
        grabCursor: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        speed: 800,
    };

    new Swiper('.outside-swiper', { ...commonSwiperConfig, pagination: { el: '.outside-pagination', clickable: true } });
    new Swiper('.inside-swiper', { ...commonSwiperConfig, autoplay: { delay: 3500, disableOnInteraction: false }, pagination: { el: '.inside-pagination', clickable: true } });
    new Swiper('.night-swiper', { ...commonSwiperConfig, autoplay: { delay: 4500, disableOnInteraction: false }, pagination: { el: '.night-pagination', clickable: true } });
});
