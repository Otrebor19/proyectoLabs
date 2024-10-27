
import React, { createContext, useState, useEffect } from 'react';
import { getCart, addToCart as addProductToCart, removeFromCart as removeProductFromCart } from '../utils/cartUtils'; // Importar las funciones de cartUtils

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del carrito para compartir el estado globalmente
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cargar el carrito desde localStorage cuando la aplicación se monta
  useEffect(() => {
    const savedCart = getCart();
    console.log("Carrito cargado desde localStorage:", savedCart); // Verifica si se cargan los productos
    setCartItems(savedCart);
  }, []);

  // Función para agregar productos al carrito
 // Función para agregar productos al carrito
// Función para agregar productos al carrito
const addToCart = (product) => {
  addProductToCart(product); // Usa la función de cartUtils.js
  setCartItems((prevItems) => {
    // Actualiza el estado con los datos más recientes
    const existingProductIndex = prevItems.findIndex(item => item.unique_id === product.unique_id);

    if (existingProductIndex !== -1) {
      // Si el producto ya existe, aumenta la cantidad
      const updatedItems = [...prevItems];
      updatedItems[existingProductIndex] = {
        ...updatedItems[existingProductIndex],
        quantity: updatedItems[existingProductIndex].quantity + 1,
      };
      return updatedItems;
    } else {
      // Añadir el producto al carrito
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });
};

// Función para eliminar productos del carrito
const removeFromCart = (uniqueId) => {
  removeProductFromCart(uniqueId); // Usa la función de cartUtils.js para eliminar el producto usando unique_id
  setCartItems((prevItems) => prevItems.filter(item => item.unique_id !== uniqueId));
};



  // Función para contar el total de productos en el carrito
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
};
