// mobile menu toggle
let isMenuOpen = false;

function toggleMobileMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

(function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu(e);
    }, { passive: false });

    hamburger.addEventListener('touchend', function (e) {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    hamburger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu(e);
    });

    // close menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
})();

// smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        }
    });
});

// highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
});

// fade in elements as they scroll into view
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.project-card, .skill-badge, .contact-method, .learning-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
});

// timeline items fade in one by one
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, i * 150);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-16px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    timelineObserver.observe(item);
});