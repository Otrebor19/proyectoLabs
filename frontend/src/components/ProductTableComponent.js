import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTableComponent = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const maxPageButtons = 10;

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Determine the range of page buttons to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  // Handlers for pagination buttons
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto min-h-screen ">
      <table className="min-w-full  bg-white">
        <thead>
          <tr className="w-full text-center bg-gray-200 ">
            <th className="py-2 px-4">Imagen</th>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Precio</th>
            <th className="py-2 px-4">Marca</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Número de Reseñas</th>
            <th className="py-2 px-4">Calificación Promedio</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.PRODUCTO_ID} className="border-b">
              <td className="py-2 px-4">
                <img 
                  src={product.IMAGEN_URL} 
                  alt={product.NOMBRE} 
                  className="inline  w-16 hover:color-thov" 
                />
              </td>
              <td className="py-2 px-4">{product.NOMBRE}</td>
              <td className="py-2 px-4">${product.PRECIO}</td>
              <td className="py-2 px-4">{product.MARCA}</td>
              <td className="py-2 px-4">{product.STOCK}</td>
              <td className="py-2 px-4">{product.NUMERO_RESEÑAS}</td>
              <td className="py-2 px-4">{product.CALIFICACION_PROMEDIO}</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(product.PRODUCTO_ID)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={handlePrevious}
            className="mx-1 px-3 py-1 border bg-white text-black"
          >
            Anterior
          </button>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`mx-1 px-3 py-1 border ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              {pageNumber}
            </button>
          );
        })}
        {currentPage < totalPages && (
          <button
            onClick={handleNext}
            className="mx-1 px-3 py-1 border bg-white text-black"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductTableComponent;
