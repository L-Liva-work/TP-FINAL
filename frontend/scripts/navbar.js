// Menu para viewports menores a 1024px
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links')

burger.addEventListener('click', () => {
    navLinks.classList.toggle('is-active');
});