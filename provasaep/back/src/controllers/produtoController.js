const { Produto } = require('./models');

class ProdutoController {
    async store(req, res) {
        const { id_produto, nome_produto, preco_produto, gestor_produto } = req.body;
        const item = await Produto.create({ id_produto, nome_produto, preco_produto, gestor_produto });
        return res.status(201).json({ id_produto: item.id_produto, nome_produto: item.nome_produto, preco_produto: item.preco_produto, gestor_produto: item.gestor_produto });
    };
    
    async index(req, res) {
        const itens = await Produto.findAll({ attributes: ['id_produto', 'nome_produto', 'preco_produto', 'gestor_produto'] });
        return res.json(itens);
    };
    
    async update(req, res) {
        const { id } = req.params;
        const { id_produto, nome_produto, preco_produto, gestor_produto } = req.body;
        const item = await Produto.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Registro não encontrado' });
        const dados = { id_produto, nome_produto, preco_produto, gestor_produto };
        await Produto.update(dados, { where: { id_produto: id } });
        return res.json({ message: 'Registro atualizado com sucesso' });
    };

    async destroy(req, res) {
        const { id } = req.params;
        const item = await Produto.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Registro não encontrado' });
        await Produto.destroy({ where: { id_produto: id } });
        return res.json({ message: 'Registro excluído com sucesso' });
    };
};

module.exports = new ProdutoController();