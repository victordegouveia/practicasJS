const productos = [
    { id: 1, nombre: "Elegant Studio", precio: 12.99, imagen: "images/ElegantStudio.jpg" },
    { id: 2, nombre: "Corner Of Garden", precio: 18.49, imagen: "images/cornerofgarden.jpg" },
    { id: 3, nombre: "Lucky Market", precio: 65.99, imagen: "images/luckymarket.jpg" },
    { id: 4, nombre: "Corner Of Happiness", precio: 38.49, imagen: "images/cornerofhappiness.jpg" },
    { id: 5, nombre: "Revolving Food House", precio: 15.75, imagen: "images/foodhouse.jpg" },
    { id: 6, nombre: "Moon Magic", precio: 67.75, imagen: "images/moonmagic.jpg" },
    { id: 7, nombre: "Silkwood House", precio: 96.75, imagen: "images/silkwoodhouse.jpg" }
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    const productoExistente = carrito.find((item) => item.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ 
            id: producto.id, 
            nombre: producto.nombre, 
            precio: producto.precio, 
            cantidad: 1 
        });
    }
    actualizarCarrito();
    Swal.fire({
        title: "Producto agregado",
        text: `${producto.nombre} ha sido añadido al carrito.`,
        icon: "success",
    });
}

function actualizarCarrito() {
    carrito.forEach(producto => {
        producto.subtotal = producto.cantidad * producto.precio;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const contenedor = document.getElementById("carrito");
    contenedor.innerHTML = carrito.length 
        ? carrito.map((producto, index) => `
            <div>
                <h2>${producto.nombre}</h2>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${producto.subtotal.toFixed(2)}</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
            </div>
        `).join("")
        : "<p>El carrito está vacío.</p>";
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function cambiarCantidad(index, delta) {
    carrito[index].cantidad = Math.max(1, carrito[index].cantidad + delta); // Evita cantidades menores a 1
    actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarritoUI();
});
