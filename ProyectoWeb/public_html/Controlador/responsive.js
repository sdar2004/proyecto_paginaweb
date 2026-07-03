
// Función para cargar de forma dinámica fragmentos HTML en contenedores específicos
function cargarRecurso(tagSelector, archivo){
    const elemento = document.querySelector(tagSelector);
    fetch(archivo)
        .then(rpta => rpta.text())
        .then(html => {
            elemento.innerHTML = html;

            // INTERCEPCIÓN ASÍNCRONA: Si el recurso inyectado es el catálogo, disparamos su renderizado
            if (archivo.includes("catalogo.html")) {
                if (typeof window.renderizarCatalogoDinamicamente === 'function') {
                    window.renderizarCatalogoDinamicamente();
                } else {
                    console.error("Error: La función renderizarCatalogoDinamicamente no está definida en el entorno global.");
                }
            }

            // Si el recurso inyectado es el carrito, avisamos a carrito.js para que lo pinte
            if (archivo.includes("carrito.html")) {
                document.dispatchEvent(new Event("carritoCargado"));
            }
        })
        .catch(err => console.error("Error al cargar el recurso dinámico: ", err));
}

// Inicialización del ecosistema de la página principal
fetch("HTML/header.html")
    .then(rpta => rpta.text())
    .then(html => {
        document.getElementById("header").innerHTML = html;
        cargarRecurso("#footer", "HTML/footer.html");
        cargarRecurso("#main", "HTML/inicio.html");

        // El ícono del carrito recién existe en el DOM en este punto,
        // así que reflejamos aquí el contador guardado en localStorage
        if (typeof window.actualizarContadorCarrito === "function") {
            window.actualizarContadorCarrito();
        }

        // Delegación de eventos para la barra de navegación superior
        document.querySelector("nav ul").addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (link) {
                e.preventDefault();
                document.getElementById("prueba-header").checked = false;
                cargarRecurso("#main", link.dataset.page);
            }
        });
    });

// =========================================================================
// MOTOR DE RENDERIZADO ASÍNCRONO DEL CATÁLOGO
// =========================================================================
window.renderizarCatalogoDinamicamente = function() {
    // Validamos que existan las grillas antes de limpiar
    const contenedores = document.querySelectorAll('.product-grid');
    if (contenedores.length === 0) return;

    contenedores.forEach(contenedor => contenedor.innerHTML = "");

    // Validamos si la constante 'productos' se encuentra definida globalmente
    if (typeof productos === 'undefined' || !Array.isArray(productos)) {
        console.error("Error: El arreglo global de objetos 'productos' no está definido o no es válido.");
        return;
    }

    // Recorremos el arreglo de productos provisto
    productos.forEach(producto => {
        // Maquetación estructurada basada exactamente en el formato de catalogo.css
        const productCardHtml = `
            <div class="product-card">
                <div class="product-image">
                    <a href="${producto.imagen}">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </a>
                    ${producto.badge ? `<span class="badge">${producto.badge}</span>` : ''}
                </div>
                <h3>${producto.nombre}</h3>
                <p class="precio">
                    <span class="precio-oferta">${producto.precioOferta}</span>
                    <span class="precio-anterior">${producto.precioAnterior}</span>
                </p>
                <button class="add-to-cart" data-id="${producto.id}">Añadir al carrito</button>
            </div>
        `;

        // Clasificación de rutas de IDs de destino
        let targetId = "";
        if (["cargador", "audifonos", "smartwatch", "fundas", "reacondicionados","tablet"].includes(producto.categoria)) {
            targetId = `grid-${producto.categoria === 'cargador' ? 'cargadores' : producto.categoria}`;
        } else {
            targetId = `grid-${producto.marca}-${producto.categoria}`;
        }

        // Inyección controlada en el DOM
        const contenedorDestino = document.getElementById(targetId);
        if (contenedorDestino) {
            contenedorDestino.innerHTML += productCardHtml;
        }
    });
};