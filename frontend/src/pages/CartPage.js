import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XIcon } from '@heroicons/react/outline';

// Componente de Alerta
const Alert = ({ message, onClose }) => {
  useEffect(() => {
    // Configurar el temporizador para ocultar el mensaje después de 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Limpiar el temporizador al desmontar
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
      {message}
    </div>
  );
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad del mensaje
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (producto_id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.producto_id === producto_id
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (producto_id) => {
    const updatedCart = cart.filter((item) => item.producto_id !== producto_id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setShowAlert(true); // Mostrar alerta cuando el carrito esté vacío
      return;
    }

    const token = localStorage.getItem('token');

    if (token) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="bg-custom-gradient text-white min-h-screen flex items-center py-16 sm:py-10">
      <div className="container mx-auto p-4 sm:p-6">
        {/* Título de la página */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda: Productos del carrito */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            {cart.length === 0 ? (
              <p className="text-lg text-black">Tu carrito está vacío.</p>
            ) : (
              cart.map((product) => (
                <div key={product.producto_id} className="flex justify-between items-center mb-4 border-b pb-4">
                  <div className="flex items-center">
                    <img
                      src={product.imagen_url}
                      alt={product.nombre}
                      className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="text-base sm:text-xl font-semibold text-black">{product.nombre}</h3>
                      <p className="text-sm text-black font-bold">{product.precio} $</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(product.producto_id, product.quantity - 1)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-800">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.producto_id, product.quantity + 1)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.producto_id)}
                    className="text-red-500 hover:text-red-700 ml-2 sm:ml-4"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Columna derecha: Resumen del pedido */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-black">Resumen del Pedido</h2>
            <div className="flex justify-between mb-2 sm:mb-4">
              <span className="text-sm sm:text-lg font-medium text-black">Total de productos:</span>
              <span className="text-sm sm:text-lg text-black">{cart.length} items</span>
            </div>

            <div className="flex justify-between mb-2 sm:mb-4">
              <span className="text-sm sm:text-lg font-medium text-black">Total:</span>
              <span className="text-sm sm:text-lg font-bold text-black">{calculateTotal()} BOB</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-2 sm:py-3 rounded-lg hover:bg-green-600"
            >
              Proceder con el Pago
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar la alerta en la parte superior derecha si showAlert es true */}
      {showAlert && <Alert message="Tu carrito está vacío. Añade productos al carrito para realizar una compra." onClose={() => setShowAlert(false)} />}
    </section>
  );
};

export default CartPage;
