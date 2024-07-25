const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    coordinates: { type: Object, required: true },
    thumbnail: { type: String, required: true }
});

module.exports = mongoose.model("Project", ProjectSchema);
