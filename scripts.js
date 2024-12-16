document.addEventListener('DOMContentLoaded', () => {
    // --- hamburger Code ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    console.log('Hamburger:', hamburger); // 
    console.log('Nav Links:', navLinks); // 

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked'); // 
            navLinks.classList.toggle('nav-active');
            console.log('nav-active class applied:', navLinks.classList.contains('nav-active')); // Debug line
        });
    } else {
        console.error('Hamburger or navLinks not found.');
    }
});

//------translucido

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'white';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    }
});


/* carousel habitaciones*/

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");
const sliderSection = document.querySelectorAll(".slider-section");

let counter = 0; // Controla la posición actual
const totalSlides = sliderSection.length; // Número total de imágenes
const slideWidth = 100; // Porcentaje de ancho de cada slide

// Inicializar el ancho dinámico del slider
slider.style.width = `${totalSlides * 100}%`;

// Intervalo automático
let autoSlide = setInterval(moveToRight, 3000);

// Función para reiniciar el intervalo (evita conflicto con clics manuales)
function resetInterval() {
    clearInterval(autoSlide);
    autoSlide = setInterval(moveToRight, 3000);
}

// Función para mover el carrusel hacia la derecha
function moveToRight() {
    if (counter >= totalSlides - 1) {
        slider.style.transition = "none"; // Elimina la transición para el reinicio
        counter = 0; // Reinicia al primer slide
        slider.style.transform = `translateX(0%)`;
        setTimeout(() => moveToRight(), 50); // Pequeño delay para que sea fluido
        return;
    }
    counter++; // Incrementa la posición
    slider.style.transition = "transform 0.6s ease"; // Agrega transición
    slider.style.transform = `translateX(-${counter * slideWidth}%)`;
}

// Función para mover el carrusel hacia la izquierda
function moveToLeft() {
    if (counter <= 0) {
        slider.style.transition = "none"; // Elimina la transición para el reinicio
        counter = totalSlides - 1; // Va al último slide
        slider.style.transform = `translateX(-${counter * slideWidth}%)`;
        setTimeout(() => moveToLeft(), 50); // Pequeño delay para que sea fluido
        return;
    }
    counter--; // Decrementa la posición
    slider.style.transition = "transform 0.8s ease"; // Agrega transición
    slider.style.transform = `translateX(-${counter * slideWidth}%)`;
}

// Eventos para los botones de navegación manual
btnLeft.addEventListener("click", () => {
    resetInterval(); // Reinicia el intervalo automático
    moveToLeft();
});

btnRight.addEventListener("click", () => {
    resetInterval(); // Reinicia el intervalo automático
    moveToRight();
});


// funciones modal

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModalButton = document.querySelector('.close');

function openModal(src) {
    modal.style.display = 'flex';
    modalImage.src = src;
}

function closeModal() {
    modal.style.display = 'none';
}

closeModalButton.addEventListener('click', closeModal);

document.querySelectorAll('.carousel-1 img').forEach(img => {
    img.addEventListener('click', (e) => {
        openModal(e.target.src);
    });
});


//carrusel Galeria

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(carousel => {
        let currentIndex = 0;
        const slides = carousel.querySelector('.carousel-slide');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        const slideDuration = 3000;

        function cloneSlides() {
            const cloneCount = slides.children.length / 2; 
            for (let i = 0; i < cloneCount; i++) {
                const clone = slides.children[i].cloneNode(true);
                slides.appendChild(clone);
            }
        }

        // mover  diapositivas
        function moveSlide(step) {
            const slideWidth = slides.children[0].offsetWidth + 10; 
            const totalSlides = slides.children.length / 2; 
            currentIndex += step;

            slides.style.transition = 'transform 0.5s ease-in-out';
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            // si supera el final volver al inicio
            if (currentIndex >= totalSlides) {
                setTimeout(() => {
                    slides.style.transition = 'none';
                    currentIndex = 0;
                    slides.style.transform = `translateX(0)`;
                }, 500);
            }

            // Si se va antes del inicio, mover al final
            if (currentIndex < 0) {
                setTimeout(() => {
                    slides.style.transition = 'none';
                    currentIndex = totalSlides - 1;
                    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                }, 500);
            }
        }

        // movimiento auto
        function autoSlide() {
            moveSlide(1);
            setTimeout(autoSlide, slideDuration);
        }

        // inicializa carrusel
        function initCarousel() {
            cloneSlides();
            setTimeout(autoSlide, slideDuration); 

            // Soporte táctil
            let startX;
            slides.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX;
            });

            slides.addEventListener('touchend', (e) => {
                const currentX = e.changedTouches[0].pageX;
                const threshold = 50; // Mínima distancia para detectar swipe
                if (startX - currentX > threshold) moveSlide(1);
                else if (currentX - startX > threshold) moveSlide(-1);
            });
        }

        // Ejecutar inicialización para el carrusel actual
        if (slides) initCarousel();
    });
});
