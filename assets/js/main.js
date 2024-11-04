document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = menuToggle.querySelector('.material-icons');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            // Toggle between menu and close icons
            menuIcon.textContent = menuIcon.textContent === 'menu' ? 'close' : 'menu';
        });
    }

    // Close menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuIcon.textContent = 'menu';
        });
    });

    // Add initial fade-in effect
    document.body.classList.remove('preload');
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }

    // Add scroll animation
    const animateElements = document.querySelectorAll('.project-hero, .intro-text, .challenge-solution, .design-approach, .section, .web-section, .more-projects, .contact, .about-content, .experience-row, .award-row');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, observerOptions);

    // Add animation classes and start observing elements
    animateElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.classList.add(`delay-${(index % 4) + 1}`);
        observer.observe(element);
    });
}); 