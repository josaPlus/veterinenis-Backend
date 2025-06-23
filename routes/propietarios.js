const express = require('express');
const Propietario = require('../models/propietario');

const router = express.Router();

router.get('/', async (req, res) => {
    Propietario.getAll((err, propietarios) => {
        if (err) {
            console.error('Error fetching propietarios:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(propietarios);
    });
});

// Obtener un propietario por ID
router.get('/:id', async (req, res) => {
    Propietario.getById(req.params.id, (err, propietarios) => {
       if (err) {
            console.error('Error fetching propietario by id:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!propietarios || propietarios.length === 0) {
            return res.status(404).json({ error: 'Propietario no encontrado' });
        }
        res.json(propietarios[0]);
    });
});

router.get('/filtrar/:nombre', async (req, res) => {
    Propietario.filter(req.params.nombre, (err, propietarios) => {
        if (err) {
            console.error('Error filtering owners:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!propietarios || propietarios.length === 0) {
            return res.json([]);
        }
        res.json(propietarios)
    });
});

router.post('/', async (req, res) => {
    Propietario.create(req.body, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result) return res.status(404).json({ message: 'No se pudo agregar el propietario' });
        res.status(201).json({ message: 'Propietario agregado exitosamente', propietario: result });
    });
});

// Actualizar un propietario
router.put('/:id', async (req, res) => {
    Propietario.update(req.params.id, req.body, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result) return res.status(404).json({ message: 'propietario no encontrado o no se pudo editar' });
        res.status(200).json({ message: 'propietario editado exitosamente', propietario: result });
    });
});

// Eliminar un propietario
router.delete('/:id', async (req, res) => {
    Propietario.delete(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'propietario no encontrado o ya eliminado' });
        res.status(200).json({ message: 'propietario eliminado exitosamente' });
    });
});

module.exports = router;