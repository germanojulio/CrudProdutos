const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    console.log('HEADER RECEBIDO: ', authHeader)

    if(!authHeader) {
        console.log('Token não enviado')
        return res.status(401).json({error: 'Token não enviado'})
    }

    const [, token] = authHeader.split(' ')

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('TOKEN VÁLIDO. Usuário decodificado: ', decoded)
        req.user = decoded
        next()
    }catch (error) {
        console.log('ERRO NO JWT: ', error.message)
        return res.status(401).json({error: 'Token inválido ou expirado'})
    }
}