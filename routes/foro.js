// foroRoutes.js
const express = require("express");
const router = express.Router();
const Foro = require("../schema/foro");

// Obtener todos los aportes al foro
router.get("/", async (req, res) => {
    try {
        const aportes = await Foro.find();
        res.status(200).json(aportes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los aportes del foro" });
    }
});

// Crear un nuevo aporte al foro
router.post("/", async (req, res) => {
    const { contenido } = req.body;
    try {
        const nuevoAporte = new Foro({ contenido });
        await nuevoAporte.save();
        res.status(201).json(nuevoAporte);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el aporte al foro" });
    }
});

// Agregar un comentario a un aporte al foro
router.post("/:id/comentarios", async (req, res) => {
    const { id } = req.params;
    const { contenido } = req.body;
    try {
        const aporte = await Foro.findById(id);
        if (!aporte) {
            return res.status(404).json({ error: "Aporte no encontrado" });
        }
        aporte.comentarios.push({ contenido });
        await aporte.save();
        res.status(201).json(aporte);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el comentario" });
    }
});

module.exports = router;
