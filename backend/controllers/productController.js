const connectToDB = require('../db'); // Importar la función desde db.js

// Obtener producto por ID
async function getProductById(req, res) {
  let connection;
  try {
    connection = await connectToDB(); // Usamos la conexión del archivo db.js
    const productId = req.params.id;

    const query = `SELECT * FROM PRODUCTO WHERE PRODUCTO_ID = :productId`;
    const result = await connection.execute(query, { productId });

    if (result.rows.length > 0) {
      const product = result.rows[0];
      res.json({
        producto_id: product[0],
        nombre: product[2],
        descripcion: product[3],
        precio: product[4],
        imagen_principal: product[12],
        categoria_id: product[5],
      });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener productos relacionados
async function getRelatedProducts(req, res) {
  let connection;
  try {
    connection = await connectToDB(); // Usamos la conexión del archivo db.js
    const productId = req.params.id;

    const query = `SELECT PRODUCTO_ID, NOMBRE, DESCRIPCION, PRECIO, IMAGEN_URL, CATEGORIA_ID 
                   FROM PRODUCTO 
                   WHERE CATEGORIA_ID = 
                   (SELECT CATEGORIA_ID FROM PRODUCTO WHERE PRODUCTO_ID = :productId) 
                   AND PRODUCTO_ID != :productId`;
    
    const result = await connection.execute(query, { productId });

    if (result.rows.length > 0) {
      const relatedProducts = result.rows.map(product => ({
        producto_id: product[0],
        nombre: product[1],
        descripcion: product[2],
        precio: product[3],
        imagen_url: product[4],
        categoria_id: product[5],
      }));

      res.json(relatedProducts);
    } else {
      res.status(404).json({ message: 'No hay productos relacionados' });
    }
  } catch (error) {
    console.error('Error al obtener los productos relacionados:', error);
    res.status(500).json({ message: 'Error al obtener los productos relacionados' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  getProductById,
  getRelatedProducts,
};
