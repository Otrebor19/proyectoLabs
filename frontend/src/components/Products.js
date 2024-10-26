import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
// Importa el componente de lista de categorías
import { fetchProductos, fetchCategorias } from '../services/api'; // Importa las funciones de API

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada

  // Función para obtener los productos
  const getProductos = async () => {
    try {
      const response = await fetchProductos();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setError('Error al cargar los productos');
      setLoading(false);
    }
  };

  // Función para obtener las categorías
  const getCategorias = async () => {
    try {
      const response = await fetchCategorias();
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      setError('Error al cargar las categorías');
    }
  };

  // Obtener productos y categorías cuando el componente se monta
  useEffect(() => {
    getProductos();
    getCategorias();
  }, []);
  useEffect(() => {
    console.log("Productos recibidos:", products);
  }, [products]);

  // Función para manejar la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filtrar los productos según el término de búsqueda y la categoría seleccionada
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.NOMBRE && product.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.CATEGORIA_ID === Number(selectedCategory);
    return matchesSearchTerm && matchesCategory;
  });

  if (loading) return <div>Cargando productos y categorías...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No hay productos disponibles</div>;

  return (
    <section className=" text-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        {/* Columna izquierda: Lista de categorías */}
        <div className="col-span-1 sticky top-0">
          <h2 className="text-2xl mb-4 text-white">Categorías</h2>
          <select
            className="border bg-black p-2 w-full"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las Categorías</option>
            {categories.map((category) => (
              <option key={category.categoria_id} value={category.categoria_id}>
                {category.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Columna derecha: Lista de productos y búsqueda */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full mb-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="border p-2 w-full text-black"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {filteredProducts.map((product) => (
            <ProductCard key={product.PRODUCTO_ID} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
