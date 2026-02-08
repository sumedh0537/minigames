// ============================================
// FLOATING STARS BACKGROUND ANIMATION
// ============================================

function createFloatingStars() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;

    const starEmojis = ['⭐', '✨', '🌟', '💫', '⚡'];
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 5) + 's';
        star.style.fontSize = (Math.random() * 10 + 20) + 'px';
        
        starsContainer.appendChild(star);
        
        // Remove star after animation completes
        setTimeout(() => {
            star.remove();
        }, 8000);
    }, 800);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', createFloatingStars);
