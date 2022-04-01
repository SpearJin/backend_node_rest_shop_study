const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const userController = require('../controllers/user');

router.get('/', userController.users_get_all);
router.post('/signup', userController.users_signup);
router.post('/login', userController.users_login);
router.delete('/:userId', checkAuth, userController.users_delete);

module.exports = router;
