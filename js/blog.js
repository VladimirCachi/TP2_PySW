// js/blog.js

$(document).ready(function() {

  // --- Filtros por Tags ---
  const filterRadios = $('.filter-controls input[name="category-filter"]');
  const articles = $('.articles-grid .article-card');

  filterRadios.on('change', function() {
      const selectedCategory = $(this).val(); // 'todos', 'entrenamiento', etc.

      articles.each(function() {
          const $article = $(this);
          const articleCategory = $article.data('category');

          if (selectedCategory === 'todos' || articleCategory === selectedCategory) {
              // Usar fadeIn para mostrar con animación
              $article.stop(true, true).fadeIn(300);
          } else {
              // Usar fadeOut para ocultar con animación
              $article.stop(true, true).fadeOut(300);
          }
      });
  });

  // --- Comentarios ---
  const commentForm = $('#comment-form');
  const commentNameInput = $('#comment-name');
  const commentTextInput = $('#comment-text');
  const commentsList = $('#comments-list');
  let commentCounter = commentsList.children('.comment').length; // Contador inicial

  commentForm.on('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      // Validación simple con Bootstrap
      commentForm.removeClass('was-validated'); // Limpiar validación previa
      let isValid = true;

      if (!commentNameInput[0].checkValidity()) {
          commentNameInput.addClass('is-invalid').removeClass('is-valid');
          isValid = false;
      } else {
          commentNameInput.addClass('is-valid').removeClass('is-invalid');
      }

      if (!commentTextInput[0].checkValidity()) {
          commentTextInput.addClass('is-invalid').removeClass('is-valid');
          isValid = false;
      } else {
          commentTextInput.addClass('is-valid').removeClass('is-invalid');
      }

      commentForm.addClass('was-validated'); // Mostrar feedback

      if (!isValid) {
          return; // Detener si no es válido
      }

      // Si es válido, añadir comentario
      const name = commentNameInput.val().trim();
      const text = commentTextInput.val().trim();

      addCommentToPage(name, text);

      // Limpiar formulario y validación
      commentForm[0].reset();
      commentForm.removeClass('was-validated');
      commentNameInput.removeClass('is-valid is-invalid');
      commentTextInput.removeClass('is-valid is-invalid');
  });

  function addCommentToPage(name, text) {
      const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      commentCounter++; // Incrementar contador para color
      const colorClassIndex = (commentCounter % 3) + 1; // 1, 2, or 3

      // Crear elemento de comentario con jQuery
      const $newComment = $('<div class="comment reveal-item"></div>'); // Añadir clase reveal-item
      $newComment.html(`
          <div class="comment-avatar avatar-color-${colorClassIndex}" data-initials="${initials}"></div>
          <div class="comment-content">
              <p class="comment-author">${escapeHTML(name)}</p>
              <p class="comment-text">${escapeHTML(text)}</p>
          </div>
      `);

      // Añadir al principio de la lista
      commentsList.prepend($newComment);

      // Aplicar estilo al avatar (el color se aplica por clase CSS)
      const $avatar = $newComment.find('.comment-avatar');
      // $avatar.css('background-color', getRandomColor()); // O aplicar color aleatorio si prefieres

      // Forzar la revelación con un pequeño delay
      setTimeout(() => {
          // Añadir la clase is-visible para activar la animación CSS
          // Necesitamos observar este nuevo elemento con IntersectionObserver
          if (observer) { // Verificar si el observer existe
               observer.observe($newComment[0]); // Observar el nuevo comentario
          } else {
               // Si no hay observer (error o no implementado), mostrar directamente
               $newComment.addClass('is-visible');
          }
      }, 50);

      console.log('Comentario añadido:', { name, text });
  }

  // Función para escapar HTML (evitar XSS)
  function escapeHTML(str) {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
  }

  // --- Scroll Reveal (Usando Intersection Observer) ---
  const revealItems = document.querySelectorAll('.reveal-item');
  let observer = null; // Declarar observer fuera para poder usarlo en addCommentToPage

  if ('IntersectionObserver' in window && revealItems.length > 0) {
      const revealOptions = {
          root: null, // relativo al viewport
          rootMargin: '0px',
          threshold: 0.1 // 10% del elemento visible
      };

      const revealCallback = (entries, observerInstance) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // Añadir clase cuando es visible
                  entry.target.classList.add('is-visible');
                  // Dejar de observar una vez revelado (opcional, para rendimiento)
                  observerInstance.unobserve(entry.target);
              }
              // Opcional: quitar clase si sale de la vista (para re-animar)
              // else {
              //     entry.target.classList.remove('is-visible');
              // }
          });
      };

      // Crear e iniciar el observer
      observer = new IntersectionObserver(revealCallback, revealOptions);
      revealItems.forEach(item => {
          observer.observe(item);
      });

  } else {
      // Fallback si IntersectionObserver no es soportado (o no hay items)
      // Simplemente mostrar todos los elementos
      console.warn("IntersectionObserver no soportado o no hay items para revelar.");
      $(revealItems).addClass('is-visible'); // Mostrar directamente
  }

}); // Fin document ready
