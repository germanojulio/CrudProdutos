const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)

router.get('/products', ProductController.index)
router.post('/products', ProductController.create)
router.get('/products/:id', ProductController.show)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)

module.exports = router