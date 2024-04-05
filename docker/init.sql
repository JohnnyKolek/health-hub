CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    email    VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255)       NOT NULL,
    name     VARCHAR(50)       NOT NULL,
    surname  VARCHAR(50)       NOT NULL,
    phone    VARCHAR(20)
);

CREATE TABLE roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_roles
(
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (role_id) REFERENCES roles (id),
    PRIMARY KEY (user_id, role_id)
);
