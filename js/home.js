$(document).ready(function() {

    // --- Animación del Overlay del Hero ---
    // Usamos fadeIn para mostrar el contenido del overlay
    // Asegúrate de que el CSS inicial oculte .hero-content (p.ej. display: none;)
    // y que .overlay tenga opacity: 0;
    $('.hero .overlay').animate({ opacity: 1 }, 500, function() {
        // Una vez que el overlay es visible, muestra el contenido
        $(this).find('.hero-content').fadeIn(1000);
    });


    // --- Animación del Contador ---
    function animateCounter(element) {
        const $element = $(element); // Convertir a objeto jQuery
        const target = parseInt($element.data('target'), 10);
        if (isNaN(target)) {
            console.error("El data-target no es un número válido:", element);
            return;
        }
        const duration = 2000; // Duración en milisegundos
        const stepTime = 30; // Intervalo de actualización
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        $element.text('0'); // Iniciar en 0

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                $element.text(target.toLocaleString('es-AR')); // Formatear número al final
            } else {
                $element.text(Math.floor(current).toLocaleString('es-AR'));
            }
        }, stepTime);
    }

    // Iniciar contador cuando sea visible (usando Intersection Observer básico)
    const counterElement = document.getElementById('contadorNumero');
    if (counterElement) {
        let counterAnimated = false; // Flag para animar solo una vez
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counterAnimated) {
                animateCounter(counterElement);
                counterAnimated = true; // Marcar como animado
                observer.unobserve(counterElement); // Dejar de observar
            }
        }, { threshold: 0.5 }); // Iniciar cuando el 50% esté visible

        observer.observe(counterElement);
    } else {
        console.warn("Elemento con ID 'contadorNumero' no encontrado para el contador.");
    }


    // --- Hover en Cards de Clases (Opcional con jQuery .animate()) ---
    // El hover CSS es generalmente preferible por rendimiento.
    // Descomenta esto solo si necesitas animaciones más complejas que CSS no pueda manejar fácilmente.
    /*
    $('.clases .card').hover(
        function() { // Mouse entra
            $(this).stop().animate({
                marginTop: "-10px", // Mover hacia arriba
                // boxShadow: "0 12px 20px rgba(0,0,0,0.25)" // Ejemplo: animar sombra
            }, 200);
        },
        function() { // Mouse sale
            $(this).stop().animate({
                marginTop: "0px", // Volver a la posición original
                // boxShadow: "0 8px 15px rgba(0,0,0,0.2)" // Volver a sombra original
            }, 200);
        }
    );
    */

    // --- Validación y Spinner del Formulario Newsletter ---
    $('#newsletterForm').on('submit', function(event) {
        event.preventDefault(); // Prevenir envío normal
        event.stopPropagation(); // Detener propagación

        const form = this;
        const $form = $(this); // Objeto jQuery del formulario
        const $button = $form.find('button[type="submit"]');
        const $spinner = $button.find('.spinner-border');
        const $responseDiv = $('#newsletter-response');

        $responseDiv.hide().removeClass('text-success text-danger'); // Ocultar respuesta anterior

        // Quitar validación visual anterior antes de validar de nuevo
        $form.removeClass('was-validated');

        // Validar con Bootstrap (requiere que el HTML tenga 'needs-validation')
        if (!form.checkValidity()) {
            $form.addClass('was-validated'); // Mostrar errores de Bootstrap
            return; // No continuar si es inválido
        }

        // Mostrar spinner y deshabilitar botón
        $spinner.show();
        $button.prop('disabled', true);

        // Simular envío (reemplazar con tu lógica AJAX si es necesario)
        console.log("Simulando envío de newsletter para:", $('#email-newsletter').val());
        setTimeout(function() {
            // Ocultar spinner y habilitar botón
            $spinner.hide();
            $button.prop('disabled', false);
            $form.removeClass('was-validated'); // Limpiar validación visual
            form.reset(); // Limpiar el campo de email

            // Mostrar mensaje de éxito (simulado)
            $responseDiv.text('¡Gracias por suscribirte!').addClass('text-success').fadeIn();
            setTimeout(() => $responseDiv.fadeOut(), 5000); // Ocultar después de 5 segundos

            // Ejemplo si hubiera un error en el envío real:
            // $responseDiv.text('Hubo un error. Inténtalo de nuevo.').addClass('text-danger').fadeIn();
            // setTimeout(() => $responseDiv.fadeOut(), 5000);

        }, 1500); // Simular 1.5 segundos de espera
    });

    // --- Actualizar año en el footer ---
    const currentYear = new Date().getFullYear();
    $('#currentYear').text(currentYear);
    console.log("Año actualizado en footer:", currentYear);


    // --- Modo Oscuro/Claro ---
    const $botonModo = $('#botonModo');
    const $iconoModo = $botonModo.find('i');
    const $body = $('body'); // Usamos jQuery para seleccionar body

    // Función para aplicar tema y actualizar icono/localStorage
    const aplicarTema = (theme) => {
        $body.attr('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            $iconoModo.removeClass('fa-moon').addClass('fa-sun');
        } else {
            $iconoModo.removeClass('fa-sun').addClass('fa-moon');
        }
        console.log("Tema aplicado:", theme);
    };

    // Obtener tema guardado o usar 'light' por defecto
    const temaGuardado = localStorage.getItem('theme');
    const temaInicial = temaGuardado && (temaGuardado === 'dark' || temaGuardado === 'light') ? temaGuardado : 'light'; // Default a light

    // Aplicar tema inicial al cargar la página
    aplicarTema(temaInicial);

    // Listener para el botón de cambio de modo
    if ($botonModo.length) { // Verificar si el botón existe
        $botonModo.on('click', function() {
            const temaActual = $body.attr('data-bs-theme');
            const nuevoTema = temaActual === 'light' ? 'dark' : 'light';
            aplicarTema(nuevoTema);
        });
    } else {
        console.warn("Botón '#botonModo' no encontrado.");
    }

    // --- Carrusel Bootstrap ---
    // Bootstrap 5 maneja la mayoría de la funcionalidad del carrusel automáticamente
    // a través de atributos data-bs-*.
    // Puedes añadir personalizaciones jQuery aquí si es necesario.
    const $testimonialCarousel = $('#testimonialCarousel');
    if ($testimonialCarousel.length) {
        // Ejemplo: Pausar al pasar el mouse (ya se hace con data-bs-pause="hover")
        // $testimonialCarousel.on('mouseenter', function() {
        //     $(this).carousel('pause');
        // }).on('mouseleave', function() {
        //     $(this).carousel('cycle');
        // });

        // Ejemplo: Cambiar intervalo dinámicamente (si fuera necesario)
        // const myCarouselInstance = bootstrap.Carousel.getInstance($testimonialCarousel[0]);
        // if (myCarouselInstance) {
        //     // myCarouselInstance.options.interval = 3000; // Cambiar a 3 segundos
        // }

        console.log("Carrusel de testimonios inicializado por Bootstrap.");
    } else {
        console.warn("Elemento '#testimonialCarousel' no encontrado.");
    }


}); // Fin $(document).ready()
