const { UPDATE } = require('sequelize/lib/query-types')
const { Product } = require('../models')
const produtSchema = require('../validators/productValidator')

module.exports = {
    async index(req, res) {
        try {
            const products = await Product.findAll()
            return res.json(products)
        }catch (error) {
            return res.status(500).json({error: 'Erro ao buscar produtos'})
        }
    },
    async create(req, res) {
    try{
        await produtSchema.validate(req.body)

        const product = await Product.create(req.body)
        return res.status(201).json(product)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }
        console.error('Erro ao criar produto: ', error)
        return res.status(500).json({error: 'Erro interno no servidor'})
        }
    },
    async show(req, res) {
        try {
            const {id} = req.params
            const product = await Product.findByPk(id)

            if (!product) {
                return res.status(404).json({error: 'Produto não encontrado'})
            }
            return res.json(product)
        }catch (error) {
            console.error('Erro ao buscar produto por ID: ', error)
            return res.status(500).json({error: 'Erro interno no servidor'})
        }
    },
    async update(req, res) {
        try{
            const {id} = req.params
            await produtSchema.validate(req.body)

            const product = await Product.findByPk(id)

            if (!product) {
                return res.status(404).json({error: 'Produto não encontrado'})
            }
            await product.update(req.body)
            return res.json(product)
        }catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({error: error.message})
            }
            console.log('Erro ao atualizar o produto: ', error)
            return res.status(500).json({error: 'Erro interno no servidor'})
        }
    },
    async delete(req, res) {
        try {
            const {id} = req.params
            const product = await Product.findByPk(id)

            if(!product) {
                return res.status(404).json({ error: 'Produto não encontrado'})
            }
            await product.destroy()
            return res.status(203).send()
        }catch (error) {
            console.error('Erro ao deletar produto: ', error)
            return res.status(500).json({error: 'Erro interno no servidor'})
        }
    }
}



