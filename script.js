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

// Break the Chain Game
const chainContainer = document.querySelector('.chain-container');
const cracks = document.querySelectorAll('.crack');
const chainMessage = document.getElementById('chain-message');
const chainLinks = document.querySelector('.chain-links');

let clickCount = 0;
const messages = [
    "Every step breaks a link in the chain.",
    "You're making progress! Keep going!",
    "Freedom! You've broken the chain that held you back. A new chapter begins now."
];

chainContainer.addEventListener('click', handleChainClick);
chainContainer.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        handleChainClick();
    }
});

function handleChainClick() {
    if (clickCount >= 3) return;
    
    // Show crack and animate it
    const currentCrack = cracks[clickCount];
    currentCrack.style.opacity = "1";
    currentCrack.style.strokeDashoffset = "0";
    currentCrack.style.transition = "stroke-dashoffset 0.5s ease, opacity 0.3s ease";
    
    // Update click count and message
    clickCount++;
    
    // Update the message
    chainMessage.textContent = messages[clickCount - 1];
    chainMessage.classList.add('show');
    
    // If 3 clicks, break the chain
    if (clickCount === 3) {
        setTimeout(() => {
            // Animate the chain breaking
            chainLinks.style.transform = "rotate(10deg) translate(10px, 5px)";
            chainLinks.style.opacity = "0.6";
            
            setTimeout(() => {
                chainLinks.innerHTML = `
                    <path d="M70,50 C100,50 100,70 80,80" fill="none" stroke="#555" stroke-width="10" />
                    <path d="M120,150 C100,150 100,130 120,120" fill="none" stroke="#555" stroke-width="10" />
                `;
                chainLinks.style.transform = "rotate(0) translate(0, 0)";
                chainLinks.style.opacity = "1";
            }, 300);
        }, 200);
    }
}

// Motivational Quiz
const questions = document.querySelectorAll('.question-card');
const resultCard = document.getElementById('result');
const resultMessage = document.querySelector('.result-message');
const restartBtn = document.querySelector('.restart-btn');

// Store answers
let answers = [];

// Handle answer clicks
document.querySelectorAll('.answer-btn').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const questionCard = this.closest('.question-card');
        const feedback = questionCard.querySelector('.feedback');
        const questionId = questionCard.id;
        
        // Store answer
        answers.push(value);
        
        // Show feedback based on answer
        feedback.style.display = "block";
        
        switch(value) {
            case 'cautious':
                feedback.textContent = "It's natural to feel cautious. Every journey begins with a single step.";
                break;
            case 'ready':
                feedback.textContent = "Your readiness is a powerful force for change!";
                break;
            case 'unsure':
                feedback.textContent = "Doubt is part of growth. Acknowledging it is the first step to overcoming it.";
                break;
            case 'fear':
                feedback.textContent = "Fear of failure is common, but remember that each attempt is a learning opportunity.";
                break;
            case 'support':
                feedback.textContent = "Building a support network is an important part of your journey.";
                break;
            case 'habit':
                feedback.textContent = "Breaking old patterns takes time, but each day gets easier.";
                break;
            case 'freedom':
                feedback.textContent = "Freedom is a powerful motivator for lasting change.";
                break;
            case 'peace':
                feedback.textContent = "Finding inner peace is a beautiful goal worth pursuing.";
                break;
            case 'growth':
                feedback.textContent = "Embracing continuous growth creates a fulfilling life journey.";
                break;
        }
        
        // Delay to show next question
        setTimeout(() => {
            questionCard.classList.remove('active');
            
            // If it's the last question, show results
            if (questionId === 'q3') {
                setTimeout(() => {
                    showResults();
                }, 500);
            } else {
                // Show next question
                const nextQuestionId = questionId === 'q1' ? 'q2' : 'q3';
                document.getElementById(nextQuestionId).classList.add('active');
            }
        }, 1500);
    });
});


// Handle restart button
restartBtn.addEventListener('click', () => {
    answers = [];
    resultCard.style.display = 'none';
    document.querySelectorAll('.feedback').forEach(f => f.textContent = '');
    questions.forEach((q, i) => {
        q.classList.remove('active');
        if (i === 0) q.classList.add('active');
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