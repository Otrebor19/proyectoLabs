import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Sección de la empresa */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Nuestra Empresa</h3>
          <p className="text-gray-400">
            Somos una empresa dedicada a ofrecer productos de la mejor calidad, siempre comprometidos con la satisfacción de nuestros clientes.
          </p>
        </div>

        {/* Sección de enlaces rápidos */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <a href="#inicio" className="text-gray-400 hover:text-blue-400">Inicio</a>
            </li>
            <li>
              <a href="#productos" className="text-gray-400 hover:text-blue-400">Productos</a>
            </li>
            <li>
              <a href="#contacto" className="text-gray-400 hover:text-blue-400">Contacto</a>
            </li>
            <li>
              <a href="#politicas" className="text-gray-400 hover:text-blue-400">Políticas de Privacidad</a>
            </li>
          </ul>
        </div>

        {/* Sección de redes sociales */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.67 0H1.33C.597 0 0 .597 0 1.33v21.34C0 23.403.597 24 1.33 24H12.82v-9.283H9.692v-3.623h3.128V8.41c0-3.1 1.894-4.793 4.659-4.793 1.325 0 2.463.098 2.794.142v3.241h-1.918c-1.504 0-1.795.715-1.795 1.763v2.31h3.59l-.467 3.623h-3.123V24h6.122c.733 0 1.33-.597 1.33-1.33V1.33C24 .597 23.403 0 22.67 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.392-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.95.566-2.005.978-3.127 1.2-.897-.957-2.173-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.044.765.127 1.124-4.086-.205-7.713-2.163-10.144-5.144-.423.724-.666 1.562-.666 2.457 0 1.693.861 3.188 2.17 4.065-.799-.026-1.554-.245-2.214-.611v.062c0 2.364 1.683 4.337 3.918 4.782-.41.111-.84.171-1.285.171-.315 0-.624-.031-.927-.088.625 1.956 2.443 3.379 4.599 3.418-1.68 1.318-3.809 2.104-6.115 2.104-.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.211 7.548 2.211 9.054 0 14.009-7.497 14.009-13.986 0-.213-.005-.425-.014-.636.961-.694 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="https://instagram.com" className="hover:text-pink-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.241-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.241-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.015 7.053.072 5.773.13 4.621.382 3.633 1.37c-.988.988-1.24 2.14-1.298 3.32C2.015 5.668 2 6.244 2 12s.015 6.332.072 7.611c.058 1.18.31 2.332 1.298 3.32.988.988 2.14 1.24 3.32 1.298 1.279.057 1.703.072 4.285.072s3.006-.015 4.285-.072c1.18-.058 2.332-.31 3.32-1.298.988-.988 1.24-2.14 1.298-3.32.057-1.279.072-1.703.072-4.285s-.015-3.006-.072-4.285c-.058-1.18-.31-2.332-1.298-3.32-.988-.988-2.14-1.24-3.32-1.298C15.668.015 15.244 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400">&copy; 2024 Nombre de tu Empresa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
