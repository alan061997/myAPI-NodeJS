const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header.Authorization;
    console.log(token);    

    try {        
        const decoded = jwt.verify(req.body.token, process.env.JWT_WEB_TOKEN_KEY)
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            error : true,
            message : "Auth Failed."
        });
    }
    next();
};