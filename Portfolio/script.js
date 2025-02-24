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
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // Add event listener to the logo
    const logo = document.querySelector('.logo img');
    logo.addEventListener('click', function() {
        logo.classList.add('spin-animation');
        alert("Welcome! I'm Akash, a passionate full-stack developer. Explore my work and feel free to reach out!");
    });
});