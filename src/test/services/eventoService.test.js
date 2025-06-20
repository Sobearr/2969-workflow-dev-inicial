import {
  describe, expect, it,
} from '@jest/globals';
import EventoService from '../../services/eventoService.js';

describe('Testando EventoService', () => {
  const eventoService = new EventoService();
  const objetoEvento = {
    nome: 'Evento teste',
    descricao: 'descricao do evento teste',
    data: '2023-01-01',
    autor_id: 1,
    created_at: '2025-06-19 07:00:00',
    updated_at: '2025-06-19 07:00:00',
  };

  it('Deve retornar uma lista de eventos do db', async () => {
    const eventos = await eventoService.pegaEventos();
    expect(eventos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 2 }),
        expect.objectContaining({ id: 3 }),
      ]),
    );
  });

  it('Deve retornar um evento do db', async () => {
    const eventoId = 2;
    const evento = await eventoService.pegarPeloId(eventoId);
    expect(evento).toEqual(
      expect.objectContaining({ id: eventoId }),
    );
  });

  it('Deve salvar evento no DB', async () => {
    const dados = await eventoService.salvar(objetoEvento);
    const retornado = await eventoService.pegarPeloId(dados[0].id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEvento,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve editar os valores de um evento no db', async () => {
    const eventoId = 2;
    const evento = await eventoService.pegarPeloId(eventoId);
    const dadosNovos = {
      descricao: 'descricao alterada',
    };
    const eventoAlterado = { ...evento, ...dadosNovos };

    const eventoAtualizado = await eventoService.atualizar(eventoAlterado);
    expect(eventoAtualizado[0]).toEqual(
      expect.objectContaining({
        id: eventoId,
        ...eventoAlterado,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve apagar um evento do db', async () => {
    const evento = await eventoService.salvar(objetoEvento);
    const eventosDeletados = await eventoService.excluir(evento[0].id);
    expect(eventosDeletados).toEqual(1);
  });
});
