const db = require('../db');

const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const createUser = async (user) => {
  const [result] = await db.query(
    'INSERT INTO users (spotify_id, display_name, email, access_token, refresh_token, profile_image) VALUES (?, ?, ?, ?, ?, ?)',
    [user.spotify_id, user.display_name, user.email, user.access_token, user.refresh_token, user.profile_image]
  );
  return result.insertId;
};

// Função para atualizar um usuário
const updateUser = async (id, updates) => {
  const [result] = await db.query(
    'UPDATE users SET ? WHERE id = ?',
    [updates, id]
  );
  return result.affectedRows;
};

module.exports = { getUserById, createUser, updateUser };
