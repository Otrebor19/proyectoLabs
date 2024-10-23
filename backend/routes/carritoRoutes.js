const express = require('express');
const router = express.Router();
const { getCarritoByCliente, addProductoToCarrito, removeProductoFromCarrito } = require('../controllers/carritoController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación

// Obtener el carrito del usuario autenticado
router.get('/carrito', authMiddleware, async (req, res) => {
  const clienteId = req.user.id; // Obtener el cliente autenticado desde el middleware
  const carrito = await getCarritoByCliente(clienteId); // Función que debes implementar
  res.json(carrito);
});

// Agregar un producto al carrito del usuario autenticado
router.post('/carrito/add', authMiddleware, async (req, res) => {
  const clienteId = req.user.id;
  const { product } = req.body;
  await addProductoToCarrito(clienteId, product); // Función que debes implementar
  res.status(200).json({ message: 'Producto añadido al carrito' });
});

// Eliminar un producto del carrito del usuario autenticado
router.post('/carrito/remove', authMiddleware, async (req, res) => {
  const clienteId = req.user.id;
  const { productoId } = req.body;
  await removeProductoFromCarrito(clienteId, productoId); // Función que debes implementar
  res.status(200).json({ message: 'Producto eliminado del carrito' });
});

module.exports = router;
