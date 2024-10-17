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
    setCartItems(savedCart);
  }, []);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    addProductToCart(product); // Usa la función de cartUtils.js
    const updatedCart = getCart(); // Actualizar el estado del carrito con los datos de localStorage
    setCartItems(updatedCart);
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (producto_id) => {
    removeProductFromCart(producto_id); // Usa la función de cartUtils.js
    const updatedCart = getCart(); // Actualizar el estado del carrito con los datos de localStorage
    setCartItems(updatedCart);
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
