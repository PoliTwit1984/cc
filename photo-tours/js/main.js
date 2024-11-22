// Intersection Observer for feature cards animation
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
};

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                form.reset();
                alert('Thank you for your interest! We\'ll be in touch soon.');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Oops! Something went wrong. Please try again later.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Performance optimization for background image
const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    preloadImage('../images/hero-bg.jpg');
});

// Add scroll-based parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});
