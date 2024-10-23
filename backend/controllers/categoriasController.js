// controllers/categoriasController.js
const connectToDB = require('../db'); // Importa la función de conexión a la DB

async function getCategorias(req, res) {
  let connection;
  try {
    connection = await connectToDB();
    const result = await connection.execute('SELECT * FROM categoria');
    res.json(result.rows); // Enviar las filas obtenidas al frontend
  } catch (err) {
    console.error('Error al obtener las categorías:', err);
    res.status(500).json({ error: 'Error al obtener las categorías' });
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
  getCategorias,
};