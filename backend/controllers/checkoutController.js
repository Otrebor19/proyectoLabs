const stripe = require('stripe')('sk_test_51OxE7hFhc7H0Vh4wc7EYx8gUdB9i1hb5AowMD9iWaQMldLK8l9ODkRlMKnnOgIhATxD8X8tijjHYEtXz9yRZYFOb00xnratiCC'); // Clave secreta
const connectToDB = require('../config/db'); // Si es necesario acceder a tu base de datos

// Controlador para crear un PaymentIntent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, email, name, products } = req.body; // Recibe el email desde el frontend
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: email, // Añadir el email aquí para el recibo
      metadata: {
        name,
        products: JSON.stringify(products),
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = {
  createPaymentIntent,
};
