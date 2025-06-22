const db = require('../config/database');

const Producto = {
    getProductos: (callback) => {
        const sql = `SELECT * FROM PRODUCTO`;
        db.query(sql, callback);
    },

    agregarProducto: (producto, callback) => {
        const sql = `
            INSERT INTO PRODUCTO (nombre, gramaje, precio, tipo, fecha_vencimiento, disponibilidad)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            producto.nombre,
            producto.gramaje,
            producto.precio,
            producto.tipo,
            producto.fecha_vencimiento,
            producto.disponibilidad
        ];
        db.query(sql, valores, callback);
    },

    editarProducto: (id, producto, callback) => {
        const sql = `
            UPDATE PRODUCTO 
            SET nombre = ?, gramaje = ?, precio = ?, tipo = ?, fecha_vencimiento = ?, disponibilidad = ?
            WHERE id = ?
        `;
        const valores = [
            producto.nombre,
            producto.gramaje,
            producto.precio,
            producto.tipo,
            producto.fecha_vencimiento,
            producto.disponibilidad,
            id
        ];
        db.query(sql, valores, callback);
    },

    eliminarProducto: (id, callback) => {
        const sql = `DELETE FROM PRODUCTO WHERE id = ?`;
        db.query(sql, [id], callback);
    },


    filtrarProductoPorNombre: (nombre, callback) => {
        const sql = `SELECT * FROM PRODUCTO WHERE nombre LIKE ?`;
        db.query(sql, [`%${nombre}%`], callback);
    }
};

module.exports = Producto;
