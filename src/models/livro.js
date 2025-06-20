/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

class Livro {
  constructor({
    id,
    titulo,
    paginas,
    editora_id,
    autor_id,
    created_at,
    updated_at,
  }) {
    this.id = id || null;
    this.titulo = titulo;
    this.paginas = paginas;
    this.editora_id = editora_id;
    this.autor_id = autor_id;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }
}

export default Livro;
