import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Importar el contexto del carrito
import { useNavigate } from 'react-router-dom';
import { fetchTallasByProducto } from '../services/api'; // Función para obtener las tallas del producto

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Usar la función addToCart del contexto
  const navigate = useNavigate(); 

  const [addedToCart, setAddedToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal
  const [tallas, setTallas] = useState([]); // Estado para almacenar las tallas del producto
  const [selectedTalla, setSelectedTalla] = useState(''); // Estado para manejar la talla seleccionada

  // Función para abrir el modal
  const openModal = async () => {
    setIsModalOpen(true);
    // Obtener las tallas del producto
    try {
      const response = await fetchTallasByProducto(product.producto_id);
      setTallas(response.data);
    } catch (error) {
      console.error('Error al obtener las tallas:', error);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTalla(''); // Reiniciar la talla seleccionada
  };

  // Función para manejar la selección de talla
  const handleSelectTalla = (e) => {
    setSelectedTalla(e.target.value);
  };

  // Función para agregar el producto al carrito con la talla seleccionada
  const handleAddToCart = () => {
    if (selectedTalla) {
      addToCart({ ...product, talla: selectedTalla }); // Agregar el producto con la talla seleccionada al carrito
      setAddedToCart(true);
      closeModal(); // Cerrar el modal después de agregar al carrito
    } else {
      alert('Por favor, selecciona una talla.');
    }
  };

  // Redirigir al usuario a la página de detalles del producto
  const handleNavigateToDetail = () => {
    navigate(`/productos/${product.producto_id}`);
  };

  return (
    <div className="relative rounded-xl p-5 mx-auto grid grid-cols-1 lg:grid-cols-1 gap-1 bg-white bg-opacity-5">
      <img 
        src={product.imagen_url} 
        alt={product.nombre}  
        className="object-cover w-[350px] h-[250px] cursor-pointer" 
        onClick={handleNavigateToDetail} 
      />
      <div className="flex flex-col justify-center space-y-2">
        <h2 
          className="text-white text-[38px] font-sans mt-0 cursor-pointer"
          onClick={handleNavigateToDetail}
        >
          {product.nombre}
        </h2>
  
        
        
        <div className="text-green-400 text-[42px] font-bold font-fprecio">
          {product.precio} $
        </div>
        <button
          onClick={openModal} // Abrir el modal al hacer clic
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-white backdrop-blur-sm bg-transparent p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl text-white font-bold mb-4">Seleccionar Talla</h2>
            
            {/* Selección de talla */}
            <select
              value={selectedTalla}
              onChange={handleSelectTalla}
              className="w-full p-2 border-b-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-white backdrop-blur-sm bg-transparent text-white border-gray-300 mb-4"
            >
              <option value="">Selecciona una talla</option>
              {tallas.map((talla) => (
                <option className="w-full bg-transparent backdrop-blur-sm p-2 border-b-2 text-black   font-semibold border-gray-300 mb-4" key={talla.talla_id} value={talla.nombre_talla}>
                  {talla.nombre_talla} (Disponible: {talla.cantidad})
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
        </div>
      )}
    </div>
  );
  
};

export default ProductCard;