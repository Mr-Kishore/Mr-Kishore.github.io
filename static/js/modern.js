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
    
    // Resume Generation Functionality
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', generateAndDownloadResume);
    }
    
    function generateAndDownloadResume() {
        // Show loading state
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating...';
        downloadResumeBtn.disabled = true;
        
        // Generate ATS-friendly resume content
        const resumeContent = generateATSResume();
        
        // Create and download the file
        setTimeout(() => {
            downloadResume(downloadResumeBtn, originalText, resumeContent);
        }, 1000);
    }
    
    function generateATSResume() {
        // Get data from the page or use default values
        const firstName = document.querySelector('.modern-heading')?.textContent?.trim() || 'Kishore';
        const location = document.querySelector('.location')?.textContent?.trim() || 'Coimbatore, India';
        const phone = '+91 9025084568';
        const email = 'kishore@example.com'; // You can update this
        
        // Extract skills from the page
        const skills = extractSkillsFromPage();
        
        // Extract experience from the page
        const experience = extractExperienceFromPage();
        
        // Extract education from the page
        const education = extractEducationFromPage();
        
        // Extract certifications from the page
        const certifications = extractCertificationsFromPage();
        
        // Generate ATS-friendly resume text
        const resumeText = `
${firstName.toUpperCase()}
${location} | ${phone} | ${email}

PROFESSIONAL SUMMARY
Machine Learning developer and PC builder with expertise in IoT, DevOps, and IT administration. Demonstrated experience in Site Reliability Engineering, AI development, and hardware troubleshooting. Proven track record of working with professionals across various technology domains.

TECHNICAL SKILLS
${skills.join(', ')}

PROFESSIONAL EXPERIENCE
${experience.map(exp => `${exp.role} | ${exp.company} | ${exp.range}
${exp.summary}`).join('\n\n')}

EDUCATION
${education.map(edu => `${edu.degree} in ${edu.major} | ${edu.school} | ${edu.range}`).join('\n')}

CERTIFICATIONS
${certifications.map(cert => `${cert.name} - ${cert.description}`).join('\n')}

ADDITIONAL INFORMATION
• Strong problem-solving skills in hardware and software troubleshooting
• Experience with network configuration and administration
• Proficient in multiple programming languages and development tools
• Demonstrated ability to work in fast-paced, professional environments
        `.trim();
        
        return resumeText;
    }
    
    function extractSkillsFromPage() {
        const skillElements = document.querySelectorAll('.skills-list li, .skill-item');
        if (skillElements.length > 0) {
            return Array.from(skillElements).map(el => el.textContent.trim());
        }
        
        // Fallback: return common skills based on the data
        return [
            'Python', 'Java', 'Git', 'HTML', 'JavaScript', 'Linux', 'C', 'C++', 'C#',
            'MySQL', 'Microsoft SQL Server', 'AWS', 'PC Building', 'Networking', 'Troubleshooting'
        ];
    }
    
    function extractExperienceFromPage() {
        const experienceElements = document.querySelectorAll('.resume-item');
        if (experienceElements.length > 0) {
            return Array.from(experienceElements).map(el => {
                const role = el.querySelector('h3')?.textContent?.trim() || '';
                const company = el.querySelector('.subheading')?.textContent?.trim() || '';
                const range = el.querySelector('.resume-date')?.textContent?.trim() || '';
                const summary = el.querySelector('p')?.textContent?.trim() || '';
                
                return { role, company, range, summary };
            });
        }
        
        // Fallback: return experience from data
        return [
            {
                role: 'Site Reliability Engineer (SRE) Intern',
                company: 'Ventragate Technologies',
                range: 'June 2025 - present',
                summary: 'Practicing as a SRE (DevOps) Intern'
            },
            {
                role: 'AI Intern',
                company: 'uSIS Technologies',
                range: 'March 2025 - June 2025',
                summary: 'Worked as an AI intern'
            },
            {
                role: 'Junior IT admin',
                company: 'Sri Ramakrishna Mission Vidyalaya College of Arts and Science',
                range: 'July 2024 - present',
                summary: 'Worked with Lab technicians and admins in pc troubleshooting and Network Configuration Handling'
            }
        ];
    }
    
    function extractEducationFromPage() {
        const educationElements = document.querySelectorAll('.resume-item');
        if (educationElements.length > 0) {
            return Array.from(educationElements).map(el => {
                const degree = el.querySelector('h3')?.textContent?.trim() || '';
                const school = el.querySelector('.subheading')?.textContent?.trim() || '';
                const range = el.querySelector('.resume-date')?.textContent?.trim() || '';
                
                return { degree, school, range };
            });
        }
        
        // Fallback: return education from data
        return [
            {
                degree: 'Bachelor of Science',
                major: 'Information Technology',
                school: 'Sri Ramakrishna Mission Vidyalaya College of Arts and Science',
                range: '2023 - 2026'
            }
        ];
    }
    
    function extractCertificationsFromPage() {
        const certElements = document.querySelectorAll('.certification-card');
        if (certElements.length > 0) {
            return Array.from(certElements).map(el => {
                const name = el.querySelector('img')?.alt?.trim() || '';
                const description = el.querySelector('a')?.title?.trim() || '';
                
                return { name, description };
            });
        }
        
        // Fallback: return certifications from data
        return [
            { name: 'AWS Solutions Architect', description: 'AWS Certified Solutions Architect – Associate' },
            { name: 'ACP-JSD', description: 'Jira Service Desk Administrator' },
            { name: 'ACP-JCA', description: 'Jira Cloud Administrator' }
        ];
    }
    
    function downloadResume(button, originalText, content) {
        try {
            // Create blob and download
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Kishore_ATS_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            // Show success message
            showNotification('Resume downloaded successfully!', 'success');
            
        } catch (error) {
            console.error('Error downloading resume:', error);
            showNotification('Error downloading resume. Please try again.', 'error');
        } finally {
            // Restore button state
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}); 