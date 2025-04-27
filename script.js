// Toggle menu
let menuIcon = document.querySelector('#menu_icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Scroll reveal
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});
ScrollReveal().reveal('.home_content, .heading, .others-heading', { origin: 'top' });
ScrollReveal().reveal('.home_img, .portfolio_box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home_content h1, .about_img', { origin: 'left' });
ScrollReveal().reveal('.home_content p, .about_content', { origin: 'right' });

// Typed.js
const typed = new Typed('.multiple_text', {
    strings: [
        'Developer', 'Web Developer', 'UI/UX Designer', 'Freelancer',
        'Software Engineer', 'Full Stack Developer', 'System Engineer', 'Software Tester'
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Hide menu on link click
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // Logo spin and welcome alert
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.addEventListener('click', function () {
            logo.classList.add('spin-animation');
            alert("Welcome! I'm Akash, a passionate full-stack developer. Explore my work and feel free to reach out!");
        });
    }
});

// Contact form submission with instant popup
document.querySelector('.contact form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (!name.trim() || !email.trim() || !message.trim()) {
        showPopup('Please fill in all required fields!', false);
        return;
    }

    if (!validateEmail(email)) {
        showPopup('Please enter a valid email address!', false);
        return;
    }

    // Show success popup immediately
    showPopup('Message Sent!', true);

    // Send email using EmailJS
    emailjs.send('service_k5qzdba', 'template_al8rump', {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
    })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            // If sending fails, show error popup
            showPopup('Failed to send message.', false);
        });
});

// Popup function
function showPopup(message, success = false) {
    const popup = document.getElementById('popup');
    if (!popup) return;
    const popupText = popup.querySelector('p');
    const popupIcon = popup.querySelector('i');

    popupText.textContent = message;

    if (success) {
        popupIcon.className = 'bx bx-check-circle';
        popup.style.backgroundColor = 'var(--main-color)';
    } else {
        popupIcon.className = 'bx bx-error';
        popup.style.backgroundColor = '#ff4d4d';
    }

    popup.classList.remove('hidden');
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 3000);
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}