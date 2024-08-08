import sql from "mssql";

export default async function procRecebimentoWhatsAppReacaoInsert(RecebimentoWhatsappId, plugzapiResponse, logger, pool) {
  try {
    let result = await pool.request()
      .input('RecebimentoWhatsappId', sql.BigInt, RecebimentoWhatsappId)
      .input('Valor', sql.VarChar(100), plugzapiResponse.reaction.value)
      .input('DataHora', sql.DateTime, new Date(plugzapiResponse.reaction.time))
      .input('ReferenciaMensagemId', sql.VarChar(100), plugzapiResponse.reaction.referencedMessage.messageId)
      .input('ReferenciaFromMe', sql.Bit, plugzapiResponse.reaction.referencedMessage.fromMe)
      .input('ReferenciaTelefone', sql.VarChar(20), plugzapiResponse.reaction.referencedMessage.phone)
      .input('ReferenciaParticipantes', sql.VarChar(1000), plugzapiResponse.reaction.referencedMessage.participant)
      .execute('ERPGlobal.Logs.procRecebimentoWhatsAppReacaoInsert');
    
    logger.info(result);
  } catch (err) {
    logger.error(err);
  }
}