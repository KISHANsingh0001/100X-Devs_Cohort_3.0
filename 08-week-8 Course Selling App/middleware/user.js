
const jwt = require("jsonwebtoken");
function userMiddleware(req, res, next) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token , process.env.JWT_USER_PASSWORD);

    if (decodedData) {
        req.userId = decodedData.id;
        next();
    }
    else {
        res.status(403).json({
            msg: "You are not signed in"
        })
    }
}



module.exports = {
    userMiddleware: userMiddleware
}