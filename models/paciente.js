const db = require('../config/database');

const Paciente = {
  getAllBasicInfo: (callback) => {
    db.query('SELECT * FROM PACIENTE', callback);
  },

  getPropietario: (id, callback) => {
    db.query('SELECT * FROM PROPIETARIO WHERE id = ?', [id], callback);
  },
  
  getCitas: (id, callback) => {
    db.query('SELECT C.id AS cita_id, C.fecha_cita, C.motivo, C.status, U.nombre_usuario AS veterinario FROM CITAS C JOIN PACIENTE P ON C.id_paciente = P.id JOIN USUARIO U ON C.id_veterinario = U.id WHERE P.id = ? ORDER BY C.fecha_cita DESC;', [id], callback)
  },

  getVacunas: (id, callback) => {
    db.query('SELECT PV.nombre_vacuna, PV.fecha_aplicacion, PV.proxima_dosis FROM PACIENTE_VACUNA PV JOIN PACIENTE P ON PV.id_paciente = P.id WHERE P.id = ?;', [id], callback)
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM PACIENTE WHERE id = ?', [id], callback);
  },
  
  filtrar: (nombre, callback) => {
    const sql = "SELECT * FROM PACIENTE P WHERE P.nombre LIKE ? LIMIT 0, 1000;"
    db.query(
        sql,
        [`%${nombre}%`],
        callback
    );
  },
  
  create: (paciente, callback) => {
    const values=[
      paciente.nombre, 
      paciente.especie,
      paciente.sexo,
      paciente.fecha_nacimiento, 
      paciente.raza, 
      paciente.padecimientos,
      paciente.intervenciones,
      paciente.foto_perfil, 
      paciente.id_propietario
    ];
    db.query('INSERT INTO PACIENTE (nombre, especie, sexo, fecha_nacimiento, raza, padecimientos, intervenciones, foto_perfil, id_propietario) VALUES (?,?,?,?,?,?,?)', values, callback);
  },
  
  update: (id, paciente, callback) => {
    const values=[
      paciente.nombre, 
      paciente.especie,
      paciente.sexo,
      paciente.fecha_nacimiento, 
      paciente.raza, 
      paciente.padecimientos,
      paciente.intervenciones,
      paciente.foto_perfil, 
      paciente.id_propietario,
      id
    ];
    db.query('UPDATE PACIENTE SET nombre = ?, especie = ?, sexo = ?, fecha_nacimiento = ?, raza = ?, padecimientos = ?, intervenciones = ?, foto_perfil = ?, id_propietario = ? WHERE id = ?', values, callback);
  },
  
  delete: (id, callback) => {
    db.query('DELETE FROM PACIENTE WHERE id = ?', [id], callback);
  }
};

module.exports = Paciente;