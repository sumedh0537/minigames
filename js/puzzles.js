// ============================================
// PUZZLE LOGIC AND STATE MANAGEMENT
// ============================================

let puzzlesCompleted = 0;
let currentQuizQuestion = 1;
let quiz1Answers = { 1: false, 2: false, 3: false };
const TOTAL_PUZZLES = 4;
const GAME_STATS_KEY = 'minigames_stats_v1';

function getDefaultStats() {
    return {
        startedAt: null,
        finishedAt: null,
        puzzlesCompleted: 0,
        totalPuzzles: TOTAL_PUZZLES
    };
}

function readGameStats() {
    try {
        const raw = localStorage.getItem(GAME_STATS_KEY);
        if (!raw) {
            return getDefaultStats();
        }

        const parsed = JSON.parse(raw);
        return {
            startedAt: parsed.startedAt ?? null,
            finishedAt: parsed.finishedAt ?? null,
            puzzlesCompleted: Number.isFinite(parsed.puzzlesCompleted) ? parsed.puzzlesCompleted : 0,
            totalPuzzles: TOTAL_PUZZLES
        };
    } catch (error) {
        return getDefaultStats();
    }
}

function writeGameStats(stats) {
    localStorage.setItem(GAME_STATS_KEY, JSON.stringify(stats));
}

function beginRun() {
    const stats = getDefaultStats();
    stats.startedAt = Date.now();
    writeGameStats(stats);
}

function updateStoredProgress() {
    const stats = readGameStats();
    stats.puzzlesCompleted = Math.min(Math.max(puzzlesCompleted, 0), TOTAL_PUZZLES);

    if (!stats.startedAt) {
        stats.startedAt = Date.now();
    }

    if (stats.puzzlesCompleted === TOTAL_PUZZLES) {
        stats.finishedAt = Date.now();
    } else {
        stats.finishedAt = null;
    }

    writeGameStats(stats);
}

// ============================================
// PUZZLE 1: RELATIONSHIP QUIZ
// ============================================

function initQuiz() {
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.answer === 'correct';
            const currentQuestion = this.closest('.question-block').dataset.question;
            
            // Disable all buttons in this question
            const siblings = this.parentElement.querySelectorAll('.option-btn');
            siblings.forEach(sibling => sibling.style.pointerEvents = 'none');
            
            if (isCorrect) {
                this.classList.add('correct');
                quiz1Answers[currentQuestion] = true;
                
                // Move to next question or show results
                setTimeout(() => {
                    const currentBlock = document.querySelector(`.question-block[data-question="${currentQuestion}"]`);
                    const nextBlock = document.querySelector(`.question-block[data-question="${parseInt(currentQuestion) + 1}"]`);
                    
                    if (nextBlock) {
                        currentBlock.classList.remove('active');
                        nextBlock.classList.add('active');
                    } else {
                        // All questions answered
                        document.getElementById('quizContainer').style.display = 'none';
                        document.getElementById('quiz1Result').classList.remove('hidden');
                    }
                }, 1000);
            } else {
                this.classList.add('wrong');
                // Re-enable buttons after animation
                setTimeout(() => {
                    this.classList.remove('wrong');
                    siblings.forEach(sibling => sibling.style.pointerEvents = 'auto');
                }, 500);
            }
        });
    });
}

// ============================================
// PUZZLE 2: MEMORY MATCH GAME
// ============================================

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 6;

function initMemoryGame() {
    const gameContainer = document.getElementById('memoryGame');
    if (!gameContainer) return;
    
    // Card symbols (6 pairs)
    const symbols = ['🎮', '🎯', '🎲', '🏆', '⭐', '🌟'];
    const cardDeck = [...symbols, ...symbols]; // Duplicate for pairs
    
    // Shuffle cards
    cardDeck.sort(() => Math.random() - 0.5);
    
    // Create card elements
    cardDeck.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-front">❓</div>
            <div class="card-back">${symbol}</div>
        `;
        
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
        memoryCards.push(card);
    });
}

function flipCard() {
    // Don't allow flipping if already processing or card is matched
    if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;
    
    if (symbol1 === symbol2) {
        // Match found!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        flippedCards = [];
        
        // Check if game is complete
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                document.getElementById('memoryGame').style.display = 'none';
                document.getElementById('game2Result').classList.remove('hidden');
            }, 800);
        }
    } else {
        // No match - flip back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// ============================================
// PUZZLE 3: NUMBER PUZZLE
// ============================================

// Customize this answer based on the math puzzle!
// Example: 2 + 3 × 4 = 2 + 12 = 14
const CORRECT_PASSWORD = '14'; // Change this to the correct answer!

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');
    const riddleContainer = document.querySelector('.riddle-container');
    const resultDiv = document.getElementById('riddle3Result');
    
    if (input.value.trim() === CORRECT_PASSWORD) {
        // Correct password!
        riddleContainer.style.display = 'none';
        resultDiv.classList.remove('hidden');
        error.classList.add('hidden');
    } else {
        // Wrong password
        error.classList.remove('hidden');
        input.value = '';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// ============================================
// PUZZLE COMPLETION AND PROGRESS
// ============================================

function completePuzzle(puzzleNumber) {
    puzzlesCompleted++;
    updateStoredProgress();
    updateProgress();
    
    if (puzzleNumber < 4) {
        // Move to next puzzle
        showScreen(`puzzle${puzzleNumber + 1}Screen`);
        
        // Initialize the next puzzle
        if (puzzleNumber === 1) {
            initMemoryGame();
        } else if (puzzleNumber === 3) {
            initWordle();
        }
    } else {
        // All puzzles complete - show completion screen
        showUnlockAnimation();
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.querySelector('.progress-text');
    
    const percentage = (puzzlesCompleted / TOTAL_PUZZLES) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${puzzlesCompleted} of ${TOTAL_PUZZLES} games complete`;
}

// ============================================
// UNLOCK ANIMATION
// ============================================

function showUnlockAnimation() {
    showScreen('unlockScreen');
    updateStoredProgress();
    
    // After 4 seconds, redirect to invitation page
    setTimeout(() => {
        window.location.href = 'invite.html';
    }, 4000);
}

// ============================================
// SCREEN NAVIGATION
// ============================================

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// ============================================
// INITIALIZE ON LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});
