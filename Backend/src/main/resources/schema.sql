CREATE TABLE IF NOT EXISTS filme (
                                     id INT PRIMARY KEY AUTO_INCREMENT,
                                     nome VARCHAR(100),
    diretor VARCHAR(100),
    ano INT,
    duracao INT,
    pais VARCHAR(50)
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


-- FILMES

-- INSERT INTO filme (nome, diretor, ano, duracao, pais)
-- VALUES ('Interestelar', 'Christopher Nolan', 2014, 169, 'EUA');
--
-- INSERT INTO filme (nome, diretor, ano, duracao, pais)
-- VALUES ('Duna', 'Denis Villeneuve', 2021, 155, 'EUA');
--
-- INSERT INTO filme (nome, diretor, ano, duracao, pais)
-- VALUES ('Oppenheimer', 'Christopher Nolan', 2023, 180, 'EUA');
--
-- INSERT INTO filme (nome, diretor, ano, duracao, pais)
-- VALUES ('Parasita', 'Bong Joon-ho', 2019, 132, 'Coreia do Sul');
--
--
-- -- SESSÕES
--
-- INSERT INTO sessao (sala, filme_id, horario, ocupacao, iniciada)
-- VALUES
--     (1, 1, '20:40', 32, true),
--     (1, 2, '23:40', 20, true),
--     (2, 2, '21:10', 38, true),
--     (2, 3, '00:00', 15, false),
--     (3, 4, '19:30', 25, true),
--     (3, 1, '22:00', 10, false);