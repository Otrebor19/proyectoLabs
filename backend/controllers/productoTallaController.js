const connectToDB = require('../config/db');

// Controlador para obtener las tallas de un producto por su ID
const getTallasByProducto = async (req, res) => {
  let connection;
  try {
    const productoId = req.params.id;
    connection = await connectToDB();

    // Hacer un JOIN para obtener el nombre de la talla desde la tabla TALLA
    const result = await connection.execute(
      `SELECT pt.TALLA_ID, t.NOMBRE_TALLA, pt.CANTIDAD
       FROM PRODUCTO_TALLA pt
       JOIN TALLA t ON pt.TALLA_ID = t.TALLA_ID
       WHERE pt.PRODUCTO_ID = :productoId`,
      [productoId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener las tallas del producto:', error);
    res.status(500).json({ error: 'Error al obtener las tallas del producto' });
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

const addProductoTalla = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const { producto_id, tallas } = req.body;

    if (Array.isArray(tallas) && tallas.length > 0) {
      for (let talla of tallas) {
        await connection.execute(
          `INSERT INTO PRODUCTO_TALLA (PRODUCTO_ID, TALLA_ID, CANTIDAD)
           VALUES (:producto_id, :talla_id, :cantidad)`,
          [producto_id, talla.talla_id, talla.cantidad],
          { autoCommit: true }
        );
      }
      res.status(201).json({ message: 'Tallas añadidas correctamente al producto' });
    } else {
      res.status(400).json({ error: 'No se han proporcionado tallas válidas para insertar' });
    }
  } catch (error) {
    console.error('Error al añadir tallas al producto:', error);
    res.status(500).json({ error: 'Error al añadir tallas al producto' });
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
  getTallasByProducto,  addProductoTalla,
};
