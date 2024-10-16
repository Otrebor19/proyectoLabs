const express = require('express');
const router = express.Router();
const { getProductos } = require('../controllers/productosController');

// Ruta para obtener todos los productos (GET)
router.get('/', getProductos);

module.exports = router;
