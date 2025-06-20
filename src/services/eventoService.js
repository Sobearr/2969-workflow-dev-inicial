/* eslint-disable class-methods-use-this */
import db from '../db/dbconfig.js';

class EventoService {
  async pegaEventos() {
    return db.select('*').from('eventos');
  }

  async pegarPeloId(id) {
    const resultado = await db.select('*').from('eventos').where({ id });
    return resultado[0];
  }

  async criar(dto) {
    const novoEvento = {
      nome: dto.nome,
      descricao: dto.descricao,
      data: dto.data,
      autor_id: dto.autor_id,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
    return db('eventos').returning('id').insert(novoEvento);
  }

  async atualizar(dto) {
    const id = dto.id;
    await db('eventos')
      .where({ id })
      .update({ ...dto, updated_at: new Date().toISOString() });

    return db.select('*').from('eventos').where({ id });
  }

  async excluir(id) {
    return db('eventos').where({ id }).del();
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

export default EventoService;
