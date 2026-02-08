// ============================================
// FLOATING HEARTS BACKGROUND ANIMATION
// ============================================

function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;

    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 800);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', createFloatingHearts);
