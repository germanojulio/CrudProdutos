const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({error: 'Token não enviado'})
    }

    const [, token] = authHeader.split(' ')

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch (error) {
        return res.status(401).json({error: 'Token inválido ou expirado'})
    }
}