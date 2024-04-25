# Creado por 3HTP Sebastian Guisao
FROM node:21.7.1

WORKDIR /var/www/

# Se copia el contenido del repositorio exceptuando los archivos en .dockerignore
COPY . .

# Se instalan los paquetes necesarios para correr la aplicación
RUN npm uninstall bcrypt && npm install bcrypt && chmod +x /var/www//node_modules/.bin/nodemon

#Se expone el puerto 3100
EXPOSE 3100

#Iniciando aplicación en ambiente de desarollo con comando "npx nodemon app"
CMD ["npx", "nodemon", "app"]