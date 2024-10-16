const oracledb = require('oracledb');
require('dotenv').config(); // Si estás usando variables de entorno

async function connectToDB() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectString: process.env.ORACLE_DB_CONNECT_STRING
    });

    console.log('Conexión a Oracle establecida correctamente');
    return connection;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
}

module.exports = connectToDB;
