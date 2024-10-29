import React, { useState, useEffect } from "react";
import ProductCarousel from "../components/ProductCarousel"; // Importa el componente ProductCarousel
import { fetchProductos } from "../services/api"; // Importa la función para obtener todos los productos

const GeneroSection = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar productos

  useEffect(() => {
    // Obtener todos los productos al montar el componente
    const getAllProducts = async () => {
      try {
        const response = await fetchProductos();
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener todos los productos:", error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <section className="py-12 w-full max-w-[1920px] bg-white ">
      <div className="container mx-auto p-7">
        <a
          href="/allproducts"
          className="text-2xl text-black border-[2px] border-black rounded p-2 hover:bg-custom-gradient hover:text-white"
        >
          Todos Los Productos
        </a>
        <h2 className="text-4xl font-bold text-center mb-8 mt-8">
          Lo mejor y más nuevo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Banner Hombres */}
          <div className="relative hover:opacity-90">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_743,c_limit/8c47d0e6-78a7-4f39-8b39-092d7288ac4b/nike-just-do-it.jpg"
              alt="Hombres"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Hombres</h3>
            </div>
          </div>

          {/* Banner Mujeres */}
          <div className="relative hover:opacity-90">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_743,c_limit/bbdf6db7-16db-487b-9f3b-55fbd4a9a12a/nike-just-do-it.jpg"
              alt="Mujeres"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Mujeres</h3>
            </div>
          </div>

          {/* Banner Niños */}
          <div className="relative hover:opacity-90">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_743,c_limit/c783fe93-2375-4d2e-974c-ae6d502a58e4/nike-just-do-it.jpg"
              alt="Niños"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Niños</h3>
            </div>
          </div>
        </div>

        {/* Carrusel de Productos */}
        <div className="mt-12">
          <ProductCarousel products={products} title="Últimos Productos" />
        </div>

        <div className="flex justify-center mt-16">
          <div className="relative w-4/5 h-4/6">
            <img
              src="http://localhost:3000/public/images/banner2.png"
              alt="Mujeres"
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Puedes agregar contenido centrado dentro de esta capa si lo necesitas */}
            </div>
          </div>
        </div>

        {/* Carrusel de Productos */}
        <div className="mt-12">
          <ProductCarousel products={products} title="Últimos Productos" />
        </div>

        <div className="flex justify-center mt-16">
          <div className="relative w-4/5 h-4/6">
            <img
              src="http://localhost:3000/public/images/banner1.png"
              alt="Mujeres"
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Puedes agregar contenido centrado dentro de esta capa si lo necesitas */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneroSection;
