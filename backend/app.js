const express = require('express');
const cors = require('cors');// Importa el paquete cors
const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3001' // Cambia este valor al puerto donde corre tu frontend
}));

// Middlewares y rutas
app.use(express.json());





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

const tokenRoutes = require('./routes/tokenRoutes');
app.use('/api/tokens', tokenRoutes); 

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
