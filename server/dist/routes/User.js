'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserProfile = exports.register = exports.login = undefined;

var _User = require('../controllers/User');

var User = _interopRequireWildcard(_User);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var login = User.login;
var register = User.register;
var getUserProfile = User.getUserProfile;

exports.login = login;
exports.register = register;
exports.getUserProfile = getUserProfile;