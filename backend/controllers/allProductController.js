const connectToDB = require('../db');

// Obtener todos los productos
async function getAllProducts(req, res) {
  let connection;
  try {
    connection = await connectToDB();
    const query = `SELECT * FROM PRODUCTO`;
    const result = await connection.execute(query);

    const products = result.rows.map(row => ({
      producto_id: row[0],
      nombre: row[2],
      descripcion: row[3],
      precio: row[4],
      imagen_url: row[12],
      categoria_id: row[5],
    }));

    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener productos por categoría
async function getProductsByCategory(req, res) {
  let connection;
  const { categoriaId } = req.params;
  try {
    connection = await connectToDB();
    const query = `SELECT * FROM PRODUCTO WHERE CATEGORIA_ID = :categoriaId`;
    const result = await connection.execute(query, { categoriaId });

    const products = result.rows.map(row => ({
      producto_id: row[0],
      nombre: row[2],
      descripcion: row[3],
      precio: row[4],
      imagen_url: row[12],
      categoria_id: row[5],
    }));

    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos por categoría:', error);
    res.status(500).json({ error: 'Error al obtener los productos por categoría' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  getAllProducts,
  getProductsByCategory,
};
