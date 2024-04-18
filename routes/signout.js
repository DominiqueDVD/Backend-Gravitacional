const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

router.delete("/", async function(req, res) {
    try{

        const refreshToken = getTokenFromHeader(req.headers);
        if(refreshToken){
            await Token.findOneAndRemove({ token: refreshToken });
            res.status(200).json(jsonResponse(200, { message: "Token eliminado" }));
        }
    }catch(error){
        console.log(error);
        res.status(500).json(jsonResponse(500, { error: "Error de servidor" }));

    }
});
module.exports = router;