/**
 * HOPE AMS Portal - Interactive Logic
 * Handles dynamic greetings, cursor-blob interaction, and micro-animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initGreeting();
    initBlobParallax();
    initCardInteractions();
    initSearchFilter();
});

/**
 * Enables live filtering of application modules based on intuitive text input.
 */
function initSearchFilter() {
    const searchInput = document.getElementById('module-search');
    const appCards = document.querySelectorAll('.app-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        appCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            // Show card if text matches query natively
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both'; // Replay animation when shown
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/**
 * Dynamically updates the greeting bar based on the current time.
 */
function initGreeting() {
    const greetingBar = document.getElementById('greeting-bar');
    if (!greetingBar) return;

    const hour = new Date().getHours();
    let greeting = "";
    let icon = "";

    if (hour < 12) {
        greeting = "Good Morning";
        icon = "fa-sun";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
        icon = "fa-cloud-sun";
    } else {
        greeting = "Good Evening";
        icon = "fa-moon";
    }

    // Set the content with a slight fade-in effect via class
    greetingBar.innerHTML = `<i class="fas ${icon} me-2"></i> ${greeting}, Welcome to HOPE Portal`;
    greetingBar.style.opacity = "0";
    
    setTimeout(() => {
        greetingBar.style.transition = "opacity 0.8s ease-out";
        greetingBar.style.opacity = "1";
    }, 100);
}

/**
 * Adds a subtle parallax effect to the background blobs based on mouse movement.
 */
function initBlobParallax() {
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.5;
            blob.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
}

/**
 * Handles micro-interactions for the application cards.
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.app-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Potential for sound effects or additional haptic feedback
            console.log(`User inspecting: ${card.querySelector('h3').textContent}`);
        });
    });
}
