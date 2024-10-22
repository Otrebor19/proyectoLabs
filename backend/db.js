const oracledb = require('oracledb');
require('dotenv').config(); // Si estás usando variables de entorno

async function connectToDB() {
  try {
    const connection = await oracledb.getConnection({
      user:'LABS',
      password:'pass',
      connectString: 'localhost:1521/XEPDB1',
    });

    console.log('Conexión a Oracle establecida correctamente');
    return connection;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
}

module.exports = connectToDB;
