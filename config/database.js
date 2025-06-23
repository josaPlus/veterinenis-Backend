const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host || 'localhost',
    user: process.env.db_user || 'root',
    password: process.env.password || '',
    database: process.env.database || 'test',
    port: process.env.port || 25060
});

module.exports = connection;