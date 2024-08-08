import Fastify from 'fastify'

import { testConnection } from './db/db-config.js';
import procRecebimentoWhatsAppInsert from './procedures/procRecebimentoWhatsAppInsert/index.js';

const fastify = Fastify({
  logger: true
})

const logger = fastify.log;

fastify.post('/receber', async function handler (request, reply) {
  console.log(request.body)

  const { body } = request;

  procRecebimentoWhatsAppInsert(body, logger)

  return
})

try {
  const isConnected = await testConnection(logger)

  if (!isConnected) {
    logger.error('Erro ao conectar ao banco de dados')
    process.exit(1)
  }

  await fastify.listen({ port: 3000 })
} catch (err) {
  logger.error(err)
  process.exit(1)
}