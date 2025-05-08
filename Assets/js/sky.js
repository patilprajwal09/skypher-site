// add current date in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
// Mobile menu toggle
const toggleButton = document.querySelector('button.md\\:hidden');
const mobileMenu = document.querySelector('#mobilemenu');

toggleButton.addEventListener('click', function () {
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.md\\:hidden.hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Scroll animation
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = function () {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Check on initial load
window.addEventListener('load', fadeInOnScroll);

// Check on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Add active class on nav link click
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});