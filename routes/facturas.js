const express = require('express');
const router = express.Router();
const Factura = require('../models/factura');

// obtener todas las facturas
router.get('/', (req, res) => {
    Factura.getFacturas((error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.length === 0) return res.status(404).json({ message: 'No se encontraron facturas' });
        res.status(200).json({ facturas: result });
    });
});

// Crear una nueva factura
router.post('/', (req, res) => {
    Factura.crearFactura(req.body, (error, result) => {
        if (error) return res.status(500).json({ error: error.message});
        if (!result) return res.status(404).json({ message: 'No se pudo crear la factura' });
        res.status(201).json({ message: 'Factura creada exitosamente', factura: result });
    });
});

// consultar factura por ID
router.get('/:id', (req, res) => {
    Factura.consultarFactura(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.length === 0) return res.status(404).json({ message: 'Factura no encontrada' });
        res.status(200).json({ factura: result[0] });
    })
})

// Eliminar una factura (para pruebas)
router.delete('/:id', (req, res) => {
    Factura.eliminarFactura(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Factura no encontrada o ya eliminada' });
        res.status(200).json({ message: 'Factura eliminada exitosamente' });
    });
});

module.exports = router;