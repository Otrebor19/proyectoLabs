const express = require('express');
const { getAllProducts, getProductsByCategory } = require('../controllers/allProductController');
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/allproducts', getAllProducts);

// Ruta para obtener productos por categoría
router.get('/allproducts/categoria/:categoriaId', getProductsByCategory);

module.exports = router;
