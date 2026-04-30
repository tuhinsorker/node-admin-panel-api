const db = require('../config/db');

exports.getDashboardData = (callback) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM products) AS totalProducts,
      (SELECT COUNT(*) FROM products WHERE status = 'active') AS activeProducts,
      (SELECT COUNT(*) FROM products WHERE status = 'inactive') AS inactiveProducts
  `;

  db.query(sql, callback);
};
