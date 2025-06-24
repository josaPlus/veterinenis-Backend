const db = require('../config/database');

const Usuario = {
  create: ({ nombre_usuario, contrasena, rol, nombre_pila }, callback) => {
    const sql = `
      INSERT INTO USUARIO
        (nombre_usuario, contrasena, rol, fecha_creacion, nombre_pila)
      VALUES
        (?, ?, ?, ?, NOW())
    `;
    db.query(sql, [nombre_usuario, contrasena, rol, nombre_pila], callback);
  },

  login: (nombre_usuario, contrasena, callback) => {
    const sql = `
      SELECT id, nombre_usuario, rol, fecha_creacion, nombre_pila
      FROM USUARIO
      WHERE nombre_usuario = ? AND contrasena = ?
      LIMIT 1
    `;
    db.query(sql, [nombre_usuario, contrasena], (err, results) => {
      if (err) return callback(err);
      const success = results.length === 1;
      callback(null, success, results[0] || null);
    });
  },

  update: (id, { nombre_usuario, contrasena, rol }, callback) => {
    const sql = `
      UPDATE USUARIO
      SET nombre_usuario = ?, contrasena = ?, rol = ?
      WHERE id = ?
    `;
    db.query(sql, [nombre_usuario, contrasena, rol, id], callback);
  },

  getAll: (callback) => {
    const sql = `
      SELECT id, nombre_usuario, rol, fecha_creacion, nombre_pila
      FROM USUARIO
    `;
    db.query(sql, callback);
  }
};

module.exports = Usuario;