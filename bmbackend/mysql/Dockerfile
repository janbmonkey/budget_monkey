FROM mysql

ENV MYSQL_DATABASE=company \
    MYSQL_ROOT_PASSWORD=root

# Init database: copy init sql-script into entrypoint folder
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql

# Custom configuration eg. port
COPY ./my.cnf /etc/mysql/my.cnf