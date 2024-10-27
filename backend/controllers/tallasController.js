const connectToDB = require('../config/db'); // Importa la conexión a la base de datos

const getTallas = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const result = await connection.execute('SELECT * FROM TALLA');
    
    // Transformar los datos para que sean más fáciles de manejar en el frontend
    const tallas = result.rows.map(row => ({
      TALLA_ID: row[0],
      NOMBRE_TALLA: row[1],
      FECHA_CREACION: row[2],
      FECHA_ACTUALIZACION: row[3],
    }));

    res.status(200).json(tallas);
  } catch (error) {
    console.error('Error al obtener tallas:', error);
    res.status(500).json({ error: 'Error al obtener tallas' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error('Error al cerrar la conexión:', closeError);
      }
    }
  }
};

module.exports = {
  getTallas,
};
