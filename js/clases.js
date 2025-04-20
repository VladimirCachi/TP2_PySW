document.addEventListener("DOMContentLoaded", () => {
  const botonesFiltro = document.querySelectorAll(".filtros .filtro");
  const itemsClases = document.querySelectorAll(".grid-clases .col.clase-item");
  const gridClasesContainer = document.querySelector(".grid-clases"); // Selecciona el contenedor

  // Verifica si todos los elementos necesarios existen
  if (botonesFiltro.length > 0 && itemsClases.length > 0 && gridClasesContainer) {
      botonesFiltro.forEach(boton => {
          boton.addEventListener("click", () => {
              // 1. Actualizar botón activo
              document.querySelector(".filtros .filtro.activo")?.classList.remove("activo");
              boton.classList.add("activo");

              const categoriaSeleccionada = boton.dataset.clase;

              // 2. Añadir/Quitar clase para centrar
              if (categoriaSeleccionada === "todos") {
                  gridClasesContainer.classList.remove("grid-centered"); // Quita el centrado si se muestran todos
              } else {
                  gridClasesContainer.classList.add("grid-centered"); // Añade el centrado para filtros específicos
              }

              // 3. Filtrar items (igual que antes)
              itemsClases.forEach(item => {
                  const categoriaItem = item.dataset.categoria;
                  const mostrar = categoriaSeleccionada === "todos" || categoriaItem === categoriaSeleccionada;

                  if (mostrar) {
                      item.classList.remove("oculto");
                  } else {
                      item.classList.add("oculto");
                  }
              });
          });
      });
  } else {
      console.warn("No se encontraron botones de filtro, items de clase o el contenedor grid-clases.");
  }

  // ... (resto del código opcional) ...

});
