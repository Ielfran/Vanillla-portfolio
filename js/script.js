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

    // Intersection Observer for fade-in animations on scroll
    const animateOnScroll = (elements, animationClass, threshold = 0.2) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add(animationClass); // Add a class for specific animations if needed
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
    animateOnScroll(skillItems, 'animate-skill-item');


    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`; // Stagger delay
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    });
    animateOnScroll(projectCards, 'animate-project-card');


    // Add a simple hover effect to the header nav links (CSS handles most of it, but JS can add classes)
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = 'var(--primary-color)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.color = 'var(--text-dark)';
            // Revert color only if not active, but for simplicity, let CSS handle the hover
        });
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

    // Dynamic header background on scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'var(--bg-light)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Text typing effect for the hero tagline (optional but cool)
    const taglineElement = document.querySelector('.hero-content .tagline');
    const taglines = ["A Passionate Web Developer", "Creating Engaging Experiences", "Building Modern Websites", "Problem Solver"];
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

    // Only start type effect after initial hero animations
    setTimeout(() => {
        if (taglineElement) {
            typeEffect();
        }
    }, 2000); // Start after 2 seconds
});