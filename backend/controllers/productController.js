const connectToDB = require('../db'); // Importar la función desde db.js

// Obtener producto por ID
async function getProductById(req, res) {
  let connection;
  try {
    connection = await connectToDB(); // Usamos la conexión del archivo db.js
    const productId = req.params.id;

    const query = `
    SELECT P.PRODUCTO_ID, P.NOMBRE, P.DESCRIPCION, P.PRECIO, P.IMAGEN_URL, C.NOMBRE_CATEGORIA
    FROM PRODUCTO P
    JOIN CATEGORIA C ON P.CATEGORIA_ID = C.CATEGORIA_ID
    WHERE P.PRODUCTO_ID = :productId
  `;
    const result = await connection.execute(query, { productId });

    if (result.rows.length > 0) {
      const product = result.rows[0]; // Mapeo correcto de columnas
      res.json({
        producto_id: product[0],
        nombre: product[1],          // Verifica si el índice 2 es realmente el nombre
        descripcion: product[2],     // Verifica si el índice 3 es la descripción
        precio: product[3],
        imagen_principal: product[4],// Verifica si el índice 12 es la imagen
        nombre_categoria: product[5],
      });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error.message);
    res.status(500).json({ message: 'Error al obtener el producto', details: error.message });
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
        nombre: product[1],         // Verifica si estos índices son correctos
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
    console.error('Error al obtener los productos relacionados:', error.message);
    res.status(500).json({ message: 'Error al obtener los productos relacionados', details: error.message });
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
