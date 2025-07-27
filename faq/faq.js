// FAQ functionality - Mobile First
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq__question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== this) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherQuestion.nextElementSibling.setAttribute('aria-hidden', 'true');
        }
      });
      
      // Toggle current FAQ item
      this.setAttribute('aria-expanded', !isExpanded);
      answer.setAttribute('aria-hidden', isExpanded);
      
      // Smooth scroll to expanded item on mobile
      if (!isExpanded && window.innerWidth < 768) {
        setTimeout(() => {
          this.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }, 100);
      }
    });
    
    // Keyboard navigation
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Close FAQ when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.faq__item')) {
      faqQuestions.forEach(question => {
        question.setAttribute('aria-expanded', 'false');
        question.nextElementSibling.setAttribute('aria-hidden', 'true');
      });
    }
  });
});



// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
  const heroForm = document.querySelector('.hero__form');
  
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const airport = this.querySelector('input[name="airport"]').value.trim();
      const arrivalDate = this.querySelector('input[name="arrival-date"]').value;
      const arrivalTime = this.querySelector('input[name="arrival-time"]').value;
      const returnDate = this.querySelector('input[name="return-date"]').value;
      const returnTime = this.querySelector('input[name="return-time"]').value;
      
      if (!airport || !arrivalDate || !arrivalTime || !returnDate || !returnTime) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.hero__button');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Searching...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Search functionality would be implemented here');
      }, 2000);
    });
  }
});



// Mobile menu functionality (if needed in future)
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.header__menu-btn');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      // Mobile menu functionality can be added here
      console.log('Mobile menu clicked');
    });
  }
});

// Performance optimization - Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}); 