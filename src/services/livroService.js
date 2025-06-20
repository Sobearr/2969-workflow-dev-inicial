/* eslint-disable class-methods-use-this */
import db from '../db/dbconfig.js';

class LivroService {
  async pegarLivros() {
    return db.select('*').from('livros');
  }

  async pegarPeloId(id) {
    const resultado = await db.select('*').from('livros').where({ id });
    return resultado[0];
  }

  async criar(dto) {
    const novoLivro = {
      titulo: dto.titulo,
      paginas: dto.paginas,
      editora_id: dto.editora_id,
      autor_id: dto.autor_id,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
    return db('livros').returning('id').insert(novoLivro);
  }

  async atualizar(dto) {
    const id = dto.id;
    await db('livros')
      .where({ id })
      .update({ ...dto, updated_at: new Date().toISOString() });

    return db.select('*').from('livros').where({ id });
  }

  async excluir(id) {
    return db('livros').where({ id }).del();
  }

  async salvar(dto) {
    if (dto.id) {
      const resultado = await this.atualizar(dto);
      return resultado;
    }
    const resultado = await this.criar(dto);
    return resultado;
  }
}

export default LivroService;
