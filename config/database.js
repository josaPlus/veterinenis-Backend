const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: process.env.SSLMODE === 'REQUIRED'
        ? { rejectUnauthorized: false }
        : false
});

module.exports = connection;