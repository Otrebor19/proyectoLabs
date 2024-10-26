const oracledb = require('oracledb');

// Definición del esquema de la tabla PRODUCTOS
const Product = {
  PRODUCTO_ID: {
    type: oracledb.NUMBER,
    required: true,
  },
  NOMBRE: {
    type: oracledb.STRING,
    required: true,
  },
  DESCRIPCION: {
    type: oracledb.STRING,
    required: true,
  },
  PRECIO: {
    type: oracledb.NUMBER,
    required: true,
  },
  CATEGORIA_ID: {
    type: oracledb.NUMBER,
    required: true,
  },
  MARCA: {
    type: oracledb.STRING,
    required: true,
  },
  STOCK: {
    type: oracledb.NUMBER,
    required: true,
  },
  IMAGEN_URL: {
    type: oracledb.STRING,
  },
  NUMERO_RESEÑAS: {
    type: oracledb.NUMBER,
  },
  CALIFICACION_PROMEDIO: {
    type: oracledb.NUMBER,
  },
  FECHA_CREACION: {
    type: oracledb.DATE,
  },
  FECHA_ACTUALIZACION: {
    type: oracledb.DATE,
  },
};

module.exports = Product;
