import sql from "mssql";

export default async function procRecebimentoWhatsAppListaBotaoInsert(RecebimentoWhatsappId, plugzapiResponse, logger, pool) {
  try {
    let result = await pool.request()
      .input('RecebimentoWhatsappId', sql.BigInt, RecebimentoWhatsappId)
      .input('BotaoId', sql.Int, plugzapiResponse.buttonsResponseMessage.buttonId)
      .input('Mensagem', sql.NVarChar(sql.MAX), plugzapiResponse.buttonsResponseMessage.message)
      .execute('ERPGlobal.Logs.procRecebimentoWhatsAppListaBotaoInsert');
    
    logger.info(result);
  } catch (err) {
    logger.error(err);
  }
}