import React from 'react';

const CategoryList = ({ categories }) => {
  return (
    <div className="bg-gray-800  p-4 rounded-lg">
      <h3 className="text-white text-4xl tracking-wider mb-4 font-sans underline">Categorías</h3>
      
      {/* Aquí usamos grid para manejar columnas, adaptando en versiones móviles */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <li key={category.categoria_id} className="mb-2 font-bold text-justify">
            <button className="text-white italic hover:underline hover:text-thov">
              {/* Ajustamos la imagen */}
              <img 
                src={category.categoria_url} 
                alt={category.nombre_categoria} 
                className="inline-block mr-2 w-10 hover:color-thov" 
              />
              {/* Ajustamos el tamaño del texto según el tamaño de pantalla */}
              <span className="text-[42px] sm:text-[20px] font-subst">
                {category.nombre_categoria}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
