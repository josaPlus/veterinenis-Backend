const express = require('express');
const Paciente = require('../models/paciente');

const router = express.Router();

router.get('/', async (req, res) => {
    Paciente.getAllBasicInfo((err, pacientes) => {
        if (err) {
            console.error('Error fetching basic patient info:', err);
            return res.status(500).json({ error: err.message });
        }

        if (pacientes.length === 0) {
            return res.json([]); 
        }
        const propietarioPromises = pacientes.map(paciente => {
            return new Promise((resolve, reject) => {
                Paciente.getPropietario(paciente.id_propietario, (err, propietario) => {
                    if (err) {
                        return reject(err);
                    }
                    paciente.propietario = propietario && propietario.length > 0 ? propietario[0] : null; 
                    delete paciente.id_propietario
                    resolve(paciente);
                });
            });
        });
        Promise.all(propietarioPromises)
            .then(pacientesConPropietarios => {
                res.json(pacientesConPropietarios);
            })
            .catch(error => {
                console.error('Error fetching owner info:', error);
                res.status(500).json({ error: error.message });
            });
    });
});

// Obtener un paciente por ID
router.get('/:id', async (req, res) => {
    Paciente.getById(req.params.id, (err, pacientes) => {
        if (err) {
            console.error('Error fetching patient by id:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!pacientes || pacientes.length === 0) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        const paciente = pacientes[0];
        Paciente.getPropietario(paciente.id_propietario, (err, propietario) => {
            if (err) {
                console.error('Error fetching owner info:', err);
                return res.status(500).json({ error: err.message });
            }
            paciente.propietario = propietario && propietario.length > 0 ? propietario[0] : null;
            delete paciente.id_propietario;
            res.json(paciente);
        });
    });
});

router.get('/filtrar/:nombre', async (req, res) => {
    Paciente.filtrar(req.params.nombre, (err, pacientes) => {
        if (err) {
            console.error('Error filtering patients:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!pacientes || pacientes.length === 0) {
            return res.json([]);
        }
        const propietarioPromises = pacientes.map(paciente => {
            return new Promise((resolve, reject) => {
                Paciente.getPropietario(paciente.id_propietario, (err, propietario) => {
                    if (err) {
                        return reject(err);
                    }
                    paciente.propietario = propietario && propietario.length > 0 ? propietario[0] : null;
                    delete paciente.id_propietario;
                    paciente.nombre = paciente.nombre;
                    resolve(paciente);
                });
            });
        });
        Promise.all(propietarioPromises)
            .then(pacientesConPropietarios => {
                res.json(pacientesConPropietarios);
            })
            .catch(error => {
                console.error('Error fetching owner info:', error);
                res.status(500).json({ error: error.message });
            });
    });
});

router.get('/citas/:id', async (req, res) => {
    Paciente.getCitas(req.params.id, (err, citas) => {
        if (err) {
            console.error('Error fetching citas by id:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!citas || citas.length === 0) {
            return res.json([]);
        }
        res.json(citas)
    });
});

router.get('/vacunas/:id', async (req, res) => {
    Paciente.getVacunas(req.params.id, (err, vacunas) => {
        if (err) {
            console.error('Error fetching vacunas by id:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!vacunas || vacunas.length === 0) {
            return res.json([]);
        }
        res.json(vacunas)
    });
});

// Crear un nuevo paciente
router.post('/', async (req, res) => {
    Paciente.create(req.body, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result) return res.status(404).json({ message: 'No se pudo agregar el paciente' });
        res.status(201).json({ message: 'Paciente agregado exitosamente', paciente: result });
    });
});

// Actualizar un paciente
router.put('/:id', async (req, res) => {
    Paciente.update(req.params.id, req.body, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result) return res.status(404).json({ message: 'Paciente no encontrado o no se pudo editar' });
        res.status(200).json({ message: 'Paciente editado exitosamente', paciente: result });
    });
});

// Eliminar un paciente
router.delete('/:id', async (req, res) => {
    Paciente.delete(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Paciente no encontrado o ya eliminado' });
        res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    });
});

module.exports = router;