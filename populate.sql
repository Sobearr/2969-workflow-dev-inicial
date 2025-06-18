CREATE TABLE autores(
  id            INTEGER NOT NULL PRIMARY KEY,
  nome          TEXT    NOT NULL,
  nacionalidade TEXT    NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO autores (nome, nacionalidade) 
VALUES  ('JRR Tolkien', 'sul-africano'),
        ('Ursula LeGuin', 'estadunidense'),
        ('Machado de Assis', 'brasileira'),
        ('Júlio Cortázar', 'argentino');

CREATE TABLE editoras(
  id      INTEGER NOT NULL PRIMARY KEY,
  nome    TEXT    NOT NULL,
  cidade  TEXT    NOT NULL,
  email   TEXT    NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO editoras (nome, cidade, email) 
VALUES  ('Europa-América', 'Lisboa', 'e@e.com'),
        ('Morro Branco', 'São Paulo', 'm@m.com'),
        ('Aleph', 'São Paulo', 'al@al.com'),
        ('Ateliê', 'São Paulo', 'a@a.com');

CREATE TABLE livros(
  id          INTEGER NOT NULL PRIMARY KEY,
  titulo      TEXT    NOT NULL,
  paginas     INTEGER NOT NULL,
  editora_id  INTEGER NOT NULL,
  autor_id    INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (editora_id) REFERENCES editoras (id),
  FOREIGN KEY (autor_id) REFERENCES autores (id)
);

INSERT INTO livros (titulo, paginas, autor_id, editora_id)
VALUES 
   ('O Hobbit', 230, 1, 1),
   ('O Silmarillion', 400, 1, 1),
   ('O Silmarillion', 400, 1, 1),
   ('O Feiticeiro de Terramar', 450, 2, 2),
   ('Os Despossuídos', 300, 2, 3),
   ('Memórias Póstumas de Brás Cubas', 150, 3, 4);
  
CREATE TABLE eventos(
  id          INTEGER NOT NULL PRIMARY KEY,
  nome      TEXT    NOT NULL,
  descricao      TEXT    NOT NULL,
  data      TEXT    NOT NULL,
  autor_id    INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (autor_id) REFERENCES autores (id)
);

INSERT INTO eventos (nome, descricao, data, autor_id)
VALUES
  ('Evento 1', 'desc do evento 1', '2025-06-19', 1),
  ('Evento 2', 'desc do evento 2', '2025-06-20', 1),
  ('Evento 3', 'desc do evento 3', '2025-06-21', 2);

.exit