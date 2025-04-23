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

// Quotes array
const quotes = [
    "The comeback is always stronger than the setback.",
    "Your life does not get better by chance, it gets better by change.",
    "You were not born to be broken. You were born to rise.",
    "One step at a time is still progress.",
    "Recovery is about progression, not perfection.",
    "Every day is a new beginning, take a deep breath and start again.",
    "Your future is created by what you do today, not tomorrow.",
    "The only way out is through.",
    "Fall seven times, stand up eight.",
    "The strongest people are not those who show strength in front of us but those who win battles we know nothing about.",
    "The past cannot be changed, but the future is yet in your power.",
    "Sometimes the smallest step in the right direction ends up being the biggest step of your life.",
    "Rock bottom became the solid foundation on which I rebuilt my life.",
    "Hope is the only thing stronger than fear."
];

let currentQuoteIndex = 0;
let isTyping = false;
const quoteDisplay = document.getElementById('quote-display');

async function typeText(text) {
    isTyping = true;
    quoteDisplay.classList.add('visible');
    for (let i = 0; i < text.length; i++) {
        if (!isTyping) break;
        quoteDisplay.textContent = text.substring(0, i + 1);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

async function eraseText(text) {
    for (let i = text.length; i >= 0; i--) {
        if (!isTyping) break;
        quoteDisplay.textContent = text.substring(0, i);
        await new Promise(resolve => setTimeout(resolve, 30));
    }
    quoteDisplay.classList.remove('visible');
}

async function displayQuote() {
    const quote = quotes[currentQuoteIndex];
    await typeText(quote);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await eraseText(quote);
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    setTimeout(displayQuote, 500);
}

displayQuote();

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});