document.addEventListener('DOMContentLoaded', () => {

    // Global Modal Toggle Function
    window.toggleModal = (show) => {
        const modal = document.getElementById('preOrderModal');
        const content = document.getElementById('modalContent');

        if (show) {
            modal.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            modal.classList.add('opacity-0');
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300); // Match transition duration
            document.body.style.overflow = '';
        }
    };


    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Make it global so inline onclicks work
    window.toggleMobileMenu = () => {
        const isOpen = !mobileMenu.classList.contains('hidden');

        if (isOpen) {
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.remove('hidden');
            // Small delay to allow display:block to apply
            requestAnimationFrame(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
            });
            document.body.style.overflow = 'hidden';
        }
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', window.toggleMobileMenu);
    }

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Navbar background on scroll - UPDATED FOR WHITE THEME
    /* Navbar background on scroll - DISABLED to keep static black header as requested by user
    // const navbar = document.getElementById('navbar');
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 50) {
    //         navbar.classList.add('shadow-md', 'bg-white/95');
    //         navbar.classList.remove('bg-white/90', 'backdrop-blur-md');
    //     } else {
    //         navbar.classList.remove('shadow-md', 'bg-white/95');
    //         navbar.classList.add('bg-white/90', 'backdrop-blur-md');
    //     }
    // });
    */

    // EmailJS Initialization
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: "ZN0xZ4GEXBXJQPkPC",
        });
    }

    // Handle Confirm Interest Form
    // (This targets both index.html and vigilante5k.html modals)
    const interestForm = document.getElementById('interestForm');
    if (interestForm) {
        interestForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btnText = document.getElementById('interestBtnText');
            const originalText = btnText.innerText;
            btnText.innerText = 'Sending...';

            const templateParams = {
                name: document.getElementById('interestName').value,
                mobile: document.getElementById('interestMobile').value,
                email: document.getElementById('interestEmail').value
            };

            emailjs.send('service_j7jlk82', 'template_ll47a5m', templateParams)
                .then(function (response) {
                    alert('We have received your request! A specialist will contact you shortly.');
                    interestForm.reset();
                    if (typeof window.toggleModal === 'function') {
                        window.toggleModal(false);
                    }
                }, function (error) {
                    alert('Failed to send request. Please try again later.');
                    console.error('EmailJS Error:', error);
                })
                .finally(function () {
                    btnText.innerText = originalText;
                });
        });
    }

    // Handle Confirm Booking Form
    // (This targets test-drive.html form)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btnText = document.getElementById('bookingBtnText');
            const originalText = btnText.innerText;
            btnText.innerText = 'Sending...';

            const firstName = document.getElementById('bookingFirstName').value;
            const lastName = document.getElementById('bookingLastName').value;
            const templateParams = {
                name: firstName + ' ' + lastName,
                mobile: document.getElementById('bookingMobile').value,
                email: document.getElementById('bookingEmail').value
            };

            emailjs.send('service_j7jlk82', 'template_ll47a5m', templateParams)
                .then(function (response) {
                    alert('Booking request submitted! We will contact you shortly.');
                    bookingForm.reset();
                }, function (error) {
                    alert('Failed to send request. Please try again later.');
                    console.error('EmailJS Error:', error);
                })
                .finally(function () {
                    btnText.innerText = originalText;
                });
        });
    }

});
