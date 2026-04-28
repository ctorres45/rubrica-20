let carrito = [];
let modalProducto = {};

async function cargarProductos() {
  const res = await fetch("/api/productos");
  const productos = await res.json();

  const contenedor = document.querySelector(".productos-grid");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}"
          onclick="abrirModal('${p.nombre}', ${p.precio}, '${p.imagen}')">
        <h3>${p.nombre}</h3>
        <p>$${p.precio.toLocaleString()}</p>
        <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio}, '${p.imagen}')">
          🛒 Agregar al carrito
        </button>
      </div>
    `;
  });
}

function abrirModal(nombre, precio, imagen) {
  modalProducto = { nombre, precio, imagen };
  document.getElementById("modal-img").src = imagen;
  document.getElementById("modal-nombre").textContent = nombre;
  document.getElementById("modal-precio").textContent = `$${precio.toLocaleString()}`;
  document.getElementById("modal-imagen").classList.add("activo");
}

function cerrarModal() {
  document.getElementById("modal-imagen").classList.remove("activo");
}

function modalAgregar() {
  agregarAlCarrito(modalProducto.nombre, modalProducto.precio, modalProducto.imagen);
  cerrarModal();
}

function agregarAlCarrito(nombre, precio, imagen) {
  const existente = carrito.find(i => i.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }
  actualizarCarrito();
  abrirCarrito();
}

function cambiarCantidad(nombre, delta) {
  const item = carrito.find(i => i.nombre === nombre);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) carrito = carrito.filter(i => i.nombre !== nombre);
  actualizarCarrito();
}

function eliminarItem(nombre) {
  carrito = carrito.filter(i => i.nombre !== nombre);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const contador = document.getElementById("contador-carrito");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  const totalItems = carrito.reduce((sum, i) => sum + i.cantidad, 0);
  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);

  contador.textContent = totalItems;
  subtotalEl.textContent = `$${total.toLocaleString()}`;
  totalEl.textContent = `$${total.toLocaleString()}`;

  if (carrito.length === 0) {
    lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío 😢</p>`;
    return;
  }

  lista.innerHTML = carrito.map(item => `
    <div class="carrito-item">
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="carrito-item-info">
        <h4>${item.nombre}</h4>
        <p>$${item.precio.toLocaleString()}</p>
        <div class="carrito-item-controles">
          <button onclick="cambiarCantidad('${item.nombre}', -1)">−</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
        </div>
      </div>
      <button class="btn-eliminar" onclick="eliminarItem('${item.nombre}')">🗑</button>
    </div>
  `).join("");
}

function abrirCarrito() {
  document.getElementById("carrito-drawer").classList.add("abierto");
  document.getElementById("overlay").classList.add("activo");
}

function cerrarCarrito() {
  document.getElementById("carrito-drawer").classList.remove("abierto");
  document.getElementById("overlay").classList.remove("activo");
}

async function irAWhatsApp() {
  if (carrito.length === 0) {
    alert("Agrega productos al carrito primero");
    return;
  }

  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const itemsTexto = carrito
    .map(i => `• ${i.nombre} x${i.cantidad} - $${(i.precio * i.cantidad).toLocaleString()}`)
    .join("\n");
  const mensaje = `Hola! Quiero hacer un pedido:\n\n${itemsTexto}\n\nTotal: $${total.toLocaleString()}`;

  await fetch("/api/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productos: carrito, total })
  });

  window.open(
    `https://wa.me/573116408358?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") cerrarModal();
});

cargarProductos();