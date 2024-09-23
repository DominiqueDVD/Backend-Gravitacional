const express = require('express');
const router = express.Router();
const Layer = require('../schema/layer');
const path = require('path');
const fs = require('fs');


router.get('/mesh.json', (req, res) => {
    const filePath = path.join(__dirname, '../assets/mesh.json');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', filePath);
            return res.status(404).send('File not found');
        }
        res.sendFile(filePath);
    });
});

// Ruta para obtener el archivo amesh.json
router.get('/amesh.json', (req, res) => {
    const filePath = path.join(__dirname, '../assets/Amesh.json');
    res.sendFile(filePath);
});

// Ruta para obtener todos los layers
router.get('/', async (req, res) => {
    try {
        const layers = await Layer.find();
        res.json(layers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener un layer por ID
router.get('/:id', async (req, res) => {
    try {
        const layer = await Layer.findById(req.params.id);
        if (layer == null) {
            return res.status(404).json({ message: 'Layer no encontrado' });
        }
        res.json(layer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para crear un nuevo layer
router.post('/', async (req, res) => {
    const layer = new Layer({
        vertices: req.body.vertices
    });

    try {
        const newLayer = await layer.save();
        res.status(201).json(newLayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para actualizar un layer
router.patch('/:id', async (req, res) => {
    try {
        const updatedLayer = await Layer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedLayer == null) {
            return res.status(404).json({ message: 'Layer no encontrado' });
        }
        res.json(updatedLayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar un layer
router.delete('/:id', async (req, res) => {
    try {
        const deletedLayer = await Layer.findByIdAndDelete(req.params.id);
        if (deletedLayer == null) {
            return res.status(404).json({ message: 'Layer no encontrado' });
        }
        res.json({ message: 'Layer eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para cargar los datos desde un archivo JSON
router.post('/upload', (req, res) => {
    const filePath = path.join(__dirname, '../assets/layer.json');
    
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        
        try {
            const jsonData = JSON.parse(data);
            await Layer.deleteMany({}); // Eliminar todos los documentos existentes
            await Layer.insertMany(jsonData); // Insertar los nuevos datos
            res.status(200).json({ message: 'Datos cargados exitosamente' });
        } catch (err) {
            res.status(500).json({ message: 'Error al procesar los datos' });
        }
    });
});

module.exports = router;
