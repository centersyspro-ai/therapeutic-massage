// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== POPUP DE PROMOCIÓN =====
    function showPromoPopup() {
        setTimeout(function() {
            const popup = document.getElementById('promoPopup');
            popup.style.display = 'flex';
        }, 10000); // 10 segundos
    }
    
    // Cerrar popup
    const closePopupBtn = document.querySelector('.close-popup');
    const popup = document.getElementById('promoPopup');
    
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }
    
    // Cerrar popup al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
    
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Cambiar icono del botón
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Cerrar menú al hacer clic en un enlace (en móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ===== CARRUSEL DE GALERÍA =====
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Función para mostrar un slide específico
    function showSlide(n) {
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Quitar clase active de todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Asegurar que el índice esté dentro de los límites
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Mostrar slide actual y activar dot correspondiente
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Event listeners para botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-carrusel (cambia cada 5 segundos)
    let slideInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Pausar auto-carrusel al interactuar con controles
    const galleryControls = document.querySelector('.gallery-controls');
    if (galleryControls) {
        galleryControls.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        galleryControls.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // ===== EFECTO SCROLL SUAVE PARA ENLACES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcular posición considerando el header fijo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== EFECTO HEADER AL SCROLL =====
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mostrar/ocultar header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll hacia abajo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba
            header.style.transform = 'translateY(0)';
        }
        
        // Cambiar estilo del header al hacer scroll
        if (scrollTop > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'var(--white)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== ANIMACIÓN AL SCROLL (reveal) =====
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.service-card, .feature, .testimonial-card');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Añadir clase CSS para animación
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .feature, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.revealed, .feature.revealed, .testimonial-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Llamar a la función al cargar y al hacer scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Llamar una vez al cargar
    
    // ===== INICIALIZAR FUNCIONALIDADES =====
    showPromoPopup(); // Mostrar popup después de 10 segundos
    showSlide(0); // Inicializar carrusel en la primera imagen
    
    // Añadir año actual al footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});
