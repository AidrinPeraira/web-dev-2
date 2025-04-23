// Initialize AOS library
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Story carousel functionality
const storyCards = document.querySelectorAll('.story-card');
let currentStoryIndex = 0;

function showNextStory() {
    storyCards[currentStoryIndex].classList.remove('active');
    currentStoryIndex = (currentStoryIndex + 1) % storyCards.length;
    storyCards[currentStoryIndex].classList.add('active');
}

// Change story every 5 seconds
setInterval(showNextStory, 5000);

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});