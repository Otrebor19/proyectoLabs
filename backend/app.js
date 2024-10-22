const express = require('express');
const cors = require('cors');// Importa el paquete cors
const app = express();

// Configura CORS para permitir solicitudes desde el frontend
const corsOptions = {
  origin: 'http://localhost:3001', // Asegúrate de que sea el origen correcto de tu frontend
  credentials: true, // Esto es necesario para permitir las credenciales (cookies, tokens, etc.)
};

app.use(cors(corsOptions));
// Middlewares y rutas
app.use(express.json());


const allProductRoutes = require('./routes/allProductRoutes');
app.use('/api', allProductRoutes);

// Importar rutas
const checkoutRoutes = require('./routes/checkoutRoutes'); // Importar las rutas de checkout
app.use('/api', checkoutRoutes); // Aquí es donde usas las rutas de checkout


app.use('/public', express.static('public'));
// Importar las rutas de la API
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

const categoriasRouter = require('./routes/categorias');
app.use('/api/categorias', categoriasRouter);

// Usar las rutas de clientes
const clienteRoutes = require('./routes/clienteRoutes');
app.use('/api/clientes', clienteRoutes);

const productRoutes = require('./routes/productRoutes'); // Importar tus rutas
app.use(productRoutes);

// Importar las rutas de login
const loginRoutes = require('./routes/loginRoutes'); // Para la autenticación/login
app.use('/api/auth', loginRoutes); // Rutas del login bajo "/api/auth"

// Importar las rutas de tallas de productos
const productoTallaRoutes = require('./routes/productoTallaRoutes');
app.use('/api', productoTallaRoutes); // Montar las rutas


const cookieParser = require('cookie-parser');
app.use(cookieParser());



const tokenRoutes = require('./routes/tokenRoutes');
app.use('/api/tokens', tokenRoutes); 

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
