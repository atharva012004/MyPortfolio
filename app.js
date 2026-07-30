/* =========================================================
   Atharva Shihurkar — Portfolio interactions
   GSAP + ScrollTrigger powered scroll experience
   ========================================================= */

// ---------- EmailJS init ----------
(function () {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not found.');
        return;
    }
    try {
        emailjs.init({ publicKey: 'HCAYh5sJrMQB4ULIX' });
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    setupNavigation();
    setupCustomCursor();
    setupNetworkCanvas();
    setupTypingAnimation();
    setupHeroReveal();
    setupScrollProgress();
    setupPipeline();
    setupSectionReveals();
    setupCounters();
    setupSkillBars();
    setupExperienceTimeline();
    setupTiltCards();
    setupMagnetic();
    setupContactForm();
    setupSmoothAnchors();
    setupScrollIndicator();
});

/* ---------------- Navigation ---------------- */
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger && hamburger.classList.remove('active');
            navMenu && navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        let current = '';
        document.querySelectorAll('section[id]').forEach((section) => {
            const top = section.offsetTop - 220;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            link.classList.toggle('active', current !== '' && href.includes(current));
        });
    }, { passive: true });
}

/* ---------------- Custom cursor ---------------- */
function setupCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverables = 'a, button, .tilt-card, .tech-item, input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverables)) ring.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverables)) ring.classList.remove('cursor-hover');
    });
}

/* ---------------- Network / RAG-pipeline hero canvas ---------------- */
function setupNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let width, height;
    const mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    function createNodes() {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const cap = isMobile ? 24 : 70;
        const density = isMobile ? 26000 : 16000;
        const count = Math.min(cap, Math.floor((width * height) / density));
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.6 + 1,
            hue: Math.random() > 0.5 ? '0, 217, 255' : '139, 92, 246'
        }));
    }

    function step() {
        ctx.clearRect(0, 0, width, height);
        nodes.forEach((n) => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;

            if (mouse.x !== null) {
                const dx = n.x - mouse.x, dy = n.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    n.x += dx / dist * 0.6;
                    n.y += dy / dist * 0.6;
                }
            }
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 217, 255, ${0.12 - dist / 1200})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        nodes.forEach((n) => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${n.hue}, 0.75)`;
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        });

        if (!document.hidden) requestAnimationFrame(step);
    }

    resize();
    createNodes();
    step();

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) requestAnimationFrame(step);
    });

    window.addEventListener('resize', () => { resize(); createNodes(); });
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
}

/* ---------------- Typing animation ---------------- */
function setupTypingAnimation() {
    const el = document.getElementById('typing-text');
    if (!el) return;
    const roles = ['Software Developer', 'AI Systems Builder', 'Full-Stack Engineer', 'RAG Pipeline Architect'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function tick() {
        const word = roles[roleIndex];
        el.textContent = isDeleting ? word.substring(0, charIndex - 1) : word.substring(0, charIndex + 1);
        charIndex += isDeleting ? -1 : 1;
        let speed = isDeleting ? 50 : 130;

        if (!isDeleting && charIndex === word.length) { speed = 1800; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 400; }

        setTimeout(tick, speed);
    }
    tick();
}

/* ---------------- Hero entrance ---------------- */
function setupHeroReveal() {
    if (!window.gsap) return;
    gsap.set('.hero-word', { y: 30, opacity: 0 });
    gsap.set('[data-reveal]', { y: 24, opacity: 0 });
    gsap.set('.hero-image', { opacity: 0, scale: 0.92 });
    gsap.set('.marquee', { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero-word', { y: 0, opacity: 1, duration: 0.7, stagger: 0.045, ease: 'power3.out' })
      .to('.hero-image', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
      .to('[data-reveal]', { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, '-=0.6')
      .to('.marquee', { opacity: 1, duration: 0.8 }, '-=0.3');
}

/* ---------------- Scroll progress bar ---------------- */
function setupScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
        bar.style.width = scrolled + '%';
    }, { passive: true });
}

/* ---------------- The connective pipeline ---------------- */
function setupPipeline() {
    const svg = document.getElementById('pipeline');
    const path = document.getElementById('pipeline-path-fill');
    if (!svg || !path || !window.gsap) return;

    function resizePipeline() {
        const h = document.body.scrollHeight;
        svg.setAttribute('viewBox', `0 0 60 ${h}`);
        svg.style.height = h + 'px';
        path.setAttribute('d', `M30,0 L30,${h}`);
        document.getElementById('pipeline-path').setAttribute('d', `M30,0 L30,${h}`);
        const len = h;
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;

        gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.4
            }
        });
    }

    resizePipeline();
    window.addEventListener('resize', () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        resizePipeline();
        ScrollTrigger.refresh();
    });
}

/* ---------------- Generic scroll reveals ---------------- */
function setupSectionReveals() {
    if (!window.gsap) {
        // Fallback without GSAP: just show everything.
        document.querySelectorAll('[data-fade], .section-header, .about-content, .exp-item, .skill-category, .project-card, .timeline-item, .certificate-item, .leadership-item')
            .forEach((el) => el.style.opacity = 1);
        return;
    }

    gsap.utils.toArray('.section-header').forEach((el) => {
        gsap.from(el, {
            y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    gsap.utils.toArray('.about-text, .about-tech').forEach((el, i) => {
        gsap.from(el, {
            y: 50, opacity: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    gsap.utils.toArray('.tech-item').forEach((el, i) => {
        gsap.from(el, {
            y: 20, opacity: 0, duration: 0.5, delay: (i % 7) * 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%' }
        });
    });

    gsap.utils.toArray('.exp-item').forEach((el, i) => {
        gsap.from(el, {
            x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    gsap.utils.toArray('.skill-category').forEach((el, i) => {
        gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8, delay: (i % 2) * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    gsap.utils.toArray('.project-card').forEach((el, i) => {
        gsap.from(el, {
            y: 60, opacity: 0, duration: 0.8, delay: (i % 2) * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' }
        });
    });

    gsap.utils.toArray('.timeline-item').forEach((el) => {
        gsap.from(el, {
            x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' }
        });
    });

    gsap.utils.toArray('.certificate-item, .leadership-item').forEach((el, i) => {
        gsap.from(el, {
            y: 30, opacity: 0, duration: 0.6, delay: (i % 3) * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%' }
        });
    });

    gsap.utils.toArray('.contact-info, .contact-form').forEach((el, i) => {
        gsap.from(el, {
            y: 40, opacity: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // subtle hero-image parallax
    gsap.to('.hero-image', {
        y: 60,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
}

/* ---------------- Animated counters ---------------- */
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10) || 0;
            let current = 0;
            const step = Math.max(target / 40, 0.1);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = Math.floor(current) + '+';
            }, 30);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach((c) => observer.observe(c));
}

/* ---------------- Skill bars ---------------- */
function setupSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            observer.unobserve(bar);
        });
    }, { threshold: 0.3 });

    bars.forEach((b) => observer.observe(b));
}

/* ---------------- Experience timeline fill ---------------- */
function setupExperienceTimeline() {
    const line = document.getElementById('exp-line');
    if (!line) return;

    if (window.gsap) {
        gsap.to(line, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.exp-timeline',
                start: 'top 70%',
                end: 'bottom 80%',
                scrub: 0.5
            }
        });
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) line.style.height = '100%'; });
        }, { threshold: 0.2 });
        observer.observe(line);
    }
}

/* ---------------- 3D tilt on project cards + hero image ---------------- */
function setupTiltCards() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.tilt-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)';
        });
    });

    const heroImg = document.getElementById('tilt-image');
    if (heroImg) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            heroImg.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }
}

/* ---------------- Magnetic buttons ---------------- */
function setupMagnetic() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.magnetic').forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/* ---------------- Notifications ---------------- */
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const note = document.createElement('div');
    note.className = `notification notification-${type}`;
    note.textContent = message;
    note.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 15px 25px;
        border-radius: 12px; color: #061018; font-weight: 600; z-index: 10000;
        transform: translateX(120%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        max-width: 320px; box-shadow: 0 10px 30px -8px rgba(0,0,0,0.5);
        background: ${type === 'success' ? 'linear-gradient(120deg,#00d9ff,#8b5cf6)' : 'linear-gradient(120deg,#ff6b6b,#c44569)'};
        color: ${type === 'success' ? '#061018' : '#fff'};
    `;
    document.body.appendChild(note);
    requestAnimationFrame(() => { note.style.transform = 'translateX(0)'; });
    setTimeout(() => {
        note.style.transform = 'translateX(120%)';
        setTimeout(() => note.remove(), 350);
    }, 4500);
}

/* ---------------- Contact form ---------------- */
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        const data = new FormData(form);
        const name = data.get('name');
        const email = data.get('email');
        const subject = data.get('subject');
        const message = data.get('message');

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text')?.classList.add('hidden');
            submitBtn.querySelector('.btn-loading')?.classList.remove('hidden');
        }

        if (typeof emailjs === 'undefined') {
            showNotification('Email service unavailable. Please refresh and try again.', 'error');
            resetBtn();
            return;
        }

        emailjs.send('service_myzw6ij', 'template_b90aveh', {
            from_name: name, from_email: email, subject, message, reply_to: email
        }).then(() => {
            showNotification("Message sent! I'll get back to you soon.", 'success');
            form.reset();
        }).catch((error) => {
            console.error('EmailJS error:', error);
            showNotification('Failed to send message. Please try again or email me directly.', 'error');
        }).finally(resetBtn);

        function resetBtn() {
            if (!submitBtn) return;
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text')?.classList.remove('hidden');
            submitBtn.querySelector('.btn-loading')?.classList.add('hidden');
        }
    });
}

/* ---------------- Smooth anchor scrolling ---------------- */
function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });
}

/* ---------------- Scroll indicator ---------------- */
function setupScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;
    indicator.addEventListener('click', () => {
        const about = document.getElementById('about');
        if (about) window.scrollTo({ top: about.offsetTop - 70, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
        indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
}
