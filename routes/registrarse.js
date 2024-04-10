const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();
router.get("/", (req, res) =>{
    res.send("Registrarse");
});
router.post("/", (req, res) =>{
    const {username, email, password} = req.body;
    if(!!!username || !!!email || !!!password){
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }
    res
    .status(200)
    .json(jsonResponse(200, {message: "Usear created successfully"}));

});
module.exports = router;