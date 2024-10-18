const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/loginController');

// Definir la ruta para el login
router.post('/login', loginCliente);

module.exports = router;
