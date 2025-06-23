const express = require('express');
const router = express.Router();
const Servicio = require('../models/servicio');

//GET
router.get('/', (req, res) => {
    Servicio.getAll((error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.length === 0) return res.status(404).json({ message: 'No se encontraron servicios' });
        res.status(200).json({ servicios: result });
    });
});

//GET por Id
router.get('/:id', (req, res) => {
    Servicio.getById(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.length === 0) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(200).json({ servicio: result[0] });
    });
});

//POST
router.post('/', (req, res) => {
    const { nombre, descripcion, costo } = req.body;
    if (!nombre || !descripcion || costo === undefined) {
        return res.status(400).json({ message: 'El nombre, la descripción y el costo son requeridos' });
    }

    Servicio.agregarServicio(nombre, descripcion, costo, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json({ message: 'Servicio creado exitosamente', servicio: { id: result.insertId, nombre, descripcion, costo } });
    });
});

//PUT
router.put('/:id', (req, res) => {
    const { nombre, descripcion, costo } = req.body;
    if (!nombre || !descripcion || costo === undefined) {
        return res.status(400).json({ message: 'El nombre, la descripción y el costo son requeridos' });
    }

    Servicio.editarServicio(req.params.id, nombre, descripcion, costo, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(200).json({ message: 'Servicio actualizado exitosamente', servicio: { id: req.params.id, nombre, descripcion, costo } });
    });
});

//DELETE
router.delete('/:id', (req, res) => {
    Servicio.eliminarServicio(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Servicio no encontrado o ya eliminado' });
        res.status(200).json({ message: 'Servicio eliminado exitosamente' });
    });
});

module.exports = router;
