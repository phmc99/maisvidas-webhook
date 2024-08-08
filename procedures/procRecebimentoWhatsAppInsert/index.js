import config from "../../db/db-config.js";
import sql from "mssql";
import procRecebimentoWhatsAppReacaoInsert from "./procRecebimentoWhatsAppReacaoInsert.js";
import procRecebimentoWhatsAppListaBotaoInsert from "./procRecebimentoWhatsAppListaBotaoInsert.js";
import procRecebimentoWhatsAppListaOpcaoInsert from "./procRecebimentoWhatsAppListaOpcaoInsert.js";
import procRecebimentoWhatsAppFotoInsert from "./procRecebimentoWhatsAppFotoInsert.js";
import procRecebimentoWhatsAppAudioInsert from "./procRecebimentoWhatsAppAudioInsert.js";

function verifyMessageType(plugzapiResponse) {
  if (plugzapiResponse.text){
    if (plugzapiResponse.externalAdReply) return {type: 5, msg: 'Anúncio Recebido'}
    return {type: 1, msg: plugzapiResponse.text.message}
  }
  if (plugzapiResponse.reaction) return {type: 2, msg: 'Reação Recebida'}
  if (plugzapiResponse.buttonsResponseMessage) return {type: 3, msg: 'Resposta Recebida'}
  if (plugzapiResponse.listResponseMessage) return {type: 4, msg: 'Resposta Recebida'}
  if (plugzapiResponse.image) return {type: 6, msg: 'Imagem Recebida'}
  if (plugzapiResponse.audio) return {type: 7, msg: 'Áudio Recebido'}
  if (plugzapiResponse.video) {
    if (plugzapiResponse.video.isGif) {
      return {type: 13, msg: 'GIF Recebido'}
    }
    return {type: 8, msg: 'Vídeo Recebido'}
  }
  if (plugzapiResponse.contact) return {type: 9, msg: 'Contato Recebido'}
  if (plugzapiResponse.document) return {type: 10, msg: 'Documento Recebido'}
  if (plugzapiResponse.location) return {type: 11, msg: 'Localização Recebida'}
  if (plugzapiResponse.sticker) return {type: 12, msg: 'Figurinha Recebida'}
}

async function execProcByType(type, recebimentoId, plugzapiResponse, pool, logger) {
  switch (type) {
    case 2:
      await procRecebimentoWhatsAppReacaoInsert(recebimentoId, plugzapiResponse, logger, pool)
      break;
    case 3:
      await procRecebimentoWhatsAppListaBotaoInsert(recebimentoId, plugzapiResponse, logger, pool)
      break;
    case 4:
      await procRecebimentoWhatsAppListaOpcaoInsert(recebimentoId, plugzapiResponse, logger, pool)
      break;
    case 5:
      break;
    case 6:
      await procRecebimentoWhatsAppFotoInsert(recebimentoId, plugzapiResponse, logger, pool)
      break;
    case 7:
      await procRecebimentoWhatsAppAudioInsert(recebimentoId, plugzapiResponse, logger, pool)
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      break;
    case 11:
      break;
    case 12:
      break;
    case 13:
      break;
    default:
      break;
  }
}

export default async function procRecebimentoWhatsAppInsert(plugzapiResponse, logger) {
  try {
    // Conectando ao banco de dados
    let pool = await sql.connect(config);

    // Tipo da Mensagem
    const { type, msg } = verifyMessageType(plugzapiResponse)

    if (plugzapiResponse.isGroup) {
      plugzapiResponse.phone = plugzapiResponse.participantPhone
    }
    
    // Executar a procedure
    let result = await pool.request()
      .input('InstanceId', sql.VarChar(50), plugzapiResponse.instanceId) // Exemplo de parâmetro de entrada
      .input('MensagemId', sql.VarChar(50), plugzapiResponse.messageId)
      .input('Telefone', sql.VarChar(15), plugzapiResponse.phone)
      .input('DataHora', sql.DateTime, new Date(plugzapiResponse.momment))
      .input('Status', sql.VarChar(30), plugzapiResponse.status)
      .input('ChatNome', sql.VarChar(200), plugzapiResponse.chatName)
      .input('RemetenteFoto', sql.VarChar(200), plugzapiResponse.senderPhoto)
      .input('RemetenteNome', sql.VarChar(200), plugzapiResponse.senderName)
      .input('ParticipanteTelefone', sql.VarChar(15), plugzapiResponse.participantPhone)
      .input('Foto', sql.VarChar(200), plugzapiResponse.photo)
      .input('bitBroadcast', sql.Bit, plugzapiResponse.broadcast)
      .input('isGroup', sql.Bit, plugzapiResponse.isGroup)
      .input('Tipo', sql.VarChar(20), plugzapiResponse.type)
      .input('TipoMensagemId', sql.Int, type)
      .input('Mensagem', sql.VarChar(sql.MAX), msg)
      .execute('ERPGlobal.Logs.procRecebimentoWhatsAppInsert');
    
    logger.info(result);

    // Executar Procedure caso não seja texto simples
    if (type !== 1) await execProcByType(type, result.recordset[0].ID, plugzapiResponse, pool, logger)

    // Fechar a conexão
    sql.close();
  } catch (err) {
    logger.error(err);
  }
}