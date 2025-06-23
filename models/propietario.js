const db = require('../config/database');

// Modelo Propietario
const Propietario = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM PROPIETARIO';
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = 'SELECT * FROM PROPIETARIO WHERE id = ?';
        db.query(sql, [id], callback);
    },

    filter: (nombre, callback) => {
        const sql = "SELECT * FROM PROPIETARIO PR WHERE CONCAT(PR.nombre,' ', PR.apellidos) LIKE ? LIMIT 0, 1000;";
        db.query(sql,  [`${nombre}%`], callback);
    },

    create: (data, callback) => {
        const hoy = new Date().toISOString().slice(0, 10); 
        const sql = 'INSERT INTO PROPIETARIO (nombre, apellidos, email, num_telefono, direccion, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [data.nombre, data.apellidos, data.email, data.num_telefono, data.direccion, hoy], callback);
    },

    update: (id, data, callback) => {
        const sql = 'UPDATE PROPIETARIO SET nombre = ?, apellidos = ?, email = ?, num_telefono = ?, direccion = ? WHERE id = ?';
        db.query(sql, [data.nombre, data.apellidos, data.email, data.num_telefono, data.direccion, id], callback);
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM PROPIETARIO WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Propietario;