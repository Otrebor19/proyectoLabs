import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProductoById, fetchRelatedProducts } from '../services/api'; // Función de la API
import Slider from 'react-slick'; // Importamos el carrusel
import ProductCard from '../components/ProductCard'; // Componente para mostrar productos relacionados
import { CartContext } from '../context/CartContext'; // Importar el contexto del carrito

const ProductDetailPage = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [product, setProduct] = useState(null); // Estado para almacenar el producto
  const [relatedProducts, setRelatedProducts] = useState([]); // Estado para almacenar productos relacionados
  const [rating, setRating] = useState(0); // Estado para la calificación
  const { addToCart: addProductToCart, cart = [] } = useContext(CartContext); // Extraer addToCart y el carrito del contexto con un valor predeterminado como arreglo vacío
  const [addedToCart, setAddedToCart] = useState(false); // Estado para controlar si el producto ha sido añadido al carrito

  useEffect(() => {
    // Obtener el producto por ID cuando se monta el componente
    const getProduct = async () => {
      try {
        const response = await fetchProductoById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    // Obtener productos relacionados
    const getRelatedProducts = async () => {
      try {
        const response = await fetchRelatedProducts(id);
        setRelatedProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos relacionados:', error);
      }
    };

    getProduct();
    getRelatedProducts();
  }, [id]);

  // Verificar si el producto ya está en el carrito
  useEffect(() => {
    if (product && cart && cart.length > 0 && cart.some((item) => item.producto_id === product.producto_id)) {
      setAddedToCart(true);
    }
  }, [cart, product]);

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    addProductToCart(product); // Llamar a la función del contexto para añadir al carrito
    setAddedToCart(true); // Cambiar el texto del botón
  };

  // Función para manejar la calificación de estrellas
  const handleRating = (rate) => {
    setRating(rate);
  };

  if (!product) return <div>Cargando producto...</div>;

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true, // Activar el autoplay
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Pantallas medianas
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Pantallas pequeñas
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Pantallas móviles
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      {/* Sección superior con imágenes, nombre y detalles del producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-48 ">
        {/* Imágenes del producto */}
        <div className="space-y-4">
          <img src={product.imagen_principal} alt={product.nombre} className="max-w-md mx-auto h-auto" />
        </div>

        {/* Detalles del producto */}
        <div className="text-left">
          <h1 className="text-3xl font-bold mb-4 text-white ">{product.nombre}</h1>
          <p className="text-xl mb-2 text-white ">Categoría: {product.categoria}</p>
          <p className="text-3xl text-green-500 font-bold mb-4 ">{product.precio} BOB</p>
          <p className="text-white mb-6 ">{product.descripcion}</p>
          
          {/* Botón para agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className={`${
              addedToCart ? 'bg-gray-500' : 'bg-btnc'
            } hover:bg-green-700 font-subst italic text-[20px] text-white font-bold py-2 px-4 rounded-full shadow-custom-inset transition-all`}
            disabled={addedToCart} // Desactivar el botón si ya fue añadido
          >
            {addedToCart ? 'Añadido al carrito' : 'BUY'}
          </button>

          {/* Sección de calificación con estrellas */}
          <div className="mt-4">
            <h3 className="text-white text-lg mb-2">Puntuar producto:</h3>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= rating ? 'yellow' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-8 h-8 text-yellow-400 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Descripción completa */}
      <div className="mt-12">
        <h2 className="text-2xl text-white font-bold mb-4">Descripción</h2>
        <p className="text-gray-700">{product.descripcion_larga}</p>
      </div>

      {/* Carrusel de productos relacionados */}
      <div className="mt-12">
        <h2 className="text-2xl text-white font-bold mb-4">Productos Relacionados</h2>
        <Slider {...settings}>
          {relatedProducts.map((relatedProduct, index) => (
            <div key={relatedProduct.producto_id || index} className="px-2">
              <ProductCard product={relatedProduct} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductDetailPage;
