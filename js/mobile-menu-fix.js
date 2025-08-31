// Script específico para arreglar el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu fix script loaded');
    
    // Seleccionar el botón del menú móvil y el contenedor del menú
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    if (mobileMenuBtn && navWrapper) {
        console.log('Mobile menu elements found');
        
        // Asegurarse de que el botón sea visible en móvil
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'flex';
        }
        
        // Agregar evento de clic al botón del menú
        mobileMenuBtn.addEventListener('click', function(e) {
            console.log('Mobile menu button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Alternar la clase active para mostrar/ocultar el menú
            navWrapper.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Manejar los dropdowns en móvil
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            
            if (dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    } else {
        console.error('Mobile menu elements not found');
    }
});
