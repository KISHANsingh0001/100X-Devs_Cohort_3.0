const jwt = require("jsonwebtoken");
async function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);

    if (decodedData) {
        req.adminId = decodedData.id;

        next();
    }
    else {
        res.status(403).json({
            msg: "You are not signed in"
        });
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}