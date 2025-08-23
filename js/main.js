// Wait for the entire HTML document to be loaded before running any scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Form submission handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const formData = new FormData(this);
            const successMessage = document.getElementById('successMessage');
            
            fetch('https://formspree.io/f/xanbvkzv', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    successMessage.classList.remove('d-none');
                    this.reset();
                    setTimeout(() => {
                        successMessage.classList.add('d-none');
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please try again later.');
            });
        });
    }

    // --- 2. Smooth scrolling for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    // Only run this if both the navbar and hero section exist
    if (navbar && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > (heroSection.offsetHeight - navbar.offsetHeight)) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // --- 4. Experience timeline toggle ---
    const toggleBtn = document.getElementById('experience-toggle-btn');
    // Only run this if the button exists
    if (toggleBtn) {
        const collapsibleItems = document.querySelectorAll('.collapsible-experience');
        toggleBtn.addEventListener('click', function() {
            this.classList.toggle('open');
            collapsibleItems.forEach(item => {
                item.classList.toggle('show');
            });
        });
    }

});