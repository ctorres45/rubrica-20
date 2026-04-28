const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

mongoose.connect("mongodb://127.0.0.1:27017/fitcash")
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Error:", err));

const Producto = mongoose.model("Producto", {
  nombre: String,
  precio: Number,
  imagen: String,
  stock: Number
});

const Pedido = mongoose.model("Pedido", {
  productos: [{ nombre: String, precio: Number, cantidad: Number }],
  total: Number,
  fecha: { type: Date, default: Date.now },
  estado: { type: String, default: "pendiente" }
});

// ===== PRODUCTOS =====
app.get("/api/productos", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.post("/api/productos", async (req, res) => {
  const producto = new Producto(req.body);
  await producto.save();
  res.json(producto);
});

app.put("/api/productos/:id", async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(producto);
});

app.delete("/api/productos/:id", async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Producto eliminado" });
});

// ===== PEDIDOS =====
app.get("/api/pedidos", async (req, res) => {
  const pedidos = await Pedido.find().sort({ fecha: -1 });
  res.json(pedidos);
});

app.post("/api/pedidos", async (req, res) => {
  const pedido = new Pedido(req.body);
  await pedido.save();
  res.json(pedido);
});

app.put("/api/pedidos/:id", async (req, res) => {
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(pedido);
});

app.listen(3000, () => {
  console.log("🚀 Servidor en http://localhost:3000");
});