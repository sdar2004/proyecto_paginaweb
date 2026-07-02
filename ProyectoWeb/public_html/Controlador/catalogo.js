// Espera a que todo el HTML esté cargado para evitar que el contenedor devuelva null
document.addEventListener("DOMContentLoaded", () => {
    
    // Lista de productos mapeada exactamente según las imágenes y HTMLs de tu proyecto
    const listaProductos = [
        {
            id: 1,
            nombre: "Apple iPhone 16 Pro Max",
            marca: "apple",
            precio: "S/. 5,499",
            imagen: "../Imagenes/apple-iphone-16-pro-max.jpg",
            enlace: "../Productos/Apple/Iphone16_Pro_Max.html"
        },
        {
            id: 2,
            nombre: "Apple iPhone 16",
            marca: "apple",
            precio: "S/. 3,999",
            imagen: "../Imagenes/apple-iphone-16.jpg",
            enlace: "../Productos/Apple/iPhone16.html"
        },
        {
            id: 3,
            nombre: "Samsung Galaxy S25 Fe",
            marca: "samsung",
            precio: "S/. 3,199",
            imagen: "../Imagenes/samsung-galaxy-s25-fe.jpg",
            enlace: "../Productos/Samsung/GalaxyS25_Fe.html"
        },
        {
            id: 4,
            nombre: "Samsung Galaxy S26 Ultra",
            marca: "samsung",
            precio: "S/. 6,199",
            imagen: "../Imagenes/samsung-galaxy-s26-ultra-new.jpg",
            enlace: "../Productos/Samsung/GalaxyS26_Ultra.html"
        },
        {
            id: 5,
            nombre: "Google Pixel 10 Pro XL",
            marca: "google",
            precio: "S/. 4,599",
            imagen: "../Imagenes/google-pixel-10-pro-xl-.jpg",
            enlace: "#"
        },
        {
            id: 6,
            nombre: "Xiaomi 17",
            marca: "xiaomi",
            precio: "S/. 3,499",
            imagen: "../Imagenes/xiaomi-17.jpg",
            enlace: "../Productos/Xiaomi/Xiaomi17.html"
        }
    ];

    const contenedorGrid = document.getElementById("grid-productos");

    // Función principal para renderizar las tarjetas en el HTML
    function renderizarProductos(productos) {
        // Limpiamos el contenedor por si acaso
        contenedorGrid.innerHTML = "";

        if (productos.length === 0) {
            contenedorGrid.innerHTML = `<p class="no-productos">No se encontraron productos disponibles.</p>`;
            return;
        }

        // Iteramos y creamos las tarjetas dinámicamente
        productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-producto");

            tarjeta.innerHTML = `
                <div class="imagen-contenedor">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                </div>
                <div class="info-contenedor">
                    <h3 class="producto-titulo">${producto.nombre}</h3>
                    <p class="producto-precio">${producto.precio}</p>
                    <div class="botones-box">
                        <a href="${producto.enlace}" class="btn-ver">Ver Detalles</a>
                        <button class="btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>
            `;

            // Control de imágenes caídas (usa tu placeholder si la imagen no carga)
            const imgElement = tarjeta.querySelector(".producto-img");
            imgElement.onerror = function() {
                this.src = "../Imagenes/placeholder1.png";
            };

            contenedorGrid.appendChild(tarjeta);
        });
    }

    // Inicializamos el catálogo por primera vez si el contenedor existe
    if (contenedorGrid) {
        renderizarProductos(listaProductos);
    } else {
        console.error("Error crítico: No se encontró el elemento con ID 'grid-productos' en el HTML.");
    }
});