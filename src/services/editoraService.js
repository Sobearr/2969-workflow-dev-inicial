/* eslint-disable class-methods-use-this */
import db from '../db/dbconfig.js';

class EditoraService {
  async pegarEditoras() {
    return db.select('*').from('editoras');
  }

  async pegarPeloId(id) {
    const resultado = await db.select('*').from('editoras').where({ id });
    return resultado[0];
  }

  async criar(dto) {
    const novaEditora = {
      nome: dto.nome,
      cidade: dto.cidade,
      email: dto.email,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
    return db('editoras').returning('id').insert(novaEditora);
  }

  async atualizar(dto) {
    const id = dto.id;
    await db('editoras')
      .where({ id })
      .update({ ...dto, updated_at: new Date().toISOString() });

    return db.select('*').from('editoras').where({ id });
  }

  async excluir(id) {
    return db('editoras').where({ id }).del();
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

export default EditoraService;
