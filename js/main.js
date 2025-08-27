// Smooth scroll for navigation links with offset
// (no inline onclicks; we'll attach listeners when DOM is ready)

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});


// Dropdown para dispositivos móviles
const dropdownItems = document.querySelectorAll('.dropdown');
dropdownItems.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    
    // Ensure no arrow is added
    if (dropdownLink) {
        dropdownLink.style.position = 'relative';
        dropdownLink.style.paddingRight = '0';
    }

    dropdownLink.addEventListener('click', (e) => {
        // Solo prevenir el comportamiento por defecto en móvil
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Cerrar otros dropdowns
            dropdownItems.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    });
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdownItems.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});


// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Animate on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
            section.classList.add('animate');
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('¡Mensaje enviado! Gracias por contactar.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const momentsCarousel = document.querySelector('.moments-section');
    if (!momentsCarousel) return;

    // Define image URLs for the carousel with relative paths
    const images = [
        'assets/images/2025.jpg',
        'assets/images/2023.webp',
        'assets/images/2022.png',
        'assets/images/2021.jpeg',
        'assets/images/2017.jpg'
    ];

    // Verify image paths
    console.log('Carousel Images:', images);

    const track = momentsCarousel.querySelector('.moments-wrapper');
    const dotsWrap = momentsCarousel.querySelector('.moments-dots');

    // Circular Carousel Setup
    const VISIBLE = 5;
    const HALF = (VISIBLE - 1) / 2;

    // Prepare track
    track.classList.add('track');
    track.setAttribute('role', 'list');
    track.innerHTML = ''; // Clear existing items

    // Create slots
    const slots = Array.from({length: VISIBLE}, () => {
        const el = document.createElement('div');
        el.className = 'slot';
        el.setAttribute('role', 'listitem');
        track.appendChild(el);
        return el;
    });

    // Create navigation controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls';
    controlsDiv.innerHTML = `
        <button class="btn prev" title="Previous" aria-label="Previous">❮</button>
        <button class="btn next" title="Next" aria-label="Next">❯</button>
    `;
    momentsCarousel.appendChild(controlsDiv);

    // Clear and recreate dots
    dotsWrap.innerHTML = '';
    images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.role = 'button';
        dot.tabIndex = 0;
        dot.ariaLabel = `Go to slide ${i+1}`;
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    const prevBtn = momentsCarousel.querySelector('.prev');
    const nextBtn = momentsCarousel.querySelector('.next');
    const dots = dotsWrap.querySelectorAll('.dot');
    const srStatus = document.createElement('p');
    srStatus.className = 'visually-hidden';
    srStatus.setAttribute('aria-live', 'polite');
    momentsCarousel.appendChild(srStatus);

    let index = 0;

    function mod(n, m) { return ((n % m) + m) % m; }

    function setSlotStyle(el, realIdx) {
        const img = new Image();
        img.onload = () => {
            el.style.background = `center/cover no-repeat url(${images[realIdx]})`;
            console.log(`Image loaded: ${images[realIdx]}`);
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${images[realIdx]}`);
            el.style.background = '#ddd'; // Fallback background
        };
        img.src = images[realIdx];
    }

    function layout() {
        const step = 120;
        for (let i = -HALF; i <= HALF; i++) {
            const el = slots[i + HALF];
            const x = i * step;
            const realIdx = mod(index + i, images.length);

            // Position and scale
            el.style.transform = `translate(calc(-50% + ${x}px), -50%) scale(${i === 0 ? 1.08 : 1})`;
            el.style.zIndex = (VISIBLE + 1) - Math.abs(i);
            el.classList.toggle('active', i === 0);

            setSlotStyle(el, realIdx);
        }
        updateDots();
        srStatus.textContent = `Slide ${index + 1} of ${images.length}`;
    }

    function goTo(i) {
        index = mod(i, images.length);
        layout();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    // Event Listeners
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
    }

    // Initial layout
    layout();

    // Auto-play with pause on interaction
    let timer = setInterval(next, 2800);
    ['pointerdown', 'keydown', 'click', 'focusin'].forEach(evt => {
        document.addEventListener(evt, () => {
            clearInterval(timer);
            timer = null;
        }, { once: true });
    });
});