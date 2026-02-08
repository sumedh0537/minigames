// ============================================
// COMPLETION PAGE INTERACTIONS
// ============================================

function playAgain() {
    window.location.href = 'index.html';
}

function shareSuccess() {
    const modal = document.getElementById('shareModal');
    modal.classList.remove('hidden');
    createConfetti();
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ============================================
// CLOSE MODAL
// ============================================

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
}

// Click outside modal to close
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
    
    // Card entrance animation
    const completionCard = document.querySelector('.completion-card');
    if (completionCard) {
        setTimeout(() => {
            completionCard.style.opacity = '0';
            completionCard.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                completionCard.style.transition = 'all 0.8s ease-out';
                completionCard.style.opacity = '1';
                completionCard.style.transform = 'scale(1)';
        }, 100);
    }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Press Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});
