// Essential JavaScript for HTML functionality
const emojiCursor = document.getElementById('emoji-cursor');
let rotation = 0;
let scale = 1;

document.addEventListener('mousemove', (e) => {
    // Calculate position with offset
    const x = e.clientX - 16;
    const y = e.clientY - 16;
    
    // Calculate movement speed
    const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
    
    // Rotate based on movement
    rotation += speed * 0.2;
    
    // Scale based on movement (between 0.8 and 1.2)
    scale = 1 + Math.min(speed * 0.01, 0.2);
    
    // Apply transform without delay
    requestAnimationFrame(() => {
        emojiCursor.style.transform = `
            translate(${x}px, ${y}px)
            rotate(${rotation}deg)
            scale(${scale})
        `;
    });
});
// Add after existing code
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Creative Coder 💻',
        'Frontend Developer 👩🏻‍💻',
        'UI/UX Designer 🎨',
        'Game Developer 🎮'
    ];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function type() {
        const phrase = phrases[currentPhrase];
        // Use Array.from to properly handle emoji characters
        const characters = Array.from(phrase);
        
        if (isDeleting) {
            // Get substring using the array of characters
            typingText.textContent = characters.slice(0, currentChar - 1).join('');
            currentChar--;
        } else {
            // Get substring using the array of characters
            typingText.textContent = characters.slice(0, currentChar + 1).join('');
            currentChar++;
        }

        if (!isDeleting && currentChar === characters.length) {
            isDeleting = true;
            setTimeout(type, 1500); // Pause at end
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(type, 500); // Pause before next word
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}
// Initialize typing animation
document.addEventListener('DOMContentLoaded', initTypingAnimation);
// Add after existing code
function init3DCards() {
    const cards = document.querySelectorAll('.project-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduced rotation values for subtler effect
            const rotateX = ((y - centerY) / centerY) * 5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

init3DCards();
// Add after existing code
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-3d');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            
            btn.style.transform = `
                translate(${x*0.3}px, ${y*0.3}px)
                scale(1.1)
            `;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

initMagneticButtons();

// Reset rotation when mouse stops
let timeout;
document.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        rotation = 0;
        scale = 1;
        emojiCursor.style.transform = `
            translate(${event.clientX - 16}px, ${event.clientY - 16}px)
            rotate(0deg)
            scale(1)
        `;
    }, 100);
});
// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a small delay to ensure smooth animation
            setTimeout(() => {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const level = bar.parentElement.parentElement.getAttribute('data-level');
                    if (level) {
                        requestAnimationFrame(() => {
                            bar.style.width = `${level}%`;
                        });
                    }
                });
            }, 100);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
});

// Observe skill sections
document.querySelectorAll('.skill-3d').forEach(skill => {
    skillObserver.observe(skill);
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Message sent successfully! I\'ll get back to you soon.');
        this.reset();
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-3d');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// 3D Background Canvas (simple animated background)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Simple particle system for background
const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Connect nearby particles
    particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
            const distance = Math.sqrt(
                Math.pow(particle1.x - particle2.x, 2) + 
                Math.pow(particle1.y - particle2.y, 2)
            );
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle1.x, particle1.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animate);
}

animate();

// Add loading screen fade out
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    }
});


// Mouse parallax effect for 3D elements
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // Apply parallax to cube
    const cube = document.querySelector('.rotating-cube');
    if (cube) {
        cube.style.transform = `rotateX(${mouseY * 20}deg) rotateY(${mouseX * 20}deg)`;
    }
    
    // Apply parallax to floating shapes
    document.querySelectorAll('.shape-3d').forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});
console.log('3D Portfolio loaded successfully!');
// ...existing code...