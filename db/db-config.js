import sql from "mssql";

const config = {
  user: 'maisvidasbd',
  password: '#M@isV1dasB@se777',
  server: 'hopebd01.hopesolution.com.br', // Pode ser 'localhost' para local ou o IP/nome do servidor
  database: 'MaisVidas_DEMONSTRACAO',
  port: 1777,
  options: {
    encrypt: true, // Use true se estiver usando Azure
    trustServerCertificate: true // Use true se o SQL Server não tiver um certificado SSL válido
  }
};

export async function testConnection(logger) {
  let isConnected = false;
  try {
    // Conectar ao banco de dados
    await sql.connect(config);
    logger.info('Conexao bem-sucedida!');
    isConnected = true;
  } catch (err) {
    logger.error(err);
    isConnected = false;
  } finally {
    // Fechar a conexão
    sql.close();
  }

  return isConnected
}

export default config;