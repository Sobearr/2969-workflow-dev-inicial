import {
  describe, expect, it,
} from '@jest/globals';
import db from '../../db/dbconfig.js';
import EditoraService from '../../services/editoraService.js';

afterAll(() => {
  db.destroy();
});

describe('Testando EditoraService', () => {
  const editoraService = new EditoraService();
  const objetoEditora = {
    nome: 'Editora teste',
    cidade: 'descricao da editora teste',
    email: 'editora@teste.com',
    created_at: '2025-06-19 07:00:00',
    updated_at: '2025-06-19 07:00:00',
  };

  it('Deve retornar uma lista de editoras do db', async () => {
    const editoras = await editoraService.pegarEditoras();
    expect(editoras).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 2 }),
        expect.objectContaining({ id: 3 }),
      ]),
    );
  });

  it('Deve retornar uma editora do db', async () => {
    const editoraId = 2;
    const editora = await editoraService.pegarPeloId(editoraId);
    expect(editora).toEqual(
      expect.objectContaining({ id: editoraId }),
    );
  });

  it('Deve salvar editora no DB', async () => {
    const dados = await editoraService.salvar(objetoEditora);
    const retornado = await editoraService.pegarPeloId(dados[0].id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve editar os valores de uma editora no db', async () => {
    const editoraId = 2;
    const editora = await editoraService.pegarPeloId(editoraId);
    const dadosNovos = {
      email: 'novo_email@teste.com',
    };
    const editoraAlterada = { ...editora, ...dadosNovos };

    const editoraAtualizada = await editoraService.atualizar(editoraAlterada);
    expect(editoraAtualizada[0]).toEqual(
      expect.objectContaining({
        id: editoraId,
        ...editoraAlterada,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve apagar uma editora do db', async () => {
    const editora = await editoraService.salvar(objetoEditora);
    const editorasDeletadas = await editoraService.excluir(editora[0].id);
    expect(editorasDeletadas).toEqual(1);
  });
});
