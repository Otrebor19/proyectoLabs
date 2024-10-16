const express = require('express');
const router = express.Router();
const { getProductById, getRelatedProducts } = require('../controllers/productController');

// Ruta para obtener un producto por su ID
router.get('/api/productos/:id', getProductById);

// Ruta para obtener productos relacionados
router.get('/api/productos/:id/relacionados', getRelatedProducts);

module.exports = router;
