const express = require('express');
const { getTallasByProducto } = require('../controllers/productoTallaController'); // Importa el controlador
const router = express.Router();

// Ruta para obtener las tallas de un producto
router.get('/productos/:id/tallas', getTallasByProducto);

module.exports = router;
