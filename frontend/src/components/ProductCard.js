import React, { useState } from 'react';
import { addToCart } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Inicializar useNavigate para redireccionar

  // Estado para controlar el texto del botón
  const [addedToCart, setAddedToCart] = useState(false);

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
  };

  // Función para redirigir al usuario a la página de detalles del producto
  const handleNavigateToDetail = () => {
    navigate(`/productos/${product.producto_id}`); // Redirigir a la página de detalles del producto
  };

  return (
    <div className="relative rounded-xl p-5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white bg-opacity-5">
      {/* Imagen del producto con redireccionamiento */}
      <img 
        src={product.imagen_url} 
        alt={product.nombre}  
        className="object-cover w-[291px] h-[341px] cursor-pointer" 
        onClick={handleNavigateToDetail} // Redirigir al hacer clic en la imagen
      />

      {/* Información del producto */}
      <div className="flex flex-col justify-center space-y-2">
        {/* Nombre del producto con redireccionamiento */}
        <h2 
          className="text-white text-[40px] font-sans cursor-pointer"
          onClick={handleNavigateToDetail} // Redirigir al hacer clic en el nombre
        >
          {product.nombre}
        </h2>

        <div className="text-green-400 text-[42px] font-bold font-fprecio">
          {product.precio} BOB
        </div>
        
        {/* Botón para agregar al carrito */}
        <button
          onClick={handleAddToCart}
          className={`${
            addedToCart ? 'bg-gray-500' : 'bg-btnc'
          } hover:bg-green-700 font-subst italic text-[20px] text-white font-bold py-2 px-4 rounded-full shadow-custom-inset transition-all`}
          disabled={addedToCart} // Desactivar el botón si ya fue añadido
        >
          {addedToCart ? 'Añadido al carrito' : 'BUY'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
