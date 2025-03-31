document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Dashboard tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const dashboardContainers = document.querySelectorAll('.dashboard-container');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and containers
            tabBtns.forEach(btn => btn.classList.remove('active'));
            dashboardContainers.forEach(container => container.classList.remove('active'));
            
            // Add active class to clicked button and corresponding container
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .btn-primary');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            const targetId = this.getAttribute('href');
            if(targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update active state in navigation
                    document.querySelectorAll('nav a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    document.querySelectorAll(`nav a[href="${targetId}"]`).forEach(navLink => {
                        navLink.classList.add('active');
                    });
                }
            }
        });
    });
    
    // Update active menu item on scroll
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            if(section.offsetTop <= scrollPosition && 
               section.offsetTop + section.offsetHeight > scrollPosition) {
                
                const currentId = section.getAttribute('id');
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if(navLink.getAttribute('href') === `#${currentId}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const statsSection = document.querySelector('.stats-banner');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const interval = Math.floor(duration / target);
                
                const counter = setInterval(() => {
                    count += 1;
                    stat.textContent = count;
                    
                    if (count >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    }
                }, interval);
            });
            
            animated = true;
        }
    }
    
    // Check for animation on scroll
    window.addEventListener('scroll', animateStats);
    // Check on page load too
    animateStats();
    
    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.insight-card, .feature, .step, .principle');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                if (!element.classList.contains('animate__animated')) {
                    element.classList.add('animate__animated', 'animate__fadeInUp');
                }
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
}); 