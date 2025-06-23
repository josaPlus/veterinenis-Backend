const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Obtener todos los productos
router.get('/', (req, res) => {
    Producto.getProductos((error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.length === 0) return res.status(404).json({ message: 'No se encontraron productos' });
        res.status(200).json({ productos: result });
    });
});

// buscar por id
router.get('/:id', (req, res) => {
    Producto.buscarProductoPorId(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ producto: result[0] });
    });
})

// Crear una nueva factura
router.post('/', async (req, res) => {
    Producto.agregarProducto(req.body, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result) return res.status(404).json({ message: 'No se pudo agregar el producto' });
        res.status(201).json({ message: 'Producto agregado exitosamente', producto: result });
    });
});

// Editar un producto
router.put('/:id', (req, res) => {
    Producto.editarProducto(req.params.id, req.body, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result) return res.status(404).json({ message: 'Producto no encontrado o no se pudo editar' });
        res.status(200).json({ message: 'Producto editado exitosamente', producto: result });
    });
});

// filtrar productos por nombre
router.get('/filtrar/:nombre', (req, res) => {
    Producto.filtrarProductoPorNombre(req.params.nombre, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.length === 0) return res.status(404).json({ message: 'No se encontraron productos con ese nombre' });
        res.status(200).json({ productos: result });
    });
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    Producto.eliminarProducto(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado o ya eliminado' });
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    });
});

module.exports = router;