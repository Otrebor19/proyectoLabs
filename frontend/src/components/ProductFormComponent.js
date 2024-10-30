import React, { useState, useEffect } from 'react';
import { fetchTallas, fetchGeneros } from '../services/api';
import axios from 'axios';

const ProductFormComponent = ({ product, onCancel }) => {
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria_id: '',
    marca: '',
    stock: '',
    imagen_url: '',
    genero_id: '', // Campo para el género
  });

  const [tallas, setTallas] = useState([]);
  const [generos, setGeneros] = useState([]); // Estado para almacenar los géneros
  const [selectedTallas, setSelectedTallas] = useState([]);

  // Cargar datos iniciales (producto, tallas, géneros)
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
        genero_id: product.GENERO_ID || '', // Asignar el género si el producto ya tiene uno
      });
    }

    const loadData = async () => {
      try {
        const tallasResponse = await fetchTallas();
        setTallas(tallasResponse);

        const generosResponse = await fetchGeneros();
        setGeneros(generosResponse.data); // Asumir que `fetchGeneros` devuelve `data`
      } catch (error) {
        console.error('Error al cargar tallas o géneros:', error);
      }
    };

    loadData();
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
      const response = await axios.post('http://localhost:3000/api/productos', productData);
      const productoId = response.data.productoId;

      if (tallas && tallas.length > 0) {
        await axios.post('http://localhost:3000/api/producto_talla', {
          producto_id: productoId,
          tallas: tallas,
        });
      }

      alert('Producto añadido correctamente con tallas');
      window.location.reload();
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

    {/* Campo para seleccionar el género */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Género</label>
  <select
    name="genero_id"
    value={formData.genero_id}
    onChange={handleChange}
    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
    required
  >
    <option value="">Seleccione un género</option>
    {generos && generos.length > 0 ? (
      generos.map((genero) => (
        <option key={genero.GENERO_ID || genero.genero_id} value={genero.GENERO_ID || genero.genero_id}>
          {genero.NOMBRE || genero.nombre_genero}
        </option>
      ))
    ) : (
      <option value="">No hay géneros disponibles</option>
    )}
  </select>
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
