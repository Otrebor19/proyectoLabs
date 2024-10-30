const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secretKey = 'yourSecretKey';

router.get('/auth/user', (req, res) => {
  const token = req.cookies.token; // Obtener el token de la cookie

  if (!token) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Verificar el token

    // Devolver los datos del usuario autenticado
    res.status(200).json({
      id: decoded.clienteId,
      nombre: decoded.nombre,
      correo_electronico: decoded.correo_electronico
    });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
