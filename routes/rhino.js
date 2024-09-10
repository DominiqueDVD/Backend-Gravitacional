const express = require('express');
const router = express.Router();
const rhino3dm = require('rhino3dm');

// Lógica para manejar las solicitudes a Rhino Compute
router.post('/compute', async (req, res) => {
    console.log("Compute")
    console.log(req.body)
    try {
        const rhino = await rhino3dm();

        let values = req.body.values

        console.log(`Values: ${values}`)

        let doc = new rhino.File3dm()

        // for each output (RH_OUT:*)...
        for (let i = 0; i < values.length; i++) {
            // ...iterate through data tree structure...
            console.log("For 1: " + i)
            for (const path in values[i].InnerTree) {
                console.log("For 2: " + values[i])
                const branch = values[i].InnerTree[path]
                // console.log(branch)
                // ...and for each branch...
                for (let j = 0; j < branch.length; j++) {
                    console.log("For 3: " + j)
                    // console.log(branch[j]);
                    // ...load rhino geometry into doc
                    const rhinoObject = decodeItem(branch[j], rhino)
                    // console.log(rhinoObject);
                    if (rhinoObject !== null) {
                        console.log("!= null")
                        doc.objects().add(rhinoObject, null)
                    }
                }
            }
        }

        const buffer = new Uint8Array(doc.toByteArray()).buffer
        
        // Enviar el buffer directamente como binario
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Length', buffer.byteLength);
        res.end(Buffer.from(buffer));
    } catch (e) {
        console.error(`Error ${e}`)
    }
});

function decodeItem(item, rhino) {
    const data = JSON.parse(item.data)

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
    return null
}

module.exports = router;