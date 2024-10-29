import React, { createContext, useState, useEffect } from 'react';
import { getCart, addToCart as addProductToCart, removeFromCart as removeProductFromCart } from '../utils/cartUtils';

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del carrito para compartir el estado globalmente
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cargar el carrito desde la base de datos cuando la aplicación se monta
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  // Función para agregar productos al carrito
  const addToCart = async (product, cantidad = 1) => {
    try {
      await addProductToCart(product, cantidad);
      setCartItems((prevItems) => {
        const existingProduct = prevItems.find(
          (item) => item.producto_id === product.PRODUCTO_ID
        );
        if (existingProduct) {
          return prevItems.map((item) =>
            item.producto_id === product.PRODUCTO_ID
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          );
        } else {
          return [...prevItems, { ...product, cantidad }];
        }
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = async (productoId) => {
    try {
      await removeProductFromCart(productoId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.producto_id !== productoId)
      );
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
    // Si usas almacenamiento local o en el servidor, limpia aquí también
    // Por ejemplo: localStorage.removeItem('cart');
  };

  // Nueva función para actualizar la cantidad de un producto específico
  const updateProductQuantity = (productoId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.producto_id === productoId
          ? { ...item, cantidad: newQuantity }
          : item
      )
    );
  };

  // Función para contar el total de productos en el carrito
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateProductQuantity,
        getTotalItemsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
