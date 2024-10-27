const express = require('express');
const { getTallasByProducto, addProductoTalla } = require('../controllers/productoTallaController'); // Importa el controlador
const router = express.Router();

// Ruta para obtener las tallas de un producto
router.get('/producto/:id', getTallasByProducto);

router.post('/', addProductoTalla);
module.exports = router;
