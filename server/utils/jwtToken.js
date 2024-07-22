import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_sKey, { expiresIn: '2d' });

    //set JWT as htlm cookie only 
    res.cookie("JWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000,
        path: '/'
    });
    return token;
};

export default generateToken;