const jwt = require('jsonwebtoken')

module.exports = {
    async login(req, res) {
        const {email, password} = req.body

        const fixedUser = {
            email: 'admin@b4you.dev',
            password: '123456'
        }

        if (email !== fixedUser.email || password !== fixedUser.password) {
            return res.status(401).json({error: 'E-mail ou senha inválidos'})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'})

        return res.json({token})
    }
}