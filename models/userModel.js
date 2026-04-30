const db = require('../config/db');

exports.createUser = (data, callback) => {
  const sql = 'INSERT INTO users (name, email, password, status, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, data, callback);
};

exports.findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email=?', [email], callback);
};

exports.allUsers = (callback) => {
  db.query('SELECT id, name, email, status FROM users', callback);
};

exports.updateUser = (data, callback) => {
  const sql = 'UPDATE users SET name=?, email=?, status=? WHERE id=?';
  db.query(sql, data, callback);
}