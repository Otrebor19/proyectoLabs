// ProductCarousel.js
import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ products, title }) => {
  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4,
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
    <div className="mt-12">
      {title && <h2 className="text-2xl text-white font-bold mb-4">{title}</h2>}
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.producto_id} className="px-2">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
