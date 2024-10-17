import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde el localStorage cuando la página se monta
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (producto_id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.producto_id === producto_id
        ? { ...item, quantity: Math.max(1, newQuantity) } // Evita que la cantidad sea menor que 1
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (producto_id) => {
    const updatedCart = cart.filter((item) => item.producto_id !== producto_id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calcular el total del pedido
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  return (
    <section className="bg-custom-gradient text-white min-h-screen flex items-center py-16" style={{ paddingTop: '6rem' }}>
    <div className="container mx-auto p-6 ">
      {/* Título de la página */}
      <h1 className="text-4xl font-bold mb-6 text-center">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Productos del carrito */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          {cart.length === 0 ? (
            <p className="text-lg text-black">Tu carrito está vacío.</p>
          ) : (
            cart.map((product) => (
              <div key={product.producto_id} className="flex justify-between items-center mb-4 border-b pb-4">
                {/* Imagen y nombre del producto */}
                <div className="flex items-center">
                  <img
                    src={product.imagen_url}
                    alt={product.nombre}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-black">{product.nombre}</h3>
                    <p className="text-sm text-black font-bold">{product.precio} BOB</p>
                  </div>
                </div>

                {/* Controles para la cantidad */}
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(product.producto_id, product.quantity - 1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800">{product.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.producto_id, product.quantity + 1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Botón para eliminar producto */}
                <button
                  onClick={() => removeFromCart(product.producto_id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {/* Columna derecha: Resumen del pedido */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black ">Resumen del Pedido</h2>
          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium text-black">Total de productos:</span>
            <span className="text-lg text-black">{cart.length} items</span>
          </div>

          {/* Total del pedido */}
          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium text-black">Total:</span>
            <span className="text-lg font-bold text-black">{calculateTotal()} BOB</span>
          </div>

          {/* Botón de proceder con el pago */}
          <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
            Proceder con el Pago
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default CartPage;
