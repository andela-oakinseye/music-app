import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import { encode } from './UserId';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @function sign
 * @param {*} username 
 * @param {*} id 
 * @return {String} token
 */
const sign = (user) => { 
    return jwt.sign({
            username: user.username,
            firstname: user.firstname,
            id: encode(user.user_id),
        },
        JWT_SECRET,
        {
            expiresIn: '14 days'
        });
};

/**
 * @function decode
 * @param {*} token
 * @return {Object} payload
 */
const decode = (token) => {
    try {
        return jwt.verify(
            token, 
            JWT_SECRET,
        );
    } catch(err) {
        return false;
    }
}

export {
    sign,
    decode,
};