const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// obter um usuário pelo ID
router.get('/user/:id', userController.getUser);
// criar
router.post('/user', userController.createUser);
// att
router.put('/user/:id', userController.updateUser);

module.exports = router;
