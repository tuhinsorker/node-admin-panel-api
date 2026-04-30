const db = require('../config/db');

exports.getReport = (from, to, callback)=>{
    const sql = `
        SELECT 
        COUNT(*) AS totalProducts,
        SUM(CASE WHEN status='1' THEN 1 ELSE 0 END) AS activeProducts,
        SUM(CASE WHEN status='0' THEN 1 ELSE 0 END) AS inactiveProducts
        FROM products
        WHERE created_at BETWEEN ? AND ?
    `;
    db.query(sql, [from, to], callback);
};
