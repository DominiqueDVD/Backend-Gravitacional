function getUserInfo(user){
    return{
        email: user.email,
        username: user.username,
        id: user.id | user._id,
    }
}

module.exports = getUserInfo;