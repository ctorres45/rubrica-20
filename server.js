const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// conexión DB
mongoose.connect("mongodb://127.0.0.1:27017/fitchash")
  .then(() => console.log("✅ DB conectada"))
  .catch(err => console.log(err));

// modelo
const Producto = mongoose.model("Producto", {
  nombre: String,
  precio: Number,
  imagen: String,
  stock: Number
});

// ruta productos
app.get("/productos", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// servidor
app.listen(3000, () => {
  console.log("🚀 Servidor en puerto 3000");
});