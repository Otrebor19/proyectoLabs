import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Importar el contexto del carrito
import { useNavigate } from 'react-router-dom'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Usar la función addToCart del contexto
  const navigate = useNavigate(); 

  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product); // Llamar a la función addToCart del contexto
    setAddedToCart(true);
  };

  const handleNavigateToDetail = () => {
    navigate(`/productos/${product.producto_id}`);
  };

  return (
    <div className="relative rounded-xl p-5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white bg-opacity-5">
      <img 
        src={product.imagen_url} 
        alt={product.nombre}  
        className="object-cover w-[291px] h-[341px] cursor-pointer" 
        onClick={handleNavigateToDetail} 
      />
      <div className="flex flex-col justify-center space-y-2">
        <h2 
          className="text-white text-[40px] font-sans cursor-pointer"
          onClick={handleNavigateToDetail}
        >
          {product.nombre}
        </h2>
        <div className="text-green-400 text-[42px] font-bold font-fprecio">
          {product.precio} BOB
        </div>
        <button
          onClick={handleAddToCart}
          className={`${
            addedToCart ? 'bg-gray-500' : 'bg-btnc'
          } hover:bg-green-700 font-subst italic text-[20px] text-white font-bold py-2 px-4 rounded-full shadow-custom-inset transition-all`}
          disabled={addedToCart}
        >
          {addedToCart ? 'Añadido al carrito' : 'BUY'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
