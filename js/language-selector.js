// Language selector functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelectors = document.querySelectorAll('.language-selector');
    
    languageSelectors.forEach(selector => {
        const currentLang = selector.querySelector('.lang-current');
        const langItems = selector.querySelectorAll('.lang-item');
        
        langItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                const selectedLang = this.getAttribute('data-lang');
                const selectedText = this.textContent;
                
                // Update current language display
                currentLang.textContent = selectedText;
                
                // Update active state
                langItems.forEach(langItem => {
                    langItem.classList.remove('active');
                });
                this.classList.add('active');
                
                // Here you could add actual language switching functionality
                console.log('Language switched to:', selectedLang);
            });
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-selector')) {
            // Optional: Close dropdowns if needed
        }
    });
});
