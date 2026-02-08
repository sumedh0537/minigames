// ============================================
// WORDLE GAME LOGIC
// ============================================

let wordList = [];
let dailyWord = '';
let guesses = [];
let gameOver = false;
let gameWon = false;
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;
const FALLBACK_WORDS = [
    'about', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after',
    'again', 'agent', 'agree', 'ahead', 'alarm', 'album', 'alert'
];

// ============================================
// FETCH WORD LIST AND INITIALIZE
// ============================================

async function initWordle() {
    resetWordleState();

    try {
        // Fetch word list from API
        const response = await fetch('https://random-word-api.herokuapp.com/all');
        const words = await response.json();
        
        // Filter to clean 5-letter alphabetic words only
        wordList = words
            .map(word => String(word).toLowerCase())
            .filter(word => /^[a-z]{5}$/.test(word));
        
        // Get today's word using date-based seeding
        dailyWord = getDailyWord(wordList);
        
        // Initialize the grid
        createWordleGrid();
        
        // Focus input
        document.getElementById('wordleInput').focus();
    } catch (error) {
        console.error('Failed to fetch word list:', error);
        // Fallback word list if API fails
        wordList = FALLBACK_WORDS;
        dailyWord = getDailyWord(wordList);
        createWordleGrid();
    }
}

// ============================================
// DATE-BASED SEEDING
// ============================================

function getDailyWord(words) {
    if (!words || words.length === 0) {
        return 'ALERT';
    }

    const today = new Date();
    const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
    // Simple hash function to convert date to number
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Get absolute value and modulo by word count
    const index = Math.abs(hash) % words.length;
    return words[index].toUpperCase();
}

function resetWordleState() {
    guesses = [];
    gameOver = false;
    gameWon = false;

    const input = document.getElementById('wordleInput');
    const messageEl = document.getElementById('wordleMessage');
    const resultDiv = document.getElementById('wordleResult');
    const wordleContainer = document.querySelector('.wordle-container');

    if (input) {
        input.value = '';
        input.disabled = false;
    }

    if (messageEl) {
        messageEl.textContent = '';
        messageEl.classList.add('hidden');
    }

    if (resultDiv) {
        resultDiv.classList.add('hidden');
    }

    if (wordleContainer) {
        wordleContainer.style.display = 'block';
    }
}

// ============================================
// CREATE WORDLE GRID
// ============================================

function createWordleGrid() {
    const grid = document.getElementById('wordleGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < MAX_GUESSES; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        const guess = guesses[i];
        const rowStatuses = guess ? getGuessStatuses(guess, dailyWord) : null;
        
        for (let j = 0; j < WORD_LENGTH; j++) {
            const tile = document.createElement('div');
            tile.className = 'wordle-tile';
            tile.id = `tile-${i}-${j}`;
            
            if (i < guesses.length) {
                const letter = guess[j];
                const status = rowStatuses[j];
                
                tile.textContent = letter;
                tile.classList.add(`status-${status}`);
            }
            
            row.appendChild(tile);
        }
        
        grid.appendChild(row);
    }
}

// ============================================
// SUBMIT GUESS
// ============================================

function submitWordleGuess() {
    if (gameOver) {
        return;
    }

    const input = document.getElementById('wordleInput');
    const guessRaw = input.value.trim().toLowerCase();
    const guess = guessRaw.toUpperCase();
    const messageEl = document.getElementById('wordleMessage');
    
    // Validate input
    if (!/^[a-z]{5}$/.test(guessRaw)) {
        messageEl.textContent = 'Enter a valid 5-letter word.';
        messageEl.classList.remove('hidden');
        return;
    }
    
    if (!wordList.includes(guessRaw)) {
        messageEl.textContent = 'Word not in list!';
        messageEl.classList.remove('hidden');
        return;
    }
    
    messageEl.classList.add('hidden');
    
    // Add guess
    guesses.push(guess);
    input.value = '';
    
    // Update grid
    createWordleGrid();
    
    // Check if won
    if (guess === dailyWord) {
        gameWon = true;
        gameOver = true;
        endWordle(true);
        return;
    }
    
    // Check if out of guesses
    if (guesses.length >= MAX_GUESSES) {
        gameOver = true;
        endWordle(false);
        return;
    }
    
    input.focus();
}

// ============================================
// GET LETTER STATUS (WITH DUPLICATE-LETTER HANDLING)
// ============================================

function getGuessStatuses(guess, targetWord) {
    const statuses = Array(WORD_LENGTH).fill('absent');
    const remainingCounts = {};

    for (let i = 0; i < WORD_LENGTH; i++) {
        const targetLetter = targetWord[i];
        if (guess[i] === targetLetter) {
            statuses[i] = 'correct';
        } else {
            remainingCounts[targetLetter] = (remainingCounts[targetLetter] || 0) + 1;
        }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
        const guessLetter = guess[i];
        if (statuses[i] !== 'correct' && remainingCounts[guessLetter] > 0) {
            statuses[i] = 'present';
            remainingCounts[guessLetter]--;
        }
    }

    return statuses;
}

// ============================================
// END WORDLE GAME
// ============================================

function endWordle(won) {
    const resultDiv = document.getElementById('wordleResult');
    const resultText = document.getElementById('wordleResultText');
    const wordleContainer = document.querySelector('.wordle-container');
    const input = document.getElementById('wordleInput');
    
    if (won) {
        resultText.innerHTML = `You Won! 🎉<br><small>Word: ${dailyWord}</small>`;
    } else {
        resultText.innerHTML = `Game Over!<br><small>The word was: ${dailyWord}</small>`;
    }
    
    wordleContainer.style.display = 'none';
    resultDiv.classList.remove('hidden');
    input.disabled = true;
}

// ============================================
// KEYBOARD SUPPORT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('wordleInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitWordleGuess();
            }
        });
    }
});
