// =========================================================================
// CARRITO DE COMPRAS
// =========================================================================
// Depende de la variable global 'productos' definida en catalogo.js,
// por eso carrito.js debe cargarse DESPUÉS de catalogo.js en el HTML.

const CARRITO_STORAGE_KEY = "carritoApexDigital";

// Lee el carrito guardado en localStorage (o devuelve uno vacío)
function obtenerCarrito() {
    const datos = localStorage.getItem(CARRITO_STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}

// Guarda el carrito actualizado en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
}

// Suma todas las cantidades para saber cuántas unidades hay en total
function contarItemsCarrito() {
    return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

// Convierte "S/3200" a número 3200 para poder sumar precios
function precioANumero(precioTexto) {
    return Number(String(precioTexto).replace(/[^\d.]/g, "")) || 0;
}

// Añade un producto al carrito según su id. Si ya estaba, solo sube la cantidad
function añadirAlCarrito(idProducto) {
    if (typeof productos === "undefined" || !Array.isArray(productos)) {
        console.error("Error: el arreglo global 'productos' no está disponible.");
        return;
    }

    const producto = productos.find(p => p.id === Number(idProducto));
    if (!producto) {
        console.error(`Producto con id ${idProducto} no encontrado.`);
        return;
    }

    const carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precioOferta: producto.precioOferta,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    mostrarConfirmacion(producto.nombre);

    // Si la página del carrito está abierta en este momento, refrescarla
    if (document.getElementById("carrito-contenido")) {
        renderizarCarrito();
    }
}

// Quita un producto por completo del carrito
function quitarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== Number(idProducto));
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    renderizarCarrito();
}

// Cambia la cantidad de un producto (+1 / -1). Si llega a 0, lo elimina
function cambiarCantidad(idProducto, delta) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === Number(idProducto));
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        quitarDelCarrito(idProducto);
        return;
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    renderizarCarrito();
}

// Actualiza el numerito junto al ícono 🛒 del header con el total de unidades
function actualizarContadorCarrito() {
    const iconoCarrito = document.querySelector(".carrito-link");
    if (!iconoCarrito) return;

    let contador = iconoCarrito.querySelector(".cart-count");
    const total = contarItemsCarrito();

    if (!contador) {
        contador = document.createElement("span");
        contador.className = "cart-count";
        iconoCarrito.appendChild(contador);
    }

    contador.textContent = total;
    contador.style.display = total > 0 ? "inline-flex" : "none";
}

// Pequeño aviso visual de confirmación cuando se añade un producto
function mostrarConfirmacion(nombreProducto) {
    const aviso = document.createElement("div");
    aviso.className = "cart-toast";
    aviso.textContent = `"${nombreProducto}" se añadió al carrito`;
    document.body.appendChild(aviso);

    setTimeout(() => aviso.classList.add("cart-toast-visible"), 10);
    setTimeout(() => {
        aviso.classList.remove("cart-toast-visible");
        setTimeout(() => aviso.remove(), 300);
    }, 2000);
}

// Dibuja el contenido completo de la página del carrito (HTML/carrito.html)
function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-contenido");
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío.</p>
            </div>
        `;
        return;
    }

    let total = 0;

    const filasHtml = carrito.map(item => {
        const subtotal = precioANumero(item.precioOferta) * item.cantidad;
        total += subtotal;

        return `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p class="carrito-item-precio">${item.precioOferta} c/u</p>
                </div>
                <div class="carrito-item-cantidad">
                    <button class="cantidad-btn" data-accion="restar" data-id="${item.id}">−</button>
                    <span>${item.cantidad}</span>
                    <button class="cantidad-btn" data-accion="sumar" data-id="${item.id}">+</button>
                </div>
                <p class="carrito-item-subtotal">S/${subtotal.toLocaleString("es-PE")}</p>
                <button class="carrito-item-quitar" data-id="${item.id}">🗑</button>
            </div>
        `;
    }).join("");

    contenedor.innerHTML = `
        <div class="carrito-lista">${filasHtml}</div>
        <div class="carrito-total">
            <span>Total:</span>
            <span>S/${total.toLocaleString("es-PE")}</span>
        </div>
    `;
}

// Delegación de eventos: todos los botones del carrito se generan
// dinámicamente, así que escuchamos los clics desde el documento completo.
document.addEventListener("click", (e) => {
    // Botón "Añadir al carrito" en las tarjetas del catálogo
    const botonAñadir = e.target.closest(".add-to-cart");
    if (botonAñadir) {
        e.preventDefault();
        añadirAlCarrito(botonAñadir.dataset.id);
        return;
    }

    // Botón "Añadir al carrito" en las páginas individuales de los productos
    const botonAñadir1 = e.target.closest(".btn-add");
    if (botonAñadir1) {
        e.preventDefault();
        añadirAlCarrito(botonAñadir1.dataset.id);
        return;
    }

    // Ícono 🛒 del header: abre la página del carrito
    const iconoCarrito = e.target.closest(".carrito-link");
    if (iconoCarrito) {
        e.preventDefault();
        if (typeof cargarRecurso === "function") {
            cargarRecurso("#main", "HTML/carrito.html");
        }
        return;
    }

    // Botones +/- de cantidad dentro del carrito
    const botonCantidad = e.target.closest(".cantidad-btn");
    if (botonCantidad) {
        const delta = botonCantidad.dataset.accion === "sumar" ? 1 : -1;
        cambiarCantidad(botonCantidad.dataset.id, delta);
        return;
    }

    // Botón quitar producto del carrito
    const botonQuitar = e.target.closest(".carrito-item-quitar");
    if (botonQuitar) {
        quitarDelCarrito(botonQuitar.dataset.id);
        return;
    }
});

// Cuando responsive.js inyecta HTML/carrito.html dentro de #main, pinta el contenido
document.addEventListener("carritoCargado", renderizarCarrito);

// Refleja el contador guardado apenas el DOM esté listo
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
