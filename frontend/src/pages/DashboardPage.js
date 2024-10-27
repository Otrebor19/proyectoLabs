import React, { useState } from 'react';
import ProductTableComponent from '../components/ProductTableComponent';
import ProductFormComponent from '../components/ProductFormComponent';
import axios from 'axios';

const DashboardPage = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Función para manejar la edición de un producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAdding(false);
  };

  // Función para manejar la eliminación de un producto
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Función para manejar el guardado de un producto (añadir o actualizar)
  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        // Actualizar producto existente
        await axios.put(`http://localhost:3000/api/products/${editingProduct.PRODUCTO_ID}`, formData);
      } else {
        // Añadir nuevo producto
        await axios.post('http://localhost:3000/api/products', formData);
      }
      setEditingProduct(null);
      setIsAdding(false);
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <div className="p-6   min-h-screen  ">
      
      {isAdding || editingProduct ? (
        <ProductFormComponent
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setEditingProduct(null);
            setIsAdding(false);
          }}
        />
      ) : (
        <div>
          <button
            onClick={() => setIsAdding(true)}
            className="mb-4 px-4 py-2 bg-green-600  text-white flex justify-end rounded-md"
          >
            Añadir Producto
          </button>
          <ProductTableComponent onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
