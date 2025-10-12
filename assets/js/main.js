// ===== NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== TYPEWRITER EFFECT =====
const typewriterElement = document.getElementById('heroSubtitle');
const phrases = [
    "Onde pensamentos se tornam palavras...",
    "E palavras se tornam mundos...",
    "Entre sombras e luz, a verdade sussurra...",
    "Fragmentos de uma alma em busca de sentido..."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterSpeed = 80;

function typeWriter() {
    if (!typewriterElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typewriterSpeed = 40;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typewriterSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typewriterSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typewriterSpeed = 500;
    }
    
    setTimeout(typeWriter, typewriterSpeed);
}

// Start typewriter on page load
if (typewriterElement) {
    setTimeout(typeWriter, 1000);
}

// ===== ROTATING QUOTES =====
const quotes = [
    {
        text: "A morte dança, sim. Mas nem todos têm olhos para vê-la.",
        author: "— Lilith, Grimório Vol. I"
    },
    {
        text: "Você não está sozinho. Está superlotado de fantasmas que compartilham teu nome.",
        author: "— Grimório Vol. II"
    },
    {
        text: "No espelho, não vejo reflexo. Vejo todas as versões de mim que escolhi esquecer.",
        author: "— Espelhos que Mentem"
    },
    {
        text: "Até que o gelo derreta, e a verdade emerja das profundezas.",
        author: "— Soneca"
    },
    {
        text: "A dor não é o fim. É o portal para o renascimento.",
        author: "— Lilith"
    }
];

let currentQuoteIndex = 0;

function rotateQuote() {
    const quoteText = document.getElementById('rotatingQuote');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (!quoteText || !quoteAuthor) return;
    
    // Fade out
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteText.textContent = quotes[currentQuoteIndex].text;
        quoteAuthor.textContent = quotes[currentQuoteIndex].author;
        
        // Fade in
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 500);
}

// Initialize first quote
if (document.getElementById('rotatingQuote')) {
    const quoteText = document.getElementById('rotatingQuote');
    const quoteAuthor = document.getElementById('quoteAuthor');
    quoteText.textContent = quotes[0].text;
    quoteAuthor.textContent = quotes[0].author;
    quoteText.style.transition = 'opacity 0.5s ease';
    quoteAuthor.style.transition = 'opacity 0.5s ease';
    
    // Rotate every 6 seconds
    setInterval(rotateQuote, 6000);
}

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.classList.contains('counted')) {
                animateCounter(counter);
                counter.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

// Observe all counters
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// ===== FADE IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in-up');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===== PARTICLES.JS CONFIGURATION MEGA ULTRA =====
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 150, // AUMENTADO de 80 para 150
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#d946ff', '#ffd700', '#00ffff', '#ff006e', '#00ff9f'] // CORES MAIS VIVAS
            },
            shape: {
                type: ['circle', 'triangle'], // FORMAS VARIADAS
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.8, // AUMENTADO de 0.5 para 0.8
                random: true,
                anim: {
                    enable: true,
                    speed: 1.5,
                    opacity_min: 0.3, // AUMENTADO de 0.1 para 0.3
                    sync: false
                }
            },
            size: {
                value: 5, // AUMENTADO de 3 para 5
                random: true,
                anim: {
                    enable: true,
                    speed: 3,
                    size_min: 1, // AUMENTADO de 0.1 para 1
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 180, // AUMENTADO de 150 para 180
                color: '#ffd700', // DOURADO ao invés de roxo
                opacity: 0.5, // AUMENTADO de 0.2 para 0.5
                width: 2 // AUMENTADO de 1 para 2
            },
            move: {
                enable: true,
                speed: 2, // AUMENTADO de 1 para 2
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 800,
                    rotateY: 1600
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: ['grab', 'bubble'] // ADICIONADO bubble
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200, // AUMENTADO de 140 para 200
                    line_linked: {
                        opacity: 0.8 // AUMENTADO de 0.5 para 0.8
                    }
                },
                bubble: {
                    distance: 250,
                    size: 8,
                    duration: 2,
                    opacity: 1
                },
                push: {
                    particles_nb: 6 // AUMENTADO de 4 para 6
                }
            }
        },
        retina_detect: true
    });
}

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
        // For now, just show a success message
        
        alert(`✨ Obrigado por se inscrever! Em breve você receberá fragmentos de verdade em ${email}`);
        newsletterForm.reset();
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== CURRENT YEAR IN FOOTER =====
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===== SCROLL INDICATOR HIDE ON SCROLL =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 5px 40px rgba(176, 38, 255, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 5px 30px rgba(176, 38, 255, 0.3)';
        }
    });
}

// ===== MYSTICAL CURSOR EFFECT (Optional) =====
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-sparkle';
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    
    // Random color from theme
    const colors = ['#b026ff', '#ffd700', '#00f5ff', '#ff006e'];
    cursor.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add cursor sparkle CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .cursor-sparkle {
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
        animation: sparkle-fade 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes sparkle-fade {
        0% {
            transform: scale(1) translateY(0);
            opacity: 0.7;
        }
        100% {
            transform: scale(0) translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== CONSOLE MESSAGE =====
console.log('%c🖤 Memeternum 🖤', 'font-size: 24px; font-weight: bold; color: #b026ff; text-shadow: 0 0 10px #b026ff;');
console.log('%cOnde pensamentos se tornam palavras, e palavras se tornam mundos.', 'font-size: 14px; color: #ffd700;');
console.log('%c"Até que o gelo derreta." — Soneca', 'font-size: 12px; font-style: italic; color: #00f5ff;');

