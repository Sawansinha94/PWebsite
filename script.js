// Configuration
const SECRET_CODE = 'Ms Jugnu Darling'; // Change this to your secret code
const LOVE_MULTIPLIER = 100; // How many times the message multiplies

// DOM Elements
const secretInput = document.getElementById('secretInput');
const enterBtn = document.getElementById('enterBtn');
const lockScreen = document.getElementById('lockScreen');
const revealScreen = document.getElementById('revealScreen');
const errorMsg = document.getElementById('errorMsg');
const exponentialMessage = document.getElementById('exponentialMessage');
const resetBtn = document.getElementById('resetBtn');

// Event Listeners
enterBtn.addEventListener('click', handleEnter);
resetBtn.addEventListener('click', handleReset);
secretInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleEnter();
    }
});

// Handle Enter Button Click
function handleEnter() {
    const input = secretInput.value.toLowerCase().trim();
    
    if (input === SECRET_CODE) {
        errorMsg.textContent = '';
        unlock();
    } else {
        errorMsg.textContent = '❌ Wrong code! Try again...';
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
    
    // Generate exponential message
    generateExponentialMessage();
    
    // Create heart burst animation
    createHeartBurst();
    
    // Play celebration
    celebrate();
}

// Generate exponential "I love you" message
function generateExponentialMessage() {
    let message = 'I love you';
    
    // Show progressive multiplication
    let currentMultiplier = 1;
    let displayText = '';
    
    const interval = setInterval(() => {
        displayText += 'I love you ';
        exponentialMessage.textContent = displayText;
        currentMultiplier++;
        
        if (currentMultiplier > LOVE_MULTIPLIER) {
            clearInterval(interval);
            // Add special ending
            exponentialMessage.innerHTML += '<br><br><span style="font-size: 32px; font-weight: bold;">INFINITELY ♾️</span>';
        }
    }, 50);
}

// Create heart burst effect
function createHeartBurst() {
    const hearts = ['💖', '💕', '💗', '💓', '💞', '💘', '💝', '❤️'];
    const burstContainer = document.querySelector('.hearts-burst');
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.opacity = '1';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            // Random direction
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 300;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            heart.style.setProperty('--tx', tx + 'px');
            heart.style.setProperty('--ty', ty + 'px');
            heart.style.animation = 'burst 2s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
}

// Celebration effects
function celebrate() {
    // Add confetti-like effect with multiple heart bursts
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createHeartBurst();
        }, i * 1500);
    }
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

// Auto-focus input on load
window.addEventListener('load', () => {
    secretInput.focus();
});
