import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png'; // Asegúrate de que tu logo esté en la carpeta assets
import { ShoppingCartIcon } from '@heroicons/react/outline'; // Importar íconos
import CartModal from './CartModal'; // Importar el modal del carrito
import LoginModal from './LoginModal'; // Importar el modal de inicio de sesión

const Header = ({ removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de inicio de sesión
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar el modal del carrito
  const [cartItemsCount, setCartItemsCount] = useState(0); // Estado para contar los productos en el carrito

  // Función para abrir/cerrar el menú de navegación
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para abrir/cerrar el modal de inicio de sesión
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para abrir/cerrar el modal del carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Función para obtener el número de productos en el carrito desde localStorage
  const getTotalCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // useEffect para actualizar el contador del carrito cuando cambia el contenido del carrito
  useEffect(() => {
    setCartItemsCount(getTotalCartItems());
  }, [isCartOpen, cartItemsCount]); // Se actualiza cuando se abre/cierra el carrito o cambia el número de productos

  return (
    <div>
      <header className="absolute top-0 left-0 w-full bg-transparent py-4 ">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Sección izquierda: Links de navegación */}
          <div className="flex items-center space-x-4">
            <nav className={`flex-col md:flex-row md:flex items-center space-x-0 md:space-x-8 lg:space-x-12 ${isOpen ? 'flex' : 'hidden'} md:flex`}>
              <a href="/" className="font-sans text-xl md:text-2xl lg:text-4xl text-white hover:underline hover:text-thov">Inicio</a>
              <a href="#hombres" className="font-sans text-lg md:text-xl lg:text-2xl text-white hover:underline hover:text-thov">Hombres</a>
              <a href="#mujeres" className="font-sans text-lg md:text-xl lg:text-2xl text-white hover:underline hover:text-thov">Mujeres</a>
              <a href="#niños" className="font-sans text-lg md:text-xl lg:text-2xl text-white hover:underline hover:text-thov">Niños</a>
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

          {/* Sección derecha: Barra de búsqueda, carrito y login */}
          <div className="flex items-center space-x-4">
            {/* Barra de búsqueda */}
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="border rounded-full px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Botón de iniciar sesión */}
            <button onClick={toggleModal} className="font-sans text-xl md:text-2xl text-white hover:text-thov">
              Iniciar sesión
            </button>
            
            {/* Icono del carrito */}
            <button className="relative" onClick={toggleCart}>
              <ShoppingCartIcon className="h-8 w-8 text-white hover:text-green-400" />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {cartItemsCount} {/* Mostrar el número total de productos en el carrito */}
              </span>
            </button>
          </div>
        </div>

        {/* Barra de búsqueda y login visible solo en pantallas pequeñas */}
        <div className={`md:hidden ${isOpen ? 'flex' : 'hidden'} flex-col items-center mt-4 space-y-4`}>
          <div className="relative flex items-center w-full px-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="border rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      {/* Importar los modales */}
      <CartModal isCartOpen={isCartOpen} toggleCart={toggleCart}  cart={JSON.parse(localStorage.getItem('cart')) || []}
        removeFromCart={removeFromCart}/>
      <LoginModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    </div>
  );
};

export default Header;
