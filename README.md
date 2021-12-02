# exercicioRotas
Reescrevendo ultimo exercicio do RaroAcademy com o boilerplate

## Pré-requisitos

Para rodar esta aplicação, você precisará:

- git
- nodejs. Sugiro que esteja na versão LTS
- sugiro o uso do `npm`, para controle de pacotes. Mas se preferir, o `yarn` também pode ser utilizado.
- sugiro um editor de texto que dê bom suporte ao desenvolvimento com typescript.

## Instalação

```bash
#Clonar o projeto e após isso instalar as dependencias
npm install
```

Criar uma varíavel .env de acordo com o arquivo .env.example e preencher todas as variáveis com os dados adequados. Para os campos de `secret`, sugiro:
- o campo `SECRET`, preencha com uma chave aleatória bem grande. Sugiro uma chave com 256 caracteres, gerada em sites como [este](https://passwordsgenerator.net/).
- o campo `AUTH_SECRET`, preencha com uma chave aleatória. Sugiro uma chave com 64 caracteres, gerada da mesma forma que a chave anterior.

### build
Comando para criação do bundle de produção. Este pacote será produzido na pasta `/dist`, na raiz deste projeto.

```bash
npm run build
```

### start
Comando utilizado para iniciar o projeto resultante do `build`. Ou seja, este deverá executar a aplicação em modo produção. **Importante notar que ele somente executa o bundle produzido pelo build. A atualização deste pacote requer que o comando de build seja executado.**

```bash
npm start
```

### dev
Comando utilizado para iniciar o projeto em modo de desenvolvimento

```bash
npm run dev
```

### test
Executa os testes de unidade do projeto. Existem três variações do comando, conforme descritas abaixo:

```bash
# Executa em modo single run, sem análise de cobertura
npm test

# executa em modo "live", acompanhando as mudanças do código. Muito útil em modo de desenvolvimento
npm run test:watch

# executa em modo "cobertura". Executa apenas uma vez, e gera um relatório de cobertura em testes de unidade do seu projeto
npm run test:coverage
```

### typeorm
Este comando é um atalho para o typeorm, que está instalado localmente, neste projeto. Como estamos usando o typeorm em projeto typescript, é necessário criar uma configuração de ambiente, conforme descrito [aqui](https://stackoverflow.com/a/61119284/3135441). Todos os comandos relativos ao typeorm deverão ser chamados com este atalho, e os modificadores do typeorm precedidos com `--`.
Ex.:

```bash
npm run typeorm -- migration:generate -n CreateManyCampeonatosToManyUsuarios
npm run typeorm -- migration:run
```

## Pacotes
Os principais pacotes utilizados nesse projeto são:
- typescript
- axios
- dotenv
- jsonwebtoken
- typeorm
- typedi

A tecnologia de armazenamento de dados utilizado será o mariadb.

## Estrutura do projeto

Este projeto foi estruturado para trabalhar com as camadas `routers`, `controllers`, `services`, `clients`, `repositories` e `models`. Cada uma destas estruturas conta com uma pasta, dentro de `src`. As comunicações de todas estas camadas devem, ao máximo possível, serem feitas via interfaces, que deverão estar descritas na pasta de `@types`, nas subpastas específicas para cada estrutura (ex.: para repositories, deve-se criar uma interface em `@types/repositories`)

## License
[MIT](https://choosealicense.com/licenses/mit/)
