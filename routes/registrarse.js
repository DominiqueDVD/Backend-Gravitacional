const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

const User = require("../schema/user");

router.get("/", (req, res) =>{
    res.send("Registrarse");
});
router.post("/", async (req, res) =>{
    const {username, email, password} = req.body;
    if(!!!username || !!!email || !!!password){
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }

    try{

        const user = new User ();
        const exist = await user.emailExist(email);
    
        if(exist){
            return res.status(400).json(
                jsonResponse(400, {
                    error: "El email ya se encuentra registrado para un usuario",
                })
            );
    
        }
    
        const newUser = new User({username, email, password});
    
        newUser.save();
    
        res
        .status(200)
        .json(jsonResponse(200, {message: "Usear created successfully"}));

    }catch (error){
        res.status(500).json(
            jsonResponse(500, {
                error: "Error creating user",
            })
        )
    }




});
module.exports = router;