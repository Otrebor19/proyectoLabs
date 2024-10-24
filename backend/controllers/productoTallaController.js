const connectToDB = require('../config/db');

// Controlador para obtener las tallas de un producto por su ID
async function getTallasByProducto(req, res) {
  let connection;
  const productId = req.params.id;

  try {
    connection = await connectToDB();

    // Consulta SQL para obtener las tallas del producto
    const query = `
      SELECT t.TALLA_ID, t.NOMBRE_TALLA, pt.CANTIDAD
      FROM PRODUCTO_TALLA pt
      JOIN TALLA t ON pt.TALLA_ID = t.TALLA_ID
      WHERE pt.PRODUCTO_ID = :productId
    `;

    const result = await connection.execute(query, { productId });

    if (result.rows.length > 0) {
      // Mapea las filas para devolver los resultados en un formato adecuado
      const tallas = result.rows.map(row => ({
        talla_id: row[0],
        nombre_talla: row[1],
        cantidad: row[2],
      }));

      res.json(tallas);
    } else {
      res.status(404).json({ message: 'No hay tallas disponibles para este producto' });
    }
  } catch (error) {
    console.error('Error al obtener las tallas:', error);
    res.status(500).json({ message: 'Error al obtener las tallas del producto' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  getTallasByProducto,
};
