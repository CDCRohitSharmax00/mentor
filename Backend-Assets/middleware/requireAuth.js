const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorHandler } = require("../utils/error");

const userAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return next(errorHandler(401, 'You must be loggged in'));
    }
    const token = authorization.replace("Bearer ", "")
    try {
        const { id, username, role } = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findOne({ _id: id })
        // Cookies 
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json(res);
    } catch (err) {
        console.log(err)
        return next(errorHandler(403, 'Token is not valid'));
    }
};

const checkRole = (roles) => (req, res, next) => {
    !roles.includes(req.user.role) ? res.status(401).json({ message: "Unauthorized" }) : next()
}

module.exports = { userAuth, checkRole};