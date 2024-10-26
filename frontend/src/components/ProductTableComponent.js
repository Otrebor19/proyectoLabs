import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTableComponent = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
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
  {products.map((product) => (
    <tr key={product.PRODUCTO_ID} className="border-b">
        <img 
                src={product.IMAGEN_URL} 
                alt={product.NOMBRE} 
                className="inline  w-16 hover:color-thov" 
              />
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
    </div>
  );
};

export default ProductTableComponent;
