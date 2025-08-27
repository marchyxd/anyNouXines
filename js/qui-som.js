document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contacte-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const missatge = document.getElementById('missatge').value;

        // Simple form validation
        if (!nom || !email || !missatge) {
            alert('Si us plau, ompli tots els camps');
            return;
        }

        // Here you can add actual form submission logic, e.g., sending to a server
        console.log('Formulari enviat:', { nom, email, missatge });

        // Show success message
        alert('Gràcies per contactar amb nosaltres. Aviat ens posarem en contacte.');

        // Reset form
        contactForm.reset();
    });

    // "Veure més" button interaction
    const veureMesBtn = document.querySelector('.btn-veure-mes');
    if (veureMesBtn) {
        veureMesBtn.addEventListener('click', function() {
            alert('Més informació sobre col·laboradors properament.');
        });
    }
});

