const express = require("express");
const Project = require("../schema/project");
const router = express.Router();

// Ruta para obtener un proyecto por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Buscando proyecto con ID " + id);
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        console.log("Status 200, encontrado proyecto con ID " + id)
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el proyecto" });
    }
});

// Rutas GET para obtener los nuevos elementos del proyecto

// Obtener 'lineas' de un proyecto por ID
router.get("/:id/lineas", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.lineas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'lineas' del proyecto" });
    }
});

// Obtener 'malla' de un proyecto por ID
router.get("/:id/malla", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.malla);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'malla' del proyecto" });
    }
});

// Obtener 'mallas' de un proyecto por ID
router.get("/:id/mallas", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.mallas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'mallas' del proyecto" });
    }
});

// Obtener 'lineasdat' de un proyecto por ID
router.get("/:id/lineasdat", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.lineasdat);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'lineasdat' del proyecto" });
    }
});

// Obtener 'malladat' de un proyecto por ID
router.get("/:id/malladat", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.malladat);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'malladat' del proyecto" });
    }
});

// Obtener 'mallasdat' de un proyecto por ID
router.get("/:id/mallasdat", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.mallasdat);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'mallasdat' del proyecto" });
    }
});

// Obtener 'arJson' de un proyecto por ID
router.get("/:id/arjson", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.arJson);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'arJson' del proyecto" });
    }
});

// Obtener 'genJson' de un proyecto por ID
router.get("/:id/genjson", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.genJson);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'genJson' del proyecto" });
    }
});

// Obtener 'lineasJson' de un proyecto por ID
router.get("/:id/lineasjson", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(project.lineasJson);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener 'lineasJson' del proyecto" });
    }
});

// Ruta para obtener todos los proyectos
router.get("/", async (req, res) => {
    console.log("Obteniendo proyectos...");
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los proyectos" });
    }
});

// Ruta para crear un nuevo proyecto
router.post("/", async (req, res) => {
    const {  
        // ID,
        name,
        description,
        userId,
        coordinates,
        coordinatesCenter,
        thumbnail,
        lineas,
        malla,
        laderas,
        climatic,
        suelos,
        matriz,
        arJson,
        genJson,
        lineasJson} = req.body;
    try {
        const newProject = new Project({
            // ID,
            name,
            description,
            userId,
            coordinates,
            coordinatesCenter,
            thumbnail,
            lineas,
            malla,
            laderas,
            climatic,
            suelos,
            matriz,
            arJson,
            genJson,
            lineasJson
        });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear el proyecto" });
    }
});

// Ruta para actualizar un proyecto
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { projectName, projectDescription, soils, matrix } = req.body;// revisar actualización de proyecto
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el proyecto" });
    }
});

// Ruta para eliminar un proyecto
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json({ message: "Proyecto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el proyecto" });
    }
});

module.exports = router;
