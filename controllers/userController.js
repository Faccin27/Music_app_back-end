const userModel = require('../models/user');

// Obtém um usuário pelo ID
const getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Cria um novo usuário
const createUser = async (req, res) => {
  try {
    const userId = await userModel.createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Atualiza um usuário
const updateUser = async (req, res) => {
  try {
    const affectedRows = await userModel.updateUser(req.params.id, req.body);
    if (affectedRows) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getUser, createUser, updateUser };
