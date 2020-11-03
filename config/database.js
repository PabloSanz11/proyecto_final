const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b5bb920c4d74d4',
    password: '7b5379b9',
    database: 'heroku_2eb4075a39b1458'
});

pool.query = util.promisify(pool.query);
module.exports = pool;