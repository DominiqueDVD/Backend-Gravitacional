function getTokenFromHeader(header){

    try{
    if(!header["authorization"]){
        console.log("No hay token", header);
        const parted = header.authorization.split(' ');
        if(parted.length === 2){
            return parted[1];
        }else{
            return null;
        }
    }else{
        return null; 
    }
    }catch(e){
        console.log(e);
    }
}

module.exports = getTokenFromHeader;