
# MaisVidas & Plugzapi Webhook

API para receber respostas de eventos do webhook da Plugzapi


## Documentação da API

#### Lida com o evento "Ao receber"

```http
  POST /receber
```



## Deploy

#### Node v20.16.0 / npm 10.8.1

1- Verifique o arquivo ```/db/db-config.js``` e certifique que os dados de conexão com o banco de dados estão corretos.

2- Instale as dependencias:
```bash
  npm i
```

3- Inicie a aplicação
```bash
  npm run start
```

