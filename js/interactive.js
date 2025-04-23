// Sound effects for chain breaking
const crackSound = new Audio('data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==');

// Chain breaking game
class ChainBreakingGame {
    constructor() {
        this.clickCount = 0;
        this.chain = document.querySelector('#chain');
        this.cracks = document.querySelectorAll('.crack');
        this.messageElement = document.querySelector('#chain-message');
        this.isAnimating = false;

        this.messages = [
            'Every click weakens the chain of addiction',
            'You are getting stronger with each break',
            'Freedom is within reach!'
        ];

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.chain.addEventListener('click', () => this.handleClick());
    }

    async handleClick() {
        if (this.isAnimating || this.clickCount >= 3) return;

        this.isAnimating = true;
        crackSound.play();

        // Show crack animation
        this.cracks[this.clickCount].style.opacity = '1';
        this.cracks[this.clickCount].style.animation = 'crack-appear 0.3s forwards';

        // Update message
        this.messageElement.textContent = this.messages[this.clickCount];
        this.messageElement.style.opacity = '1';

        this.clickCount++;

        if (this.clickCount === 3) {
            await this.breakChain();
        }

        this.isAnimating = false;
    }

    async breakChain() {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.chain.style.animation = 'chain-break 1s forwards';
        this.messageElement.textContent = 'You have broken free! The journey to recovery begins now.';
        this.messageElement.classList.add('final-message');
    }
}

// Motivational Quiz
class MotivationalQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                text: 'What motivates you to make a change today?',
                options: [
                    { text: 'For my loved ones', message: 'Your love for others can be a powerful force for change.' },
                    { text: 'For myself', message: 'Self-love is the foundation of lasting change.' },
                    { text: 'For a better future', message: 'Your vision for tomorrow can guide you today.' }
                ]
            },
            {
                text: 'How ready do you feel to start your journey?',
                options: [
                    { text: 'Very ready', message: 'Your determination will light the way forward.' },
                    { text: 'Somewhat ready', message: 'Every step forward, no matter how small, counts.' },
                    { text: 'Unsure but willing', message: 'Courage is not about being fearless—it is about taking that first step.' }
                ]
            },
            {
                text: 'What support do you have in your journey?',
                options: [
                    { text: 'Family and friends', message: 'Your support network will help you stay strong.' },
                    { text: 'Professional help', message: 'Seeking help is a sign of strength, not weakness.' },
                    { text: 'Starting to build support', message: 'Every connection you make strengthens your foundation.' }
                ]
            }
        ];

        this.finalMessages = [
            'Your courage and commitment shine through. Remember, recovery is a journey, not a destination.',
            'You have the strength within you to create lasting change. Take it one day at a time.',
            'Every step you take brings you closer to the life you deserve. Keep moving forward.'
        ];

        this.setupQuiz();
    }

    setupQuiz() {
        this.quizContainer = document.querySelector('#quiz-container');
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showFinalMessage();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const html = `
            <div class="question-container" data-aos="fade-up">
                <h3>${question.text}</h3>
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <button class="option-button" data-index="${index}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.quizContainer.innerHTML = html;

        // Add event listeners to buttons
        const buttons = this.quizContainer.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleAnswer(parseInt(button.dataset.index));
            });
        });
    }

    async handleAnswer(index) {
        const question = this.questions[this.currentQuestion];
        const answer = question.options[index];
        this.answers.push(index);

        // Show message with animation
        const messageElement = document.createElement('div');
        messageElement.className = 'answer-message';
        messageElement.textContent = answer.message;
        this.quizContainer.appendChild(messageElement);

        await new Promise(resolve => setTimeout(resolve, 2000));
        this.currentQuestion++;
        this.displayQuestion();
    }

    showFinalMessage() {
        const randomMessage = this.finalMessages[Math.floor(Math.random() * this.finalMessages.length)];
        const html = `
            <div class="final-message-container" data-aos="fade-up">
                <h3>Your Journey Begins</h3>
                <p>${randomMessage}</p>
                <button class="restart-button" onclick="initializeQuiz()">Start Again</button>
            </div>
        `;
        this.quizContainer.innerHTML = html;
    }
}

// Initialize components
let chainGame;
let quiz;

function initializeInteractiveComponents() {
    chainGame = new ChainBreakingGame();
    quiz = new MotivationalQuiz();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeInteractiveComponents);