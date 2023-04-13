CREATE TABLE habitats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    climate VARCHAR(30),
    temperature INTEGER
);

CREATE TABLE monsters(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    personlity VARCHAR(25),
    habitats_id INTEGER, -- ONE-TO-MANY
    FOREIGN KEY(habitats_id) REFERENCES habitats(id)
);



INSERT INTO habitats(name,climate,temperature)
VALUES
    ('Desert', 'Dry', 100),
    ('Forrest', 'Humid', 50),
    ('Mountain', 'Icy', 25);

INSERT INTO monsters(name, personlity, habitats_id)
VALUES
    ('Fluffy', 'Aggressive', 1),
    ('Noodles', 'impatient', 2),
    ('Rusty', 'Passionate', 3);