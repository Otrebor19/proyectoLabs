const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token; // Leer el token de la cookie
  console.log('Token recibido:', req.cookies?.token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey'); // Reemplaza 'your_jwt_secret' por tu clave secreta
    req.user = decoded; // Adjunta el usuario decodificado al request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
