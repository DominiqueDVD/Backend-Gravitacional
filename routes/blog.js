const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const Post = require("../schema/blog");

const router = express.Router();

// Ruta para obtener todos los posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los posts" });
    }
});

// Crear un nuevo post
router.post("/", async (req, res) => {
    const { title, content, image } = req.body;
    try {
        const newPost = new Post({ title, content, image });
        await newPost.save();
        res.status(201).json(jsonResponse(201, newPost));
    } catch (error) {
        res.status(500).json(jsonResponse(500, { error: "Error al crear el post" }));
    }
});

// Actualizar un post
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, image } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, image },
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json(jsonResponse(404, { error: "Post no encontrado" }));
        }
        res.status(200).json(jsonResponse(200, updatedPost));
    } catch (error) {
        res.status(500).json(jsonResponse(500, { error: "Error al actualizar el post" }));
    }
});

// Eliminar un post
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json(jsonResponse(404, { error: "Post no encontrado" }));
        }
        res.status(200).json(jsonResponse(200, { message: "Post eliminado exitosamente" }));
    } catch (error) {
        res.status(500).json(jsonResponse(500, { error: "Error al eliminar el post" }));
    }
});

module.exports = router;
