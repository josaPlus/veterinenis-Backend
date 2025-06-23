const mysql = require('mysql2');
require('dotenv').config();

console.log('DB Config:', {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.PASSWORD ? '***' : 'missing',
  database: process.env.DATABASE
});


const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = connection;
