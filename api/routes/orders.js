const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const orderController = require('../controllers/order');

router.get('/', checkAuth, orderController.orders_get_all);
router.post('/', checkAuth, orderController.orders_create_order);
router.put('/:productId', checkAuth, orderController.orders_update);
router.delete('/:productId', checkAuth, orderController.orders_delete);
router.get('/:productId', checkAuth, orderController.orders_get_serach);

module.exports = router;
