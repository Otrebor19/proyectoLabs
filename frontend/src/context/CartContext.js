import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCart, removeFromCart } from '../utils/cartUtils';
import { UserContext } from '../context/UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  // Cargar el carrito desde `localStorage` al montar el componente o cuando cambia el usuario
  useEffect(() => {
    const loadCartFromLocalStorage = () => {
      if (user) {
        const storedCart = localStorage.getItem(`cart_${user.id}`);
        if (storedCart) {
          console.log("Cargando carrito desde localStorage");
          setCartItems(JSON.parse(storedCart));
        } else {
          console.log("No hay carrito en localStorage para este usuario");
        }
      }
    };
    loadCartFromLocalStorage();
  }, [user]); // Agrega `user` como dependencia
  

  // Sincronizar el carrito con el backend al iniciar sesión si no hay carrito en `localStorage`
  useEffect(() => {
    const loadCartFromBackend = async () => {
      if (user && !localStorage.getItem(`cart_${user.id}`)) {
        try {
          console.log("Cargando carrito desde el backend");
          const backendCart = await getCart();
          setCartItems(backendCart);
          localStorage.setItem(`cart_${user.id}`, JSON.stringify(backendCart));
        } catch (error) {
          console.error('Error al cargar el carrito desde el backend:', error);
        }
      }
    };
    loadCartFromBackend();
  }, [user]);

  // Guardar el carrito en `localStorage` cada vez que `cartItems` cambie
  useEffect(() => {
    if (user) {
      console.log("Guardando carrito en localStorage");
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCartHandler = async (product, cantidad = 1) => {
    try {
      console.log('Datos enviados a addToCart:', {
        PRODUCTO_ID: product.PRODUCTO_ID,
        cantidad,
        cliente_id: user.id,
        sesion_id: user.sesion_id,
      });
      await addToCart({
        PRODUCTO_ID: product.PRODUCTO_ID,
        cantidad,
        cliente_id: user.id,
        sesion_id: user.sesion_id,
      });
  
      setCartItems((prevItems) => {
        const existingProduct = prevItems.find((item) => item.PRODUCTO_ID === product.PRODUCTO_ID);
        if (existingProduct) {
          return prevItems.map((item) =>
            item.PRODUCTO_ID === product.PRODUCTO_ID
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          );
        } else {
          return [...prevItems, { ...product, cantidad }];
        }
      });
    } catch (error) {
      console.error('Error añadiendo producto al carrito:', error);
    }
  };
  
  

  const removeFromCartHandler = async (productoId) => {
    try {
      await removeFromCart(productoId);
      setCartItems((prevItems) => prevItems.filter((item) => item.PRODUCTO_ID !== productoId));
    } catch (error) {
      console.error('Error eliminando producto del carrito:', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
      console.log("Carrito eliminado de localStorage al cerrar sesión");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        clearCart,
        getTotalItemsInCart: () => cartItems.reduce((total, item) => total + item.cantidad, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
