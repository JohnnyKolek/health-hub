
    create table roles (
        id serial not null,
        name varchar(255) not null unique,
        primary key (id)
    );

    create table token (
        expired boolean not null,
        id serial not null,
        revoked boolean not null,
        user_id bigint,
        token varchar(255) unique,
        token_type varchar(255) check (token_type in ('BEARER')),
        primary key (id)
    );

    create table user_roles (
        role_id integer not null,
        user_id bigint not null,
        primary key (role_id, user_id)
    );

    create table users (
        id bigserial not null,
        email varchar(255) not null unique,
        name varchar(255) not null,
        password varchar(255) not null,
        phone varchar(255),
        photo_url varchar(255),
        surname varchar(255) not null,
        primary key (id)
    );

    create table visits (
        completed boolean,
        date_time timestamp(6),
        doctor_id bigint,
        id bigserial not null,
        patient_id bigint,
        primary key (id)
    );

    alter table if exists token 
       add constraint FKj8rfw4x0wjjyibfqq566j4qng 
       foreign key (user_id) 
       references users;

    alter table if exists user_roles 
       add constraint FKh8ciramu9cc9q3qcqiv4ue8a6 
       foreign key (role_id) 
       references roles;

    alter table if exists user_roles 
       add constraint FKhfh9dx7w3ubf1co1vdev94g3f 
       foreign key (user_id) 
       references users;

    alter table if exists visits 
       add constraint FKddrh7d8ke8okf2rtis8led4ji 
       foreign key (doctor_id) 
       references users;

    alter table if exists visits 
       add constraint FKrimk1ffcnpm0wec7715sad41m 
       foreign key (patient_id) 
       references users;
