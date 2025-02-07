const express = require('express');
const router = express.Router();
const rhino3dm = require('rhino3dm');

// Lógica para manejar las solicitudes a Rhino Compute
router.post('/compute', async (req, res) => {
    console.log("Compute")
    console.log(req.body)
    try {
        // Verifica si los datos necesarios están presentes
        
        const rhino = await rhino3dm();

        let values = req.body.values

        console.log(`Values: ${values}`)
        if (!values) {
            return res.status(400).json({
                success: false,
                message: "Faltan datos en la solicitud",
                code: "BAD_REQUEST",
            });
        }

        let doc = new rhino.File3dm()

        // for each output (RH_OUT:*)...
        for (let i = 0; i < values.length; i++) {
            // for (let i = 1; i <= 1; i++) {
            // ...iterate through data tree structure...
            for (const path in values[i].InnerTree) {
                const branch = values[i].InnerTree[path]
                // console.log(branch)
                // ...and for each branch...
                for (let j = 0; j < branch.length; j++) {
                    console.log(branch[j]);
                    // ...load rhino geometry into doc
                    const rhinoObject = decodeItem(branch[j], rhino)
                    // console.log(rhinoObject);
                    if (rhinoObject !== null) {
                        // console.log("!= null")
                        doc.objects().add(rhinoObject, null)
                    }
                }
            }
        }

        const buffer = new Uint8Array(doc.toByteArray()).buffer;
        console.log(buffer);

        // Enviar el buffer directamente como binario con un status 200
        res.status(200)
            .setHeader('Content-Type', 'application/octet-stream')
            .setHeader('Content-Length', buffer.byteLength)
            .send(Buffer.from(buffer));
    } catch (error) {
        console.error("Error en /compute:", error);

        // Manejo de errores generales
        res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            code: error.code || "INTERNAL_SERVER_ERROR",
        });
    }
});

function decodeItem(item, rhino) {
    const data = JSON.parse(item.data)
    // console.log("Data:")
    // console.log(data)
    if (item.type === 'System.String') {

        // hack for draco meshes
        try {
            console.log(item.type)
            return rhino.DracoCompression.decompressBase64String(data)
        } catch {
            console.error("Error decodeItem");
        } // ignore errors (maybe the string was just a string...)
    } else if (typeof data === 'object') {
        return rhino.CommonObject.decode(data)
    }
    return null;
}

module.exports = router;