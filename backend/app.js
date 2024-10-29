const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
const corsOptions = {
  origin: 'http://localhost:3001', // Dirección del frontend
  credentials: true, // Permitir el uso de cookies y credenciales
};
app.use(cors(corsOptions)); // Aplicar CORS primero

// Middleware para el análisis de cookies
app.use(cookieParser());

// Middlewares para analizar el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const carritoRoutes = require('./routes/carritoRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const productosRoutes = require('./routes/productosRoutes');
const categoriasRouter = require('./routes/categorias');
const clienteRoutes = require('./routes/clienteRoutes');
const productRoutes = require('./routes/productRoutes');
const tallasRoutes = require('./routes/tallasRoutes');
const loginRoutes = require('./routes/loginRoutes');
const productoTallaRoutes = require('./routes/productoTallaRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

// Usar rutas
app.use('/api', carritoRoutes);
app.use('/api', checkoutRoutes);
app.use('/api/', productosRoutes);
app.use('/api/categorias', categoriasRouter);
app.use('/api/clientes', clienteRoutes);
app.use(productRoutes);
app.use('/api/tallas', tallasRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/producto_talla', productoTallaRoutes);
app.use('/api/tokens', tokenRoutes);

// Middleware de autenticación solo para las rutas protegidas (aplícalo según sea necesario)
const authMiddleware = require('./middlewares/authMiddleware');
app.use('/api/carrito', authMiddleware, carritoRoutes); // Aplicar el middleware a las rutas de carrito si necesitas protegerlas

// Rutas para archivos públicos
app.use('/public', express.static('public'));

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
