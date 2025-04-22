function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Function to trigger animation when element is visible
function observeAndAnimate(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const endvalue = parseInt(el.getAttribute('data-value'), 10);
            animateValue(el, 0, endvalue, 2000);
            observer.unobserve(el); // Stop observing once animation starts
        }
    });
}

// Set up Intersection Observer
const observer = new IntersectionObserver(observeAndAnimate, {
    threshold: 0.5, // Trigger when 50% of the element is visible
});

// Get all elements with the class name "incr-value"
const elements = document.querySelectorAll('.incr-value');

// Observe each element
elements.forEach((el) => {
    observer.observe(el);
});


document.addEventListener("DOMContentLoaded", () => {
    const animatedSections = document.querySelectorAll('.animate-section');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(entry.target.classList)
                    entry.target.classList.remove('hidden'); // Remove the hidden class
                    // entry.target.classList.remove('animate__animated'); // Remove the hidden class

                    observer.unobserve(entry.target); // Stop observing once it's visible
                    entry.target.classList.add('animate__animated')
                    entry.target.classList.add('animate__slideInUp')
                }
            });
        },
        {
            threshold: 0.3, // Trigger when 10% of the element is visible
        }
    );

    animatedSections.forEach(section => observer.observe(section));
});
