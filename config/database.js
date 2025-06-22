const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host || 'localhost',
    user: process.env.username || 'root',
    password: process.env.password || '',
    database: process.env.database || 'test',
});

module.exports = connection;