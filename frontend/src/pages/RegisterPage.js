import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { registerCliente } from '../services/api';
import SuccessModal from '../components/SuccessModal';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo_electronico: '',
    contraseña: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de éxito

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contraseña !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await registerCliente({
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo_electronico: formData.correo_electronico,
        contraseña: formData.contraseña,
        telefono: formData.telefono,
      });

      setIsModalOpen(true); // Muestra el modal al registrarse con éxito

    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      alert('Hubo un error al registrar el cliente');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/login'); // Redirige a la página de inicio de sesión
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-white backdrop-blur-sm bg-transparent p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Registro de Usuario</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de Nombre */}
          <div>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 border-b-2 bg-transparent text-white border-white"
              placeholder="Nombre"
            />
          </div>

          {/* Campo de Apellido */}
          <div>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="w-full p-2 border-b-2 bg-transparent text-white border-white"
              placeholder="Apellido"
            />
          </div>

          {/* Campo de Teléfono */}
          <div>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="w-full p-2 border-b-2 bg-transparent text-white border-white"
              placeholder="Teléfono"
            />
          </div>

          {/* Campo de Correo Electrónico */}
          <div>
            <input
              type="email"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
              className="w-full p-2 border-b-2 bg-transparent text-white border-white"
              placeholder="Correo electrónico"
            />
          </div>

          {/* Campo de Contraseña con visibilidad controlada */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
              className="w-full p-2 border-b-2 bg-transparent text-white border-white"
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-2 text-white"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border-b-2 bg-transparent text-white border-white"
              placeholder="Confirmar contraseña"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-2 text-white"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          {/* Checkbox de aceptación de términos */}
          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-white">
              Acepto los{' '}
              <a href="/terms" className="text-blue-500 hover:underline">
                Términos y Condiciones
              </a>
            </label>
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Registrarse
          </button>
        </form>

        {/* Enlace a iniciar sesión */}
        <div className="text-center mt-4">
          <p className="text-sm text-white">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Iniciar Sesión
            </a>
          </p>
        </div>
      </div>

 {/* Modal de éxito personalizado para el registro */}
 {isModalOpen && (
        <SuccessModal
          onClose={handleCloseModal}
          title="¡Registro Exitoso!"
          message="Te has registrado correctamente. Redirigiendo..."
        />
      )}

    </div>
  );
};

export default RegisterPage;
