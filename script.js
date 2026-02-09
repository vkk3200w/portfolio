document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // Theme Toggle (Dark/Light Mode)
    // ------------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    const updateThemeIcon = (isDark) => {
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon(false);
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon(true);
        }
    });

    // ------------------------------------------------------------------
    // Mobile Navigation
    // ------------------------------------------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon between hamburger and close
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-times');
        } else {
            mobileIcon.classList.remove('fa-times');
            mobileIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileIcon.classList.remove('fa-times');
                mobileIcon.classList.add('fa-bars');
            }
        });
    });

    // ------------------------------------------------------------------
    // Smooth Scrolling (Polyfill-like behavior for older browsers/Safari)
    // ------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty links
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ------------------------------------------------------------------
    // Contact Form Handling
    // ------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple client-side validation logic
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // In a real app, this would send data to a server
            console.log('Form Submitted:', { name, email, message });
            
            // Show success message (Simulated)
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = 'var(--secondary-color)';
            submitBtn.disabled = true;
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // ------------------------------------------------------------------
    // Scroll Animation (Fade in elements on scroll)
    // ------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Initial fade-in style injection
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Add fade-in class to major sections
    document.querySelectorAll('section, .project-card').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});
