document.addEventListener('DOMContentLoaded', () => {
    const galleryTitle = document.querySelector('.gallery-title');
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.querySelector('.lightbox-close');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(gallery.querySelectorAll('.gallery-item img'));

    // Animate title
    setTimeout(() => {
        galleryTitle.style.opacity = '1';
        galleryTitle.style.transform = 'translateY(0)';
    }, 300);

    // Open lightbox
    gallery.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            currentImageIndex = parseInt(galleryItem.dataset.index);
            openLightbox(currentImageIndex);
        }
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    // Previous image
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    });

    // Next image
    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close lightbox with Escape
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            lightbox.classList.remove('show');
        }
        
        // Navigate images when lightbox is open
        if (lightbox.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightboxImage();
            }
            if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightboxImage();
            }
        }
    });

    function openLightbox(index) {
        lightboxImage.src = images[index].src;
        lightbox.classList.add('show');
    }

    function updateLightboxImage() {
        lightboxImage.src = images[currentImageIndex].src;
    }
});

