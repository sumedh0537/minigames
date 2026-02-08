// ============================================
// MAIN APP LOGIC
// ============================================

function startJourney() {
    if (typeof beginRun === 'function') {
        beginRun();
    }
    showScreen('puzzle1Screen');
}

// ============================================
// UTILITY FUNCTIONS
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
        
        // Initialize Wordle if showing puzzle4
        if (screenId === 'puzzle4Screen' && typeof initWordle === 'function') {
            setTimeout(() => {
                initWordle();
            }, 100);
        }
    }
}
