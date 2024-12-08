document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Code ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    console.log('Hamburger:', hamburger); // Debug line
    console.log('Nav Links:', navLinks); // Debug line

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked'); // Debug line
            navLinks.classList.toggle('nav-active');
            console.log('nav-active class applied:', navLinks.classList.contains('nav-active')); // Debug line
        });
    } else {
        console.error('Hamburger or navLinks not found.');
    }
});

window.addEventListener('scroll', function () { 
    const navbar = document.querySelector('.navbar'); 
    if (window.scrollY > 50) { 
        navbar.style.backgroundColor = 'white';
     } else { 
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; 
    } 
});

/*carrusel*/

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(carousel => {
        let currentIndex = 0;
        const slides = carousel.querySelector('.carousel-slide');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        const slideDuration = 3000;

        // Clonar las imágenes al final para loop infinito
        function cloneSlides() {
            const cloneCount = slides.children.length / 2; // Solo clonar las originales
            for (let i = 0; i < cloneCount; i++) {
                const clone = slides.children[i].cloneNode(true);
                slides.appendChild(clone);
            }
        }

        // Función para mover las diapositivas
        function moveSlide(step) {
            const slideWidth = slides.children[0].offsetWidth + 10; // Ajusta para incluir el margen
            const totalSlides = slides.children.length / 2; // Originales, sin clones
            currentIndex += step;

            slides.style.transition = 'transform 0.5s ease-in-out';
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            // Si se supera el final, volver al inicio
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

        // Auto-slide para movimiento automático
        function autoSlide() {
            moveSlide(1);
            setTimeout(autoSlide, slideDuration);
        }

        // Inicializar carrusel
        function initCarousel() {
            cloneSlides();
            setTimeout(autoSlide, slideDuration); // Iniciar el auto-slide después del primer intervalo

            // Botones de navegación
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => moveSlide(-1));
                nextButton.addEventListener('click', () => moveSlide(1));
            }

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


