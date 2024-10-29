const express = require('express');
const router = express.Router();
const { getCarritoByCliente, addProductoToCarrito, removeProductoFromCarrito } = require('../controllers/carritoController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación

// Obtener el carrito del usuario autenticado
router.get('/carrito', authMiddleware, getCarritoByCliente);

// Agregar un producto al carrito del usuario autenticado
router.post('/carrito/add', authMiddleware, addProductoToCarrito);

// Eliminar un producto del carrito del usuario autenticado
router.post('/carrito/remove', authMiddleware, removeProductoFromCarrito);

module.exports = router;
