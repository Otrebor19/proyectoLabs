const connectToDB = require('../db'); // Importar la función desde db.js
const jwt = require('jsonwebtoken'); 
const secretKey = 'yourSecretKey';
// Función para manejar el login
async function loginCliente(req, res) {
  const { correo_electronico, contraseña } = req.body;
  let connection;

  try {
    // Usar la conexión centralizada desde db.js
    connection = await connectToDB();

    console.log('Correo recibido:', correo_electronico);
    console.log('Contraseña recibida:', contraseña);
    
    // Consulta SQL para verificar si las credenciales son correctas
    const query = `SELECT CLIENTE_ID, NOMBRE, APELLIDO, CORREO_ELECTRONICO FROM CLIENTE 
                   WHERE CORREO_ELECTRONICO = :correo AND CONTRASEÑA = :password`;

    // Verificar los tipos de datos al enviar los parámetros
    const result = await connection.execute(query, {
      correo: correo_electronico,
      password: contraseña
    });
    
    if (result.rows.length > 0) {
      // Login exitoso
      const cliente = result.rows[0];
      const token = jwt.sign(
        { clienteId: cliente[0], correo_electronico: cliente[3] }, // Datos del payload
        'yourSecretKey', // Clave secreta para firmar el token
        { expiresIn: '1h' } // Tiempo de expiración
      );

      // Configurar la cookie http-only con el token
      res.cookie('token', token, {
        httpOnly: true,  // No accesible desde JavaScript
        secure: false,    // Asegúrate de que uses HTTPS en producción
        sameSite: 'lax', // Controlar el comportamiento de la cookie
        maxAge: 3600000   // Tiempo de expiración en milisegundos
      });


      res.status(200).json({
        message: 'Login exitoso',
        cliente: {
          id: cliente[0],
          nombre: cliente[1],
          apellido: cliente[2],
          correo_electronico: cliente[3],
        }
      });
    } else {
      // Credenciales incorrectas
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
}

module.exports = {
  loginCliente
};
