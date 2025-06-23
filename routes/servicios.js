const express = require('express');
const router = express.Router();
const Servicio = require('../models/servicio');

// POST
router.post('/api/servicios', async (req, res) => {
    const { nombre, descripcion, costo } = req.body;
    if (!nombre || !descripcion || costo === undefined) {
        return res.status(400).json({ message: 'El nombre, la descripción y el costo son requeridos' });
    }
    try {
        const nuevoServicio = await Servicio.agregarServicio(nombre, descripcion, costo);
        res.status(201).json(nuevoServicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET
router.get('/api/servicios', async (req, res) => {
    try {
        const servicios = await Servicio.getAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET por ID
router.get('/api/servicios/:id', async (req, res) => {
    try {
        const servicio = await Servicio.getById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT
router.put('/api/servicios/:id', async (req, res) => {
    const { nombre, descripcion, costo } = req.body;
    if (!nombre || !descripcion || costo === undefined) {
        return res.status(400).json({ message: 'El nombre, la descripción y el costo son requeridos' });
    }
    try {
        const actualizado = await Servicio.editarServicio(req.params.id, nombre, descripcion, costo);
        if (!actualizado) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
router.delete('/api/servicios/:id', async (req, res) => {
    try {
        const eliminado = await Servicio.eliminarServicio(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;