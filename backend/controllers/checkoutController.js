const stripe = require('stripe')('sk_test_51OxE7hFhc7H0Vh4wc7EYx8gUdB9i1hb5AowMD9iWaQMldLK8l9ODkRlMKnnOgIhATxD8X8tijjHYEtXz9yRZYFOb00xnratiCC'); // Clave secreta
const connectToDB = require('../config/db'); // Si es necesario acceder a tu base de datos

// Controlador para crear un PaymentIntent
async function createPaymentIntent(req, res) {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Monto en centavos, por ejemplo, 5000 para $50.00
      currency, // Moneda (ej. 'usd', 'eur')
      payment_method_types: ['card'], // Tipo de método de pago (tarjetas)
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error al crear el PaymentIntent:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
}

module.exports = {
  createPaymentIntent,
};
