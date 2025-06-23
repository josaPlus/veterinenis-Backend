const db = require('../config/database');

const Servicios = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM SERVICIO';
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = 'SELECT * FROM SERVICIO WHERE id = ?';
        db.query(sql, [id], callback);
    },

    agregarServicio: (nombre, descripcion, costo, callback) => {
        const sql = 'INSERT INTO SERVICIO (nombre, descripcion, costo) VALUES (?, ?, ?)';
        db.query(sql, [nombre, descripcion, costo], callback);
    },

    editarServicio: (id, nombre, descripcion, costo, callback) => {
        const sql = 'UPDATE SERVICIO SET nombre = ?, descripcion = ?, costo = ? WHERE id = ?';
        db.query(sql, [nombre, descripcion, costo, id], callback);
    },

    eliminarServicio: (id, callback) => {
        const sql = 'DELETE FROM SERVICIO WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Servicios;
