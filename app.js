// Initialize EmailJS with the correct modern approach
(function() {
    console.log('🔧 Initializing EmailJS...');
    
    // Check if EmailJS script is loaded
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not found! Please add this to your HTML head:');
        console.error('<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>');
        return;
    }
    
    try {
        emailjs.init({
            publicKey: "HCAYh5sJrMQB4ULIX"
        });
        console.log('✅ EmailJS initialized successfully with public key: HCAYh5sJrMQB4ULIX');
        
        setTimeout(() => {
            console.log('🔍 EmailJS Configuration Ready:');
            console.log('📋 Current Configuration:');
            console.log('   - Public Key: HCAYh5sJrMQB4ULIX');
            console.log('   - Service ID: service_myzw6ij');
            console.log('   - Template ID: template_b90aveh');
        }, 1000);
        
    } catch (error) {
        console.error('❌ Failed to initialize EmailJS:', error);
    }
})();

// Global variables
let particlesArray = [];
let isAnimating = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupParticles();
    setupTypingAnimation();
    setupScrollAnimations();
    setupSkillBars();
    setupContactForm();
    setupSmoothScrolling();
    setupScrollIndicator();
    addRippleEffect();
    setupProjectCards();
    setupTechItems();
}

// Navigation Setup
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
}

// Particle Animation
function setupParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    particlesContainer.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(0, 212, 255, ${this.opacity})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
        particlesArray = []; // Clear existing particles
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Connect nearby particles
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();

    // Mouse interaction
    let mouse = { x: null, y: null, radius: 150 };
    
    canvas.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    canvas.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });
}

// Typing Animation
function setupTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const roles = ['Software Developer', 'Full-Stack Developer', 'Tech Enthusiast', 'Open Source Contributor'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
                
                // Stagger animations for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, index * 200);
                    });
                }
                
                // Stagger animations for certificates
                if (entry.target.classList.contains('certificates-grid')) {
                    const certificates = entry.target.querySelectorAll('.certificate-item');
                    certificates.forEach((cert, index) => {
                        setTimeout(() => {
                            cert.classList.add('fade-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .skills, .projects-grid, .education-content, .contact-content, .certificates-grid');
    animatedElements.forEach(el => observer.observe(el));
}

// Skill Bar Animations
function setupSkillBars() {
    // This will be triggered by the intersection observer
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 300);
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
        }, 30);
    });
}

// Notification function
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00d4ff, #0099cc)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff4757, #c44569)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Contact Form Setup - CORRECTED WITH MODERN EMAILJS API
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('❌ Contact form not found! Make sure you have an element with id="contact-form"');
        return;
    }

    console.log('✅ Contact form found, setting up event listener...');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📧 Form submitted, processing...');

        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);

        // Get form values
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        console.log('📝 Form data:', { name, email, subject, message });

        // Basic validation
        if (!name || !email || !subject || !message) {
            console.warn('⚠️ Validation failed: Missing required fields');
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.warn('⚠️ Validation failed: Invalid email format');
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        console.log('✅ Validation passed, preparing to send email...');

        // Show loading state
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.setAttribute('data-original-text', originalText);
        }

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS is not loaded! Make sure you included the EmailJS script in your HTML');
            showNotification('Email service not loaded. Please refresh the page and try again.', 'error');
            resetButton();
            return;
        }

        // Prepare email data with detailed logging
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            reply_to: email
        };

        console.log('📨 Sending email with these parameters:', templateParams);
        console.log('🔧 Using Service ID: service_myzw6ij');
        console.log('🔧 Using Template ID: template_b90aveh');

        // FIXED: Use the modern EmailJS.send method
        emailjs.send('service_myzw6ij', 'template_b90aveh', templateParams)
            .then(function(response) {
                console.log('🎉 SUCCESS! Email sent successfully');
                console.log('📊 Response status:', response.status);
                console.log('📊 Response text:', response.text);
                
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();

                // Reset form labels
                const labels = contactForm.querySelectorAll('label');
                labels.forEach(label => {
                    if (label.style) {
                        label.style.top = '1rem';
                        label.style.fontSize = '1rem';
                        label.style.color = 'var(--text-muted)';
                    }
                });

                // Remove data-filled attributes
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.removeAttribute('data-filled');
                });
            })
            .catch(function(error) {
                console.error('❌ EmailJS FAILED with error:', error);
                
                // More specific error messages
                let errorMessage = 'Failed to send message. ';
                
                if (error.status === 400) {
                    errorMessage += 'Please check your form data.';
                    console.error('💡 Suggestion: Check if all template variables match your EmailJS template');
                } else if (error.status === 401) {
                    errorMessage += 'Please check EmailJS configuration.';
                    console.error('💡 Suggestion: Verify your public key, service ID, and template ID');
                } else if (error.status === 404) {
                    errorMessage += 'Service or template not found.';
                    console.error('💡 Suggestion: Check your service ID and template ID in EmailJS dashboard');
                } else if (error.status === 418) {
                    errorMessage += 'Please update your EmailJS script version.';
                    console.error('💡 Suggestion: You\'re using an outdated EmailJS version');
                } else if (error.status === 429) {
                    errorMessage += 'Too many requests. Please try again later.';
                } else {
                    errorMessage += 'Please try again or contact me directly.';
                }
                
                console.error('🔍 Debug info:');
                console.error('- Error Status:', error.status);
                console.error('- Error Text:', error.text);
                
                showNotification(errorMessage, 'error');
            })
            .finally(function() {
                resetButton();
            });

        function resetButton() {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                const originalText = submitBtn.getAttribute('data-original-text');
                submitBtn.textContent = originalText || 'Send Message';
            }
        }
    });

    // Form validation and styling
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.setAttribute('data-filled', 'true');
            } else {
                this.removeAttribute('data-filled');
            }
        });

        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.setAttribute('data-filled', 'true');
            }
        });
    });

    console.log('✅ Contact form setup completed');
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Indicator
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator when scrolling
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Button Ripple Effect
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add ripple if it's a link with href
            if (this.href && this.href.includes('#')) {
                return;
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Project card hover effects
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Tech item hover effects
function setupTechItems() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add ripple CSS
const rippleCSS = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        color: var(--primary-neon);
    }
`;

// Add ripple styles to head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-related updates here if needed
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text, .hero-image');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Theme detection and handling
function detectTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for theme changes
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });
    
    // Set initial theme
    if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Initialize theme detection
detectTheme();

// IMPORTANT: Update your HTML to use the latest EmailJS script
console.log(`
🚀 CRITICAL: Update Your HTML Script Tag!

❌ REMOVE this old script from your HTML:
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

✅ ADD this new script to your HTML <head>:
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

📧 EmailJS Configuration:
✅ Public Key: HCAYh5sJrMQB4ULIX
✅ Service ID: service_myzw6ij
✅ Template ID: template_b90aveh

🔧 What was fixed:
- Updated EmailJS initialization method
- Fixed SDK version compatibility  
- Enhanced error handling
- Modern EmailJS API usage

Your contact form will work after updating the HTML script tag! 🎉
`);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setupNavigation,
        setupParticles,
        setupTypingAnimation,
        setupScrollAnimations,
        setupContactForm
    };
}
