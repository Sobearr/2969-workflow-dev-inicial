import {
  describe, expect, it, jest,
} from '@jest/globals';
import Evento from '../../models/evento.js';

describe('Testando o modelo Evento', () => {
  const objetoEvento = {
    nome: 'Evento teste',
    descricao: 'descricao do evento teste',
    data: '2023-01-01',
    autor_id: 1,
  };

  it('Deve instanciar um novo evento', () => {
    const evento = new Evento(objetoEvento);

    expect(evento).toEqual(
      expect.objectContaining(objetoEvento),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const evento = new Evento(objetoEvento);

    evento.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'Evento teste',
      descricao: 'descricao do evento teste',
      data: '2023-01-01',
      autor_id: 1,
      created_at: '2022-10-01',
      updated_at: '2022-10-01',
    });

    const retorno = evento.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEvento,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
