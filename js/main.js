// Main JavaScript for Arab AI Agency

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('animate__slideInDown');
        });
    }
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.remove('opacity-0', 'invisible');
            backToTop.classList.add('opacity-100', 'visible');
        } else {
            backToTop.classList.remove('opacity-100', 'visible');
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('shadow-lg');
            navbar.style.backdropFilter = 'blur(8px)';
        } else if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.classList.add('shadow-lg');
            navbar.style.backdropFilter = 'blur(12px)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========== ANIMATED COUNTERS ==========
    function animateCounter(id, start, end, duration) {
        const element = document.getElementById(id);
        if (!element) return;
        
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (id.includes('percent')) {
                element.textContent = value + '%';
            } else {
                element.textContent = value.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        // Only animate when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.requestAnimationFrame(step);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    }
    
    // Initialize counters
    animateCounter('counter-clients', 0, 127, 2000);
    animateCounter('counter-success', 0, 98, 2000);
    animateCounter('counter-leads', 0, 156, 2000);
    
    // ========== FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call - Replace with actual Formspree/Netlify
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                contactForm.innerHTML = `
                    <div class="text-center py-12" data-aos="zoom-in">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-check text-green-600 text-3xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                        <p class="text-gray-600 mb-6">We'll contact you within 2 hours. Check your email and WhatsApp.</p>
                        <a href="https://wa.me/971501234567" target="_blank" 
                           class="bg-green-500 text-white px-6 py-3 rounded-full font-medium inline-flex items-center hover:bg-green-600 transition">
                            <i class="fab fa-whatsapp mr-2"></i> Chat Now on WhatsApp
                        </a>
                    </div>
                `;
                
            } catch (error) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                alert('Error sending message. Please try WhatsApp directly.');
            }
        });
    }
    
    // ========== GSAP ANIMATIONS ==========
    if (typeof gsap !== 'undefined') {
        // Animate hero elements
        gsap.from('.hero-title', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-cta', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            delay: 0.6,
            ease: 'back.out(1.7)'
        });
        
        // Scroll-triggered animations
        gsap.utils.toArray('.gsap-fade-up').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        // Parallax effect
        gsap.to('.parallax-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // ========== INTERACTIVE FEATURES ==========
    
    // Hover effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-2xl', 'transform', '-translate-y-2');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-2xl', 'transform', '-translate-y-2');
        });
    });
    
    // Toggle FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // ========== REAL-TIME VISITOR COUNTER ==========
    function updateVisitorCounter() {
        const counter = document.getElementById('visitor-counter');
        if (counter) {
            // Simulate random visitor count
            const baseVisitors = 1247;
            const randomVisitors = Math.floor(Math.random() * 50);
            counter.textContent = (baseVisitors + randomVisitors).toLocaleString();
        }
    }
    
    // Update every 30 seconds
    setInterval(updateVisitorCounter, 30000);
    updateVisitorCounter();
    
    // ========== TYPING EFFECT ==========
    function typeWriterEffect() {
        const elements = document.querySelectorAll('.typewriter');
        elements.forEach(element => {
            const text = element.getAttribute('data-text') || element.textContent;
            element.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                }
            }
            
            // Start typing when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        type();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        });
    }
    
    typeWriterEffect();
    
    // ========== PARTICLE BACKGROUND ==========
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 20 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                background: rgba(251, 197, 49, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                position: absolute;
                animation: float ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ========== THEME TOGGLE (Dark/Light) ==========
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            const icon = this.querySelector('i');
            
            if (document.documentElement.classList.contains('dark')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }
    }
});
