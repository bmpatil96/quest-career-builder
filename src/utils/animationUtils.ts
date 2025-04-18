
/**
 * Animation utilities for scroll-based animations
 */

export function setupScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  return () => {
    animateElements.forEach(element => {
      observer.unobserve(element);
    });
  };
}
