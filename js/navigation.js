/**
 * Script para funciones de navegación generales
 * La funcionalidad de menú móvil está en mobile-menu-fix.js
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Navigation.js loaded');

    // Selector de idiomas
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