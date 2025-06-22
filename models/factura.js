const db = require('../config/database');

const Factura = {
    crearFactura: async (dato, callback) => {
        const sql = `
            INSERT INTO FACTURA (costo_total, fecha_creacion, metodo_pago, id_cita, id_paciente) 
            VALUES
            (?, ?, ?, ? ,?)
        `;
        const valores = [
            dato.costo_total,
            dato.fecha_creacion,
            dato.metodo_pago,
            dato.id_cita,
            dato.id_paciente
        ];
        db.query(sql, valores, callback);
    },

    consultarFactura: (id, callback) => {
        const sql = `
            SELECT * FROM FACTURA WHERE id = ?
        `;
        db.query(sql, [id], callback);
    },
    // eliminar para pruebas
    eliminarFactura: (id, callback) => {
        const sql = `
            DELETE FROM FACTURA WHERE id = ?
        `;
        db.query(sql, [id], callback);
    },
}

module.exports = Factura;