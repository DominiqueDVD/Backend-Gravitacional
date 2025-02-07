const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    // _id: {type: String, required: false},
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    coordinates: { type: Object, required: true },
    coordinatesCenter: { type: Object, required: true},
    thumbnail: { type: String, required: true },
    lineas: { type: Object, required: false },
    malla: { type: Object, required: false },
    laderas: { type: Object, required: false },
    suelos: { type: Object, required: false },
    matriz: { type: Object, required: false },
    arJson: { type: Object, required: false },
    genJson: { type: Object, required: false },
    lineasJson: { type: Object, required: false }
});

module.exports = mongoose.model("Project", ProjectSchema);
