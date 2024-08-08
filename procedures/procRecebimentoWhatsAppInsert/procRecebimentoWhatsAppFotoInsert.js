import sql from "mssql";

export default async function procRecebimentoWhatsAppFotoInsert(RecebimentoWhatsappId, plugzapiResponse, logger, pool) {
  try {
    let result = await pool.request()
      .input('RecebimentoWhatsappId', sql.BigInt, RecebimentoWhatsappId)
      .input('MimeType', sql.VarChar(20), plugzapiResponse.image.mimeType)
      .input('ImageUrl', sql.VarChar(200), plugzapiResponse.image.imageUrl)
      .input('ThumbUrl', sql.VarChar(200), plugzapiResponse.image.thumbnailUrl)
      .input('Caption', sql.VarChar(sql.MAX), plugzapiResponse.image.caption)
      .execute('ERPGlobal.Logs.procRecebimentoWhatsAppFotoInsert');
    
    logger.info(result);
  } catch (err) {
    logger.error(err);
  }
}