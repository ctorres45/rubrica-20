const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  productos: [
    {
      nombre: String,
      cantidad: Number,
      precio: Number
    }
  ],
  total: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Venta", ventaSchema);