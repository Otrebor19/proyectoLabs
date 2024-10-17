import React from 'react';
import productImage from '../assets/product-image.png';
import backgroundImage from '../assets/bg-product.jpeg'; 

const MainSection = () => {
  return (
    <section className="bg-custom-gradient text-white min-h-screen flex items-center py-16" style={{ paddingTop: '6rem' }}>
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        
        {/* Imagen del producto */}
        <div className="relative lg:w-1/2 mb-8 lg:mb-0">
          {/* Capa para el fondo con bordes redondeados */}
          <div
            className="absolute top-0 left-28 h-full w-2/5 rounded-xl overflow-hidden blur-[2px] shadow-2xl"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          {/* Imagen del producto */}
          <img
            src={productImage}
            alt="Product"
            className="relative z-10 max-w-xs md:max-w-md lg:max-w-lg animate-zoom"
          />
        </div>

        {/* Contenido de texto */}
        <div className="lg:w-1/2 text-center lg:text-left shadow-custom-inset bg-white bg-opacity-5">
          <h1 className="font-sans md:text-9xl tracking-wide mb-0">
            DURABILITY 
          </h1>
          <span className="font-subst italic text-green-400 font-sans font-bold text-8xl">LABS</span>
          <p className="text-xl md:text-2xl text-right font-light mb-6 font-sans px-40 md: px-[30px]">
            Bienvenidos a LABS, donde la elegancia se redefine a través de ropa de alta gama. Nuestra misión es ofrecer prendas únicas que combinan diseño innovador y calidad excepcional  
          </p>

          {/* Botones */}
          <div className="flex justify-center lg:justify-start space-x-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all">
              BUY
            </button>
            <button className="bg-transparent border border-white hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all flex items-center">
              NEXT <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
