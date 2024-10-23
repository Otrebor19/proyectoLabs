import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.png'; // Asegúrate de que tu logo esté en la carpeta assets
import { ShoppingCartIcon } from '@heroicons/react/outline'; // Importar íconos
import CartModal from './CartModal'; // Importar el modal del carrito
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar el modal del carrito
  const [cartItemsCount, setCartItemsCount] = useState(0); // Estado para contar los productos en el carrito
  const { getTotalItemsInCart } = useContext(CartContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado
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

  // Verificar si el usuario está autenticado verificando el token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    setIsAuthenticated(false); // Actualizar el estado de autenticación
    navigate('/'); // Redirigir al usuario a la página de inicio de sesión
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
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          {/* Sección central: Logo */}
          <div className="flex justify-center items-center h-16 md:h-24 lg:h-32">
            <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
          </div>

          {/* Sección derecha: Barra de búsqueda, carrito y login/logout */}
          <div className="flex items-center space-x-4">
            

            {/* Mostrar botón de "Iniciar sesión" o "Cerrar sesión" según el estado de autenticación */}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="font-sans text-xl md:text-2xl text-white hover:text-thov">
                Cerrar sesión
              </button>
            ) : (
              <a href='/login' className="font-sans text-xl md:text-2xl text-white hover:text-thov">
                Iniciar sesión
              </a>
            )}

            {/* Icono del carrito */}
            <button className="relative" onClick={toggleCart}>
              <ShoppingCartIcon className="h-8 w-8 text-white hover:text-green-400" />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {getTotalItemsInCart()} {/* Mostrar el número total de productos en el carrito */}
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

      {/* Importar los modales */}
      <CartModal isCartOpen={isCartOpen} toggleCart={toggleCart} cart={JSON.parse(localStorage.getItem('cart')) || []} removeFromCart={removeFromCart} />
    </div>
  );
};

export default Header;
