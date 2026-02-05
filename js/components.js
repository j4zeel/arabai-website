// Load all components dynamically
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
});

async function loadComponents() {
    try {
        // Load head content
        const headResponse = await fetch('/components/head.html');
        const headHTML = await headResponse.text();
        document.head.innerHTML += headHTML;
        
        // Load navbar
        const navbarResponse = await fetch('/components/navbar.html');
        const navbarHTML = await navbarResponse.text();
        document.getElementById('navbar-container').innerHTML = navbarHTML;
        
        // Load footer
        const footerResponse = await fetch('/components/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-container').innerHTML = footerHTML;
        
        // Load WhatsApp button
        const whatsappResponse = await fetch('/components/whatsapp-button.html');
        const whatsappHTML = await whatsappResponse.text();
        document.getElementById('whatsapp-container').innerHTML = whatsappHTML;
        
        // Initialize mobile menu after loading
        initMobileMenu();
        
        // Initialize back to top button
        initBackToTop();
        
        console.log('All components loaded successfully');
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Handle active nav links
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if ((currentPage === 'index.html' && href === '/') || 
            (href && href.includes(currentPage))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call after components are loaded
setTimeout(setActiveNavLink, 100);
