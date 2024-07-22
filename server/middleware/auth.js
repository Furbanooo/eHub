import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    let token;
    //read the jwt from the cookie 
    token = req.cookies.JWT;
    //verify the token 
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_sKey);
            req.user = await User.findById(decode.userId);
            next();
        } catch (error) {
            res.status(401).json({
                error: error.message
            });
        }
    } else {
        res.status(401).json({
            error: 'Authentication failed'
        });
    }
};

// check is user had admin level 
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            error: 'Admin authentication declined'
        });
    }
};

export { authenticate, authorizeAdmin };