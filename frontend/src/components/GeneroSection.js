import React from 'react';

const GeneroSection = () => {
  return (
    <section className="py-12 w-full max-w-[1920px] bg-white h-screen">
      <div className="container mx-auto p-7">
        <h2 className="text-4xl font-bold text-center mb-8">Lo mejor y más nuevo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          
          {/* Banner Hombres */}
          <div className="relative ">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_743,c_limit/8c47d0e6-78a7-4f39-8b39-092d7288ac4b/nike-just-do-it.jpg" // Imagen de referencia
              alt="Hombres"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Hombres</h3>
            </div>
          </div>
          
          {/* Banner Mujeres */}
          <div className="relative">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_743,c_limit/bbdf6db7-16db-487b-9f3b-55fbd4a9a12a/nike-just-do-it.jpg" // Imagen de referencia
              alt="Mujeres"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Mujeres</h3>
            </div>
          </div>
          
          {/* Banner Niños */}
          <div className="relative">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_743,c_limit/c783fe93-2375-4d2e-974c-ae6d502a58e4/nike-just-do-it.jpg" // Imagen de referencia
              alt="Niños"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Niños</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GeneroSection;
