'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decode = exports.encode = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var hashIdSalt = process.env.HASH_ID_SALT;
var hashIds = new _hashids2.default(hashIdSalt, 4);

var encode = function encode(id) {
    return hashIds.encode(id);
};
var decode = function decode(id) {
    return hashIds.decode(id)[0];
};

exports.encode = encode;
exports.decode = decode;