import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.png';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import CartModal from './CartModal';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ removeFromCart }) => {
  const { user, logout } = useContext(UserContext);
  const { cartItems, getTotalItemsInCart, clearCart } = useContext(CartContext); // Obtiene el usuario y logout del contexto
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    clearCart(); // Llama a logout del contexto para actualizar el estado de usuario
    navigate('/');
    window.location.reload(); // Redirige a la página de inicio de sesión
  };

  useEffect(() => {
    setCartItemsCount(getTotalCartItems());
  }, [isCartOpen, cartItemsCount]);

  return (
    <div>
      <header className="absolute top-0 left-0 w-full bg-transparent py-4 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Sección izquierda: Links de navegación */}
          <div className="flex items-center space-x-4">
            <nav className={`md:flex md:flex-row space-x-8 ${isOpen ? 'block absolute top-16 left-0 w-full bg-black bg-opacity-90 z-50' : 'hidden'} md:block`}>
              <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
                <li><a href="/" className="font-sans text-xl md:text-2xl text-white hover:underline">Inicio</a></li>
                <li><a href="#hombres" className="font-sans text-xl md:text-2xl text-white hover:underline">Hombres</a></li>
                <li><a href="#mujeres" className="font-sans text-xl md:text-2xl text-white hover:underline">Mujeres</a></li>
                <li><a href="#niños" className="font-sans text-xl md:text-2xl text-white hover:underline">Niños</a></li>
              </ul>
            </nav>

            {/* Botón de hamburguesa para pantallas pequeñas */}
            <button className="text-white md:hidden focus:outline-none" onClick={toggleMenu}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          {/* Sección central: Logo */}
          <div className="flex justify-center items-center h-16 md:h-24 lg:h-32">
            <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
          </div>

          {/* Sección derecha: Icono de usuario, nombre, carrito y cerrar sesión */}
          <div className="flex items-center space-x-4">
            {/* Icono de usuario y nombre */}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserIcon className="h-6 w-6 text-white" />
                <span className="font-sans text-xl md:text-2xl text-white">
                  {user.nombre}
                </span>
                <button className="font-sans text-xl md:text-2xl text-white hover:text-thov ml-4" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <a href='/login' className="font-sans text-xl md:text-2xl text-white hover:text-thov">
                Iniciar sesión
              </a>
            )}

            {/* Icono del carrito */}
            <button className="relative" onClick={toggleCart}>
              <ShoppingCartIcon className="h-8 w-8 text-white hover:text-green-400" />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {getTotalItemsInCart()}
              </span>
            </button>
          </div>
        </div>

        {/* Barra de búsqueda y login visible solo en pantallas pequeñas */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} flex-col items-center mt-4 space-y-4 px-4`}>
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="border rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      {/* Modal del carrito */}
      <CartModal isCartOpen={isCartOpen} toggleCart={toggleCart} cart={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default Header;
