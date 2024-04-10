const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();
router.get("/", (req, res) =>{
    res.send("Login");
});
router.post("/", (req, res) =>{
    const {email, password} = req.body;
    if(!!!email || !!!password){
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }
    //autenticar usuario bdd
    const accessToken = "access_token";
    const refreshToken = "refresh_token";
    const user = {
        id: "1",
        name: "Dominique",
        email: "dominique.delvalle3d@gmail.com",
     
    };
    res
    .status(200)
    .json(jsonResponse(200, {user, accessToken, refreshToken}));

});
module.exports = router;