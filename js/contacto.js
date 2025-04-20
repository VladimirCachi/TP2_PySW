$(document).ready(function() {

  const form = $('#formularioContacto');
  const submitButton = form.find('button[type="submit"]');
  const spinner = submitButton.find('.spinner-border');
  const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal')); // Inicializar modal

  // --- Validación en Tiempo Real ---
  form.find('input[required], select[required], textarea[required]').on('input change', function() {
      validateField($(this));
  });

  // Función para validar un campo individual
  function validateField($field) {
      // Usar checkValidity() del elemento DOM
      if ($field[0].checkValidity()) {
          $field.removeClass('is-invalid').addClass('is-valid');
      } else {
          $field.removeClass('is-valid').addClass('is-invalid');
      }
      // Caso especial para select: si el valor es vacío, es inválido
      if ($field.is('select') && $field.val() === '') {
           $field.removeClass('is-valid').addClass('is-invalid');
      }
  }

  // --- Manejo del Envío del Formulario ---
  form.on('submit', function(event) {
      event.preventDefault(); // Prevenir envío real
      event.stopPropagation();

      // Quitar validaciones previas de "submit"
      form.removeClass('was-validated');
      // Quitar validaciones de "input"
      form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');

      // Validar todos los campos requeridos al intentar enviar
      let isFormValid = true;
      form.find('input[required], select[required], textarea[required]').each(function() {
          validateField($(this)); // Validar y mostrar feedback visual
          if (!$(this)[0].checkValidity() || ($(this).is('select') && $(this).val() === '')) {
              isFormValid = false;
          }
      });

      // Validar campos opcionales con patrones (ej. teléfono) si tienen valor
      form.find('input[pattern]:not([required])').each(function() {
          if ($(this).val() !== '') { // Solo validar si no está vacío
               validateField($(this));
               if (!$(this)[0].checkValidity()) {
                  isFormValid = false;
               }
          } else {
              $(this).removeClass('is-valid is-invalid'); // Limpiar si está vacío
          }
      });


      // Añadir clase was-validated para mostrar mensajes de Bootstrap si es necesario
      form.addClass('was-validated');

      if (!isFormValid) {
          console.log("Formulario inválido.");
          // Enfocar el primer campo inválido (opcional)
          form.find('.is-invalid').first().focus();
          return; // Detener si no es válido
      }

      // --- Si el formulario es válido ---
      console.log("Formulario válido, simulando envío...");

      // Mostrar spinner y deshabilitar botón
      spinner.show(); // Usar .show() de jQuery
      submitButton.prop('disabled', true);

      // Simular envío (reemplazar con tu lógica AJAX si es necesario)
      setTimeout(function() {
          console.log("Envío simulado completado.");

          // Ocultar spinner y habilitar botón
          spinner.hide(); // Usar .hide() de jQuery
          submitButton.prop('disabled', false);

          // Limpiar formulario y validaciones
          form[0].reset(); // Resetea el formulario nativo
          form.removeClass('was-validated');
          form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');

          // Mostrar modal de confirmación
          confirmationModal.show();

      }, 2000); // Simular 2 segundos de espera

  });

}); // Fin document ready
