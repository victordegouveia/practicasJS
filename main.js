class Producto {
    static currentId = 0;

    constructor(nombre, precio, cantidad) {
        this.id = ++Producto.currentId;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.subtotal = this.calcularSubtotal();
    }

    calcularSubtotal() {
        return this.precio * this.cantidad;
    }

}
const productos = JSON.parse(localStorage.getItem("productos")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const cart = document.getElementById("cart");

    const renderCart = () => {
        cart.innerHTML = '';
        productos.forEach((producto, index) => {
            const productElement = document.createElement ('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h2>${producto.nombre}</h2>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Subtotal: ${producto.subtotal}</p>
                <button onclick="removeProduct(${index})">Eliminar</button>
                `;
            cart.appendChild(productElement);    
        });
    };
    const addProduct = (nombre, cantidad, precio) => {
        const nuevoProducto = new Producto(nombre, precio, cantidad);
        productos.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(productos));
        renderCart();
    };
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("product-name").value;
        const cantidad = document.getElementById("product-quantity").value;
        const precio = document.getElementById("product-price").value;
        addProduct(nombre, cantidad, precio);
        productForm.reset();
        });

        window.removeProduct = (index) => {
            productos.splice(index, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            renderCart();
        };

        renderCart();


});