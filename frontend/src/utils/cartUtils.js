
// Obtener el carrito de localStorage
export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  };
  
  // Agregar un producto al carrito
  export const addToCart = (product) => {
    let cart = getCart();
    const existingProduct = cart.find(item => item.producto_id === product.producto_id);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // Eliminar un producto del carrito
  export const removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item.producto_id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // Actualizar la cantidad de un producto en el carrito
  export const updateCart = (productId, quantity) => {
    let cart = getCart();
    const product = cart.find(item => item.producto_id === productId);
    if (product) {
      product.quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  