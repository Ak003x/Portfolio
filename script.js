//!-----------------------------------toggle menu------------------------------------->

let menuIcon = document.querySelector('#menu_icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ! scroll section active link------------------------------------------------------->

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
};

//!-----------------------------------sticky navbar------------------------------------->

let header = document.querySelector('header');
window.onscroll = () => {
    header.classList.toggle('sticky', window.scrollY > 100);
};

// ! scroll reveal------------------------------------------------------->

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

// ! typed js------------------------------------------------------->

const typed = new Typed('.multiple_text', {
    strings: ['Developer', 'Web Developer', 'UI/UX Designer', 'Freelancer', 'Software Engineer', 'Full Stack Developer', 'System Engineer', 'Software Tester'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

//!-----------------------------------hide menu on link click------------------------------------->

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // Add event listener to the logo
    const logo = document.querySelector('.logo img');
    logo.addEventListener('click', function () {
        logo.classList.add('spin-animation');
        alert("Welcome! I'm Akash, a passionate full-stack developer. Explore my work and feel free to reach out!");
    });
});

//!-----------------------------------popup with validation------------------------------------->

// Add event listener to the form submission
document.querySelector('.contact form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form fields
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Validate fields
    if (!name.trim() || !email.trim() || !message.trim()) {
        showPopup('Please fill in all required fields!', false);
        return;
    }

    if (!validateEmail(email)) {
        showPopup('Please enter a valid email address!', false);
        return;
    }

    // Send email using EmailJS
    emailjs.send('service_k5qzdba', 'template_al8rump', {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
    })
        .then(() => {
            showPopup('Message Sent!', true); // Show success popup
        })
        .catch((error) => {
            console.error('EmailJS Error:', error); // Log the error to the console
            showPopup('Failed to send message.', false); // Show error popup
        });
});

// Function to show popup
function showPopup(message, success = false) {
    const popup = document.getElementById('popup');
    const popupText = popup.querySelector('p');
    const popupIcon = popup.querySelector('i');

    // Set the popup message
    popupText.textContent = message;

    // Set the icon and background color based on success or error
    if (success) {
        popupIcon.className = 'bx bx-check-circle'; // Success icon
        popup.style.backgroundColor = 'var(--main-color)'; // Success color
    } else {
        popupIcon.className = 'bx bx-error'; // Error icon
        popup.style.backgroundColor = '#ff4d4d'; // Red for errors
    }

    // Show the popup with animation
    popup.classList.remove('hidden');
    popup.classList.add('show');

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 3000);
}

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}