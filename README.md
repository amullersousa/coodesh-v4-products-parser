# Documentar de processo

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
