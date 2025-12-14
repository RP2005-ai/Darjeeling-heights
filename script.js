// Load configuration
let config = {};

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        populateContent();
    } catch (error) {
        console.error('Error loading config:', error);
        alert('Could not load configuration file. Make sure config.json is in the same directory.');
    }
}

function populateContent() {
    // Page title
    document.getElementById('page-title').textContent = `${config.site.name} | ${config.site.tagline}`;
    
    // Header
    document.getElementById('site-logo').textContent = config.site.name;
    
    // Navigation
    const nav = document.getElementById('navigation');
    nav.innerHTML = config.navigation.map(item => 
        `<li><a href="${item.href}">${item.label}</a></li>`
    ).join('');
    
    // Hero
    document.getElementById('hero-title').textContent = config.hero.title;
    document.getElementById('hero-subtitle').textContent = config.hero.subtitle;
    document.querySelector('.hero').style.backgroundImage = 
        `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${config.hero.backgroundImage}')`;
    
    // Description
    document.getElementById('desc-title').textContent = config.site.description;
    document.getElementById('desc-text').textContent = config.site.longDescription;
    
    // Carousel
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = config.carousel.map(item => `
        <div class="feature-card" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.image}') center/cover;">
            <div class="feature-content">
                <h3>${item.category}</h3>
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
    
    // Carousel dots
    const dots = document.getElementById('carousel-dots');
    dots.innerHTML = config.carousel.map((_, index) => 
        `<span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>`
    ).join('');
    
    // Rooms
    document.getElementById('rooms-title').textContent = config.rooms.title;
    document.getElementById('rooms-subtitle').textContent = config.rooms.subtitle;
    
    const roomsGrid = document.getElementById('rooms-grid');
    roomsGrid.innerHTML = config.rooms.items.map(room => `
        <div class="room-card">
            <div class="room-image" style="background-image: url('${room.image}')"></div>
            <div class="room-info">
                <span class="room-category">${room.category}</span>
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                <div class="room-details">
                    <span>${room.size}</span>
                    <span>•</span>
                    <span>${room.bed}</span>
                    <span>•</span>
                    <span>${room.feature}</span>
                </div>
                <a href="#" class="room-link">Explore Suite →</a>
            </div>
        </div>
    `).join('');
    
    // Features Grid
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = config.features.map(feature => `
        <div class="grid-item">
            <img src="${feature.image}" alt="${feature.title}">
            <div class="grid-overlay">
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        </div>
    `).join('');
    
    // Experiences
    document.getElementById('exp-title').textContent = config.experiences.title;
    document.getElementById('exp-subtitle').textContent = config.experiences.subtitle;
    
    const expContainer = document.getElementById('experiences-container');
    expContainer.innerHTML = config.experiences.items.map(exp => `
        <div class="experience-card">
            <img src="${exp.image}" alt="${exp.title}">
            <div class="experience-content">
                <h3>${exp.title}</h3>
                <p>${exp.description}</p>
            </div>
        </div>
    `).join('');
    
    // Location
    document.getElementById('loc-title').textContent = config.location.title;
    document.getElementById('loc-desc1').textContent = config.location.description1;
    document.getElementById('loc-desc2').textContent = config.location.description2;
    
    const distances = document.getElementById('loc-distances');
    distances.innerHTML = config.location.distances.map(dist => 
        `<p><strong>${dist.place}:</strong> ${dist.distance}</p>`
    ).join('');
    
    document.getElementById('loc-image').style.backgroundImage = `url('${config.location.image}')`;
    document.getElementById('footer-map').src = config.location.mapEmbedUrl;
    
    // Footer
    const address = document.getElementById('footer-address');
    address.innerHTML = `<p>${config.contact.address.line1}<br>${config.contact.address.line2}<br>${config.contact.address.line3}</p>`;
    
    const contact = document.getElementById('footer-contact');
    contact.innerHTML = `<p style="margin-top: 20px;">${config.contact.phone}<br>${config.contact.email}</p>`;
    
    const quickLinks = document.getElementById('footer-quick-links');
    quickLinks.innerHTML = config.footer.quickLinks.map(link => 
        `<a href="${link.href}">${link.label}</a>`
    ).join('');
    
    const policies = document.getElementById('footer-policies');
    policies.innerHTML = config.footer.policies.map(link => 
        `<a href="${link.href}">${link.label}</a>`
    ).join('');
    
    document.getElementById('footer-newsletter-title').textContent = config.footer.newsletter.title;
    document.getElementById('footer-newsletter-desc').textContent = config.footer.newsletter.description;
    document.getElementById('footer-copyright').textContent = config.footer.copyright;
    
    // Initialize carousel after content is loaded
    initCarousel();
    initScrollAnimations();
}

function initCarousel() {
    const carousel = document.getElementById('carousel');
    const dots = document.querySelectorAll('.dot');
    let autoScrollInterval;
    let isHovering = false;
    
    function autoScroll() {
        if (!isHovering) {
            const slideWidth = carousel.offsetWidth;
            const maxScroll = carousel.scrollWidth - slideWidth;
            let currentScroll = carousel.scrollLeft;
            
            currentScroll += slideWidth;
            
            if (currentScroll > maxScroll) {
                currentScroll = 0;
            }
            
            carousel.scrollTo({
                left: currentScroll,
                behavior: 'smooth'
            });
        }
    }
    
    autoScrollInterval = setInterval(autoScroll, 4000);
    
    carousel.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
    });
    
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const slideWidth = carousel.offsetWidth;
        const currentSlide = Math.round(scrollLeft / slideWidth);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const slideWidth = carousel.offsetWidth;
            carousel.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
        });
    });
}

function initScrollAnimations() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.description, .grid-item, .experience-card, .location-content, .feature-content, .footer-content, .room-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Load configuration on page load
loadConfig();
