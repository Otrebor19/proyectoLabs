// clienteRoutes.js
const express = require('express');
const { registerCliente } = require('../controllers/clienteController');

const router = express.Router();

// Ruta para registrar un cliente
router.post('/register', registerCliente);

module.exports = router;
