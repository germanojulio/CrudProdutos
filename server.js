require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api', productRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})