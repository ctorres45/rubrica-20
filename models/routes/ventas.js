const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");

router.post("/", async (req, res) => {
  try {
    const nuevaVenta = new Venta(req.body);
    const ventaGuardada = await nuevaVenta.save();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find().sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;