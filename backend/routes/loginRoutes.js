const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware'); // Aquí importas authMiddleware

// Definir la ruta para el login
router.post('/login', loginCliente);
// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Nombre de la cookie que guarda el token de autenticación
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
});
// Ruta protegida para obtener la información del usuario autenticado
router.get('/user-info', authMiddleware, (req, res) => {
  console.log('Usuario autenticado:', req.user); // Imprime los datos del usuario en el backend
  if (req.user) {
    res.status(200).json({ nombre: req.user.nombre });
  } else {
    res.status(401).json({ message: 'Usuario no autenticado' });
  }
});

module.exports = router;
