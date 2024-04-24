// foro.js
const mongoose = require("mongoose");

const ForoSchema = new mongoose.Schema({
    contenido: { type: String, required: true },
    fechaPublicacion: { type: Date, default: Date.now },
    comentarios: [{
        contenido: { type: String, required: true },
        fechaComentario: { type: Date, default: Date.now },
    }]
});

module.exports = mongoose.model("Foro", ForoSchema);
