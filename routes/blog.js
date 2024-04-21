const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const Post = require("../schema/blog"); //

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

module.exports = router;

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

module.exports = router;
