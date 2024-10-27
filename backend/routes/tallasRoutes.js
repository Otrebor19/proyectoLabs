const express = require('express');
const { getTallas } = require('../controllers/tallasController');
const router = express.Router();

// Definir la ruta para obtener todas las tallas
router.get('/', getTallas);

module.exports = router;
