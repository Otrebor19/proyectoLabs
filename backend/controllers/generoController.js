// controllers/generoController.js
const connectToDB = require('../config/db'); // Asegúrate de que la conexión esté configurada correctamente

const getGeneros = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const result = await connection.execute('SELECT GENERO_ID, NOMBRE FROM GENEROS');

    // Asegúrate de que result.rows contiene los datos esperados
    const generos = result.rows.map(row => ({
      GENERO_ID: row[0], // Ajusta según el índice correcto para GENERO_ID
      NOMBRE: row[1]     // Ajusta según el índice correcto para NOMBRE
    }));

    res.json(generos); // Envía el resultado mapeado al frontend
  } catch (error) {
    console.error('Error al obtener géneros:', error);
    res.status(500).json({ message: 'Error al obtener géneros' });
  } finally {
    if (connection) {
      try {
        await connection.close(); // Cierra la conexión
      } catch (closeError) {
        console.error('Error al cerrar la conexión:', closeError);
      }
    }
  }
};

module.exports = { getGeneros };
