const { Estoque } = require('./models');

class EstoqueController {
    async store(req, res) {
        const { id_estoque, quantidade_estoque, data_estoque, gestor_estoque } = req.body;
        const item = await Estoque.create({ id_estoque, quantidade_estoque, data_estoque, gestor_estoque });
        return res.status(201).json({ id_estoque: item.id_estoque, quantidade_estoque: item.quantidade_estoque, data_estoque: item.data_estoque, gestor_estoque: item.gestor_estoque });
    };
    async index(req, res) {
        const itens = await Estoque.findAll({ attributes: ['id_estoque', 'quantidade_estoque', 'data_estoque', 'gestor_estoque'] });
        return res.json(itens);
    };

    async update(req, res) {
        const { id } = req.params;
        const { id_estoque, quantidade_estoque, data_estoque, gestor_estoque } = req.body;
        const item = await Estoque.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Registro não encontrado' });
        const dados = { id_estoque, quantidade_estoque, data_estoque, gestor_estoque };
        await Estoque.update(dados, { where: { id_estoque: id } });
        return res.json({ message: 'Registro atualizado com sucesso' });
    };

    async destroy(req, res) {
        const { id } = req.params;
        const item = await Estoque.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Registro não encontrado' });
        await Estoque.destroy({ where: { id_estoque: id } });
        return res.json({ message: 'Registro excluído com sucesso' });
    };
};

module.exports = new EstoqueController();