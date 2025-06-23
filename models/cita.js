const db = require('../config/database');

const Cita = {

  getAllBasic: (cb) => {
    db.query('SELECT * FROM CITAS', cb);
  },
  getByIdBasic: (id, cb) => {
    db.query('SELECT * FROM CITAS WHERE id = ?', [id], cb);
  },

  getPaciente: (id_paciente, cb) => {
    db.query('SELECT * FROM PACIENTE WHERE id = ?', [id_paciente], cb);
  },
  getVeterinario: (id_veterinario, cb) => {
    db.query('SELECT * FROM USUARIO WHERE id = ?', [id_veterinario], cb);
  },
  getProductos: (id_cita, cb) => {
    const sql = `
      SELECT p.id, p.nombre, p.gramaje, p.precio, p.tipo, p.fecha_vencimiento, p.disponibilidad,
             cp.cantidad
      FROM CITA_PRODUCTO cp
      JOIN PRODUCTO p ON p.id = cp.id_producto
      WHERE cp.id_cita = ?
    `;
    db.query(sql, [id_cita], cb);
  },
  getServicios: (id_cita, cb) => {
    const sql = `
      SELECT s.id, s.nombre, s.descripcion, s.costo
      FROM CITA_SERVICIO cs
      JOIN SERVICIO s ON s.id = cs.id_servicio
      WHERE cs.id_cita = ?
    `;
    db.query(sql, [id_cita], cb);
  },
  getObservaciones: (id_cita, cb) => {
    const sql = `
      SELECT observaciones_relacion
      FROM PACIENTE_CITA
      WHERE id_cita = ?
      LIMIT 1
    `;
    db.query(sql, [id_cita], cb);
  },

  create: (
    { fecha_cita, motivo, detalles = null, peso = null, id_paciente, id_veterinario },
    callback
  ) => {
    const query = `
        INSERT INTO CITAS
          (fecha_cita, motivo, detalles, peso, fecha_creacion, status, id_paciente, id_veterinario)
        VALUES
          (?, ?, ?, ?, NOW(), 'pendiente', ?, ?)
      `;
    db.query(
      query,
      [fecha_cita, motivo, detalles, peso, id_paciente, id_veterinario],
      callback
    );
  },

  update: (
    id,
    { fecha_cita, motivo, detalles = null, peso = null, status, id_paciente, id_veterinario },
    callback
  ) => {
    const query = `
        UPDATE CITAS
        SET
          fecha_cita     = ?,
          motivo         = ?,
          detalles       = ?,
          peso           = ?,
          status         = ?,
          id_paciente    = ?,
          id_veterinario = ?
        WHERE id = ?
      `;
    db.query(
      query,
      [fecha_cita, motivo, detalles, peso, status, id_paciente, id_veterinario, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(
      `UPDATE CITAS
        SET status = 'cancelada'
        WHERE id = ?`,
      [id],
      callback
    );
  }



};

module.exports = Cita;