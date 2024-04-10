const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

router.post("/", (req, res) =>{
    const {name, email, password} = req.body;
    if(!!name || !!email || !!password){
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }
    res
    .status(200)
    .json(jsonResponse(200, {message: "Usear created successfully"}));


    res.send("sign out");
});
module.exports = router;