function getTokenFromHeader(header){

    if(!header["authorization"]){
        console.log("No hay token", header);
        const parted = headers.authorization.split(' ');
        if(parted.length === 2){
            return parted[1];
        }else{
            return null;
        }
    }else{
        return null; 
    }

}

module.exports = getTokenFromHeader;