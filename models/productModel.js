const db = require('../config/db');

exports.createProduct = (data, callback) => {
  const sql = 'INSERT INTO products (name, price, status, image) VALUES (?, ?, ?, ?)';
  db.query(sql, data, callback);
};

exports.findProductById = (id, callback) => {
  db.query('SELECT * FROM products WHERE id=?', [id], callback);
};

exports.allProducts = ({page, limit, offset, search, statusFilter},callback) => {
  let sql = 'SELECT id, name, price, status FROM products WHERE 1=1';
  const params = [];

  if (search) {
    sql += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }

  if (statusFilter) {
    sql += ' AND status = ?';
    params.push(statusFilter);
  }

  sql += ' LIMIT ?, ?';
  params.push(offset, limit);
  db.query(sql, params, callback);

};

exports.updateProduct = (data, callback) => {
  const sql = 'UPDATE products SET name=?,  price=?, status=?, image=? WHERE id=?';
  db.query(sql, data, callback);
}

exports.deleteProduct = (id, callback) => {
  db.query('DELETE FROM products WHERE id=?', [id], callback);
};