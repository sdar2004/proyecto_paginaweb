
// Lógica del Buscador
document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    
    // Ejecutar búsqueda al hacer clic en el botón
    if(searchBtn && searchInput) {
        searchBtn.addEventListener("click", ejecutarBusqueda);
        console.log("SI FUNCIONA EL CLICK");
        // Ejecutar búsqueda al presionar "Enter" en el teclado
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

    // Si el buscador está vacío, volvemos a mostrar el catálogo completo
    if (query === "") {
        seccionResultados.style.display = "none";
        seccionTodos.style.display = "block";
        return;
    }

    // Algoritmo de filtrado sobre el array 'productos'
    const resultadosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(query) || 
        producto.marca.toLowerCase().includes(query) ||
        producto.categoria.toLowerCase().includes(query)
    );

    // Limpiar resultados anteriores en el DOM
    resultadosDiv.innerHTML = "";

    // Renderizar los nuevos resultados
    if (resultadosFiltrados.length > 0) {
        resultadosFiltrados.forEach(prod => {
            // Nota: Adapta las clases CSS de este HTML interno según tu diseño en global.css o catalogo.css
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
        // Mensaje si no hay coincidencias
        resultadosDiv.innerHTML = "<p>No se encontraron productos que coincidan con tu búsqueda.</p>";
    }

    // Ocultar el catálogo general y mostrar la sección de resultados
    seccionTodos.style.display = "none";
    seccionResultados.style.display = "block";
}
// =========================================================================
// FUNCIÓN PARA CARGAR DE FORMA DINÁMICA FRAGMENTOS HTML
// =========================================================================
function cargarRecurso(tagSelector, archivo, callback = null){
    const elemento = document.querySelector(tagSelector);
    fetch(archivo)
        .then(rpta => rpta.text())
        .then(html => {
            elemento.innerHTML = html;

            // Si pasamos una función callback, la ejecutamos prioritariamente
            if (callback) {
                callback();
            } else {
                // Comportamiento por defecto al cargar catálogo sin filtros
                if (archivo.includes("catalogo.html")) {
                    if (typeof window.renderizarCatalogoDinamicamente === 'function') {
                        window.renderizarCatalogoDinamicamente();
                    }
                }
                
                // ==========================================================
                // NUEVO: EJECUTAR RENDERIZADOR DE OFERTAS
                // ==========================================================
                if (archivo.includes("ofertas.html")) {
                    if (typeof window.renderizarOfertas === 'function') {
                        window.renderizarOfertas();
                    }
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

        // El ícono del carrito recién existe en el DOM en este punto
        if (typeof window.actualizarContadorCarrito === "function") {
            window.actualizarContadorCarrito();
        }

        // Delegación de eventos para la navegación interna (SPA).
        // Escucha en todo el documento, así funciona tanto en el menú
        // superior (header) como en los enlaces del footer.
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

        // =========================================================================
        // MOTOR DE BÚSQUEDA REDIRIGIENDO A resultados.html
        // =========================================================================
        const inputBusqueda = document.querySelector(".search-container input");
        const btnBuscar = document.querySelector(".search-container button");

        const realizarBusqueda = () => {
            const termino = inputBusqueda.value.trim();

            if (termino === "") return; // Si la búsqueda está vacía, no hace nada

            const terminoMinuscula = termino.toLowerCase();

            // Filtrar productos por nombre, marca o categoría
            const productosFiltrados = productos.filter(p => 
                p.nombre.toLowerCase().includes(terminoMinuscula) ||
                p.marca.toLowerCase().includes(terminoMinuscula) ||
                p.categoria.toLowerCase().includes(terminoMinuscula)
            );

            // Cargamos la nueva página de resultados y renderizamos los productos filtrados
            cargarRecurso("#main", "HTML/resultados.html", () => {
                window.renderizarResultadosBusqueda(productosFiltrados, termino);
            });
        };

        // Escuchar eventos de clic y "Enter"
        if (btnBuscar && inputBusqueda) {
            btnBuscar.addEventListener("click", realizarBusqueda);
            inputBusqueda.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    realizarBusqueda();
                }
            });
        }
    });

// =========================================================================
// MOTOR DE RENDERIZADO ASÍNCRONO DEL CATÁLOGO ORIGINAL (Se mantiene intacto)
// =========================================================================
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
                    <a href="#" class="ver-producto" data-url="${producto.url}">
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
    document.querySelectorAll(".ver-producto").forEach(link => {
        link.addEventListener("click", function(e){
            e.preventDefault();
            cargarRecurso("#main", this.dataset.url);
        });
    });
};

// =========================================================================
// NUEVO: RENDERIZADO EXCLUSIVO PARA LA PÁGINA DE RESULTADOS DE BÚSQUEDA
// =========================================================================
window.renderizarResultadosBusqueda = function(productosFiltrados, termino) {
    const contenedor = document.getElementById('grid-resultados');
    const queryText = document.getElementById('search-query-text');
    
    if (!contenedor) return;

    contenedor.innerHTML = "";
    
    if (queryText) {
        queryText.textContent = `Mostrando resultados para: "${termino}" (${productosFiltrados.length} encontrados)`;
    }

    // Si no hay productos que coincidan
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.3rem; color: #777;">No se encontraron productos que coincidan con tu búsqueda.</p>
                <p style="color: #999; margin-top: 10px;">Intenta buscando con palabras clave como "Iphone", "Samsung", "Cargador", etc.</p>
            </div>
        `;
        return;
    }

    // Si hay coincidencias, pintar los productos
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
window.renderizarOfertas = function() {
    const gridOfertas = document.getElementById("grid-ofertas-relampago");
    if (!gridOfertas) return; // Si no encuentra la grilla en ofertas.html, no hace nada

    gridOfertas.innerHTML = "";

    // Seleccionamos los IDs de los productos que quieres mostrar en tu sección de ofertas
    // (Por ejemplo: Samsung S25 Ultra (1), iPhone 17 Pro Max (5), Xiaomi 17 (9), etc.)
    const idsEnOferta = [1, 5, 9, 14, 18, 25]; 

    const productosFiltrados = productos.filter(producto => idsEnOferta.includes(producto.id));

    // Renderizamos las tarjetas usando las clases exactas de tu diseño css
    productosFiltrados.forEach(producto => {
        const productCardHtml = `
            <div class="product-card">
                <div class="product-image">
                    <a href="${producto.imagen}">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </a>
                    <span class="badge" style="background-color: #00abf0;">Oferta</span>
                </div>
                <h3>${producto.nombre}</h3>
                <p class="precio">
                    <span class="precio-oferta" style="color: #00abf0; font-weight: bold;">${producto.precioOferta}</span>
                    <span class="precio-anterior" style="text-decoration: line-through; color: #888;">${producto.precioAnterior}</span>
                </p>
                <button class="add-to-cart" data-id="${producto.id}">Añadir al Carrito</button>
            </div>
        `;
        gridOfertas.innerHTML += productCardHtml;
    });
};
document.addEventListener("click", (e) => {
    // Escuchamos el clic directamente en tu clase CSS original "categoria-div"
    const btn = e.target.closest(".categoria-div");
    
    if (btn) {
        e.preventDefault();
        
        const pagina = btn.dataset.page;     
        const targetId = btn.dataset.target; 

        if (pagina) {
            cargarRecurso("#main", pagina, () => {
                if (typeof window.renderizarCatalogoDinamicamente === 'function') {
                    window.renderizarCatalogoDinamicamente();
                }
                
                setTimeout(() => {
                    const seccionDestino = document.getElementById(targetId);
                    if (seccionDestino) {
                        seccionDestino.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                }, 150);
            });
        }
    }
});
// Este es un ejemplo de cómo debería verse la lógica del clic en tu enrutador actual
document.body.addEventListener('click', function(e) {
    
    // Detectamos si se hizo clic en un enlace con 'data-page'
    const enlace = e.target.closest('[data-page]');
    
    if (enlace) {
        e.preventDefault(); // Evitamos que el navegador salte bruscamente
        
        // 1. Capturamos el texto completo: "HTML/catalogo.html#grid-samsung-telefono"
        const dataPageCompleto = enlace.getAttribute('data-page');
        
        // 2. Separamos el archivo del ID usando split('#')
        const partes = dataPageCompleto.split('#');
        const rutaArchivo = partes[0]; // Se queda con "HTML/catalogo.html"
        const idDestino = partes[1];   // Se queda con "grid-samsung-telefono" (o undefined si no tiene #)
        
        // 3. Cargamos la página usando SOLO la ruta del archivo
        fetch(rutaArchivo)
            .then(respuesta => respuesta.text())
            .then(codigoHtml => {
                
                // Inyectamos el nuevo contenido en tu <section>
                document.querySelector('section').outerHTML = codigoHtml;
                
                // 4. LA MAGIA PARA BAJAR HASTA LA SECCIÓN EXACTA
                if (idDestino) {
                    // Usamos setTimeout para darle tiempo al navegador de procesar el nuevo HTML
                    setTimeout(() => {
                        const elementoDestino = document.getElementById(idDestino);
                        if (elementoDestino) {
                            // Hace un scroll suave hacia el contenedor
                            elementoDestino.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 150); // 150 milisegundos de espera
                } else {
                    // Si el enlace no tenía #, simplemente subimos al inicio
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                
            })
            .catch(error => console.error("Error cargando la vista:", error));
    }
});
// Función principal para actualizar el texto
function actualizarHeader() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    const headerNombreDisplay = document.getElementById('nombreUsuarioHeader');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    
    if (headerNombreDisplay) {
        if (usuarioGuardado) {
            // Reemplaza solo lo que está dentro del <span>
            headerNombreDisplay.textContent = usuarioGuardado;
            
            // Muestra el botón de cerrar sesión
            if(btnCerrarSesion) btnCerrarSesion.style.display = 'inline-block';
        } else {
            // Texto por defecto
            headerNombreDisplay.textContent = "Mi Cuenta";
            
            // Oculta el botón de cerrar sesión
            if(btnCerrarSesion) btnCerrarSesion.style.display = 'none';
        }
    }
}

// Como tu header parece cargar de forma dinámica, buscamos el elemento repetidamente 
// hasta encontrarlo (cada 100 milisegundos) y luego detenemos la búsqueda.
const intervaloHeader = setInterval(function() {
    if (document.getElementById('nombreUsuarioHeader')) {
        actualizarHeader();
        clearInterval(intervaloHeader); // Detenemos el intervalo una vez actualizado
    }
}, 100);

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual'); // Borra el usuario guardado
    window.location.reload(); // Recarga la página
}
// Función para procesar el login o registro directamente desde el HTML
// Función para procesar el login o registro directamente desde el HTML
function procesarAcceso(evento, tipo) {
    // Evitamos que la página intente recargarse
    evento.preventDefault();
    
    let nombreUsuario = "";
    
    // Obtenemos el nombre según el formulario que se usó
    if (tipo === 'login') {
        nombreUsuario = document.getElementById('usuarioLogin').value;
    } else if (tipo === 'registro') {
        nombreUsuario = document.getElementById('nombreRegistro').value;
    }
    
    // Si el nombre no está vacío, hacemos la magia
    if (nombreUsuario && nombreUsuario.trim() !== "") {
        
        // 1. Guardamos el nombre en la memoria del navegador
        localStorage.setItem('usuarioActual', nombreUsuario);
        
        // 2. Actualizamos el texto en el Header al instante ("Mi cuenta" -> Nombre)
        actualizarHeader();
        
        // 3. CARGAR INICIO.HTML DINÁMICAMENTE (Solo en el section)
        // Buscamos la etiqueta <section> que envuelve tu contenido central
        const seccionPrincipal = document.querySelector('section');
        
        // Usamos Fetch para traer el archivo inicio.html sin recargar la página
        fetch('HTML/inicio.html')
            .then(respuesta => {
                if (!respuesta.ok) throw new Error('Error al cargar la página de inicio');
                return respuesta.text();
            })
            .then(codigoHtml => {
                // Reemplazamos el login con el contenido de inicio.html
                if (seccionPrincipal) {
                    seccionPrincipal.outerHTML = codigoHtml;
                }
                
                // Opcional: Subimos la pantalla al inicio de forma suave
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Hubo un problema:', error);
                alert("Inicio de sesión exitoso, pero hubo un error al cargar la vista de inicio.");
            });
    }
}
function cambiarPestana(pestana) {
            const formLogin = document.getElementById('formLogin');
            const formRegistro = document.getElementById('formRegistro');
            const tabLogin = document.getElementById('tab-login');
            const tabRegistro = document.getElementById('tab-registro');

            if (pestana === 'login') {
                formLogin.classList.add('activo');
                formRegistro.classList.remove('activo');
                tabLogin.classList.add('activo');
                tabRegistro.classList.remove('activo');
            } else {
                formRegistro.classList.add('activo');
                formLogin.classList.remove('activo');
                tabRegistro.classList.add('activo');
                tabLogin.classList.remove('activo');
            }
        }
// Esperar a que el DOM cargue
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Revisar si hay un usuario guardado al cargar CUALQUIER página
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    const headerNombreDisplay = document.getElementById('nombreUsuarioHeader');
    
    // Si existe el elemento en el header, actualizamos su texto
    if (headerNombreDisplay) {
        if (usuarioGuardado) {
            headerNombreDisplay.textContent = usuarioGuardado; // Muestra el nombre
        } else {
            headerNombreDisplay.textContent = "Mi cuenta"; // Por defecto
        }
    }

    // 2. Lógica para el formulario de Login (si estamos en login.html)
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            const usuarioIngresado = document.getElementById('usuarioLogin').value;
            
            // Guardamos la variable en la memoria del navegador
            localStorage.setItem('usuarioActual', usuarioIngresado);
            
            // Redirigimos al inicio (ajusta la ruta según tus carpetas, ej: 'inicio.html')
            window.location.href = "inicio.html"; 
        });
    }

    // 3. Lógica para el formulario de Registro (si estamos en login.html)
    const formRegistro = document.getElementById('formRegistro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            // Para el registro, tomamos el nombre
            const nombreIngresado = document.getElementById('nombreRegistro').value;
            
            // Guardamos la variable
            localStorage.setItem('usuarioActual', nombreIngresado);
            
            // Redirigimos al inicio
            window.location.href = "inicio.html"; 
        });
    }
});
