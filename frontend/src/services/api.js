import axios from 'axios';

// Crear una instancia de Axios con una configuración base
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Configura la URL base para todas las peticiones
  timeout: 10000, // Tiempo máximo de espera para una solicitud
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Asegúrate de que las cookies se envíen con cada solicitud
});


// Función para crear el PaymentIntent
export const createPaymentIntent = (paymentData) => {
  return api.post('/create-payment-intent', paymentData);
};




// Funciones para manejar peticiones específicas
// Funciones para manejar peticiones específicas
export const fetchProductos = () => {
  return api.get('/products'); // Realiza una solicitud GET a la ruta '/productos'
};

// Eliminar un producto por ID
export const deleteProducto = async (productoId) => {
  try {
    await api.delete(`/productos/${productoId}`); // Usar la instancia de api
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

export const updateProducto = async (productoId, productoData) => {
  try {
    await api.put(`/productos/${productoId}`, productoData); // Usar la instancia de api
  } catch (error) {
    if (error.response) {
      console.error('Error al actualizar el producto:', error.response.data);
    } else {
      console.error('Error al actualizar el producto:', error.message);
    }
    throw error;
  }
};


// Crear un nuevo producto
export const createProducto = async (productoData) => {
  try {
    await api.post('/productos', productoData); // Usar la instancia de api
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
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
  const response = await api.get(`/productos/${id}`); // Usar api en lugar de axios
  return response;
};


export const loginCliente = async (formData) => {
  try {
    const response = await api.post('/auth/login', {
      correo_electronico: formData.correo_electronico,
      contraseña: formData.contraseña,  
    });
    
    // No necesitas guardar el token en localStorage si estás usando cookies HttpOnly
    return response;
  } catch (error) {
    throw error;
  }
};



export const fetchTallasByProducto = async (productoId) => {
  return await api.get(`/productos/${productoId}/tallas`); // Usar api en lugar de axios
};



export const fetchRelatedProducts = async (id) => {
  try {
    const response = await api.get(`/productos/${id}/relacionados`); // Usar api en lugar de axios
    return response;
  } catch (error) {
    console.error('Error al obtener los productos relacionados:', error);
    throw error;
  }
};



// Exportar la instancia de Axios para que pueda ser utilizada si es necesario
export default api;
