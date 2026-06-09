// Availability Signal Configuration
const AVAILABILITY_SIGNAL = {
    isActive: true, // Toggle this to true/false to turn the banner on/off
    dates: "June 12 - 14",
    message: "Inquire now to claim a $500 discount on the weekend special."
};

// Monthly Special Configuration
const MONTHLY_SPECIAL = {
    isActive: true, // Toggle this to true/false to turn the toast on/off
    title: "June Special",
    subtitle: "Mondays - Thursdays",
    price: "Stay for the day for only $1000",
    bullets: [
        "Covers up to 6 persons",
        "Check-in at 8:00 AM | Check-out at 5:30 PM",
        "Additional guests (after 6) pay $100 per person",
        "Children 10 and under are free"
    ]
};

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

    // 1.5 Availability Signal Banner Injection
    let bannerHeight = 0;
    if (AVAILABILITY_SIGNAL.isActive) {
        const bannerHTML = `
            <div id="availability-banner" class="fixed top-0 left-0 w-full z-[60] bg-charcoal/90 backdrop-blur-3xl border-b border-gold/20 text-white py-3 px-6 transform -translate-y-full flex justify-between items-center shadow-2xl">
                <div class="flex-1 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-center md:text-left">
                    <span class="font-body tracking-widest text-gold text-[10px] md:text-xs uppercase font-semibold flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                        Rare Availability
                    </span>
                    <span class="font-body text-xs md:text-sm text-white/90 font-light">
                        <strong>${AVAILABILITY_SIGNAL.dates}</strong> - ${AVAILABILITY_SIGNAL.message}
                    </span>
                    <a href="booking.html" class="mt-2 md:mt-0 font-body text-[10px] md:text-xs tracking-widest uppercase text-white hover:text-gold border-b border-gold/30 hover:border-gold transition-colors pb-0.5 ml-0 md:ml-4">
                        Claim Dates
                    </a>
                </div>
                <button id="close-banner" class="text-white/50 hover:text-white transition-colors p-1 group shrink-0">
                    <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', bannerHTML);

        const banner = document.getElementById("availability-banner");
        const closeBtn = document.getElementById("close-banner");
        const navbar = document.getElementById("navbar");
        
        setTimeout(() => {
            bannerHeight = banner.offsetHeight;
            gsap.to(banner, { y: 0, duration: 1, ease: "power3.out" });
            if (navbar && window.scrollY <= 100) {
                gsap.to(navbar, { top: bannerHeight, duration: 1, ease: "power3.out" });
            }
        }, 1500);

        closeBtn.addEventListener("click", () => {
            gsap.to(banner, { y: "-100%", duration: 0.8, ease: "power3.in" });
            if (navbar) {
                gsap.to(navbar, { top: 0, duration: 0.8, ease: "power3.in" });
            }
            bannerHeight = 0; // Reset so scroll logic stops applying it
        });
    }

    // 1.6 Monthly Special Toast Injection
    if (MONTHLY_SPECIAL.isActive) {
        const specialHTML = `
            <div id="monthly-special-toast" class="fixed bottom-6 right-6 z-[60] w-80 bg-white/90 backdrop-blur-3xl border border-charcoal/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 transform translate-x-[150%]">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex flex-col gap-1">
                        <span class="font-body tracking-widest text-gold text-[10px] uppercase font-semibold flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
                            ${MONTHLY_SPECIAL.title}
                        </span>
                        <span class="font-body tracking-widest text-charcoal/50 text-[9px] uppercase font-semibold ml-3.5">${MONTHLY_SPECIAL.subtitle}</span>
                    </div>
                    <button id="close-special" class="text-charcoal/40 hover:text-charcoal transition-colors group mt-0.5">
                        <svg class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div class="font-body text-charcoal/80 font-light mt-5 mb-2">
                    <p class="text-sm font-medium text-charcoal mb-4">${MONTHLY_SPECIAL.price}</p>
                    <ul class="space-y-2.5 text-xs text-charcoal/70">
                        ${MONTHLY_SPECIAL.bullets.map(b => `<li class="flex items-start gap-2"><span class="text-gold shrink-0 leading-none mt-0.5">&bull;</span> <span>${b}</span></li>`).join('')}
                    </ul>
                </div>
                <div class="mt-4">
                    <a href="booking.html" class="inline-block font-body text-[10px] tracking-widest uppercase text-charcoal hover:text-gold border-b border-charcoal/10 hover:border-gold transition-colors pb-0.5">
                        Inquire Now
                    </a>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', specialHTML);

        const specialToast = document.getElementById("monthly-special-toast");
        const closeSpecialBtn = document.getElementById("close-special");

        // Slide in after 3 seconds
        setTimeout(() => {
            gsap.to(specialToast, { x: 0, duration: 1, ease: "power3.out" });
        }, 3000);

        closeSpecialBtn.addEventListener("click", () => {
            gsap.to(specialToast, { x: "150%", duration: 0.8, ease: "power3.in" });
        });
    }

    // 2. Smart Navbar State Logic (Fixed for Lenis Smooth Scroll)
    const navbar = document.getElementById("navbar");
    if(navbar) {
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;

            // Strictly check for downward vs upward movement to ignore zero-movement micro-ticks
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling DOWN: Hide it
                navbar.classList.add("nav-hidden");
            } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
                // Scrolling UP (or at the absolute top): Show it
                navbar.classList.remove("nav-hidden");
                // Snap navbar back to under the banner if at the very top
                if (currentScrollY <= 50) {
                    navbar.style.top = `${bannerHeight}px`;
                } else {
                    navbar.style.top = "0px";
                }
            }

            // Add a slight tint when not at the absolute top for better legibility
            if (currentScrollY > 50) {
                navbar.classList.add("nav-scrolled-up");
            } else {
                navbar.classList.remove("nav-scrolled-up");
            }

            lastScrollY = currentScrollY;
        });
    }

    // 3. Hero Text Reveal
    const heroLines = document.querySelectorAll(".line-mask span");
    if(heroLines.length > 0) {
        gsap.to(heroLines, { y: 0, duration: 1.5, stagger: 0.15, ease: "power4.out", delay: 0.2 });
    }

    // 4. Hero Scroll Indicator Animation
    if(document.querySelector(".scroll-indicator")) {
        gsap.to(".scroll-indicator", { opacity: 1, duration: 1, delay: 1.5 });
        gsap.to(".scroll-dot", { y: 64, duration: 1.5, repeat: -1, ease: "power2.inOut" });
    }

    // 5. Hero Background Parallax
    if(document.querySelector(".parallax-bg")) {
        gsap.to(".parallax-bg", {
            yPercent: 15, ease: "none",
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
        });
    }

    // 6. Section Title Fade In
    if(document.querySelector(".section-title")) {
        gsap.to(".section-title", {
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: "#features", start: "top 80%" }
        });
    }

    // 7. Staggered Card Reveal (Premium Entrance)
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

    // 8. MAGNETIC BUTTONS 
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

    // 9. SWIPER SLIDERS
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
