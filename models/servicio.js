const db = require('../config/database');

class servicios {
    //POST
    static async agregarServicio(nombre, descripcion, costo) {
        try {
            const [result] = await db.query(
                'INSERT INTO SERVICIO (nombre, descripcion, costo) VALUES (?, ?, ?)', 
                [nombre, descripcion, costo]
            );
            return { id: result.insertId, nombre, descripcion, costo };
        } catch (error) {
            throw new Error(`Error agregando el servicio: ${error.message}`);
        }
    }

    //PUT
    static async editarServicio(id, nombre, descripcion, costo) {
        try {
            const [result] = await db.query(
                'UPDATE SERVICIO SET nombre = ?, descripcion = ?, costo = ? WHERE id = ?', 
                [nombre, descripcion, costo, id]
            );
            if (result.affectedRows === 0) {
                return null; 
            }
            return { id, nombre, descripcion, costo };
        } catch (error) {
            throw new Error(`Error actualizando el servicio: ${error.message}`);
        }
    }

    //DELETE
    static async eliminarServicio(id) {
        try {
            const [result] = await db.query(
                'DELETE FROM SERVICIO WHERE id = ?', 
                [id]
            );
            return result.affectedRows > 0; 
        } catch (error) {
            throw new Error(`Error eliminando el servicio: ${error.message}`);
        }
    }

    //GET todos
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM SERVICIO'); 
            return rows;
        } catch (error) {
            throw new Error(`Error obteniendo todos los servicios: ${error.message}`);
        }
    }

    //GET por ID
    static async getById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM SERVICIO WHERE id = ?', [id]); 
            return rows[0] || null; 
        } catch (error) {
            throw new Error(`Error obteniendo el servicio con el Id: ${error.message}`);
        }
    }
}

module.exports = servicios;