require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// rutas
app.use('/api/facturas', require('./routes/facturas'));
app.use('/api/productos', require('./routes/productos'));

// conexion database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});