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
    const { contenido, tipo } = req.body;
    try {
        const nuevoAporte = new Foro({ contenido, tipo });
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

// Actualizar un aporte del foro
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { contenido, tipo } = req.body;
    try {
        const aporteActualizado = await Foro.findByIdAndUpdate(
            id,
            { contenido, tipo },
            { new: true, runValidators: true }
        );
        if (!aporteActualizado) {
            return res.status(404).json({ error: "Aporte no encontrado" });
        }
        res.status(200).json(aporteActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el aporte del foro" });
    }
});

// Eliminar un aporte del foro
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const aporteEliminado = await Foro.findByIdAndDelete(id);
        if (!aporteEliminado) {
            return res.status(404).json({ error: "Aporte no encontrado" });
        }
        res.status(200).json({ message: "Aporte eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el aporte del foro" });
    }
});

// Actualizar un comentario de un aporte
router.put("/:id/comentarios/:comentarioId", async (req, res) => {
    const { id, comentarioId } = req.params;
    const { contenido } = req.body;
    try {
        const aporte = await Foro.findById(id);
        if (!aporte) {
            return res.status(404).json({ error: "Aporte no encontrado" });
        }
        const comentario = aporte.comentarios.id(comentarioId);
        if (!comentario) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        comentario.contenido = contenido;
        await aporte.save();
        res.status(200).json(aporte);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el comentario" });
    }
});

// Eliminar un comentario de un aporte
router.delete("/:id/comentarios/:comentarioId", async (req, res) => {
    const { id, comentarioId } = req.params;
    try {
        const aporte = await Foro.findById(id);
        if (!aporte) {
            return res.status(404).json({ error: "Aporte no encontrado" });
        }
        const comentario = aporte.comentarios.id(comentarioId);
        if (!comentario) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        comentario.remove();
        await aporte.save();
        res.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el comentario" });
    }
});

module.exports = router;
