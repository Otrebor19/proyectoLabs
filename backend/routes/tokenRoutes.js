const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta para generar el token anónimo
router.get('/anonToken', (req, res) => {
  const carrito = { productos: [] }; // Inicializa el carrito vacío para el cliente
  const token = jwt.sign(carrito, 'claveSecreta', { expiresIn: '24h' }); // Genera un token JWT
  res.cookie('anonToken', token, { httpOnly: true }); // Almacena el token en una cookie HTTP-only
  res.json({ message: 'Token anónimo creado' });
});

module.exports = router;
