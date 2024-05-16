function getTokenFromHeader(headers){

    if (!headers || !headers["authorization"]) {
        console.log("No hay token", headers);
        return null;
    } else {
        const parted = headers["authorization"].split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    }

}

module.exports = getTokenFromHeader;
