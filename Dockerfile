FROM node:18

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package*.json ./
RUN npm install

# Copia todo o código após instalar os pacotes
COPY . .

# Exponha a porta para o aplicativo
EXPOSE 3000

# Usa o comando start:dev para rodar em modo de desenvolvimento com ts-node
CMD ["npm", "run", "start:dev"]
