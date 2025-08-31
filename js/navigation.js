/**
 * Script para funciones de navegación generales
 * La funcionalidad de menú móvil está en mobile-menu-fix.js
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Navigation.js loaded');

<<<<<<< HEAD
    // Selector de idiomas
=======
    if (mobileMenu && navWrapper) {
        mobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navWrapper.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            console.log('Mobile menu clicked!');
        });
    }

    // 下拉菜单交互（移动端）
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // 语言选择器交互
>>>>>>> da413b58bff9f299fb94f2354221c20899028e68
    const languageSelectors = document.querySelectorAll('.language-selector select');
    languageSelectors.forEach(selector => {
        if (!selector) return;
        
        selector.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            console.log(`Selected language: ${selectedLanguage}`);
            
            // Almacenar preferencia de idioma
            try {
                localStorage.setItem('selectedLanguage', selectedLanguage);
            } catch (error) {
                console.error('Unable to save language preference', error);
            }
        });

        // Restaurar idioma seleccionado anteriormente
        try {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                selector.value = savedLanguage;
            }
        } catch (error) {
            console.error('Unable to retrieve language preference', error);
        }
    });
});