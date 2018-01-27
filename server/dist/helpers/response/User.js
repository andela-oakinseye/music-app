'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userProfileData = exports.userNotFound = exports.signUpSuccess = exports.signInSuccess = exports.serverError = exports.noUsernameOrPassword = exports.invalidToken = exports.invalidPassword = exports.badRequest = undefined;

var _DateTime = require('../DateTime');

var DateTime = _interopRequireWildcard(_DateTime);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var badRequest = function badRequest(res, err) {
    return res.status(400).json({
        success: false,
        message: err.message
    });
};
var invalidPassword = function invalidPassword(res, err) {
    return res.status(401).json({
        success: false,
        message: 'Password is incorrect -_-'
    });
};

var invalidToken = function invalidToken(res, err) {
    return res.status(401).json({
        success: false,
        message: 'Invalid Authentication Token'
    });
};

var noUsernameOrPassword = function noUsernameOrPassword(res, err) {
    return res.status(400).json({
        success: false,
        message: "username or password not provided"
    });
};

var serverError = function serverError(res, err) {
    return res.status(500).json({
        success: false,
        message: err.message
    });
};

var signInSuccess = function signInSuccess(res, token) {
    return res.status(200).json({
        success: true,
        token: token
    });
};

var signUpSuccess = function signUpSuccess(res, token) {
    return res.status(201).json({
        success: true,
        token: token
    });
};

var userNotFound = function userNotFound(res, err) {
    return res.status(404).json({
        success: false,
        message: "No such user :("
    });
};

var userProfileData = function userProfileData(res, user) {
    return res.status(200).json({
        success: true,
        data: {
            username: user.username,
            firstname: user.firstname,
            email: user.email,
            joined: DateTime.format(user.created),
            last_login: DateTime.format(user.last_login)
        }
    });
};

exports.badRequest = badRequest;
exports.invalidPassword = invalidPassword;
exports.invalidToken = invalidToken;
exports.noUsernameOrPassword = noUsernameOrPassword;
exports.serverError = serverError;
exports.signInSuccess = signInSuccess;
exports.signUpSuccess = signUpSuccess;
exports.userNotFound = userNotFound;
exports.userProfileData = userProfileData;