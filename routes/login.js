const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo")
const router = express.Router();

router.get("/", (req, res) =>{
    res.send("Login");
});
router.post("/", async (req, res) =>{
    const {email, password} = req.body;
    if(!!!email || !!!password){
        return res.status(400).json(
            jsonResponse(400, {
                error: "Uno de los campos está incompleto",
            })
        );
    }

    const user = await User.findOne({email});


    if(user){
        const correctPassword = await user.comparePassword(password, user.password);

        if(correctPassword){

            const accessToken =  user.createAccessToken();
            const refreshToken = await user.createRefreshToken();

            console.log(accessToken)
            console.log(refreshToken)
          
            res
            .status(200)
            .json(jsonResponse(200, {user: getUserInfo(user), accessToken, refreshToken}));
            
        }else{

            res.status(400).json(
                jsonResponse(400, {
                    error: "Email o contraseña incorrecto",
                })
            );

        }

    }else{
        res.status(400).json(
            jsonResponse(400, {
                error: "Usuario no encontrado",
            })
        );
    }


});
module.exports = router;