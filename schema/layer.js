const mongoose = require('mongoose');

const layerSchema = new mongoose.Schema({
    vertices: {
        type: [[Number]], 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Layer', layerSchema);
