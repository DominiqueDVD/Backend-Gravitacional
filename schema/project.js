const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    coordinates: { type: Object, required: true },
    thumbnail: { type: String, required: true },
    lineas: { type: Object, required: false },
    malla: { type: Object, required: false },
    mallas: { type: Object, required: false },
    lineasdat: { type: Object, required: false },
    malladat: { type: Object, required: false },
    mallasdat: { type: Object, required: false }
});

module.exports = mongoose.model("Project", ProjectSchema);
