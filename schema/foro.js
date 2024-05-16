const mongoose = require("mongoose");

const ForoSchema = new mongoose.Schema({
    contenido: { type: String, required: true },
    fechaPublicacion: { type: Date, default: Date.now },
    tipo: { type: String, enum: ["pregunta", "comentario"], default: "pregunta" }, // Agregar el campo tipo
    comentarios: [{
        contenido: { type: String, required: true },
        fechaComentario: { type: Date, default: Date.now },
    }]
});

module.exports = mongoose.model("Foro", ForoSchema);
