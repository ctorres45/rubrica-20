const productos = [
  {
    nombre: "Proteína Whey",
    precio: 120000,
    imagen: "https://smartmuscle.com.co/wp-content/uploads/2025/04/smartmuscle-4.webp"
  },
  {
    nombre: "Creatina Monohidratada",
    precio: 80000,
    imagen: "https://nutrafitcolombia.com/wp-content/uploads/2024/11/creatina-monohidratada-500-gramos-dymatize-nutrafit-3.webp"
  },
  {
    nombre: "Crea Stack",
    precio: 80000,
    imagen: "https://nutramerican.com/video/creastack/LOADCREASTACKNUEVA.webp"
  },
  {
    nombre: "Smart",
    precio: 55000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1vQg24z5_xSi2kBH8yT9fImnSRMnvzTMzkg&s"
  },
  {
    nombre: "Creatina Ultra Pure",
    precio: 95000,
    imagen: "https://muscleandfitnessco.com/cdn/shop/files/creatine_ultra_pure_specs.jpg?v=1717683028"
  },
  {
    nombre: "Syntha-6",
    precio: 95000,
    imagen: "https://bangladeshsupplementhouse.com/wp-content/uploads/2025/08/syntha-6-22g-Protin.jpg"
  },
  {
    nombre: "Omega 3",
    precio: 60000,
    imagen: "https://nutrafitcolombia.com/wp-content/uploads/2020/11/omega-3-120-capsulas-proscience-galeria.webp"
  },
  {
    nombre: "Bipro",
    precio: 60000,
    imagen: "https://nutramerican.com/img/parallaxbipros.webp"
  }
];

let carrito = [];
let total = 0;

function cargarProductos() {
  const contenedor = document.querySelector(".productos-grid");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>$${p.precio.toLocaleString()}</p>
        <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">
          Agregar
        </button>
      </div>
    `;
  });
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;

  const lista = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total");

  lista.innerHTML = "";

  carrito.forEach(item => {
    lista.innerHTML += `<li>${item.nombre} - $${item.precio.toLocaleString()}</li>`;
  });

  totalTexto.textContent = `Total: $${total.toLocaleString()}`;

  // Actualizar enlace de WhatsApp
  const itemsTexto = carrito.map(i => `${i.nombre} ($${i.precio.toLocaleString()})`).join(", ");
  const mensaje = encodeURIComponent(`Hola! Quiero comprar: ${itemsTexto}. Total: $${total.toLocaleString()}`);
  document.getElementById("whatsapp-btn").href = `https://wa.me/573116408358?text=${mensaje}`;
}

cargarProductos();