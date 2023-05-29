# Utilisez une image de base MySQL
FROM mysql:latest

# Définit les variables d'environnement
ENV MYSQL_HOST=mysql
ENV MYSQL_DATABASE=zoo
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_USER=test
ENV MYSQL_PASSWORD=test
ENV MYSQL_TYPE=mysql
ENV MYSQL_PORT=3307

# Expose le port 3306 (par défaut de MySQL)
EXPOSE 3306

# Commande par défaut pour démarrer le conteneur MySQL
CMD ["mysqld"]
