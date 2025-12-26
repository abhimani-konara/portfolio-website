document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sparkleBtn = document.querySelector('.btn-sparkle');
sparkleBtn.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '3px';
    sparkle.style.height = '3px';
    sparkle.style.background = 'white';
    sparkle.style.left = e.offsetX + 'px';
    sparkle.style.top = e.offsetY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.borderRadius = '50%';
    sparkle.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(15)', opacity: 0 }
    ], { duration: 600 });
    sparkleBtn.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Skill bar animation
            const fills = entry.target.querySelectorAll('.fill');
            fills.forEach(fill => fill.style.width = fill.getAttribute('data-width'));
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about-flex, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});