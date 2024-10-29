import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { fetchTallasByProducto } from '../services/api';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [addedToCart, setAddedToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tallas, setTallas] = useState([]);
  const [selectedTalla, setSelectedTalla] = useState('');
  
  const openModal = async () => {
    setIsModalOpen(true);
    try {
      const response = await fetchTallasByProducto(product.PRODUCTO_ID);
      const formattedTallas = response.data.map(talla => ({
        TALLA_ID: talla[0],
        NOMBRE_TALLA: talla[1],
        CANTIDAD: talla[2],
      }));
      setTallas(formattedTallas);
    } catch (error) {
      console.error('Error al obtener las tallas:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTalla('');
  };

  const handleSelectTalla = (e) => {
    setSelectedTalla(e.target.value);
  };

  const handleAddToCart = async () => {
    if (selectedTalla) {
      const productToAdd = {
        ...product,
        talla: selectedTalla,
        unique_id: `${product.PRODUCTO_ID}-${selectedTalla}`,
      };
      try {
        await addToCart(productToAdd);
        setAddedToCart(true);
        closeModal();
      } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
      }
    } else {
      alert('Por favor, selecciona una talla.');
    }
  };

  const handleNavigateToDetail = () => {
    navigate(`/productos/${product.PRODUCTO_ID}`);
  };

  return (
    <div className="relative rounded-xl p-5 mx-auto border bg-white bg-opacity-5">
      <img 
        src={product.IMAGEN_URL} 
        alt={product.NOMBRE}  
        className="object-cover w-[350px] h-[250px] cursor-pointer" 
        onClick={handleNavigateToDetail} 
      />
      <div className="flex flex-col justify-center space-y-0">
        <h2 
          className="text-white text-[38px] font-sans mt-0 cursor-pointer"
          onClick={handleNavigateToDetail}
        >
          {product.NOMBRE}
        </h2>
  
        <div className="text-green-400 text-[42px] font-bold font-fprecio">
          {product.PRECIO} $
        </div>
        <button
          onClick={openModal}
          className={`${
            addedToCart ? 'bg-gray-500' : 'bg-btnc'
          } hover:bg-green-700 font-subst italic text-[20px] text-white font-bold py-2 px-4 rounded-full shadow-custom-inset transition-all`}
          disabled={addedToCart}
        >
          {addedToCart ? 'Añadido al carrito' : 'BUY'}
        </button>
      </div>
  
      {/* Modal para seleccionar la talla */}
      {isModalOpen && (
        <div className="absolute top-0 left-0 right-0 bg-white bg-opacity-95 p-6 rounded-lg shadow-lg z-10">
          <h2 className="text-xl  text-black font-bold mb-4">Seleccionar Talla</h2>
          
          <select
            value={selectedTalla}
            onChange={handleSelectTalla}
            className="w-full p-2 border-b-2 bg-white text-black border-gray-300 mb-4"
          >
            <option value="">Selecciona una talla</option>
            {tallas.map((talla, index) => (
              <option key={`${talla.TALLA_ID}-${index}`} value={talla.TALLA_ID}>
                {talla.NOMBRE_TALLA} (Disponible: {talla.CANTIDAD})
              </option>
            ))}
          </select>
  
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Seleccionar Talla
          </button>
  
          <button
            onClick={closeModal}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
