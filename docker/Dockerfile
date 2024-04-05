FROM postgres:16

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=healthub_db

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
