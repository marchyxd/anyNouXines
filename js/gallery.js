// Reusable Gallery and Lightbox Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Gallery Scroll Functionality
    const galleries = document.querySelectorAll('.gallery-container');
    galleries.forEach(gallery => {
        let isDown = false;
        let startX;
        let scrollLeft;

        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.classList.add('active');
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.classList.remove('active');
        });

        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.classList.remove('active');
        });

        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });

        // Touch support for mobile devices
        let touchStartX = 0;
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        gallery.addEventListener('touchmove', (e) => {
            const touchMoveX = e.touches[0].clientX;
            const diff = touchStartX - touchMoveX;
            gallery.scrollLeft += diff;
            touchStartX = touchMoveX;
        });
    });

    // Lightbox Functionality
    const lightboxContainers = document.querySelectorAll('.gallery-container');
    lightboxContainers.forEach(container => {
        const galleryItems = container.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeLightbox = document.querySelector('.lightbox-close');
        const prevButton = document.querySelector('.lightbox-prev');
        const nextButton = document.querySelector('.lightbox-next');

        let currentImageIndex = 0;
        const images = Array.from(container.querySelectorAll('.gallery-item img'));

        // Open lightbox
        container.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                currentImageIndex = parseInt(galleryItem.dataset.index);
                openLightbox(currentImageIndex);
            }
        });

        // Close lightbox
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                lightbox.classList.remove('show');
            });
        }

        // Previous and Next Image Navigation
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightboxImage();
            });

            nextButton.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightboxImage();
            });
        }

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox && lightbox.classList.contains('show')) {
                if (e.key === 'Escape') {
                    lightbox.classList.remove('show');
                }
                
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
});
