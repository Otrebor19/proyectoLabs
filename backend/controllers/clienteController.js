const oracledb = require('oracledb'); 

// Función para registrar un cliente
async function registerCliente(req, res) {
  let connection;

  try {
    // Conectar a la base de datos
    connection = await oracledb.getConnection({
      user: "LABS",
      password: "LaBs120120241010",
      connectString: "localhost:1521/XEPDB1"  // Asegúrate de que la cadena de conexión sea correcta
    });

    // Desestructurar los datos del cuerpo de la solicitud
    const { nombre, apellido, correo_electronico, contraseña, telefono } = req.body;

    // Crear la consulta SQL
    const query = `
      INSERT INTO CLIENTE (NOMBRE, APELLIDO, CORREO_ELECTRONICO, CONTRASEÑA, TELEFONO, ESTADO)
      VALUES (:nombre, :apellido, :correo_electronico, :contraseña, :telefono, 'ACTIVO')
    `;

    // Ejecutar la consulta
    await connection.execute(query, {
      nombre,                          
  apellido,                       
  correo_electronico,  // Sin alias, porque ahora coincide con el nombre de la base de datos
  contraseña,          
  telefono                        // Se asocia con el campo TELEFONO en la tabla
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
