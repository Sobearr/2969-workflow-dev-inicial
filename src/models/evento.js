/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';

class Evento {
  constructor({
    id,
    nome,
    descricao,
    data,
    autor_id,
    created_at,
    updated_at,
  }) {
    this.id = null || id;
    this.nome = nome;
    this.descricao = descricao;
    this.data = data;
    this.autor_id = autor_id;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegaEventos() {
    return db.select('*').from('eventos');
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('eventos').where({ id });
    return resultado[0];
  }

  async criar() {
    const novoEvento = {
      nome: this.nome,
      descricao: this.descricao,
      data: this.data,
      autor_id: this.autor_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
    return db('eventos').returning('id').insert(novoEvento);
  }

  async atualizar(id) {
    await db('eventos')
      .where({ id })
      .update({ ...this, updated_at: new Date().toISOString() });

    return db.select('*').from('eventos').where({ id });
  }

  static async excluir(id) {
    return db('eventos').where({ id }).del();
  }

  async salvar() {
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;
    }
    const resultado = await this.criar();
    return resultado;
  }
}

export default Evento;
