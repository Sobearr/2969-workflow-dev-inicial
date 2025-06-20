import {
  describe, expect, it,
} from '@jest/globals';
import db from '../../db/dbconfig.js';
import AutorService from '../../services/autorService.js';

afterAll(() => {
  db.destroy();
});

describe('Testando AutorService', () => {
  const autorService = new AutorService();
  const objetoAutor = {
    nome: 'Autor teste',
    nacionalidade: 'Brasil',
    created_at: '2025-06-19 07:00:00',
    updated_at: '2025-06-19 07:00:00',
  };

  it('Deve retornar uma lista de autores do db', async () => {
    const autores = await autorService.pegarAutores();
    expect(autores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 2 }),
        expect.objectContaining({ id: 3 }),
      ]),
    );
  });

  it('Deve retornar um autor do db', async () => {
    const autorId = 2;
    const autor = await autorService.pegarPeloId(autorId);
    expect(autor).toEqual(
      expect.objectContaining({ id: autorId }),
    );
  });

  it('Deve salvar autor no DB', async () => {
    const dados = await autorService.salvar(objetoAutor);
    const retornado = await autorService.pegarPeloId(dados[0].id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoAutor,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve editar os valores de um autor no db', async () => {
    const autorId = 2;
    const autor = await autorService.pegarPeloId(autorId);
    const dadosNovos = {
      nacionalidade: 'Suecia',
    };
    const autorAlterado = { ...autor, ...dadosNovos };

    const autorAtualizado = await autorService.atualizar(autorAlterado);
    expect(autorAtualizado[0]).toEqual(
      expect.objectContaining({
        id: autorId,
        ...autorAlterado,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve apagar um autor do db', async () => {
    const autor = await autorService.salvar(objetoAutor);
    const autoresDeletados = await autorService.excluir(autor[0].id);
    expect(autoresDeletados).toEqual(1);
  });

  it('Deve retornar a lista de livros do autor', async () => {
    const autorId = 2;
    const livros = await autorService.pegaLivrosPorAutor(autorId);
    expect(livros).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ autor_id: autorId, id: expect.any(Number) }),
      ]),
    );
  });
});
