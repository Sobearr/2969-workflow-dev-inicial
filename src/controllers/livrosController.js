import Livro from '../models/livro.js';
import LivroService from '../services/livroService.js';

const livroService = new LivroService();

class LivrosController {
  static listarLivros = async (_, res) => {
    try {
      const resultado = await livroService.pegarLivros();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarLivroPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await livroService.pegarPeloId(params.id);
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

  static cadastrarLivro = async (req, res) => {
    const { body } = req;
    const livro = new Livro(body);
    try {
      if (Object.keys(body).length === 0) {
        throw new Error('corpo da requisição vazio');
      }
      await livroService.salvar(livro);
      return res.status(201).json({ message: 'livro criado' });
    } catch (err) {
      if (err.message === 'corpo da requisição vazio') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json(err.message);
    }
  };

  static atualizarLivro = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const livroAtual = await livroService.pegarPeloId(params.id);
      if (!livroAtual) {
        return res
          .status(404)
          .json({ message: `id ${params.id} não encontrado` });
      }
      const novoLivro = new Livro({ ...livroAtual, ...body });
      const resposta = await livroService.salvar(novoLivro);
      return res
        .status(200)
        .json({ message: 'livro atualizado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirLivro = async (req, res) => {
    const { params } = req;
    try {
      const livroFoiDeletado = await livroService.excluir(params.id);
      if (!livroFoiDeletado) {
        return res
          .status(404)
          .json({ message: `Livro com id ${params.id} não encontrado` });
      }
      return res.status(200).json({ message: 'livro excluído' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

export default LivrosController;
