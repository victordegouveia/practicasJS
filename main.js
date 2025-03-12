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
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;">
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
      productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
    } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1, subtotal: producto.precio });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();

    Swal.fire({
    title: "Producto agregado",
    text: `${producto.nombre} ha sido añadido al carrito.`,
    icon: "success",
    });
}

function actualizarCarritoUI() {
    const contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";
    carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Subtotal: $${producto.subtotal.toFixed(2)}</p>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        <button onclick="modificarCantidad(${index}, 1)">+</button>
        <button onclick="modificarCantidad(${index}, -1)">-</button>
    `;
    contenedor.appendChild(div);
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();
}

function modificarCantidad(index, delta) {
    carrito[index].cantidad += delta;

    if (carrito[index].cantidad < 1) {
    carrito[index].cantidad = 1;
    }

    carrito[index].subtotal = carrito[index].cantidad * carrito[index].precio;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarritoUI();
});
