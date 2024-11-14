document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = menuToggle.querySelector('.material-icons');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.toggle('active');
            const menuIcon = menuToggle.querySelector('.material-icons');
            menuIcon.textContent = menuIcon.textContent === 'menu' ? 'close' : 'menu';
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileNav.classList.remove('active');
            menuToggle.querySelector('.material-icons').textContent = 'menu';
        }
    });

    // Close mobile nav when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuToggle.querySelector('.material-icons').textContent = 'menu';
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

    // Initialize both carousels with their respective image sets
    initCarousel('designSystemCarousel', 'challenge-1');
    initCarousel('largeParcelCarousel', 'challenge-2');

    // Initialize feature cards interaction
    initFeatureCards();

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to the clicked button and corresponding panel
            this.classList.add('active');
            const panelId = this.getAttribute('aria-controls');
            document.getElementById(panelId).classList.add('active');
        });
    });
});

function initCarousel(carouselId, challengeFolder) {
    const carousel = document.getElementById(carouselId);
    const images = [
        `assets/img/serviceapp/${challengeFolder}/screen-1.png`,
        `assets/img/serviceapp/${challengeFolder}/screen-2.png`,
        `assets/img/serviceapp/${challengeFolder}/screen-3.png`,
        `assets/img/serviceapp/${challengeFolder}/screen-4.png`,
        `assets/img/serviceapp/${challengeFolder}/screen-5.png`,
        `assets/img/serviceapp/${challengeFolder}/screen-6.png`
    ];
    const screenItems = carousel.querySelectorAll('.screen-item img');
    const prevBtn = carousel.closest('.challenge-screens').querySelector('.prev');
    const nextBtn = carousel.closest('.challenge-screens').querySelector('.next');
    let startIndex = 0;

    // Initialize first three images
    function updateImages() {
        screenItems.forEach((img, i) => {
            const imageIndex = (startIndex + i) % images.length;
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = images[imageIndex];
                img.style.opacity = '1';
            }, 150);
        });
    }

    // Previous button click
    prevBtn.addEventListener('click', () => {
        startIndex = (startIndex - 1 + images.length) % images.length;
        updateImages();
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        startIndex = (startIndex + 1) % images.length;
        updateImages();
    });

    // Initial setup
    updateImages();
}

function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    const featureShowcase = document.querySelector('.feature-showcase');
    
    // Figma prototype URLs for each feature
    const featureUrls = {
        'MY TRIP': 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/1MVOO5CTno7yiQZ3fEjcbO/Service-App-(Copy)?page-id=0%3A1&node-id=1311-32965&node-type=frame&viewport=2039%2C325%2C0.31&t=HB0Je8xGZGt5EssO-1&scaling=min-zoom&content-scaling=responsive&starting-point-node-id=1311%3A32965',
        'OPEN JOB': 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/1MVOO5CTno7yiQZ3fEjcbO/Service-App-(Copy)?page-id=144%3A32657&node-id=144-34056&node-type=frame&viewport=1393%2C103%2C0.19&t=qmnB2bzmklO9aOpW-1&scaling=min-zoom&content-scaling=fixed',
        'LARGE PARCEL': 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/1MVOO5CTno7yiQZ3fEjcbO/Service-App-(Copy)?page-id=1220%3A35291&node-id=1320-117005&node-type=frame&viewport=4393%2C-296%2C0.19&t=t23QZ69TdbBpClYm-1&scaling=min-zoom&content-scaling=fixed'
    };

    // Set initial prototype (MY TRIP)
    const iframe = featureShowcase.querySelector('iframe');
    iframe.src = featureUrls['MY TRIP'];

    // Show only first feature card initially
    featureCards.forEach((card, index) => {
        if (index !== 0) {
            card.classList.remove('blue');
            card.classList.add('white');
        }
    });

    // Add click event to each feature card
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            // Update active state of cards
            featureCards.forEach(c => {
                c.classList.remove('blue');
                c.classList.add('white');
            });
            card.classList.remove('white');
            card.classList.add('blue');

            // Update iframe source based on the clicked feature
            const featureTitle = card.querySelector('h3').textContent;
            if (featureUrls[featureTitle]) {
                iframe.src = featureUrls[featureTitle];
            }
        });
    });
}

// Add these styles to make the mobile nav work properly
const style = document.createElement('style');
style.textContent = `
    .mobile-nav {
        display: none;
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        z-index: 1000;
    }

    .mobile-nav.active {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .mobile-nav a {
        color: #333;
        text-decoration: none;
        font-size: 18px;
        padding: 10px 0;
    }

    @media (min-width: 768px) {
        .menu-toggle {
            display: none;
        }
        
        .mobile-nav {
            display: none !important;
        }
    }
`;
document.head.appendChild(style); 


