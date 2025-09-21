document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark Mode Toggle
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    // Check localStorage for theme preference
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

    // Intersection Observer for fade-in animations on scroll
    const animateOnScroll = (elements, threshold = 0.2) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: threshold });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Apply animations to sections and elements
    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });
    animateOnScroll(sections);

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`; // Stagger delay
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    animateOnScroll(skillItems);

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`; // Stagger delay
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    });
    animateOnScroll(projectCards);

    // Dynamic header background on scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = body.classList.contains('dark-mode') ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'var(--bg-light)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Form submission (basic example, actual submission would need a backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! (This is a demo, form not actually submitted.)');
            // In a real application, you would send this data to a server
            this.reset();
        });
    }

    // Text typing effect for the hero tagline
    const taglineElement = document.querySelector('.hero-content .tagline');
    const taglines = ["A Passionate Web Developer", "Creating Engaging Experiences", "Building Modern Websites", "Innovative Problem Solver"];
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTagline = taglines[taglineIndex];
        if (isDeleting) {
            taglineElement.textContent = currentTagline.substring(0, charIndex - 1);
            charIndex--;
        } else {
            taglineElement.textContent = currentTagline.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTagline.length) {
            typingSpeed = 1500; // Pause at end of typing
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typingSpeed = 200; // Pause at end of deleting
        } else {
            typingSpeed = isDeleting ? 70 : 100;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start type effect after initial hero animations
    setTimeout(() => {
        if (taglineElement) {
            typeEffect();
        }
    }, 2000);

    // Back to Top Button
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

    // Unique Particle Effect in Hero (simple vanilla JS particles)
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size <= 0.2) {
                particles.splice(index, 1);
                particles.push(new Particle());
            }
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});