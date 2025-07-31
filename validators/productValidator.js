const yup = require('yup')

const produtSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    price: yup.number().positive('Preço deve ser positivo').required('Preço é obrigatório'),
})

module.exports = produtSchema