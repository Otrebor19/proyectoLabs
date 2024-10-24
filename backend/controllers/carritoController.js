const connectToDB = require('../config/db');

// Obtener el carrito de un cliente
async function getCarritoByCliente(req, res) {
  let connection;
  const clienteId = req.user.cliente_id; // Suponiendo que req.user contiene la info del cliente autenticado

  try {
    connection = await connectToDB();

    const query = `
      SELECT p.PRODUCTO_ID, p.NOMBRE, p.PRECIO, cp.CANTIDAD
      FROM CARRITO c
      JOIN CARRITO_PRODUCTO cp ON c.CARRITO_ID = cp.CARRITO_ID
      JOIN PRODUCTO p ON cp.PRODUCTO_ID = p.PRODUCTO_ID
      WHERE c.CLIENTE_ID = :clienteId
    `;
    const result = await connection.execute(query, { clienteId });

    const carrito = result.rows.map(row => ({
      producto_id: row[0],
      nombre: row[1],
      precio: row[2],
      cantidad: row[3],
    }));

    res.status(200).json(carrito);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Agregar producto al carrito
async function addProductoToCarrito(req, res) {
    let connection;
    const clienteId = req.user.cliente_id;
    const { productoId, cantidad } = req.body;
  
    try {
      connection = await connectToDB();
  
      // Verificar si el cliente ya tiene un carrito
      let query = 'SELECT CARRITO_ID FROM CARRITO WHERE CLIENTE_ID = :clienteId';
      let result = await connection.execute(query, { clienteId });
      let carritoId;
  
      if (result.rows.length === 0) {
        // Crear un nuevo carrito si no existe
        query = `
          INSERT INTO CARRITO (CLIENTE_ID, FECHA_CREACION, FECHA_ACTUALIZACION) 
          VALUES (:clienteId, SYSDATE, SYSDATE) 
          RETURNING CARRITO_ID INTO :carritoId
        `;
        result = await connection.execute(query, {
          clienteId, 
          carritoId: { dir: connection.BIND_OUT, type: connection.NUMBER }
        });
        carritoId = result.outBinds.carritoId[0]; // Asignar el nuevo carrito_id
      } else {
        carritoId = result.rows[0][0]; // Obtener el carrito existente
      }
  
      // Insertar o actualizar la cantidad del producto en CARRITO_PRODUCTO
      query = `
        MERGE INTO CARRITO_PRODUCTO cp
        USING DUAL
        ON (cp.CARRITO_ID = :carritoId AND cp.PRODUCTO_ID = :productoId)
        WHEN MATCHED THEN
          UPDATE SET cp.CANTIDAD = cp.CANTIDAD + :cantidad
        WHEN NOT MATCHED THEN
          INSERT (CARRITO_ID, PRODUCTO_ID, CANTIDAD) 
          VALUES (:carritoId, :productoId, :cantidad)
      `;
      await connection.execute(query, { carritoId, productoId, cantidad });
  
      await connection.commit();
      res.status(200).json({ message: 'Producto añadido al carrito' });
    } catch (error) {
      await connection.rollback(); // Revertir la transacción si hay un error
      console.error('Error al agregar producto al carrito:', error);
      res.status(500).json({ error: 'Error al agregar producto al carrito' });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
  

// Eliminar producto del carrito
async function removeProductoFromCarrito(req, res) {
  let connection;
  const clienteId = req.user.cliente_id;
  const { productoId } = req.body;

  try {
    connection = await connectToDB();
    await connection.execute('BEGIN'); // Iniciar una transacción

    // Eliminar producto del carrito
    const query = `
      DELETE FROM CARRITO_PRODUCTO 
      WHERE CARRITO_ID = (SELECT CARRITO_ID FROM CARRITO WHERE CLIENTE_ID = :clienteId)
      AND PRODUCTO_ID = :productoId
    `;
    await connection.execute(query, { clienteId, productoId });

    await connection.commit(); // Hacer commit de la transacción
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    await connection.rollback(); // Revertir la transacción si hay un error
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  getCarritoByCliente,
  addProductoToCarrito,
  removeProductoFromCarrito,
};
