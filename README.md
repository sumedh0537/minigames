# Minigames Collection

This is my mini browser-game project built with plain HTML, CSS, and JavaScript.

It’s a 4-game challenge with a final results page that tracks real completion stats.

## What I Built

- Trivia Quiz
- Memory Match
- Number Puzzle
- Daily-style 5-letter Wordle
- Final results page with:
  - actual score (`x/4`)
  - actual completion rate (`%`)
  - total finish time (shown when all 4 games are completed)

## Project Structure

```text
minigames/
├── index.html
├── invite.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── puzzles.js
│   ├── wordle.js
│   ├── stars.js
│   └── invite.js
├── images/
└── audio/
```

## How It Works

1. Start from `index.html`
2. Play through 4 games in sequence
3. Progress is tracked during the run
4. On the final page (`invite.html`), score and completion rate are calculated from stored run data
5. If all 4 are completed, finish time is shown

## Run Locally

You can open `index.html` directly, or serve it with a local static server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- Game stats are stored in `localStorage` under `minigames_stats_v1`.
- Wordle uses a fetched word list with a built-in fallback list.
- UI is responsive for desktop and mobile.

## Customization

- Quiz questions/options: `index.html`
- Number puzzle answer: `js/puzzles.js` (`CORRECT_PASSWORD`)
- Wordle behavior/list: `js/wordle.js`
- Theme and layout: `css/styles.css`

## Tech

- HTML5
- CSS3 (animations + responsive layout)
- Vanilla JavaScript (DOM + game state + localStorage)
