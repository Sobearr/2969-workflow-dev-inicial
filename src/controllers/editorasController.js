import Editora from '../models/editora.js';
import EditoraService from '../services/editoraService.js';

const editoraService = new EditoraService();

class EditorasController {
  static listarEditoras = async (_, res) => {
    try {
      const resultado = await editoraService.pegarEditoras();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarEditoraPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await editoraService.pegarPeloId(params.id);
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

  static cadastrarEditora = async (req, res) => {
    const { body } = req;
    const editora = new Editora(body);
    try {
      if (Object.keys(body).length === 0) {
        throw new Error('corpo da requisição vazio');
      }
      await editoraService.salvar(editora);
      return res.status(201).json({ message: 'editora criada' });
    } catch (err) {
      if (err.message === 'corpo da requisição vazio') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json(err.message);
    }
  };

  static atualizarEditora = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const editoraAtual = await editoraService.pegarPeloId(params.id);
      if (!editoraAtual) {
        return res
          .status(404)
          .json({ message: `id ${params.id} não encontrado` });
      }
      const novaEditora = new Editora({ ...editoraAtual, ...body });
      const resposta = await editoraService.salvar(novaEditora);
      return res
        .status(200)
        .json({ message: 'editora atualizada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirEditora = async (req, res) => {
    const { params } = req;
    try {
      const editoraFoiDeletada = await editoraService.excluir(params.id);
      if (!editoraFoiDeletada) {
        return res
          .status(404)
          .json({ message: `Editora com id ${params.id} não encontrada` });
      }
      return res.status(200).json({ message: 'editora excluída' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarLivrosPorEditora = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await editoraService.pegarPeloId(params.id);
      const listaLivros = await editoraService.pegarLivrosPorEditora(params.id);
      return res
        .status(200)
        .json({ editora: resultado[0], livros: listaLivros });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

export default EditorasController;
