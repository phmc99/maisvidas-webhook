import sql from "mssql";

export default async function procRecebimentoWhatsAppAudioInsert(RecebimentoWhatsappId, plugzapiResponse, logger, pool) {
  try {
    let result = await pool.request()
      .input('RecebimentoWhatsappId', sql.BigInt, RecebimentoWhatsappId)
      .input('MimeType', sql.VarChar(100), plugzapiResponse.audio.mimeType)
      .input('AudioUrl', sql.VarChar(200), plugzapiResponse.audio.audioUrl)
      .execute('ERPGlobal.Logs.procRecebimentoWhatsAppAudioInsert');
    
    logger.info(result);
  } catch (err) {
    logger.error(err);
  }
}