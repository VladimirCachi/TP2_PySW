$(document).ready(function () {
  // --- Animación de barras con número visible ---
  function animateSkillBars() {
    $('.progress-bar').each(function () {
      const $bar = $(this);
      const value = $bar.attr('aria-valuenow');

      // Iniciamos en 0% y animamos al valor real
      $bar.css('width', '0%').animate(
        { width: value + '%' },
        {
          duration: 1200,
          step: function (now) {
            $bar.text(Math.round(now) + '%'); // Muestra el número dentro de la barra
          },
        }
      );
    });
  }

  animateSkillBars();
});
