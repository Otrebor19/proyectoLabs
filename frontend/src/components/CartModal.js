import React, { useContext } from 'react'; // Eliminamos useState y useEffect
import { XIcon } from '@heroicons/react/outline'; 
import { useNavigate } from 'react-router-dom'; 
import { CartContext } from '../context/CartContext'; // Importar el CartContext

const CartModal = ({ isCartOpen, toggleCart }) => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Eliminamos getTotalItemsInCart porque no se está usando
  const navigate = useNavigate();

  // Función para redirigir a la página del carrito
  const handleViewCart = () => {
    toggleCart(); // Cierra el modal
    navigate('/cart'); // Redirige a la página del carrito
  };
 // Función para manejar el botón de "Proceder con el Pago"
 const handleCheckout = () => {
  const token = localStorage.getItem('token'); // Verificar si el token está presente

  if (token) {
    // Si el token está presente, redirigir a la página de Checkout
    navigate('/checkout');
  } else {
    // Si no hay token, redirigir a la página de inicio de sesión
    navigate('/login');
  }
};
  return (
    <div
      className={`fixed shadow-md shadow-white inset-y-0 right-0 w-80 backdrop-blur-sm bg-transparent z-50 transform transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
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
        <h2 className="text-[32px] text-white font-sans mb-4">Carrito de Compras</h2>

        {/* Lista de productos en el carrito */}
        <div className="mb-4 space-y-4 flex-grow">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div key={product.producto_id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src={product.imagen_url} 
                    alt={product.nombre} 
                    className="w-10 h-10 rounded-lg mr-2" 
                  />
                  <div>
                    <h3 className="text-[14px] text-left text-white">{product.nombre}</h3>
                    <p className="text-sm text-white text-justify">Cantidad: {product.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[14px] font-bold text-white">{product.precio} $</span>
                  <button
                    onClick={() => removeFromCart(product.producto_id)} // Eliminar producto
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
              onClick={handleCheckout} // Añadir el evento onClick aquí
              className="w-full bg-green-500 text-white py-2 sm:py-3 rounded-lg hover:bg-green-600"
            >
              Proceder con el Pago
            </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
