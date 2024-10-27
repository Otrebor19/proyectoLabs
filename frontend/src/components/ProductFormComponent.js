import React, { useState, useEffect } from 'react';
import { fetchTallas } from '../services/api'; // Importar la función de la API correctamente
import axios from 'axios';
import {  } from 'react-router-dom';

const ProductFormComponent = ({ product, onCancel }) => {
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria_id: '',
    marca: '',
    stock: '',
    imagen_url: '',
  });

  const [tallas, setTallas] = useState([]);
  const [selectedTallas, setSelectedTallas] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.NOMBRE || '',
        descripcion: product.DESCRIPCION || '',
        precio: product.PRECIO || '',
        categoria_id: product.CATEGORIA_ID || '',
        marca: product.MARCA || '',
        stock: product.STOCK || '',
        imagen_url: product.IMAGEN_URL || '',
      });
    }

    // Obtener las tallas disponibles
    const getTallas = async () => {
      try {
        const response = await fetchTallas();
        setTallas(response);
      } catch (error) {
        console.error('Error al obtener las tallas:', error);
        setTallas([]); // Asegurarse de que tallas siempre tiene un valor (incluso vacío) para evitar errores
      }
    };

    getTallas();
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTalla = () => {
    setSelectedTallas([...selectedTallas, { talla_id: '', cantidad: 0 }]);
  };

  const handleTallaChange = (index, field, value) => {
    const updatedTallas = [...selectedTallas];
    updatedTallas[index][field] = value;
    setSelectedTallas(updatedTallas);
  };

  const handleRemoveTalla = (index) => {
    setSelectedTallas(selectedTallas.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSave(formData, selectedTallas);
  };

  const handleSave = async (productData, tallas) => {
    try {
      // Hacer la solicitud para guardar el producto
      const response = await axios.post('http://localhost:3000/api/productos', productData);
      const productoId = response.data.productoId; // Suponiendo que obtienes el ID del producto en la respuesta

      // Hacer la solicitud para guardar las tallas del producto
      if (tallas && tallas.length > 0) {
        await axios.post('http://localhost:3000/api/producto_talla', {
          producto_id: productoId,
          tallas: tallas,
        });
      }

      alert('Producto añadido correctamente con tallas');
      window.location.reload(); // Recargar la página después de añadir el producto
    } catch (error) {
      console.error('Error al guardar el producto y las tallas:', error);
      alert('Error al guardar el producto y las tallas');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full  max-w-lg mx-auto bg-white p-6 shadow-md rounded-md">
      <div className="mb-4">
        <label className="block  text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Categoría ID</label>
        <input
          type="number"
          name="categoria_id"
          value={formData.categoria_id}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Marca</label>
        <input
          type="text"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Imagen URL</label>
        <input
          type="text"
          name="imagen_url"
          value={formData.imagen_url}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-700">Tallas y Cantidades</h3>
        {selectedTallas.map((talla, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <select
              value={talla.talla_id}
              onChange={(e) => handleTallaChange(index, 'talla_id', e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Seleccione una talla</option>
              {tallas && tallas.length > 0 ? (
                tallas.map((t) => (
                  <option key={t.TALLA_ID} value={t.TALLA_ID}>
                    {t.NOMBRE_TALLA}
                  </option>
                ))
              ) : (
                <option value="">No hay tallas disponibles</option>
              )}
            </select>
            <input
              type="number"
              value={talla.cantidad}
              onChange={(e) => handleTallaChange(index, 'cantidad', e.target.value)}
              placeholder="Cantidad"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <button type="button" onClick={() => handleRemoveTalla(index)} className="text-red-500">
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTalla} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Añadir Talla
        </button>
      </div>

      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductFormComponent;
