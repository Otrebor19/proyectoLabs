// Obtener el carrito de localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Guardar el carrito en localStorage
const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Agregar un producto al carrito
// Agregar un producto al carrito
// Agregar un producto al carrito
export const addToCart = (product) => {
  let cart = getCart();
  const existingProduct = cart.find(item => item.unique_id === product.unique_id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart); // Reutilizamos la función para guardar el carrito
};

// Eliminar un producto del carrito
export const removeFromCart = (uniqueId) => {
  let cart = getCart();
  cart = cart.filter(item => item.unique_id !== uniqueId);
  saveCart(cart); // Reutilizamos la función para guardar el carrito
};

// Actualizar la cantidad de un producto en el carrito
export const updateCart = (uniqueId, quantity) => {
  let cart = getCart();
  const product = cart.find(item => item.unique_id === uniqueId);

  if (product) {
    if (quantity > 0) {
      product.quantity = quantity; // Actualizar la cantidad si es mayor que 0
    } else {
      cart = cart.filter(item => item.unique_id !== uniqueId); // Eliminar si la cantidad es 0
    }
  }

  saveCart(cart); // Reutilizamos la función para guardar el carrito
};
