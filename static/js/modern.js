// Modern JavaScript for Dark Mode and Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const html = document.documentElement;
    
    // Debug logging
    console.log('Dark mode toggle element:', darkModeToggle);
    console.log('Dark mode icon element:', darkModeIcon);
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    console.log('Current theme:', currentTheme);
    
    html.setAttribute('data-theme', currentTheme);
    updateDarkModeIcon(currentTheme);
    
    // Dark mode toggle event listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            console.log('Dark mode toggle clicked!');
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('Switching from', currentTheme, 'to', newTheme);
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateDarkModeIcon(newTheme);
            
            // Add animation to the toggle button
            darkModeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                darkModeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    } else {
        console.error('Dark mode toggle button not found!');
    }
    
    function updateDarkModeIcon(theme) {
        if (theme === 'dark') {
            darkModeIcon.className = 'fas fa-sun';
            darkModeIcon.style.color = '#f0f6fc';
        } else {
            darkModeIcon.className = 'fas fa-moon';
            darkModeIcon.style.color = '#ffffff';
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.js-scroll-trigger');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    const sections = document.querySelectorAll('section.resume-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add loading animation to cards and components
    const cards = document.querySelectorAll('.card, .resume-item');
    cards.forEach((card, index) => {
        card.classList.add('loading');
        setTimeout(() => {
            card.classList.add('loaded');
        }, index * 100);
    });
    
    // Hover effects for social icons
    const socialIcons = document.querySelectorAll('.list-social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Subtle parallax effect for profile image (fixed)
    const profileImage = document.querySelector('.img-profile');
    if (profileImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            // Much more subtle effect to prevent empty space
            const rate = scrolled * -0.1;
            profileImage.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Typing animation for the main heading
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.borderRight = '2px solid var(--accent-primary)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                mainHeading.style.borderRight = 'none';
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Theme transition on page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D to toggle dark mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            darkModeToggle.click();
        }
        
        // Escape to close any open modals or dropdowns
        if (e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.show');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
    
    // Add tooltip for dark mode toggle
    darkModeToggle.setAttribute('title', 'Toggle Dark Mode (Ctrl/Cmd + D)');
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations here
        }, 16); // ~60fps
    });
    
    // Add accessibility improvements
    darkModeToggle.setAttribute('role', 'button');
    darkModeToggle.setAttribute('aria-pressed', currentTheme === 'dark');
    
    darkModeToggle.addEventListener('click', function() {
        const isPressed = this.getAttribute('aria-pressed') === 'true';
        this.setAttribute('aria-pressed', !isPressed);
    });
    
    // Console message for developers
    console.log('%c🎨 Modern Portfolio Theme Loaded!', 'color: #007bff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Tip: Press Ctrl/Cmd + D to toggle dark mode', 'color: #6c757d; font-size: 12px;');
}); 