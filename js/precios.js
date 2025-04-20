// js/precios.js

$(document).ready(function() {

    // --- Inicializar Tooltips de Bootstrap ---
    // Selecciona todos los elementos con data-bs-toggle="tooltip"
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- Toggle Mensual/Anual ---
    const planToggle = $('#planToggle');
    const precios = $('.tabla-planes .precio'); // Selecciona todos los elementos de precio
    const duraciones = $('.tabla-planes .duracion'); // Selecciona los textos de duración

    // Función para actualizar precios
    function actualizarPrecios() {
        const esAnual = planToggle.is(':checked'); // true si está marcado (Anual)

        precios.each(function() {
            const $precioEl = $(this);
            const precioMensual = $precioEl.data('mensual');
            const precioAnual = $precioEl.data('anual');

            if (esAnual) {
                $precioEl.text(precioAnual);
            } else {
                $precioEl.text(precioMensual);
            }
        });

        // Actualizar texto de duración
        if (esAnual) {
            duraciones.text('/ año');
        } else {
            duraciones.text('/ mes');
        }
    }

    // Ejecutar al cargar la página por si el toggle está pre-marcado (o para estado inicial)
    actualizarPrecios();

    // Escuchar cambios en el toggle
    planToggle.on('change', function() {
        actualizarPrecios();
    });

    // --- Hover en Tabla (Opcional - Resaltar Columna) ---
    // Bootstrap 'table-hover' ya resalta filas. Para columnas:
    $('.tabla-planes .col-plan').hover(
        function() { // Mouse entra
            // Añadir clase a la columna actual (th y td correspondientes)
            const index = $(this).index(); // Obtener índice de la columna (0, 1, 2, 3)
            $('.tabla-planes tr').each(function() {
                $(this).find('th, td').eq(index).addClass('columna-hover');
            });
        },
        function() { // Mouse sale
            // Quitar clase de todas las celdas
            $('.tabla-planes .columna-hover').removeClass('columna-hover');
        }
    );
    // Añadir CSS para .columna-hover si quieres un estilo específico
    /*
    .tabla-planes .columna-hover {
        background-color: rgba(var(--bs-primary-rgb), 0.1) !important; // Fondo sutil
    }
    */

}); // Fin document ready
