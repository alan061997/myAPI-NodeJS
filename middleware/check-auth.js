const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {   

    try {
        var header_token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(header_token, process.env.JWT_WEB_TOKEN_KEY)
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            error : true,
            message : "Auth Failed."
        });
    }
    next();
};