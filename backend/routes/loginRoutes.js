const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware'); // Aquí importas authMiddleware

// Definir la ruta para el login
router.post('/login', loginCliente);

// Ruta protegida para obtener la información del usuario autenticado
router.get('/user-info', authMiddleware, (req, res) => {
  res.status(200).json({
    nombre: req.user.nombre,
  });
});

module.exports = router;
