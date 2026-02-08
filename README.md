# 🎮 Minigames Collection

An interactive minigames website featuring a collection of fun games to challenge your skills.

## 🎯 Features

- **4 Interactive Games:**
  - Trivia Quiz
  - Memory Matching Game
  - Number Puzzle
  - Daily Wordle
  
- **Modern Gaming Design:**
  - Green/blue color palette
  - Floating stars animations
  - Smooth transitions and effects
  - Fully responsive (mobile & desktop)

- **Completion Page:**
  - Trophy animation
  - Success celebration
  - Share and replay options
  - Confetti effects

## 📁 Project Structure

```
minigames/
├── index.html          # Main games flow page
├── invite.html         # Completion results page
├── css/
│   └── styles.css      # All styling and animations
├── js/
│   ├── main.js         # Main app logic
│   ├── puzzles.js      # Game logic and interactions
│   ├── wordle.js       # Wordle game logic
│   ├── stars.js        # Floating stars animation
│   └── invite.js       # Completion page interactions
├── images/             # Place your images here (optional)
└── audio/              # Place your music file here (optional)
```

## 🎮 How to Use

1. **Open the website:** Open `indexfour games in sequence
3. **Wordle Notes:** 
   - A new word is selected each day
   - You have 6 attempts to guess the 5-letter word
   - 🟩 Green = correct letter, correct position
   - 🟨 Yellow = correct letter, wrong position
   - ⬜ Gray = letter not in word
4. **View your score:** See the completion results page
5. **Replay or share:** Play again tomorrow for a new Wordle word!

## ✏️ Customization

### Update Quiz Questions
Edit the questions in `index.html` (lines 33-54):
```html
<div class="question-block active" data-question="1">
    <p class="question">Your question here?</p>
    <div class="options">
        <button class="option-btn" data-answer="correct">Correct answer</button>
        <button class="option-btn" data-answer="wrong">Wrong answer</button>
    </div>
</div>
```

### Change Puzzle Answer
Edit `js/puzzles.js` (line 15):
```javascript
const CORRECT_PASSWORD = '14'; // Change to the correct answer
```

### Customize Memory Game Symbols
Edit `js/puzzles.js` (line 68) to change the card symbols:
```javascript
const symbols = ['🎮', '🎯', '🎲', '🏆', '⭐', '🌟'];
```

### Customize Wordle Word List
Edit `js/wordle.js` (line 32) - update the fallback word list:
```javascript
wordList = ['ABOUT', 'ACTOR', 'ACUTE', ...];
```

The Wordle fetches a word list from a free API and automatically selects a different word each day based on the current date.st symbols = ['🎮', '🎯', '🎲', '🏆', '⭐', '🌟'];
```

## 🎨 Color Scheme

- Primary Green: `#4CAF50`
- Primary Light: `#81C784`
- Primary Dark: `#388E3C`
- Secondary Blue: `#2196F3`
- Accent Orange: `#FF9800`
- Background Light: `#F5F5F5`

## 📱 Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## 💡 Tips

- Test on mobile devices to ensure responsive design works
- Customize symbols in memory game with your favorite emojis
- Update quiz questions with your own trivia
- Change the puzzle answer to a meaningful number
- Customize colors in `css/styles.css` `:root` section

## 🚀 Deployment

To share online:
1. Upload all files to a web hosting service (GitHub Pages, Netlify, Vercel)
2. Send the link to your friends
3. Challenge them to beat your score!

---

Made with 🎮 for Minigames Challenge 2026
