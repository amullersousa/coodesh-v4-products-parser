# Fitness Foods LC

> This is a challenge by [Coodesh](https://coodesh.com/)

Este projeto consiste no desenvolvimento de uma REST API que utiliza dados do Open Food Facts, um banco de dados aberto com informações nutricionais de produtos alimentícios. A API servirá de suporte para a equipe de nutricionistas da empresa Fitness Foods LC, permitindo a consulta e revisão rápida das informações nutricionais dos alimentos cadastrados pelos usuários da aplicação móvel.

## Objetivos principais

- Integrar a base de dados do Open Food Facts para fornecer informações detalhadas sobre cada produto.
- Oferecer endpoints para consulta, filtragem e classificação de alimentos, facilitando a análise nutricional.
- Fornecer um sistema de busca eficiente para que os nutricionistas da empresa localizem rapidamente os alimentos desejados.

## Benefícios esperados

- Agilidade e precisão na verificação das informações nutricionais publicadas.
- Melhor suporte ao usuário final, garantindo que os dados nutricionais estejam sempre atualizados e completos.
- Integração com o aplicativo móvel, permitindo que a análise dos dados seja realizada de forma centralizada.

## Tecnologias Utilizadas

- Express
- Typescript
- Sequelize
- Axios
- PostgreSQL
- Nodemailer

## Estrutura do projeto

Seguindo alguns principios de arquitetura em camadas e a abordagem de desenvolvimento DDD, criei o projeto com a seguinte estrutura:

- application
- bootstrap
- config
- core
- domain
- infra
- utils

### Application

O diretorio application representa a camada de aplicação, onde habitam os serviços de aplicação, as difinições de payload (DTOs) e os mappers.

### Bootstrap

O diretorio bootstrap contém os arquivos responsáveis por iniciar a aplicação, os possíveis providers e as subscrições de eventos de dominio.

### Config

Este diretorio centraliza todos os arquivos de configuração de todo o projeto, banco de dados logger e etc.

### Core

Este diretorio centraliza as classes abstratas que facilitam a impletentação dos recursos do projeto, como entidades, objetos de valor, serviços, eventos e etc.

### Domain

O diretorio domain representa a camada de dominio, onde habitam as entidades, objetos de valor, eventos de dominio e subscrições de eventos de dominio.

### Application

O diretorio infra representa a camada de infraestrutura que faz comunicação com o mundo externo, onde habitam os provedores de serviços (database, logger e etc.), rotas, controladores e serviços que se comunicam com outras aplicações.

### Utils

Este diretorio centraliza todos os utilitários que facilitam o desenvolvimento e ajuda a manter o código mais limpo e legível

## Processo de importação

Para o processo de importação, existe um serviço de infra (/infra/services/ProductImportService) que faz a busca do delta (lista de arquivos diponíveis na Open Food Facts), faz o download desses arquivos zipados e extrai os produtos para serem gravados no banco de dados.

O serviço de aplicação (/application/services/ImportProducts) faz a chamada desse serviço de importação para obter os dados brutos dos produtos, mapeia esses dados para entidades de dominio e persiste as entidades no banco de dados.

## Executar projeto local

Para executar o projeto @fitness-foods/server, siga as instruções abaixo:

### Pré-requisitos

- Node.js: Certifique-se de que o Node.js (versão 16 ou superior) esteja instalado.
- Banco de Dados PostgreSQL: Configure um banco de dados PostgreSQL e anote as credenciais.
- Variáveis de Ambiente: Crie um arquivo .env na raiz do projeto (use como refêrencia o arquivo example.env) com as variáveis necessárias, como as configurações de banco de dados e quaisquer outras variáveis sensíveis.

### Passo a Passo

- Instale as dependências com o comando npm install
- Inicialize o banco de dados e aplique as migrações e seeds usando os scripts:
  - npm run db:create:dev
  - npm run db:migrate:dev
  - npm run db:seed:dev
- Inicie o servidor em modo de desenvolvimento com o comando npm run start:dev
- Para criar o build do projeto, execute npm run build
- Limpeza do Banco de Dados:
  - npm run db:migrate:undo:dev
  - npm run db:seed:undo
