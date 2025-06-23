const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');

router.get('/', (req, res) => {
  Cita.getAllBasic((err, citas) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!citas.length) return res.json([]);

    const tareas = citas.map(cita => {
      return new Promise((resolve, reject) => {

        Cita.getPaciente(cita.id_paciente, (err, pacRows) => {
          if (err) return reject(err);
          cita.paciente = pacRows[0] || null;
          delete cita.id_paciente;

          Cita.getVeterinario(cita.id_veterinario, (err, vetRows) => {
            if (err) return reject(err);
            cita.veterinario = vetRows[0] || null;
            delete cita.id_veterinario;

            Cita.getProductos(cita.id, (err, prods) => {
              if (err) return reject(err);
              cita.medicamentos = prods;

              Cita.getServicios(cita.id, (err, servs) => {
                if (err) return reject(err);
                cita.servicios = servs;

                Cita.getObservaciones(cita.id, (err, obsRows) => {
                  if (err) return reject(err);
                  cita.observaciones_relacion = obsRows[0]?.observaciones_relacion || null;
                  resolve(cita);
                });
              });
            });
          });
        });
      });
    });

    Promise.all(tareas)
      .then(citasCompletas => res.json(citasCompletas))
      .catch(error => res.status(500).json({ error: error.message }));
  });
});

router.get('/:id', (req, res) => {
  Cita.getByIdBasic(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(404).json({ message: 'Cita no encontrada' });
    const cita = rows[0];
    
    Cita.getPaciente(cita.id_paciente, (err, pacRows) => {
      if (err) return res.status(500).json({ error: err.message });
      cita.paciente = pacRows[0] || null;
      delete cita.id_paciente;

      Cita.getVeterinario(cita.id_veterinario, (err, vetRows) => {
        if (err) return res.status(500).json({ error: err.message });
        cita.veterinario = vetRows[0] || null;
        delete cita.id_veterinario;

        Cita.getProductos(cita.id, (err, prods) => {
          if (err) return res.status(500).json({ error: err.message });
          cita.medicamentos = prods;

          Cita.getServicios(cita.id, (err, servs) => {
            if (err) return res.status(500).json({ error: err.message });
            cita.servicios = servs;

            Cita.getObservaciones(cita.id, (err, obsRows) => {
              if (err) return res.status(500).json({ error: err.message });
              cita.observaciones_relacion = obsRows[0]?.observaciones_relacion || null;
              res.json(cita);
            });
          });
        });
      });
    });
  });
});

router.post('/porFecha', (req, res) => {
  const { fecha } = req.body;

  if (!fecha) {
    return res.status(400).json({ error: 'Falta el campo "fecha" en el cuerpo de la solicitud' });
  }

  Cita.getByFecha(fecha, (err, citas) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(citas);
  });
});


router.post('/', (req, res) => {
  Cita.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: result.insertId,
      fecha_cita: req.body.fecha_cita,
      motivo: req.body.motivo,
      detalles: req.body.detalles || null,
      peso: req.body.peso || null,
      status: 'pendiente',
      id_paciente: req.body.id_paciente,
      id_veterinario: req.body.id_veterinario
    });
  });
});

router.put('/:id', (req, res) => {
  Cita.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Cita no encontrada' });
    res.json({ message: 'Cita actualizada correctamente' });
  });
});

router.delete('/:id', (req, res) => {
  Cita.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Cita no encontrada' });
    res.json({ message: 'Cita cancelada correctamente' });
  });
});

module.exports = router;