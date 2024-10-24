const connectToDB = require('../config/db'); // Importar la función desde db.js

// Función para registrar un cliente
async function registerCliente(req, res) {
  let connection;
  console.log(req.body);

  try {
    // Usar la conexión centralizada desde db.js
    connection = await connectToDB();

    // Desestructurar los datos del cuerpo de la solicitud
    const { nombre, apellido, correo_electronico, contraseña, telefono } = req.body;

    // Crear la consulta SQL
    const query = `
      INSERT INTO CLIENTE (NOMBRE, APELLIDO, CORREO_ELECTRONICO, CONTRASEÑA, TELEFONO, ESTADO)
      VALUES (:nombre, :apellido, :correo_electronico, :contraseña, :telefono, 'ACTIVO')
    `;
    
    console.log('Datos enviados a la base de datos:', { nombre, apellido, correo_electronico, contraseña, telefono });

    // Ejecutar la consulta
    await connection.execute(query, {
      nombre,
      apellido,
      correo_electronico,
      contraseña,
      telefono
    }, { autoCommit: true });

    // Devolver una respuesta de éxito
    res.status(201).json({ message: 'Cliente registrado exitosamente' });
  } catch (err) {
    console.error('Error al registrar el cliente:', err);
    res.status(500).json({ error: 'Error al registrar el cliente' });
  } finally {
    if (connection) {
      try {
        // Cerrar la conexión
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
}

module.exports = {
  registerCliente
};
