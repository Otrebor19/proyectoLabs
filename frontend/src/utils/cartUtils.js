import axios from 'axios';

// Obtener el carrito del backend
export const getCart = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/carrito', {
      withCredentials: true, // Asegúrate de que las credenciales (cookies) se envíen
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
  return [];
};

// Agregar un producto al carrito
export const addToCart = async (product, cantidad = 1) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/carrito/add',
      { productoId: product.PRODUCTO_ID, cantidad },
      {
        withCredentials: true, // Esto permite que las cookies se envíen
      }
    );
    

    if (response.status === 200 || response.status === 201) {
      console.log('Producto añadido al carrito correctamente');
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};

// Eliminar un producto del carrito
export const removeFromCart = async (productoId) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/carrito/remove',
      { productoId },
      {
        withCredentials: true, // Asegúrate de que las credenciales (cookies) se envíen
      }
    );

    if (response.status === 200) {
      console.log('Producto eliminado del carrito correctamente');
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCart = async (uniqueId, quantity) => {
  try {
    const response = await axios.put(
      'http://localhost:3000/api/carrito/update',
      { productoId: uniqueId, cantidad: quantity },
      {
        withCredentials: true, // Asegúrate de que las credenciales (cookies) se envíen
      }
    );

    if (response.status === 200) {
      console.log('Cantidad del producto actualizada correctamente');
    }
  } catch (error) {
    console.error('Error updating product in cart:', error);
  }
};
