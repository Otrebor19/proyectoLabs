// SuccessModal.js
import React, { useEffect } from 'react';

const SuccessModal = ({ onClose, title = "¡Éxito!", message = "Operación realizada con éxito" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Cierra el modal después de 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-500">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <div className="mt-4">
          {/* Icono de éxito */}
          <div className="animate-bounce text-green-500 text-5xl">&#10003;</div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
