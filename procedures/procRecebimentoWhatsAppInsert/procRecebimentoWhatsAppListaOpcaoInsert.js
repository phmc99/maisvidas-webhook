import sql from "mssql";

export default async function procRecebimentoWhatsAppListaOpcaoInsert(RecebimentoWhatsappId, plugzapiResponse, logger, pool) {
  try {
    let result = await pool.request()
      .input('RecebimentoWhatsappId', sql.BigInt, RecebimentoWhatsappId)
      .input('Selecao', sql.Int, plugzapiResponse.listResponseMessage.selectedRowId)
      .input('Mensagem', sql.NVarChar(sql.MAX), plugzapiResponse.listResponseMessage.message)
      .input('Titulo', sql.NVarChar(500), plugzapiResponse.listResponseMessage.title)
      .execute('ERPGlobal.Logs.procRecebimentoWhatsAppListaOpcaoInsert');
    
    logger.info(result);
  } catch (err) {
    logger.error(err);
  }
}