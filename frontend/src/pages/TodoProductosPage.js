import React from 'react';
import Products from '../components/Products'; // Importa el componente Products

const TodoProductosPage = () => {
  return (
    <div className="min-h-screen   p-6">

      
   <div className="mt-48">
      {/* Utiliza el componente Products */}
      <Products />

      </div>
    </div>
  );
};

export default TodoProductosPage;
