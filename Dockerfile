FROM node:21

# documentacion de node, -p para crear carpetas si no existen
RUN mkdir -p /usr/src/app 

#CD
WORKDIR /usr/src/app 

#Copia todos los archivos que empiecen por package y tengan formato .json
COPY package*.json ./

RUN npm install

#Copiar directorio actual dentro del contenedor actual
COPY . .

EXPOSE 3000

CMD ["npm", "start"]