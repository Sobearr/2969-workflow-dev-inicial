/* eslint-disable class-methods-use-this */
import db from '../db/dbconfig.js';

class AutorService {
  async pegarAutores() {
    return db.select('*').from('autores');
  }

  async pegarPeloId(id) {
    const resultado = await db.select('*').from('autores').where({ id });
    return resultado[0];
  }

  async criar(dto) {
    const novoAutor = {
      nome: dto.nome,
      nacionalidade: dto.nacionalidade,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
    return db('autores').returning('id').insert(novoAutor);
  }

  async atualizar(dto) {
    const id = dto.id;
    await db('autores')
      .where({ id })
      .update({ ...dto, updated_at: new Date().toISOString() });

    return db.select('*').from('autores').where({ id });
  }

  async excluir(id) {
    return db('autores').where({ id }).del();
  }

  async salvar(dto) {
    if (dto.id) {
      const resultado = await this.atualizar(dto);
      return resultado;
    }
    const resultado = await this.criar(dto);
    return resultado;
  }

  async pegaLivrosPorAutor(autorId) {
    return db('livros').where({ autor_id: autorId });
  }
}

export default AutorService;
