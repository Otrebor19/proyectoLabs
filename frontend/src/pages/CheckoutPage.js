import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext'; // Importar el contexto del carrito
import axios from 'axios';
import SuccessModal from '../components/SuccessModal';

// Cargar la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51OxE7hFhc7H0Vh4wjBCtxDxUuZ7BSfD0OXWqRD0MsJBN5aGhUPVmd9uTqZmg9suV1KvemjDR9AYmpUDwrcZ1uH7L004DgyQjji');

const CheckoutForm = ({ products, totalAmount }) => {
  const { clearCart } = useContext(CartContext); 
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    address: '',
  });


  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/'); // Redirige a la página principal
  };

  // Manejar cambios en el formulario de información del comprador
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({
      ...buyerInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear PaymentIntent desde el backend
      const { data } = await axios.post('http://localhost:3000/api/create-payment-intent', {
        amount: totalAmount * 100, // Convertir a centavos
        currency: 'usd',
        name: buyerInfo.name,
        email: buyerInfo.email, // Se envía el nombre del comprador al backend para la transacción
        products: products // Enviar los productos del carrito al backend
      });

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      // Confirmar el pago
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: buyerInfo.name,
            email: buyerInfo.email,
            address: {
              line1: buyerInfo.address,
            },
          },
        },
      });

      
      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setShowSuccessModal(true); // Mostrar modal de éxito
        clearCart(); // Vaciar el carrito después de una compra exitosa
      }
    } catch (error) {
      setErrorMessage('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Información de Facturación</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-gray-700">Nombre completo</label>
          <input type="text" name="name" value={buyerInfo.name} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" required />
        </div>

        <div>
          <label className="block text-gray-700">Correo electrónico</label>
          <input type="email" name="email" value={buyerInfo.email} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" required />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Dirección de facturación</label>
        <input type="text" name="address" value={buyerInfo.address} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" required />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Detalles de la Tarjeta</h3>
        <div className="border border-gray-300 p-4 rounded">
          <CardElement className="w-full" />
        </div>
      </div>

      {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
      <button type="submit" disabled={!stripe || loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4 transition duration-300">
        {loading ? 'Procesando...' : `Pagar $${totalAmount}.00`}
      </button>

      {showSuccessModal && <SuccessModal onClose={handleCloseModal} />} {/* Modal de éxito */}
    </form>
  );
};

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);

  console.log("Productos en el carrito en CheckoutPage:", cartItems); // Verificar los productos que llegan al checkout

  const totalAmount = cartItems.reduce((total, item) => total + item.PRECIO * item.cantidad, 0); // Calcular el total basado en el carrito

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full lg:w-1/2 bg-white p-6 shadow-lg rounded-lg">
        {/* Sección de resumen de compra */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Resumen de Compra</h2>
          {cartItems.map((product) => (
            
            <div key={product.PRODUCTO_ID} className="flex  justify-between items-center mb-4">
                 <img
                      src={product.IMAGEN_URL}
                      alt={product.NOMBRE}
                      className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg"
                    />
              <p className="font-bold">{product.NOMBRE}</p>
              <p className="font-bold">${product.PRECIO}.00</p>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">Total:</p>
            <p className="font-bold text-xl">${totalAmount}.00</p>
          </div>
        </div>

        {/* Sección de pago */}
        <Elements stripe={stripePromise}>
          <CheckoutForm products={cartItems} totalAmount={totalAmount} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
