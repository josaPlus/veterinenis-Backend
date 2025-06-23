const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.post('/', (req, res) => {
    console.log('>>> body:', req.body);
  Usuario.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
});

router.post('/login', (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  if (!nombre_usuario || !contrasena) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  Usuario.login(nombre_usuario, contrasena, (err, success, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!success) return res.status(401).json({ success: false });
    res.json({ success: true, usuario: user });
  });
});

router.put('/:id', (req, res) => {
  Usuario.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario modificado correctamente' });
  });
});

module.exports = router;
