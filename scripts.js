document.addEventListener('DOMContentLoaded', () => {
    // --- Código del carrusel ---
    let currentIndex = 0;
    const slideDuration = 3000;

    function cloneSlides() {
        const slides = document.querySelector('.carousel-slide');
        if (slides) {
            for (let i = 0; i < 4; i++) {
                const clone = slides.children[i].cloneNode(true);
                slides.appendChild(clone);
            }
        }
    }

    function moveSlide(step) {
        const slides = document.querySelector('.carousel-slide');
        if (slides) {
            const totalSlides = slides.children.length;
            const slideWidth = slides.children[0].offsetWidth + 10;
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
    }

    function autoSlide() {
        moveSlide(1);
        setTimeout(autoSlide, slideDuration);
    }

    cloneSlides();
    autoSlide();

    // --- Soporte táctil ---
    let startX;
    document.querySelector('.carousel-slide')?.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
    });

    document.querySelector('.carousel-slide')?.addEventListener('touchend', (e) => {
        const currentX = e.changedTouches[0].pageX;
        const threshold = 50;
        if (startX - currentX > threshold) moveSlide(1);
        else if (currentX - startX > threshold) moveSlide(-1);
    });

    // --- Código del menú hamburguesa ---

    // Línea de depuración

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    console.log('Hamburger:', hamburger); // Línea de depuración
    console.log('Nav Links:', navLinks); // Línea de depuración

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            console.log('Hamburguesa clickeada'); // Línea de depuración
            navLinks.classList.toggle('nav-active');
            console.log('Clase nav-active aplicada:', navLinks.classList.contains('nav-active')); // Línea de depuración
        });
    } else {
        console.error('Hamburger o navLinks no encontrados.');
    }

});








