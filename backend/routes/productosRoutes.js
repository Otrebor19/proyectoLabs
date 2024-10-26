const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/products', productosController.getProducts);

// Ruta para obtener un producto por ID
router.get('/products/:id', productosController.getProductById);

// Ruta para añadir un nuevo producto
router.post('/products', productosController.addProduct);

// Ruta para actualizar un producto existente
router.put('/products/:id', productosController.updateProduct);

// Ruta para eliminar un producto
router.delete('/products/:id', productosController.deleteProduct);

module.exports = router;
