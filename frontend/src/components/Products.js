import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CategoryList from './CategoryList'; // Importa el componente de lista de categorías
import { fetchProductos, fetchCategorias } from '../services/api'; // Importar las funciones de API

const Products = ({ addToCart, cart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los productos
  const getProductos = async () => {
    try {
      const response = await fetchProductos(); 
      const productos = response.data.map(row => ({
        producto_id: row[0],
        nombre: row[2],
        descripcion: row[3],
        precio: row[4],
        imagen_url: row[12],
      }));
      setProducts(productos);
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
      const categorias = response.data.map(row => ({
        categoria_id: row[0],
        nombre_categoria: row[1], // Ajusta los nombres según tu base de datos
        categoria_url: row[5], // Suponiendo que el icono de la categoría está en la columna 5
      }));
      setCategories(categorias);
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

  // Renderizado condicional según el estado
  if (loading) return <div>Cargando productos y categorías...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No hay productos disponibles</div>;

  return (
    <section className=" text-white min-h-screen flex items-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Columna izquierda: Lista de categorías */}
        <div className="col-span-1">
          <CategoryList categories={categories} />
        </div>
        
        {/* Columna derecha: Lista de productos */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.producto_id} product={product}  />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
