const express = require('express');
const router = express.Router();
const rhino3dm = require('rhino3dm');

// Lógica para manejar las solicitudes a Rhino Compute
router.post('/compute', async (req, res) => {
    const rhino = await rhino3dm();

    // Extraer los datos de la solicitud
    const { values } = req.body;
    const meshData = values[0].InnerTree["{0}"][0].data;

    console.log(values[0].data)

    // Decodificar el archivo 3DM desde el string base64
    const buffer = Buffer.from(meshData, 'base64');
    const fileBuffer = new Uint8Array(buffer);
    const doc = rhino.File3dm.fromByteArray(fileBuffer);

    // Enviar el archivo en la respuesta
    console.log(doc)
    res.json({ file: doc });
});

module.exports = router;
