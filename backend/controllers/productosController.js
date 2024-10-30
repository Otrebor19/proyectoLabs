const connectToDB = require('../config/db'); 
// Obtener todos los productos
// Obtener todos los productos
const getProducts = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const result = await connection.execute('SELECT * FROM PRODUCTO');
    
    // Transformar los datos
    const products = result.rows.map((row) => ({
      PRODUCTO_ID: row[0],
      NOMBRE: row[2],
      DESCRIPCION: row[3],
      PRECIO: row[4],
      CATEGORIA_ID: row[5],
      MARCA: row[6],
      STOCK: row[7],
      CALIFICACION_PROMEDIO: row[8],
      NUMERO_RESEÑAS: row[9],
      FECHA_CREACION: row[10],
      FECHA_ACTUALIZACION: row[11],
      IMAGEN_URL: row[12],
      GENERO_ID: row[13],
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
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


// Obtener un producto por ID
const getProductById = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const { id } = req.params;
    const result = await connection.execute('SELECT * FROM PRODUCTO WHERE PRODUCTO_ID = :id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
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

// Añadir un nuevo producto
// Añadir un nuevo producto
const addProduct = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const { nombre, descripcion, precio, categoria_id, marca, stock, imagen_url, genero_id } = req.body; // Incluir genero_id

    // Insertar el producto en la tabla PRODUCTO
    const result = await connection.execute(
      `INSERT INTO PRODUCTO (PRODUCTO_ID, NOMBRE, DESCRIPCION, PRECIO, CATEGORIA_ID, MARCA, STOCK, IMAGEN_URL, GENERO_ID, FECHA_CREACION, FECHA_ACTUALIZACION)
       VALUES (producto_seq.NEXTVAL, :nombre, :descripcion, :precio, :categoria_id, :marca, :stock, :imagen_url, :genero_id, SYSDATE, SYSDATE)`,
      [nombre, descripcion, precio, categoria_id, marca, stock, imagen_url, genero_id], // Agregar genero_id a los valores
      { autoCommit: true }
    );

    // Obtener el ID del producto recién insertado
    const productoIdResult = await connection.execute(
      `SELECT producto_seq.CURRVAL as productoId FROM dual`
    );
    const productoId = productoIdResult.rows[0][0];

    res.status(201).json({ message: 'Producto añadido correctamente', productoId });
  } catch (error) {
    console.error('Error al añadir el producto:', error);
    res.status(500).json({ error: 'Error al añadir el producto' });
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



// Actualizar un producto existente
const updateProduct = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria_id, marca, stock, imagen_url, genero_id } = req.body; // Incluir genero_id

    await connection.execute(
      `UPDATE PRODUCTO SET NOMBRE = :nombre, DESCRIPCION = :descripcion, PRECIO = :precio, CATEGORIA_ID = :categoria_id, MARCA = :marca, STOCK = :stock, IMAGEN_URL = :imagen_url, GENERO_ID = :genero_id, FECHA_ACTUALIZACION = SYSDATE
       WHERE PRODUCTO_ID = :id`,
      [nombre, descripcion, precio, categoria_id, marca, stock, imagen_url, genero_id, id], // Incluir genero_id en los valores
      { autoCommit: true }
    );
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
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

// Eliminar un producto
const deleteProduct = async (req, res) => {
  let connection;
  try {
    connection = await connectToDB();
    const { id } = req.params;
    await connection.execute('DELETE FROM PRODUCTO WHERE PRODUCTO_ID = :id', [id], { autoCommit: true });
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
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
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
