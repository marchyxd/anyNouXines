// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Better selection of images for the carousel
    const images = [
        'assets/images/2025/1610_Foto.1742648999 1.jpg',
        'assets/images/2025/1666_Foto.1742649032.jpg',
        'assets/images/2025/1790_Foto.1742649084 1.jpg',
        'assets/images/2025/1908_Foto.1742649139 1.jpg',
        'assets/images/any.xines/final.jpg'
    ];

    const VISIBLE = 5;
    const HALF = Math.floor(VISIBLE / 2);

    const track = document.getElementById('track');
    const dotsWrap = document.getElementById('dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const srStatus = document.getElementById('sr-status');

    // Exit if carousel elements don't exist
    if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

    // Generate 5 fixed slots
    const slots = Array.from({length: VISIBLE}, () => {
        const el = document.createElement('figure');
        el.className = 'slot';
        el.setAttribute('role', 'listitem');
        el.style.margin = '0';
        track.appendChild(el);
        return el;
    });

    // Generate dots
    images.forEach((_, i) => {
        const d = document.createElement('span');
        d.className = 'dot';
        d.role = 'button';
        d.tabIndex = 0;
        d.ariaLabel = `Anar a l'element ${i+1}`;
        d.addEventListener('click', () => goTo(i));
        d.addEventListener('keydown', (e) => { 
            if(e.key === 'Enter' || e.key === ' '){ 
                goTo(i); 
            }
        });
        dotsWrap.appendChild(d);
    });

    let index = 0;

    function mod(n, m){ return ((n % m) + m) % m; }

    function setSlotStyle(el, realIdx) {
        // Create image element for better control
        el.innerHTML = '';
        const img = document.createElement('img');
        img.src = images[realIdx];
        img.alt = `Carousel image ${realIdx + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        el.appendChild(img);
    }

    // Define positions for large screens - reduced spacing between images
    let positions = [
        { x: -460, scale: 0.9, z: 3 },  // leftmost
        { x: -230, scale: 0.9, z: 4 },  // left
        { x: 0, scale: 1.25, z: 5 },    // center - increased scale from 1.1 to 1.25
        { x: 230, scale: 0.9, z: 4 },   // right
        { x: 460, scale: 0.9, z: 3 }    // rightmost
    ];

    function layout() {
        // Apply responsive positions based on screen width
        updatePositions();
        
        for(let i = 0; i < VISIBLE; i++) {
            const el = slots[i];
            const pos = positions[i];
            const realIdx = mod(index + i - HALF, images.length);
            
            // Apply fixed positioning
            el.style.transform = `translate(calc(-50% + ${pos.x}px), -50%) scale(${pos.scale})`;
            el.style.zIndex = pos.z;
            el.classList.toggle('active', i === HALF);
            
            setSlotStyle(el, realIdx);
        }
        
        updateDots();
        
        if (srStatus) {
            srStatus.textContent = `Element ${index+1} of ${images.length}`;
        }
    }
    
    function updatePositions() {
        // Adjust positions based on screen width - reduced distances between images
        const width = window.innerWidth;
        
        if (width <= 640) {
            positions = [
                { x: -260, scale: 0.9, z: 3 },
                { x: -130, scale: 0.9, z: 4 },
                { x: 0, scale: 1.25, z: 5 },    // increased scale
                { x: 130, scale: 0.9, z: 4 },
                { x: 260, scale: 0.9, z: 3 }
            ];
        } else if (width <= 800) {
            positions = [
                { x: -360, scale: 0.9, z: 3 },
                { x: -180, scale: 0.9, z: 4 },
                { x: 0, scale: 1.25, z: 5 },    // increased scale
                { x: 180, scale: 0.9, z: 4 },
                { x: 360, scale: 0.9, z: 3 }
            ];
        } else if (width <= 1100) {
            positions = [
                { x: -420, scale: 0.9, z: 3 },
                { x: -210, scale: 0.9, z: 4 },
                { x: 0, scale: 1.25, z: 5 },    // increased scale
                { x: 210, scale: 0.9, z: 4 },
                { x: 420, scale: 0.9, z: 3 }
            ];
        } else {
            positions = [
                { x: -460, scale: 0.9, z: 3 },
                { x: -230, scale: 0.9, z: 4 },
                { x: 0, scale: 1.25, z: 5 },    // increased scale
                { x: 230, scale: 0.9, z: 4 },
                { x: 460, scale: 0.9, z: 3 }
            ];
        }
    }

    function goTo(i){ index = mod(i, images.length); layout(); }
    function next(){ goTo(index + 1); }
    function prev(){ goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    
    document.addEventListener('keydown', (e) => { 
        if(e.key === 'ArrowRight') next(); 
        if(e.key === 'ArrowLeft') prev(); 
    });

    // Drag / Swipe
    let startX = null;
    track.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    window.addEventListener('pointerup', (e) => {
        if(startX === null) return;
        const dx = e.clientX - startX;
        startX = null;
        if(Math.abs(dx) < 24) return;
        dx < 0 ? next() : prev();
    });

    function updateDots() {
        const dots = dotsWrap.querySelectorAll('.dot');
        dots.forEach((d,i) => d.setAttribute('aria-current', i===index));
    }

    // Auto-play
    let timer = setInterval(next, 3500);
    ['pointerdown','keydown','click','focusin'].forEach(evt => {
        document.addEventListener(evt, () => { 
            clearInterval(timer); 
            timer = null; 
        }, { once: true });
    });

    // Add window resize listener to maintain layout
    window.addEventListener('resize', layout);

    // Initialize layout
    layout();
});