// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqToggles = document.querySelectorAll('.faq-toggle');

    // Function to toggle FAQ item
    function toggleFaq(item) {
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');
        
        // Close all items first
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
            const answerElement = faqItem.querySelector('.faq-answer');
            answerElement.style.height = '0px';
        });
        
        // If the clicked item wasn't active before, open it
        if (!isActive) {
            item.classList.add('active');
            const answerHeight = answer.scrollHeight;
            answer.style.height = answerHeight + 'px';
        }
    }

    // Add click event to FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => toggleFaq(item));
    });

    // Add click event to toggle buttons specifically
    faqToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the event from bubbling up
            toggleFaq(faqItems[index]);
        });
    });
});

