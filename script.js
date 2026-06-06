// Configuration
const SECRET_CODE = 'you'; // The correct answer to the question
const LOVE_MULTIPLIER = 50; 

// DOM Elements
const secretInput = document.getElementById('secretInput');
const enterBtn = document.getElementById('enterBtn');
const lockScreen = document.getElementById('lockScreen');
const revealScreen = document.getElementById('revealScreen');
const errorMsg = document.getElementById('errorMsg');
const exponentialMessage = document.getElementById('exponentialMessage');
const resetBtn = document.getElementById('resetBtn');

// Initialize Fireflies on load
window.addEventListener('load', () => {
    secretInput.focus();
    createFireflies();
});

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
    const numFireflies = 35; // Adjust for more or less fireflies

    for (let i = 0; i < numFireflies; i++) {
        let firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        // Randomize starting positions
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = Math.random() * 100 + 'vh';
        
        // Randomize animation speed and delay
        let duration = (Math.random() * 4 + 4) + 's'; // 4s to 8s
        let delay = (Math.random() * 5) + 's';
        
        firefly.style.animationDuration = duration;
        firefly.style.animationDelay = delay;
        
        container.appendChild(firefly);
    }
}

// Handle Enter Button Click
function handleEnter() {
    const input = secretInput.value.toLowerCase().trim();
    
    // Check answer (You can add multiple valid answers here using ||)
    if (input === SECRET_CODE || input === 'me') {
        errorMsg.textContent = '';
        unlock();
    } else {
        // Updated error message per your request
        errorMsg.innerHTML = '❌ Please try again or ask him on WhatsApp! 📱';
        secretInput.value = '';
        secretInput.focus();
        
        // Add shake animation
        secretInput.style.animation = 'none';
        setTimeout(() => {
            secretInput.style.animation = 'shake 0.5s ease';
        }, 10);
    }
}

// Unlock the heart
function unlock() {
    lockScreen.classList.remove('active');
    revealScreen.classList.add('active');
    
    // Clear old message
    exponentialMessage.innerHTML = '';
    
    // Generate exponential message
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
            // Add special ending
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
