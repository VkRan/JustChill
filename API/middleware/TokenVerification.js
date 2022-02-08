const jwt = require("jsonwebtoken");

require('dotenv').config();
const secret = process.env.ACCESS_TOKEN;

const fetch = (req, res, next) => {
    const token = req.cookies.AuthToken;
    if (!token)
        return res.status(401).json({ error: "Please authenticate using a valid token!" });
    try {
        const obj = JSON.parse(token);
        const data = jwt.verify(obj.authToken, secret);
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Please authenticate using a valid token!" });
    }
};

const authenticate = (req, res, next) => {
    fetch(req, res, () => {
        console.log(req.user.id, req.user.isAdmin);
        if (req.user.id === req.params.id || req.user.isAdmin)
            next();
        else
            return res.status(403).json({ error: { alert: "Cannot perfrom operations in this account!" } })
    })
}

const authenticateAdminOnly = (req, res, next) => {
    fetch(req, res, () => {
        if (req.user.isAdmin)
            next();
        else
            return res.status(403).json({ error: { alert: "Not an admin!" } })
    })
}

module.exports = { fetch, authenticate, authenticateAdminOnly };