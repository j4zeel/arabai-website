// Main functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    initForms();
    
    // Service cards
    initServiceCards();
    
    // Testimonials slider
    initTestimonials();
    
    // FAQ accordion
    initFAQ();
    
    // Contact validation
    initContactValidation();
    
    // Page-specific functionality
    initPageSpecific();
});

function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // For Vercel, you can use Formspree or Netlify Forms
                // For now, simulate success
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                this.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent!</h3>
                        <p>We'll contact you within 2 hours. Check your email and WhatsApp.</p>
                        <a href="https://wa.me/971547706679" target="_blank" class="btn-primary">
                            <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                        </a>
                    </div>
                `;
                
            } catch (error) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                alert('Error sending message. Please try WhatsApp directly.');
            }
        });
    });
}

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add visual feedback
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
        });
        
        // Add reveal animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
    });
}

function initTestimonials() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (!testimonialSlider) return;
    
    let currentIndex = 0;
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const total = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    // Auto rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % total;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Manual controls
    const prevBtn = testimonialSlider.querySelector('.prev-btn');
    const nextBtn = testimonialSlider.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + total) % total;
            showTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % total;
            showTestimonial(currentIndex);
        });
    }
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            const isActive = item.classList.contains('active');
            item.classList.toggle('active');
            
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
}

function initContactValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
                this.classList.remove('valid');
            } else {
                this.classList.remove('error');
                this.classList.add('valid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                this.classList.add('valid');
            }
        });
    });
}

function initPageSpecific() {
    const currentPage = window.location.pathname;
    
    // Homepage specific
    if (currentPage === '/' || currentPage.includes('index')) {
        initHomepageFeatures();
    }
    
    // Services page specific
    if (currentPage.includes('services')) {
        initServicesPage();
    }
    
    // Contact page specific
    if (currentPage.includes('contact')) {
        initContactPage();
    }
}

function initHomepageFeatures() {
    // Add any homepage-specific functionality
    console.log('Homepage features initialized');
}

function initServicesPage() {
    // Service tabs
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Update active tab
            serviceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            serviceContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });
}

function initContactPage() {
    // Map integration placeholder
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // You can integrate Google Maps here
        mapElement.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-map-marker-alt"></i>
                <p>Location: Dubai, UAE</p>
                <small>Map integration available with Google Maps API</small>
            </div>
        `;
    }
    
    // Contact method switching
    const contactMethods = document.querySelectorAll('.contact-method-btn');
    const contactForms = document.querySelectorAll('.contact-form-section');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Update active method
            contactMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show target form
            contactForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === target) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// Utility function to debounce events
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

// Resize handler
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    console.log('Window resized');
}, 250));

// Online/offline detection
window.addEventListener('online', function() {
    showNotification('You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showNotification('You are offline. Some features may not work.', 'warning');
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
