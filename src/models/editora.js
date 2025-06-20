/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

class Editora {
  constructor({
    id,
    nome,
    cidade,
    email,
    created_at,
    updated_at,
  }) {
    this.id = id || null;
    this.nome = nome;
    this.cidade = cidade;
    this.email = email;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }
}

export default Editora;
