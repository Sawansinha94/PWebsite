document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const LOVE_MULTIPLIER = 50; 

    // DOM Elements
    const secretInput = document.getElementById('secretInput');
    const enterBtn = document.getElementById('enterBtn');
    const lockScreen = document.getElementById('lockScreen');
    const revealScreen = document.getElementById('revealScreen');
    const errorMsg = document.getElementById('errorMsg');
    const exponentialMessage = document.getElementById('exponentialMessage');
    const resetBtn = document.getElementById('resetBtn');

    // Initialize Fireflies immediately
    createFireflies();

    // Event Listeners
    enterBtn.addEventListener('click', handleEnter);
    resetBtn.addEventListener('click', handleReset);
    secretInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleEnter();
        }
    });

    // Generate Fireflies
    function createFireflies() {
        const container = document.getElementById('fireflies-container');
        if (!container) return; // Failsafe
        const numFireflies = 35; 

        for (let i = 0; i < numFireflies; i++) {
            let firefly = document.createElement('div');
            firefly.classList.add('firefly');
            
            firefly.style.left = Math.random() * 100 + 'vw';
            firefly.style.top = Math.random() * 100 + 'vh';
            
            let duration = (Math.random() * 4 + 4) + 's'; 
            let delay = (Math.random() * 5) + 's';
            
            firefly.style.animationDuration = duration;
            firefly.style.animationDelay = delay;
            
            container.appendChild(firefly);
        }
    }

    // Handle Enter Button Click
    function handleEnter() {
        const input = secretInput.value.toLowerCase().trim();
        
        // Accepted answers
        if (input === 'you' || input === 'me' || input === 'myself') {
            errorMsg.textContent = '';
            unlock();
        } else {
            // Error handling
            errorMsg.innerHTML = '❌ Please try again or ask him on WhatsApp! 📱';
            secretInput.value = '';
            secretInput.focus();
            
            // Shake animation reset
            secretInput.style.animation = 'none';
            // Force browser reflow to restart animation
            void secretInput.offsetWidth; 
            secretInput.style.animation = 'shake 0.5s ease';
        }
    }

    // Unlock the heart
    function unlock() {
        lockScreen.classList.remove('active');
        revealScreen.classList.add('active');
        
        exponentialMessage.innerHTML = '';
        generateExponentialMessage();
    }

    // Generate exponential "I love you" message
    function generateExponentialMessage() {
        let currentMultiplier = 1;
        let displayText = '';
        
        const interval = setInterval(() => {
            displayText += 'I love you. ';
            exponentialMessage.textContent = displayText;
            currentMultiplier++;
            
            if (currentMultiplier > LOVE_MULTIPLIER) {
                clearInterval(interval);
                exponentialMessage.innerHTML += '<br><br><span style="font-size: 28px; font-weight: bold; color: #d4af37; font-family: \'Playfair Display\', serif;">More than all the stars in the sky. ✨</span>';
            }
        }, 80);
    }

    // Reset to lock screen
    function handleReset() {
        revealScreen.classList.remove('active');
        lockScreen.classList.add('active');
        secretInput.value = '';
        errorMsg.textContent = '';
        exponentialMessage.textContent = '';
        secretInput.focus();
    }
});
