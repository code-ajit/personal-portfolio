// Function to update header style based on theme and scroll position
function updateHeaderStyle() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const isScrolled = window.scrollY > 50;
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDarkMode) {
        // Dark mode - always match the background color
        header.style.backgroundColor = 'rgba(10, 10, 24, 0.98)';
        header.style.boxShadow = isScrolled ? '0 4px 15px rgba(0, 0, 0, 0.3)' : 'none';
        
        // Update active navigation in dark mode
        navLinks.forEach(link => {
            if (link.classList.contains('active-link')) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '#e5e5e5';
            }
        });
    } else {
        // Light mode - conditional styling based on scroll
        if (isScrolled) {
            header.style.boxShadow = '0 4px 20px rgba(67, 97, 238, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
        
        // Update active navigation in light mode
        navLinks.forEach(link => {
            if (link.classList.contains('active-link')) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '#333333';
            }
        });
    }
    
    // Also update mobile nav color to match
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (mobileNav) {
        if (isDarkMode) {
            mobileNav.style.backgroundColor = 'rgba(10, 10, 24, 0.98)';
            
            // Update mobile links
            mobileNavLinks.forEach(link => {
                if (link.classList.contains('active')) {
                    link.style.color = 'var(--primary-color)';
                } else {
                    link.style.color = '#e5e5e5';
                }
            });
        } else {
            mobileNav.style.backgroundColor = isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.8)';
            
            // Update mobile links
            mobileNavLinks.forEach(link => {
                if (link.classList.contains('active')) {
                    link.style.color = 'var(--primary-color)';
                } else {
                    link.style.color = '#333333';
                }
            });
        }
    }
    
    // Update burger color
    const burgerSpans = document.querySelectorAll('.burger span');
    if (burgerSpans.length) {
        burgerSpans.forEach(span => {
            span.style.backgroundColor = isDarkMode ? '#e5e5e5' : '#333333';
        });
    }
}

// Function to update theme icon
function updateThemeIcon(theme, themeIcon) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Function to create color transition effect
function createColorTransition() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Save scroll position
    const scrollPos = window.scrollY;
    
    // Create transition overlay with animation
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'theme-transition-overlay';
    
    // Set initial position for the expanding circle effect
    const themeToggleButton = document.getElementById('theme-toggle');
    let startPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    if (themeToggleButton) {
        const rect = themeToggleButton.getBoundingClientRect();
        startPos.x = rect.left + rect.width / 2;
        startPos.y = rect.top + rect.height / 2;
    }
    
    // Set the starting point for the circle effect
    transitionOverlay.style.clipPath = `circle(0px at ${startPos.x}px ${startPos.y}px)`;
    
    // Set background based on target theme
    if (targetTheme === 'dark') {
        transitionOverlay.style.background = 'radial-gradient(circle, rgba(10, 10, 24, 1) 30%, rgba(20, 20, 40, 0.95) 70%)';
    } else {
        transitionOverlay.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 1) 30%, rgba(248, 249, 250, 0.95) 70%)';
    }
    
    document.body.appendChild(transitionOverlay);
    
    // Switch the theme immediately
    document.documentElement.setAttribute('data-theme', targetTheme);
    
    if (targetTheme === 'dark') {
        localStorage.setItem('theme', 'dark');
        document.querySelector('#theme-toggle i').className = 'fas fa-sun';
    } else {
        localStorage.setItem('theme', 'light');
        document.querySelector('#theme-toggle i').className = 'fas fa-moon';
    }
    
    // Update header style immediately
    updateHeaderStyle();
    updateNavbarColor(targetTheme);
    updateActiveLinks(); // Update active links for theme
    updateActiveNavLink(); // Ensure active links are updated
    
    // Trigger circle animation
    requestAnimationFrame(() => {
        transitionOverlay.style.clipPath = `circle(${Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2))}px at ${startPos.x}px ${startPos.y}px)`;
        transitionOverlay.style.opacity = '1';
        
        // Restore scroll position
        window.scrollTo(0, scrollPos);
        
        // Animate out the overlay (faster)
        setTimeout(() => {
            transitionOverlay.style.opacity = '0';
            
            // Remove the overlay after fade out
            setTimeout(() => {
                if (transitionOverlay.parentNode) {
                    transitionOverlay.parentNode.removeChild(transitionOverlay);
                }
            }, 400);
        }, 500);
    });
}

// Add this function to update the navbar color consistently
function updateNavbarColor(theme) {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const burgerSpans = document.querySelectorAll('.burger span');
    
    if (theme === 'dark') {
        // Dark theme navbar styling - match the background color
        header.style.backgroundColor = 'rgba(10, 10, 24, 0.98)';
        header.style.boxShadow = 'none'; // Remove box shadow to blend with background
        
        // Update mobile nav
        if (mobileNav) {
            mobileNav.style.backgroundColor = 'rgba(10, 10, 24, 0.98)';
            mobileNav.style.borderLeft = '1px solid rgba(76, 201, 240, 0.15)';
        }
        
        // Update burger menu
        burgerSpans.forEach(span => {
            span.style.backgroundColor = '#e5e5e5';
        });
        
        // Update desktop nav links
        navLinks.forEach(link => {
            if (link.classList.contains('active-link')) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '#e5e5e5';
            }
        });
        
        // Update mobile nav links
        mobileNavLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '#e5e5e5';
            }
        });
    } else {
        // Light theme navbar styling
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        
        // Update mobile nav
        if (mobileNav) {
            mobileNav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            mobileNav.style.borderLeft = '1px solid rgba(67, 97, 238, 0.1)';
        }
        
        // Update burger menu
        burgerSpans.forEach(span => {
            span.style.backgroundColor = '#333333';
        });
        
        // Update nav links
        navLinks.forEach(link => {
            if (link.classList.contains('active-link')) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '#333333';
            }
        });
        
        // Update mobile nav links
        mobileNavLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '#333333';
            }
        });
    }
}

// Function to preload assets for the target theme
function preloadThemeAssets(theme) {
    // Preload gradients and background images
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'style';
    preloadLink.href = theme === 'dark' 
        ? 'data:text/css;base64,' + btoa('body{background:#0a0a18}') 
        : 'data:text/css;base64,' + btoa('body{background:#ffffff}');
    document.head.appendChild(preloadLink);
    
    // Force browser to recalculate styles
    document.body.offsetHeight;
}

// Function to animate elements when theme changes
function animateElementsOnThemeChange() {
    // Get all animatable elements
    const elements = document.querySelectorAll('.skill-item, .project-card, .social-links a, .btn, .section-title, .logo, h1, h2, h3, p');
    
    // Create a staggered animation effect
    elements.forEach((el, index) => {
        // Set initial transition
        el.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        el.style.animationDelay = `${index * 0.03}s`;
        
        // First create a subtle scale down effect
        el.style.transform = 'scale(0.98)';
        el.style.opacity = '0.8';
        
        // Create a wave-like animation pattern based on element position
        setTimeout(() => {
            el.style.transform = '';
            el.style.opacity = '';
            
            // Add a subtle highlight effect for key elements
            if (el.classList.contains('skill-item') || 
                el.classList.contains('project-card') || 
                el.classList.contains('section-title')) {
                const highlight = document.createElement('div');
                highlight.style.position = 'absolute';
                highlight.style.top = '0';
                highlight.style.left = '0';
                highlight.style.width = '100%';
                highlight.style.height = '100%';
                highlight.style.borderRadius = window.getComputedStyle(el).borderRadius;
                highlight.style.background = 'radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2), transparent 70%)';
                highlight.style.opacity = '0';
                highlight.style.transition = 'opacity 0.8s ease';
                highlight.style.zIndex = '1';
                highlight.style.pointerEvents = 'none';
                
                // Make sure the element has position relative for absolute positioning of highlight
                if (window.getComputedStyle(el).position === 'static') {
                    el.style.position = 'relative';
                }
                
                el.appendChild(highlight);
                
                // Show and hide the highlight
                setTimeout(() => {
                    highlight.style.opacity = '1';
                    setTimeout(() => {
                        highlight.style.opacity = '0';
                        setTimeout(() => {
                            if (el.contains(highlight)) {
                                el.removeChild(highlight);
                            }
                        }, 800);
                    }, 600);
                }, 100);
            }
        }, 100 + (index % 5) * 50);
    });
    
    // Add a special effect for the logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        logo.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => {
            logo.style.transform = '';
        }, 700);
    }
}

// Function to check if element is in viewport with options for partial visibility
function isInViewport(element, offset = 0.2) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
        rect.top <= windowHeight * (1 - offset) &&
        rect.bottom >= windowHeight * offset
    );
}

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation class to body
    document.body.classList.add('loading');
    
    // Create and append loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'page-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner-circle"></div>
            <div class="loading-text">Loading<span class="loading-dots">...</span></div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Select elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const burgerMenu = document.getElementById('burger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('overlay');
    const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
    const allSections = document.querySelectorAll('section');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const pageTransition = document.querySelector('.page-transition');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeIcon) updateThemeIcon(savedTheme, themeIcon);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) updateThemeIcon('dark', themeIcon);
    }
    
    // Update header style immediately on page load
    updateHeaderStyle();
    updateNavbarColor(document.documentElement.getAttribute('data-theme') || 'light');
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Get current theme
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add a subtle animation to the toggle
            themeToggle.classList.add('theme-toggle-active');
            setTimeout(() => {
                themeToggle.classList.remove('theme-toggle-active');
            }, 300);
            
            // Update the theme icon immediately for better UX
            updateThemeIcon(newTheme, themeIcon);
            
            // Save theme preference to localStorage
            localStorage.setItem('theme', newTheme);
            
            // Create smooth color transition between themes
            createColorTransition();
        });
    }
    
    // Fixed mobile menu toggle functionality
    if (burgerMenu && mobileNav && overlay) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle active state
            burgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Toggle body class to prevent scrolling
            if (mobileNav.classList.contains('active')) {
                document.body.classList.add('nav-open');
            } else {
                document.body.classList.remove('nav-open');
            }
        });
        
        // Close mobile nav when clicking overlay
        overlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
        
        // Close mobile nav when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Get the target section
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Calculate offset for header height
                        const header = document.querySelector('header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        
                        // Scroll to target section
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetElement.offsetTop - headerHeight - 10,
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                }
                
                return false; // Prevent default
            });
        });
    }
    
    // Handle scroll progress indicator
    function updateScrollProgress() {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        
        if (scrollIndicator) {
            scrollIndicator.style.width = scrolled + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Enhanced Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just "#"
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return; // Skip if target doesn't exist
            
            // Add highlighting animation to the target
            const highlightElement = document.createElement('div');
            highlightElement.className = 'section-highlight';
            highlightElement.style.position = 'absolute';
            highlightElement.style.top = '0';
            highlightElement.style.left = '0';
            highlightElement.style.right = '0';
            highlightElement.style.bottom = '0';
            highlightElement.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)';
            highlightElement.style.pointerEvents = 'none';
            highlightElement.style.opacity = '0';
            highlightElement.style.zIndex = '-1';
            highlightElement.style.borderRadius = '8px';
            
            // Only add relative positioning if not already positioned
            const currentPosition = window.getComputedStyle(targetElement).position;
            if (currentPosition === 'static') {
                targetElement.style.position = 'relative';
            }
            
            targetElement.appendChild(highlightElement);
            
            // Mobile menu handling - close if open
            const mobileMenu = document.querySelector('.nav-links');
            const burgerMenu = document.querySelector('.burger-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            
            // Calculate offset for header height
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const offset = headerHeight + 20; // Add some extra padding
            
            // Scroll to target with smooth animation
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
            
            // Add highlight effect after scrolling
            setTimeout(() => {
                // Fade in highlight
                highlightElement.style.transition = 'opacity 0.5s ease-in-out';
                highlightElement.style.opacity = '1';
                
                // Then fade out
                setTimeout(() => {
                    highlightElement.style.opacity = '0';
                    
                    // Remove the highlight element after animation
                    setTimeout(() => {
                        if (highlightElement.parentNode) {
                            highlightElement.parentNode.removeChild(highlightElement);
                        }
                        
                        // Reset positioning if we changed it
                        if (currentPosition === 'static') {
                            targetElement.style.position = '';
                        }
                    }, 500);
                }, 800);
            }, 600);
        });
    });
    
    // Header Scroll Effect & Active Link Updates
    window.addEventListener('scroll', function() {
        updateHeaderStyle();
        updateActiveNavLink();
    });
    
    // Function to update active navigation link based on scroll position
    function updateActiveNavLink() {
        let scrollPosition = window.scrollY + 150; // Offset to trigger slightly before reaching section
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Set active link for each section in view
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if section is in viewport
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active classes from all links
                document.querySelectorAll('.nav-links li a, .mobile-nav a').forEach(link => {
                    link.classList.remove('active-link', 'active');
                    link.style.color = isDarkMode ? '#e5e5e5' : '#333333';
                });
                
                // Add active class to corresponding links
                document.querySelectorAll(`.nav-links li a[href="#${sectionId}"], .mobile-nav a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add(link.closest('.mobile-nav') ? 'active' : 'active-link');
                    link.style.color = 'var(--primary-color)';
                });
            }
        });
        
        // If at the top of the page, activate Home link
        if (scrollPosition < 200) {
            document.querySelectorAll('.nav-links li a, .mobile-nav a').forEach(link => {
                link.classList.remove('active-link', 'active');
                link.style.color = isDarkMode ? '#e5e5e5' : '#333333';
                
                if (link.getAttribute('href') === '#home') {
                    link.classList.add(link.closest('.mobile-nav') ? 'active' : 'active-link');
                    link.style.color = 'var(--primary-color)';
                }
            });
        }
    }
    
    // Project Card Animation
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const info = this.querySelector('.project-info');
            if (info) {
                info.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const info = this.querySelector('.project-info');
            if (info) {
                info.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation example
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill out all fields');
            }
        });
    }
    
    // Enhanced scroll animation for section elements
    // Check element visibility on scroll
    function checkVisibility() {
        allSections.forEach(section => {
            if (isInViewport(section, 0.15)) { // Show when 15% of section is in view
                section.classList.add('visible');
                // Add staggered animation for child elements
                const animatedChildren = section.querySelectorAll('.animate-on-scroll');
                animatedChildren.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }
    
    // Animate skill progress bars when they come into view
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            if (isInViewport(item, 0.1)) { // 10% threshold
                const progressBar = item.querySelector('.progress');
                if (progressBar && !progressBar.classList.contains('animated')) {
                    const targetWidth = progressBar.getAttribute('data-width') || progressBar.style.width || '0%';
                    progressBar.classList.add('animated');
                    progressBar.style.width = '0%';
                    
                    // Force reflow to ensure the zero width is applied before animation
                    progressBar.offsetWidth;
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 50);
                }
            }
        });
    }
    
    // Add enhanced animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .skill-item .progress.animated {
            transition: width 1.5s cubic-bezier(0.1, 0.5, 0.1, 1);
        }
        
        /* Hover glow effect for button */
        .btn:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: -1;
        }
        
        .btn:hover:after {
            opacity: 0.4;
        }
        
        /* Scroll highlight effect */
        .scroll-highlight {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1), transparent 70%);
            pointer-events: none;
            z-index: -1;
            animation: pulse 1.5s ease-out;
            opacity: 0;
        }
        
        @keyframes pulse {
            0% { opacity: 0; transform: scale(0.95); }
            50% { opacity: 0.5; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.05); }
        }
        
        /* Section animations */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .no-scroll {
            overflow: hidden;
        }
    `;
    
    document.head.appendChild(style);
    
    // Initial check on page load
    checkVisibility();
    animateSkills();
    updateActiveNavLink();
    
    // Use requestAnimationFrame for smoother scrolling effects
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkVisibility();
                animateSkills();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY;
            if (scrollPos < window.innerHeight) {
                const translateY = scrollPos * 0.3;
                heroSection.style.backgroundPositionY = translateY + 'px';
                
                // Subtle parallax for hero content
                const heroContent = heroSection.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${translateY * 0.15}px)`;
                }
            }
        });
    }
    
    // Add animation classes to existing elements
    document.querySelectorAll('.hero-text h1, .hero-text h2, .hero-text p, .cta-buttons').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    document.querySelectorAll('.section-title, .skill-category h3, .about-text h3').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Update active links for both desktop and mobile
    function updateActiveLinks() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update desktop nav
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-link');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = isDarkMode ? '#e5e5e5' : '#333333';
            }
        });
        
        // Update mobile nav
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = isDarkMode ? '#e5e5e5' : '#333333';
            }
        });
    }
    
    // Add resize handler for responsive behavior
    function handleResponsiveLayout() {
        // Check if we need to reset mobile nav state on larger screens
        if (window.innerWidth > 991 && mobileNav && mobileNav.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
        
        // Update the header style based on new screen size
        updateHeaderStyle();
        
        // Force update for active links
        updateActiveLinks();
    }
    
    // Event listeners
    window.addEventListener('scroll', updateActiveLinks);
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Initialize
    updateActiveLinks();
    handleResponsiveLayout();
    
    // Add function to fix mobile menu rendering issues
    function fixMobileMenuRendering() {
        const mobileNav = document.getElementById('mobile-nav');
        const burger = document.getElementById('burger-menu');
        
        if (!mobileNav || !burger) return;
        
        // Initialize proper state
        if (window.innerWidth <= 991) {
            mobileNav.style.display = 'flex';
            burger.style.display = 'block';
        } else {
            burger.style.display = 'none';
        }
        
        // Handle resize events to ensure proper display
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 991) {
                mobileNav.style.display = 'flex';
                burger.style.display = 'block';
            } else {
                burger.style.display = 'none';
                // Reset mobile menu state
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    burger.classList.remove('active');
                    document.querySelector('.overlay').classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }
        });
    }
    
    // Call the function on page load
    fixMobileMenuRendering();
});

// Add this function to optimize performance for animations
function optimizePerformance() {
    // Add will-change hints to elements that will animate
    const animatedElements = document.querySelectorAll(
        '.hero-content, .about-content, .project-card, .skill-item, ' +
        '.contact-form, .section-title, .progress-bar, header'
    );
    
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
        
        // Remove will-change after animations to free up resources
        setTimeout(() => {
            el.style.willChange = 'auto';
        }, 2000); // After most animations should be complete
    });
    
    // Add hardware acceleration for smoother scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enable passive event listeners for better scroll performance
    const supportsPassive = (() => {
        let passive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    passive = true;
                    return true;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        return passive;
    })();
    
    if (supportsPassive) {
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function() {}, { passive: true });
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        window.clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Perform less critical scroll operations here
        }, 100);
    }, supportsPassive ? { passive: true } : false);
}

// Call the performance optimization function after the page loads
window.addEventListener('load', function() {
    // Get the loading overlay
    const loadingOverlay = document.querySelector('.page-loading-overlay');
    
    // Only proceed if overlay exists
    if (loadingOverlay) {
        // First fade out the loading spinner
        const loadingSpinner = loadingOverlay.querySelector('.loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.opacity = '0';
        }
        
        // Run performance optimizations
        optimizePerformance();
        
        // Slightly delay the full overlay fade out
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            
            // Apply progressive reveal animations to main sections
            const sections = Array.from(document.querySelectorAll('section'));
            sections.forEach((section, index) => {
                // Stagger the reveal of each section
                setTimeout(() => {
                    section.classList.add('revealed');
                }, 100 + index * 150);
            });
            
            // Mark body as loaded for potential CSS transitions
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Remove the overlay after fade out
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
                
                // Call the existing fixMediaIssues function
                fixMediaIssues();
            }, 800);
        }, 400);
    } else {
        // If overlay doesn't exist, just mark as loaded
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        optimizePerformance();
        fixMediaIssues();
    }
});

// Add this function to fix any timing or loading issues
function fixMediaIssues() {
    // Re-trigger animations
    document.querySelectorAll('.visible').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 50);
    });
    
    // Fix any hero section background issues
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundPositionY = '0px';
    }
    
    // Check for any video elements and ensure they load properly
    document.querySelectorAll('video, iframe').forEach(mediaEl => {
        mediaEl.addEventListener('error', function() {
            console.error('Media element failed to load:', this.src);
            this.style.display = 'none';
            const errorMsg = document.createElement('div');
            errorMsg.textContent = 'Media failed to load. Please refresh.';
            errorMsg.style.padding = '20px';
            errorMsg.style.color = 'red';
            this.parentNode.insertBefore(errorMsg, this.nextSibling);
        });
    });
    
    // Apply smooth scrolling for page load with hash
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offset = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }, 500); // Delay to ensure all elements are loaded
        }
    }
    
    // Initialize scroll indicator on page load
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    }
} 