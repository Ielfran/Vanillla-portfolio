document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Theme Toggle
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = sunIcon;
    } else {
        themeToggleBtn.innerHTML = moonIcon;
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.innerHTML = sunIcon;
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.innerHTML = moonIcon;
            localStorage.setItem('theme', 'light');
        }
    });

    // Intersection Observer for animations
    const animateOnScroll = (elements, threshold = 0.1) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    if (entry.target.classList.contains('skill-item')) {
                        entry.target.classList.add('animate');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Animate sections
    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    animateOnScroll(sections);

    // Animate skills
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
    });
    animateOnScroll(skillItems);

    // Animate projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
    });
    animateOnScroll(projectCards);

    // Back to Top
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! (This is a demo, form not actually submitted.)');
            this.reset();
        });
    }

    // Tagline typing effect
    const taglineElement = document.querySelector('.hero-content .tagline');
    const taglines = ["Creative Technologist", "Web Experience Architect", "Code & Design Enthusiast"];
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentTagline = taglines[taglineIndex];
        taglineElement.textContent = currentTagline.substring(0, charIndex);
        if (!isDeleting) {
            charIndex++;
            if (charIndex > currentTagline.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                taglineIndex = (taglineIndex + 1) % taglines.length;
            }
        }
        requestAnimationFrame(typeEffect);
    }

    setTimeout(typeEffect, 1500);
});