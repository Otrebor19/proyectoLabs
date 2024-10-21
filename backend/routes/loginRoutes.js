const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/loginController');
const verifyToken = require('../middlewares/authMiddleware'); // Importar middleware

// Definir la ruta para el login
router.post('/login', loginCliente);

router.get('/perfil', verifyToken, (req, res) => {
    res.status(200).json({ message: `Bienvenido, ${req.cliente.correo_electronico}` });
  });


module.exports = router;
