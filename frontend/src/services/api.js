import axios from 'axios';

// Crear una instancia de Axios con una configuración base
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Configura la URL base para todas las peticiones
  timeout: 10000, // Tiempo máximo de espera para una solicitud
  headers: {
    'Content-Type': 'application/json',
  }
});

// Puedes agregar interceptores para manejar errores o autentificación

// Funciones para manejar peticiones específicas
export const fetchProductos = () => {
  return api.get('/productos'); // Realiza una solicitud GET a la ruta '/productos'
};

// Función para obtener las categorías
export const fetchCategorias = () => {
  return api.get('/categorias'); // Ajusta la URL según tu backend
};

export const registerCliente = (clienteData) => {
  return api.post('/clientes/register', clienteData);
};

// api.js
export const fetchProductoById = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/productos/${id}`);
  return response;
};


export const loginCliente = async (formData) => {
  return await axios.post('http://localhost:3000/api/auth/login', {
    correo_electronico: formData.correo_electronico,
    contraseña: formData.contraseña,  // Asegúrate de que los nombres coincidan con los del backend
  });
};

export const fetchTallasByProducto = async (productoId) => {
  return await axios.get(`http://localhost:3000/api/productos/${productoId}/tallas`);
};

export const fetchRelatedProducts = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/productos/${id}/relacionados`);
    return response;
  } catch (error) {
    console.error('Error al obtener los productos relacionados:', error);
    throw error;
  }
};


// Exportar la instancia de Axios para que pueda ser utilizada si es necesario
export default api;
