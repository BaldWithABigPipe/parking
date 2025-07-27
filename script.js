// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu functionality
    const menuBtn = document.querySelector('.header__menu-btn');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    const mobileCloseBtn = document.querySelector('.header__mobile-close-btn');
    const mainContent = document.querySelector('main') || document.body;

    function openMobileMenu() {
        if (!mobileMenu) {
            console.error('Mobile menu not found');
            return;
        }
        
        // Store current scroll position
        const scrollY = window.scrollY;
        
        menuBtn.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
        
        // Completely block scrolling
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        
        // Force reflow to ensure menu is visible
        mobileMenu.offsetHeight;
    }

    function closeMobileMenu() {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Restore scrolling
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.header__mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
    
    // Prevent scrolling when menu is open
    function preventScroll(e) {
        if (document.body.classList.contains('menu-open')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
    
    // Add scroll prevention listeners
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('scroll', preventScroll, { passive: false });




    
    // Debug mobile menu
    console.log('Mobile menu elements:', {
        menuBtn: !!menuBtn,
        mobileMenu: !!mobileMenu,
        mobileCloseBtn: !!mobileCloseBtn
    });

    // Language selector
    const languageBtn = document.querySelector('.header__language-btn');
    const languageDropdown = document.querySelector('.header__language-dropdown');
    const languageOptions = document.querySelectorAll('.header__language-option');

    function toggleLanguageDropdown() {
        languageBtn.classList.toggle('active');
        languageDropdown.classList.toggle('active');
    }

    function closeLanguageDropdown() {
        languageBtn.classList.remove('active');
        languageDropdown.classList.remove('active');
    }

    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLanguageDropdown();
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = languageBtn.querySelector('span').textContent;
            const newLang = option.textContent.includes('English') ? 'EN' : 'RU';
            
            if (currentLang !== newLang) {
                languageBtn.querySelector('span').textContent = newLang;
                
                // Remove active class from all options
                languageOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                option.classList.add('active');
                
                // Show language change notification
                showNotification(`Language changed to ${newLang === 'EN' ? 'English' : 'Русский'}`, 'success');
            }
            
            closeLanguageDropdown();
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', closeLanguageDropdown);

    // FAQ Accordion with improved animations
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        const icon = item.querySelector('.faq__icon');
        
        // Set initial max-height
        answer.style.maxHeight = '0px';
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    const otherIcon = otherItem.querySelector('.faq__icon');
                    
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = '0px';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)';
                
                // Add bounce animation to the question
                question.style.animation = 'bounce 0.6s ease-out';
                setTimeout(() => {
                    question.style.animation = '';
                }, 600);
            }
        });
    });

    // Enhanced booking form with validation and loading states
    const bookingForm = document.querySelector('.hero__form');
    const searchButton = document.querySelector('.hero__button');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            searchButton.classList.add('loading');
            searchButton.textContent = 'Searching...';
            searchButton.disabled = true;
            
            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success notification
                showNotification('Search completed! Found 15 parking options.', 'success');
                
                // Add success animation
                searchButton.style.background = 'var(--color-success-gradient)';
                searchButton.textContent = '✓ Found!';
                
                setTimeout(() => {
                    searchButton.style.background = '';
                    searchButton.textContent = 'Search';
                    searchButton.classList.remove('loading');
                    searchButton.disabled = false;
                }, 3000);
                
            } catch (error) {
                showNotification('Search failed. Please try again.', 'error');
                searchButton.classList.remove('loading');
                searchButton.textContent = 'Search';
                searchButton.disabled = false;
            }
        });
    }

    // Newsletter signup with enhanced UX
    const newsletterBtn = document.querySelector('.newsletter__button');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create email input modal
            const modal = document.createElement('div');
            modal.className = 'newsletter-modal';
            modal.innerHTML = `
                <div class="newsletter-modal__content">
                    <h3>Stay Updated!</h3>
                    <p>Get exclusive parking deals and travel tips</p>
                    <form class="newsletter-modal__form">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit">Subscribe</button>
                    </form>
                    <button class="newsletter-modal__close">×</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .newsletter-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease-out;
                }
                .newsletter-modal__content {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
                    position: relative;
                    max-width: 400px;
                    width: 90%;
                    animation: scaleIn 0.3s ease-out;
                }
                .newsletter-modal__form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .newsletter-modal__form input {
                    padding: 1rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                }
                .newsletter-modal__form button {
                    background: var(--color-accent-gradient);
                    color: var(--color-text);
                    border: none;
                    padding: 1rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .newsletter-modal__form button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .newsletter-modal__close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                }
            `;
            document.head.appendChild(style);
            
            // Handle form submission
            const form = modal.querySelector('.newsletter-modal__form');
            const closeBtn = modal.querySelector('.newsletter-modal__close');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input').value;
                showNotification(`Thank you! ${email} has been subscribed.`, 'success');
                document.body.removeChild(modal);
            });
            
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }

    // Scroll to top button with smooth animation
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .hero__benefit, .faq__item, .reviews__card').forEach(el => {
        observer.observe(el);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close">×</button>
            </div>
        `;
        
        // Add styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
                    z-index: 1000;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 400px;
                    border-left: 4px solid var(--color-primary);
                }
                .notification--success {
                    border-left-color: var(--color-success);
                }
                .notification--error {
                    border-left-color: #ef4444;
                }
                .notification__content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.5rem;
                }
                .notification__message {
                    color: var(--color-text);
                    font-weight: 500;
                }
                .notification__close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                    margin-left: 1rem;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
        
        // Close button
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }

    // Enhanced input interactions
    document.querySelectorAll('.hero__input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
        
        // Add floating label effect
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Keyboard navigation for FAQ
    document.querySelectorAll('.faq__question').forEach(question => {
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedScrollHandler = debounce(() => {
        // Scroll-based animations and effects
    }, 16);

    window.addEventListener('scroll', debouncedScrollHandler);
}); 