// Create snowflakes
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Create twinkling stars
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.innerHTML = '⭐';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    star.style.fontSize = Math.random() * 15 + 10 + 'px';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 3000);
}

// Initialize snowflakes
function initSnow() {
    setInterval(createSnowflake, 300);
}

// Initialize stars
function initStars() {
    // Create initial stars
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createStar(), i * 200);
    }
    // Continue creating stars periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createStar();
        }
    }, 2000);
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSnow();
        initStars();
    });
} else {
    initSnow();
    initStars();
}

