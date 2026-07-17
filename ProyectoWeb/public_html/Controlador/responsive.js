

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    
    
    if(searchBtn && searchInput) {
        searchBtn.addEventListener("click", ejecutarBusqueda);
        console.log("SI FUNCIONA EL CLICK");
      
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                ejecutarBusqueda();
            }
        });
    }
});

function ejecutarBusqueda() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultadosDiv = document.getElementById("grid-search-results");
    const seccionResultados = document.getElementById("search-results-section");
    const seccionTodos = document.getElementById("all-products-section");

    
    if (query === "") {
        seccionResultados.style.display = "none";
        seccionTodos.style.display = "block";
        return;
    }

   
    const resultadosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(query) || 
        producto.marca.toLowerCase().includes(query) ||
        producto.categoria.toLowerCase().includes(query)
    );

   
    resultadosDiv.innerHTML = "";

  
    if (resultadosFiltrados.length > 0) {
        resultadosFiltrados.forEach(prod => {
        
            resultadosDiv.innerHTML += `
                <div class="producto-card" data-id="${prod.id}">
                    <span class="badge">${prod.badge}</span>
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                    <h3>${prod.nombre}</h3>
                    <p class="precio-anterior">${prod.precioAnterior}</p>
                    <p class="precio-oferta">${prod.precioOferta}</p>
                    <button class="btn-agregar">Agregar al Carrito</button>
                </div>
            `;
        });
    } else {
        
        resultadosDiv.innerHTML = "<p>No se encontraron productos que coincidan con tu búsqueda.</p>";
    }

    
    seccionTodos.style.display = "none";
    seccionResultados.style.display = "block";
}

function cargarRecurso(tagSelector, archivo, callback = null){
    const elemento = document.querySelector(tagSelector);
    fetch(archivo)
        .then(rpta => rpta.text())
        .then(html => {
            elemento.innerHTML = html;

            
            if (callback) {
                callback();
            } else {
                
                if (archivo.includes("catalogo.html")) {
                    if (typeof window.renderizarCatalogoDinamicamente === 'function') {
                        window.renderizarCatalogoDinamicamente();
                    }
                }
            }

            
            if (archivo.includes("carrito.html")) {
                document.dispatchEvent(new Event("carritoCargado"));
            }
        })
        .catch(err => console.error("Error al cargar el recurso dinámico: ", err));
}

fetch("HTML/header.html")
    .then(rpta => rpta.text())
    .then(html => {
        document.getElementById("header").innerHTML = html;
        cargarRecurso("#footer", "HTML/footer.html");
        cargarRecurso("#main", "HTML/inicio.html");

        
        if (typeof window.actualizarContadorCarrito === "function") {
            window.actualizarContadorCarrito();
        }

   
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a[data-page]");
            if (link) {
                e.preventDefault();
                const checkboxHeader = document.getElementById("prueba-header");
                if (checkboxHeader) checkboxHeader.checked = false;
                cargarRecurso("#main", link.dataset.page);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });

        
        const inputBusqueda = document.querySelector(".search-container input");
        const btnBuscar = document.querySelector(".search-container button");

        const realizarBusqueda = () => {
            const termino = inputBusqueda.value.trim();

            if (termino === "") return; 

            const terminoMinuscula = termino.toLowerCase();

            
            const productosFiltrados = productos.filter(p => 
                p.nombre.toLowerCase().includes(terminoMinuscula) ||
                p.marca.toLowerCase().includes(terminoMinuscula) ||
                p.categoria.toLowerCase().includes(terminoMinuscula)
            );

            
            cargarRecurso("#main", "HTML/resultados.html", () => {
                window.renderizarResultadosBusqueda(productosFiltrados, termino);
            });
        };

        
        if (btnBuscar && inputBusqueda) {
            btnBuscar.addEventListener("click", realizarBusqueda);
            inputBusqueda.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    realizarBusqueda();
                }
            });
        }
    });


window.renderizarCatalogoDinamicamente = function() {
    const contenedores = document.querySelectorAll('.product-grid');
    if (contenedores.length === 0) return;

    contenedores.forEach(contenedor => contenedor.innerHTML = "");

    if (typeof productos === 'undefined' || !Array.isArray(productos)) {
        console.error("Error: El arreglo global de objetos 'productos' no está definido o no es válido.");
        return;
    }

    productos.forEach(producto => {
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

        let targetId = "";
        if (["cargador", "audifonos", "smartwatch", "fundas", "reacondicionados","tablet"].includes(producto.categoria)) {
            targetId = `grid-${producto.categoria === 'cargador' ? 'cargadores' : producto.categoria}`;
        } else {
            targetId = `grid-${producto.marca}-${producto.categoria}`;
        }

        const contenedorDestino = document.getElementById(targetId);
        if (contenedorDestino) {
            contenedorDestino.innerHTML += productCardHtml;
        }
    });
};

window.renderizarResultadosBusqueda = function(productosFiltrados, termino) {
    const contenedor = document.getElementById('grid-resultados');
    const queryText = document.getElementById('search-query-text');
    
    if (!contenedor) return;

    contenedor.innerHTML = "";
    
    if (queryText) {
        queryText.textContent = `Mostrando resultados para: "${termino}" (${productosFiltrados.length} encontrados)`;
    }

   
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.3rem; color: #777;">No se encontraron productos que coincidan con tu búsqueda.</p>
                <p style="color: #999; margin-top: 10px;">Intenta buscando con palabras clave como "Iphone", "Samsung", "Cargador", etc.</p>
            </div>
        `;
        return;
    }

    
    productosFiltrados.forEach(producto => {
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
        contenedor.innerHTML += productCardHtml;
    });
};