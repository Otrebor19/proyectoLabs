const connectToDB = require('../db'); // Importa la función de conexión a la DB

// Controlador para obtener todos los productos
async function getProductos(req, res) {
  let connection;
  try {
    connection = await connectToDB();
    console.log('Conexión establecida a la base de datos');

    // Ejecutar la consulta
    const result = await connection.execute('SELECT * FROM producto');

    // Verificar si hay filas en el resultado
    if (result.rows.length === 0) {
      console.log('No se encontraron productos en la tabla');
      res.json([]); // Respuesta vacía
    } else {
     // Mostrar productos en la consola
      res.json(result.rows); // Enviar los datos de los productos al frontend
    }
  } catch (err) {
    console.error('Error al obtener los productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  } finally {
    if (connection) {
      try {
        await connection.close(); // Cerrar la conexión si fue establecida correctamente
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
}

module.exports = {
  getProductos,
};