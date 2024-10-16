// routes/categorias.js
const express = require('express');
const router = express.Router();
const { getCategorias } = require('../controllers/categoriasController');

// Ruta para obtener las categorías (GET)
router.get('/', getCategorias);

module.exports = router;
