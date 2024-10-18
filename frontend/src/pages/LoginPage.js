import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar tras el inicio de sesión
import { loginCliente } from '../services/api'; // Función para manejar la autenticación

const LoginPage = () => {
  const [formData, setFormData] = useState({
    correo_electronico: '',
    contraseña: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Alternar visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await loginCliente({
        correo_electronico: formData.correo_electronico, // Esto debería estar bien
        contraseña: formData.contraseña // Asegúrate de que el nombre coincida con el del backend
      });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirige después de iniciar sesión
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-white backdrop-blur-sm bg-transparent p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Mostrar mensaje de error */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg transition duration-300 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Enlace para registrarse */}
        <div className="text-center mt-4">
          <p className="text-sm text-white">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
