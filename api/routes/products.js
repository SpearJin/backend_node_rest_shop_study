const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const productController = require('../controllers/product');

router.get('/', checkAuth, productController.products_get_all);
router.post('/', checkAuth, productController.products_create_product);
router.put('/:productId', checkAuth, productController.products_update);
router.delete('/:productId', checkAuth, productController.produts_delete);
router.get('/:productId', checkAuth, productController.products_get_serach);

module.exports = router;
