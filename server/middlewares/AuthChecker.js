import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();
const secret = process.env.SECRET;

const decodeToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch(err) {
        return false;
    }
}

const AuthChecker = (req, res, next) => {
    const authToken  = req.headers.token || req.body.token || req.params.token;
    if(authToken && decodeToken(authToken)) {
        return next();
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid Authentication Token'
        });
    }
}

export default AuthChecker