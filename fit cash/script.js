
// 🛒 CARRITO (guardado en navegador)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 💾 GUARDAR
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 💰 TOTAL
function calcularTotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

// 🔔 TOAST
function mostrarToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.opacity = 1;

  setTimeout(() => {
    t.style.opacity = 0;
  }, 2000);
}

// ➕ AGREGAR AL CARRITO
function agregarAlCarrito(nombre, precio) {
  let item = carrito.find(p => p.nombre === nombre);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
  mostrarToast("Producto agregado 🛒");
}

// ❌ ELIMINAR
function eliminar(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// 🔄 ACTUALIZAR CARRITO
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total");
  const btn = document.getElementById("whatsapp-btn");

  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<p>Carrito vacío 😢</p>";
    totalTexto.textContent = "Total: $0";
    return;
  }

  carrito.forEach((item, i) => {
    lista.innerHTML += `
      <li>
        <strong>${item.nombre}</strong><br>
        Cantidad: ${item.cantidad}<br>
        Subtotal: $${(item.precio * item.cantidad).toLocaleString()}
        <br>
        <button onclick="eliminar(${i})">Eliminar</button>
      </li>
    `;
  });

  let total = calcularTotal();
  totalTexto.textContent = "Total: $" + total.toLocaleString();

  let mensaje = "Hola, quiero comprar:\n";
  carrito.forEach(item => {
    mensaje += `- ${item.nombre} x${item.cantidad}\n`;
  });
  mensaje += `Total: $${total.toLocaleString()}`;

  btn.href = `https://wa.me/573044228622?text=${encodeURIComponent(mensaje)}`;
}

// 🔥 CARGAR PRODUCTOS DESDE BACKEND
async function cargarProductos() {
  try {
    const res = await fetch("http://localhost:3000/productos");
    const productos = await res.json();

    const contenedor = document.querySelector(".productos-grid");
    contenedor.innerHTML = "";

    productos.forEach(p => {
      contenedor.innerHTML += `
        <div class="producto">
          <img src="${p.imagen}">
          <h3>${p.nombre}</h3>
          <p>$${p.precio.toLocaleString()}</p>
          <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">
            Agregar
          </button>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

// 🚀 INICIAR TODO
cargarProductos();
actualizarCarrito();