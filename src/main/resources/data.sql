INSERT INTO roles (name)
VALUES ('ROLE_DOCTOR'),
       ('ROLE_PATIENT');

INSERT INTO users (email, password, name, surname, phone, photo_url)
VALUES ('doctor1@gmail.com', 'haslo123', 'Doctor', 'Oetker', '111111111', 'doctor1.jpg'),
       ('patient1@gmail.com', 'haslo123', 'Mariusz', 'Pudzianowski', '222222222', 'patient1.jpg');

INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1),
       (2, 2);

INSERT INTO visits (completed, doctor_id, date_time)
VALUES (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 1 hour')),
       (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 1 hour 30 minute')),
       (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 2 hour')),
       (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 2 hour 30 minute')),
       (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 3 hour')),
       (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 3 hour 30 minute')),
       (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 4 hour')),
       (false, 1, DATE_TRUNC('minute', CURRENT_TIMESTAMP + INTERVAL '1 day 4 hour 30 minute'));