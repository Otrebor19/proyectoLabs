import { XIcon } from '@heroicons/react/outline'; // Para el ícono de cerrar

const LoginModal = ({ isModalOpen, toggleModal, showPassword, togglePasswordVisibility }) => {
  return (
    isModalOpen && (
      <div className="absolute backdrop-blur-sm top-16 right-10 bg-transparent shadow-sm shadow-white p-6 rounded-lg w-96">
        <h2 className="text-[62px] font-bold mb-4 text-white font-sans tracking-wider">LABS</h2>

        {/* Campo de correo electrónico */}
        <div className="mb-4">
          <label className="block text-left text-[28px] text-white font-sans">Correo Electrónico</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu correo"
          />
        </div>

        {/* Campo de contraseña con botón para mostrar/ocultar */}
        <div className="mb-4 relative">
          <label className="block text-left text-[28px] text-white font-sans">Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu contraseña"
          />
          {/* Botón para alternar mostrar/ocultar contraseña */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-1 top-3/4 border-s-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        {/* Botón de Iniciar Sesión */}
        <button className="w-full bg-green-500 text-[28px] text-white font-sans hover:bg-green-700 py-2 rounded-lg">
          Iniciar Sesión
        </button>

        {/* Enlaces de Olvidaste tu contraseña y Registrarse */}
        <div className="mt-4 flex justify-between text-sm">
          <a href="#forgot-password" className="text-white hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
          <a href="#register" className="text-white hover:underline">
            Registrarse
          </a>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>
    )
  );
};

export default LoginModal;
