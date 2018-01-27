'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decode = exports.sign = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _UserId = require('./UserId');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var JWT_SECRET = process.env.JWT_SECRET;

/**
 * @function sign
 * @param {*} username 
 * @param {*} id 
 * @return {String} token
 */
var sign = function sign(user) {
    return jwt.sign({
        username: user.username,
        firstname: user.firstname,
        id: (0, _UserId.encode)(user.user_id)
    }, JWT_SECRET, {
        expiresIn: '14 days'
    });
};

/**
 * @function decode
 * @param {*} token
 * @return {Object} payload
 */
var decode = function decode(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return false;
    }
};

exports.sign = sign;
exports.decode = decode;