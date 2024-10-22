import React from 'react';
import Products from '../components/Products'; // Importa el componente Products

const TodoProductosPage = () => {
  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Todos los Productos</h1>
      {/* Utiliza el componente Products */}
      <Products />
    </div>
  );
};

export default TodoProductosPage;
