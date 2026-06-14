// Availability Signal Configuration
const AVAILABILITY_SIGNAL = {
    isActive: true, // Toggle this to true/false to turn the banner on/off
    dates: "July 3rd - 5th and July 10th - 11th",
    message: "Inquire now to claim a $500 discount on the weekend special."
};

// Monthly Special Configuration
const MONTHLY_SPECIAL = {
    isActive: true, // Toggle this to true/false to turn the toast on/off
    title: "June Special",
    subtitle: "Mondays - Thursdays",
    price: "Only $1000",
    bullets: [
        "Stay for the day (8:00 AM - 5:30 PM)",
        "Covers up to 6 persons",
        "Additional guests: $100 per person",
        "Children 10 & under are free"
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

    // 1.5 Availability Signal Banner
    let bannerHeight = 0;
    const navbar = document.getElementById("navbar");

    if (AVAILABILITY_SIGNAL.isActive) {
        const bannerState = sessionStorage.getItem('bannerState') || 'unseen';

        const bannerHTML = `
            <div id="availability-banner" style="display:none; position:absolute; top:0; left:0; width:100%; z-index:60; background:rgba(17,17,17,0.92); backdrop-filter:blur(24px); border-bottom:1px solid rgba(194,155,87,0.2); color:white; padding:12px 24px; justify-content:space-between; align-items:center; box-shadow:0 10px 40px rgba(0,0,0,0.3);">
                <div style="flex:1; display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:8px 24px; text-align:center;">
                    <span style="font-family:'Outfit',sans-serif; letter-spacing:0.15em; color:#C29B57; font-size:10px; text-transform:uppercase; font-weight:600; display:flex; align-items:center; gap:6px;">
                        <span style="width:8px;height:8px;border-radius:50%;background:#C29B57;display:inline-block;animation:pulse 2s infinite;"></span>
                        July 3rd - 5th and July 10th - 11th
                    </span>
                    <span style="font-family:'Outfit',sans-serif; font-size:13px; color:rgba(255,255,255,0.9); font-weight:300;">
                        ${AVAILABILITY_SIGNAL.message}
                    </span>
                    <a href="booking.html" style="font-family:'Outfit',sans-serif; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:white; border-bottom:1px solid rgba(194,155,87,0.4); padding-bottom:2px; text-decoration:none; transition:color 0.3s;">Claim Dates</a>
                </div>
                <button id="close-banner" style="color:rgba(255,255,255,0.5); background:none; border:none; cursor:pointer; padding:4px; flex-shrink:0; line-height:0; margin-left:12px;" aria-label="Minimize availability notice">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', bannerHTML);

        // Pill lives INSIDE the navbar so it moves with the navbar's transform automatically
        const bannerPillEl = document.createElement('div');
        bannerPillEl.id = 'banner-pill';
        bannerPillEl.style.cssText = 'display:none; position:absolute; top:100%; left:0; z-index:60; background:rgba(17,17,17,0.92); border-right:1px solid rgba(194,155,87,0.3); border-bottom:1px solid rgba(194,155,87,0.3); border-radius:0 0 16px 0; padding:10px 18px; cursor:pointer; backdrop-filter:blur(16px); box-shadow:4px 4px 20px rgba(0,0,0,0.2); align-items:center; gap:8px;';
        bannerPillEl.innerHTML = `
            <span style="width:7px;height:7px;border-radius:50%;background:#C29B57;display:inline-block;animation:pulse 2s infinite;flex-shrink:0;"></span>
            <span style="font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#C29B57;font-weight:600;white-space:nowrap;">July 3rd - 5th and July 10th - 11th</span>
        `;
        if (navbar) navbar.appendChild(bannerPillEl);

        const banner = document.getElementById("availability-banner");
        const bannerPill = document.getElementById("banner-pill");
        const closeBtn = document.getElementById("close-banner");

        const minimizeBanner = () => {
            gsap.to(banner, { y: "-100%", duration: 0.7, ease: "power3.in", onComplete: () => { banner.style.display = 'none'; } });
            gsap.to(navbar, { y: 0, duration: 0.7, ease: "power3.in" });
            bannerHeight = 0;
            bannerPill.style.display = 'flex';
            gsap.fromTo(bannerPill, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.3 });
            sessionStorage.setItem('bannerState', 'minimized');
        };

        const expandBanner = () => {
            banner.style.display = 'flex';
            bannerPill.style.display = 'none';
            bannerHeight = banner.offsetHeight;
            gsap.fromTo(banner, { y: "-100%" }, { y: 0, duration: 0.8, ease: "power3.out" });
            if (window.scrollY <= 10) {
                gsap.to(navbar, { y: bannerHeight, duration: 0.8, ease: "power3.out" });
            }
            sessionStorage.setItem('bannerState', 'open');
        };

        closeBtn.addEventListener("click", minimizeBanner);
        bannerPill.addEventListener("click", expandBanner);

        if (bannerState === 'minimized') {
            banner.style.display = 'none';
            bannerPill.style.display = 'flex';
            bannerPill.style.opacity = '1';
        } else {
            // First time — reveal and animate banner in after delay
            setTimeout(() => {
                banner.style.display = 'flex';
                bannerHeight = banner.offsetHeight;
                gsap.fromTo(banner, { y: "-100%" }, { y: 0, duration: 1, ease: "power3.out" });
                if (window.scrollY <= 10) {
                    gsap.to(navbar, { y: bannerHeight, duration: 1, ease: "power3.out" });
                }
                sessionStorage.setItem('bannerState', 'open');
            }, 1500);
        }
    }

    // 1.6 Monthly Special Toast
    if (MONTHLY_SPECIAL.isActive) {
        const specialState = sessionStorage.getItem('specialState') || 'unseen';

        const specialHTML = `
            <div id="monthly-special-toast" style="position:fixed; bottom:24px; right:24px; z-index:60; width:22rem; max-width:calc(100vw - 48px); background:rgba(255,255,255,0.97); backdrop-filter:blur(24px); border:1px solid rgba(17,17,17,0.08); box-shadow:0 20px 60px rgba(0,0,0,0.15); border-radius:2rem; padding:28px; transform:translateX(150%); transition:none;">
                <button id="close-special" style="position:absolute; top:20px; right:20px; background:none; border:none; cursor:pointer; color:rgba(17,17,17,0.3); line-height:0; padding:4px;" aria-label="Minimize special offer">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <div style="margin-bottom:20px; padding-right:28px;">
                    <span style="font-family:'Outfit',sans-serif; letter-spacing:0.15em; color:#C29B57; font-size:10px; text-transform:uppercase; font-weight:700; display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                        <span style="width:6px;height:6px;border-radius:50%;background:#C29B57;display:inline-block;"></span>
                        ${MONTHLY_SPECIAL.title}
                    </span>
                    <h3 style="font-family:'Outfit',sans-serif; font-size:2.25rem; color:#111; line-height:1; letter-spacing:-0.02em; margin-bottom:6px;">
                        ${MONTHLY_SPECIAL.price.replace('$1000', '<span style="font-style:italic;color:#C29B57;font-family:\'Cormorant\',serif;">$1000</span>')}
                    </h3>
                    <p style="font-family:'Outfit',sans-serif; color:rgba(17,17,17,0.45); font-size:11px; text-transform:uppercase; letter-spacing:0.15em; font-weight:600;">${MONTHLY_SPECIAL.subtitle}</p>
                </div>
                <div style="width:100%; height:1px; background:linear-gradient(to right, rgba(17,17,17,0.1), transparent); margin-bottom:20px;"></div>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
                    ${MONTHLY_SPECIAL.bullets.map(b => `<li style="display:flex; gap:10px; align-items:flex-start; font-family:'Outfit',sans-serif; font-size:13px; color:rgba(17,17,17,0.75); font-weight:300;"><span style="color:#C29B57; flex-shrink:0; margin-top:1px;">&bull;</span><span>${b}</span></li>`).join('')}
                </ul>
                <a href="booking.html" style="display:flex; justify-content:center; align-items:center; width:100%; background:#111; color:white; font-family:'Outfit',sans-serif; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; padding:14px; border-radius:999px; text-decoration:none; transition:background 0.3s;">Inquire Now</a>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', specialHTML);

        // Special pill lives INSIDE the navbar so it moves with the navbar's transform automatically
        const specialPillEl = document.createElement('div');
        specialPillEl.id = 'special-pill';
        specialPillEl.style.cssText = 'display:none; position:absolute; top:100%; right:0; z-index:60; background:rgba(255,255,255,0.97); border-left:1px solid rgba(17,17,17,0.1); border-bottom:1px solid rgba(17,17,17,0.1); border-radius:0 0 0 16px; padding:10px 18px; cursor:pointer; backdrop-filter:blur(16px); box-shadow:-4px 4px 20px rgba(0,0,0,0.08); align-items:center; gap:8px;';
        specialPillEl.innerHTML = `
            <span style="width:7px;height:7px;border-radius:50%;background:#C29B57;display:inline-block;flex-shrink:0;"></span>
            <span style="font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#111;font-weight:600;white-space:nowrap;">${MONTHLY_SPECIAL.title}</span>
        `;
        if (navbar) navbar.appendChild(specialPillEl);

        const specialToast = document.getElementById("monthly-special-toast");
        const specialPill = document.getElementById("special-pill");
        const closeSpecialBtn = document.getElementById("close-special");

        const minimizeSpecial = () => {
            gsap.to(specialToast, { x: "150%", duration: 0.7, ease: "power3.in", onComplete: () => { specialToast.style.display = 'none'; } });
            specialPill.style.display = 'flex';
            gsap.fromTo(specialPill, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.2 });
            sessionStorage.setItem('specialState', 'minimized');
        };

        const expandSpecial = () => {
            specialToast.style.display = 'block';
            specialPill.style.display = 'none';
            gsap.fromTo(specialToast, { x: "150%" }, { x: 0, duration: 0.8, ease: "power3.out" });
            sessionStorage.setItem('specialState', 'open');
        };

        closeSpecialBtn.addEventListener("click", minimizeSpecial);
        specialPill.addEventListener("click", expandSpecial);

        if (specialState === 'minimized') {
            specialPill.style.display = 'flex';
            specialPill.style.opacity = '1';
        } else {
            // First time — slide in after delay
            setTimeout(() => {
                gsap.to(specialToast, { x: 0, duration: 1, ease: "power3.out" });
                sessionStorage.setItem('specialState', 'open');
            }, 3000);
        }
    }

    // 2. Smart Navbar Scroll Logic (navbar variable already declared at top of DOMContentLoaded)
    if(navbar) {
        let lastScrollY = Math.max(0, window.scrollY);

        window.addEventListener("scroll", () => {
            const currentScrollY = Math.max(0, window.scrollY);

            // How far the banner is still visible (scrolls away as user scrolls down)
            const bannerOffset = Math.max(0, bannerHeight - currentScrollY);

            const pills = [document.getElementById('banner-pill'), document.getElementById('special-pill')].filter(Boolean);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling DOWN: slide navbar up. Slide pills up and fade them out.
                navbar.style.transform = `translateY(-100%)`;
                pills.forEach(p => {
                    p.style.transform = 'translateY(-150%)';
                    p.style.opacity = '0';
                    p.style.pointerEvents = 'none';
                });
            } else {
                // Scrolling UP or at page top: slide navbar down, slide pills down, and fade them back in.
                navbar.style.transform = `translateY(${bannerOffset}px)`;
                pills.forEach(p => {
                    p.style.transform = 'translateY(0)';
                    p.style.opacity = '1';
                    p.style.pointerEvents = 'auto';
                });
            }

            if (currentScrollY > 50) {
                navbar.classList.add("nav-scrolled-up");
            } else {
                navbar.classList.remove("nav-scrolled-up");
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
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
