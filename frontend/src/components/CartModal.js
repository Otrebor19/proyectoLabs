import React, { useContext, useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

// Componente de Alerta
const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
      {message}
    </div>
  );
};

const CartModal = ({ isCartOpen, toggleCart }) => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Obtiene cartItems y removeFromCart desde el contexto
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Verifica el contenido del carrito cuando se actualiza
  useEffect(() => {
    console.log("Contenido del carrito:", cartItems);
  }, [cartItems]);

  // Función para redirigir a la página del carrito
  const handleViewCart = () => {
    toggleCart();
    navigate("/cart");
  };

  // Función para manejar el botón de "Proceder con el Pago"
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowAlert(true);
      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`fixed shadow-md shadow-white inset-y-0 right-0 w-80 backdrop-blur-sm bg-transparent z-50 transform transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Botón de cerrar en la esquina superior derecha */}
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-800"
        onClick={toggleCart}
      >
        <XIcon className="h-6 w-6" />
      </button>

      <div className="p-6 flex flex-col h-full">
        <h2 className="text-[32px] text-white font-sans mb-4">
          Carrito de Compras
        </h2>

        {/* Lista de productos en el carrito */}
        <div className="mb-4 space-y-4 flex-grow">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div
                key={product.PRODUCTO_ID}
                className="flex justify-between items-center"
              >
                {" "}
                {/* Usa PRODUCTO_ID como key */}
                <div className="flex items-center">
                  {product.IMAGEN_URL && (
                    <img
                      src={product.IMAGEN_URL}
                      alt={product.NOMBRE}
                      className="w-10 h-10 rounded-lg mr-2"
                    />
                  )}
                  <div>
                    <h3 className="text-[14px] text-left text-white">
                      {product.NOMBRE}
                    </h3>
                    <p className="text-sm text-white text-justify">
                      Cantidad: {product.cantidad}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[14px] font-bold text-white">
                    {product.PRECIO} $
                  </span>
                  <button
                    onClick={() => removeFromCart(product.PRODUCTO_ID)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">El carrito está vacío.</p>
          )}
        </div>

        {/* Botones: Ver carrito y Proceder con la compra */}
        <div className="space-y-2 mt-auto">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={handleViewCart}
          >
            Ver Carrito
          </button>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-2 sm:py-3 rounded-lg hover:bg-green-600"
          >
            Proceder con el Pago
          </button>
        </div>
      </div>

      {/* Mostrar la alerta si el carrito está vacío */}
      {showAlert && (
        <Alert
          message="Tu carrito está vacío. Añade productos para proceder con el pago."
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default CartModal;
