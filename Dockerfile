# Para o Build da aplicação
FROM public.ecr.aws/docker/library/node:18-alpine as base

# Etapa 1: Build
FROM base AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos do projeto
COPY . .

# Gerar o build da aplicação
RUN npm run build

# Etapa 2: Final
FROM base as runner

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos do build gerado na etapa anterior
COPY --from=builder /app/build ./build

# Copiar arquivo de configuração do sequelize
COPY --from=builder /app/.sequelizerc ./

# Instalar apenas as dependências de produção
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "build/index.js"]
