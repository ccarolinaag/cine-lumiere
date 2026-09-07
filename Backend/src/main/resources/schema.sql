CREATE TABLE IF NOT EXISTS filme (
    id      INT PRIMARY KEY AUTO_INCREMENT,
    nome    VARCHAR(100),
    diretor VARCHAR(100),
    ano     INT,
    duracao INT,
    pais    VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS sessao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sala INT,
    horario TIME,
    ocupacao INT,
    iniciada BOOLEAN,
    filme_id INT,
    FOREIGN KEY (filme_id) REFERENCES filme(id)
);

INSERT INTO filme (nome, diretor, ano, duracao, pais)
VALUES ('Interestelar', 'Christopher Nolan', 2014, 169, 'EUA');

INSERT INTO filme (nome, diretor, ano, duracao, pais)
VALUES ('Duna', 'Denis Villeneuve', 2021, 155, 'EUA');

INSERT INTO filme (nome, diretor, ano, duracao, pais)
VALUES ('Oppenheimer', 'Christopher Nolan', 2023, 180, 'EUA');