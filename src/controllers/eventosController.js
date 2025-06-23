import Evento from '../models/evento.js';
import EventoService from '../services/eventoService.js';
import unleash from '../services/unleash.js';

const eventoService = new EventoService();

class EventosController {
  // Testing unleash implementation
  static liberaAcessoEventos = () => unleash.isEnabled('eventos');

  static listarEventos = async (_, res) => {
    // Unleash feature flag
    if (this.liberaAcessoEventos()) {
      try {
        const resultado = await eventoService.pegaEventos();
        return res.status(200).json(resultado);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    }

    return res.status(404).send();
  };

  static listarEventoPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await eventoService.pegarPeloId(params.id);
      if (!resultado) {
        return res
          .status(404)
          .json({ message: `id ${params.id} não encontrado` });
      }
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarEvento = async (req, res) => {
    const { body } = req;
    const evento = new Evento(body);
    try {
      if (Object.keys(body).length === 0) {
        throw new Error('corpo da requisição vazio');
      }
      await eventoService.salvar(evento);
      return res.status(201).json({ message: 'evento criado' });
    } catch (err) {
      if (err.message === 'corpo da requisição vazio') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json(err.message);
    }
  };

  static atualizarEvento = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const eventoAtual = await eventoService.pegarPeloId(params.id);
      if (!eventoAtual) {
        return res
          .status(404)
          .json({ message: `id ${params.id} não encontrado` });
      }
      const novoEvento = new Evento({ ...eventoAtual, ...body });
      const resposta = await eventoService.salvar(novoEvento);
      return res
        .status(200)
        .json({ message: 'evento atualizado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirEvento = async (req, res) => {
    const { params } = req;
    try {
      const eventoFoiDeletado = await eventoService.excluir(params.id);
      if (!eventoFoiDeletado) {
        return res
          .status(404)
          .json({ message: `Evento com id ${params.id} não encontrado` });
      }
      return res.status(200).json({ message: 'evento excluído' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

export default EventosController;
