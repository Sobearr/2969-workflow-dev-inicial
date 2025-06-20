import {
  describe, expect, it,
} from '@jest/globals';
import db from '../../db/dbconfig.js';
import LivroService from '../../services/livroService.js';

afterAll(() => {
  db.destroy();
});

describe('Testando LivroService', () => {
  const livroService = new LivroService();
  const objetoLivro = {
    titulo: 'O Livro Teste',
    paginas: 254,
    editora_id: 2,
    autor_id: 2,
    created_at: '2025-06-19 07:00:00',
    updated_at: '2025-06-19 07:00:00',
  };

  it('Deve retornar uma lista de livros do db', async () => {
    const livros = await livroService.pegarLivros();
    expect(livros).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 2 }),
        expect.objectContaining({ id: 3 }),
      ]),
    );
  });

  it('Deve retornar um livro do db', async () => {
    const livroId = 2;
    const livro = await livroService.pegarPeloId(livroId);
    expect(livro).toEqual(
      expect.objectContaining({ id: livroId }),
    );
  });

  it('Deve salvar livro no DB', async () => {
    const dados = await livroService.salvar(objetoLivro);
    const retornado = await livroService.pegarPeloId(dados[0].id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoLivro,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve editar os valores de um livro no db', async () => {
    const livroId = 2;
    const livro = await livroService.pegarPeloId(livroId);
    const dadosNovos = {
      titulo: 'O Livro Teste - Parte 2',
    };
    const livroAlterado = { ...livro, ...dadosNovos };

    const livroAtualizado = await livroService.atualizar(livroAlterado);
    expect(livroAtualizado[0]).toEqual(
      expect.objectContaining({
        id: livroId,
        ...livroAlterado,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve apagar um livro do db', async () => {
    const livro = await livroService.salvar(objetoLivro);
    const livrosDeletados = await livroService.excluir(livro[0].id);
    expect(livrosDeletados).toEqual(1);
  });
});
