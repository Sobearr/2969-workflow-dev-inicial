/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

class Autor {
  constructor({
    id, nome, nacionalidade, created_at, updated_at,
  }) {
    this.id = id || null;
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }
}

export default Autor;
