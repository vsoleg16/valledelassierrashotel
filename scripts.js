let currentIndex = 0;
const slideDuration = 3000; // Duración del desplazamiento automático en milisegundos

// Duplicar las primeras imágenes al final del carrusel para efecto de bucle infinito
function cloneSlides() {
    const slides = document.querySelector('.carousel-slide');
    const totalSlides = slides.children.length;

    for (let i = 0; i < 4; i++) {
        const clone = slides.children[i].cloneNode(true);
        slides.appendChild(clone);
    }
}

function moveSlide(step) {
    const slides = document.querySelector('.carousel-slide');
    const totalSlides = slides.children.length;
    const slideWidth = slides.children[0].offsetWidth + 10; // Incluye el margen

    currentIndex += step;

    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    if (currentIndex >= totalSlides / 2) {
        setTimeout(() => {
            slides.style.transition = 'none';
            currentIndex = 0;
            slides.style.transform = `translateX(0)`;
        }, 500);
    }
    if (currentIndex < 0) {
        setTimeout(() => {
            slides.style.transition = 'none';
            currentIndex = totalSlides / 2 - 1;
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }, 500);
    }
}

function autoSlide() {
    moveSlide(1);
    setTimeout(autoSlide, slideDuration);
}

document.addEventListener('DOMContentLoaded', () => {
    cloneSlides();
    autoSlide();
});

// Añade el soporte táctil para navegación móvil
let startX;
let currentX;

document.querySelector('.carousel-slide').addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
});

document.querySelector('.carousel-slide').addEventListener('touchmove', (e) => {
    currentX = e.touches[0].pageX;
});

document.querySelector('.carousel-slide').addEventListener('touchend', () => {
    const threshold = 50; // Distancia mínima en píxeles para considerar un deslizamiento
    if (startX - currentX > threshold) {
        moveSlide(1); // Desliza hacia la izquierda
    } else if (currentX - startX > threshold) {
        moveSlide(-1); // Desliza hacia la derecha
    }
});

