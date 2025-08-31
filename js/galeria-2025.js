document.addEventListener('DOMContentLoaded', () => {
    const galleryTitle = document.querySelector('.gallery-title');
    const galleryDescription = document.querySelector('.gallery-description');
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(gallery.querySelectorAll('.gallery-item img'));

    // Animate title and description with staggered timing
    setTimeout(() => {
        galleryTitle.style.opacity = '1';
        galleryTitle.style.transform = 'translateY(0)';
    }, 300);
    
    // Animar la aparición de las imágenes
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Añadir efecto de fade-in
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + Math.random() * 500);
    });

    // Open lightbox
    gallery.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            currentImageIndex = parseInt(galleryItem.dataset.index);
            openLightbox(currentImageIndex);
        }
    });

    // Previous image
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImageWithAnimation();
    });

    // Next image
    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImageWithAnimation();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close lightbox with Escape
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightboxWithAnimation();
        }
        
        // Navigate images when lightbox is open
        if (lightbox.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightboxImageWithAnimation();
            }
            if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightboxImageWithAnimation();
            }
        }
    });

    // También cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxWithAnimation();
        }
    });

    function openLightbox(index) {
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            lightboxImage.src = images[index].src;
            lightbox.classList.add('show');
            
            // Mostrar la imagen con animación
            setTimeout(() => {
                lightboxImage.style.opacity = '1';
                lightboxImage.style.transform = 'scale(1)';
            }, 100);
        }, 50);
    }

    function updateLightboxImageWithAnimation() {
        // Ocultar la imagen actual
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        // Cambiar la imagen y mostrarla con animación
        setTimeout(() => {
            lightboxImage.src = images[currentImageIndex].src;
            
            setTimeout(() => {
                lightboxImage.style.opacity = '1';
                lightboxImage.style.transform = 'scale(1)';
            }, 100);
        }, 300);
    }

    function closeLightboxWithAnimation() {
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            lightbox.classList.remove('show');
        }, 300);
    }
});

