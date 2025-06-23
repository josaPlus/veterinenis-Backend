require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/citas', require('./routes/citas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/pacientes', require('./routes/pacientes'))
app.use('/api/propietarios', require('./routes/propietarios'))
app.use('/api/facturas', require('./routes/facturas'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/servicios', require('./routes/servicios'));


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