'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetUserProfile = exports.Login = exports.Register = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _GenerateMessage = require('../helpers/GenerateMessage');

var GenerateMessage = _interopRequireWildcard(_GenerateMessage);

var _SendEmailNotification = require('../helpers/SendEmailNotification');

var _SendEmailNotification2 = _interopRequireDefault(_SendEmailNotification);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.SECRET || '|{-_-}|';
var hashSalt = process.env.HASH_ID_SALT;

var hashIds = new _hashids2.default(hashSalt, 4); // Pad it to 4
var profileFields = 'username firstname email created last_login';

var Register = exports.Register = function Register(req, res) {
    var user = new _User2.default({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    return user.save(function (err, user) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        var notificationMessage = GenerateMessage.Register(user);
        (0, _SendEmailNotification2.default)(notificationMessage);

        var token = jwt.sign({
            username: user.username,
            id: hashIds.encode(user.user_id)
        }, secret, {
            expiresIn: '14 days'
        });

        return res.status(201).json({
            sucesss: true,
            token: token
        });
    });
};

var Login = exports.Login = function Login(req, res) {
    if (!req.body.username || !req.body.password) return res.status(400).json({
        success: false,
        message: "username or password not provided"
    });
    return _User2.default.findOne({ username: req.body.username }, function (err, user) {
        if (!user) return res.status(404).json({
            success: false,
            message: "No such user :("
        });else {
            if (_bcryptNodejs2.default.compareSync(req.body.password, user.password)) {
                var userData = {
                    username: user.username,
                    id: hashIds.encode(user.user_id)
                };

                var token = jwt.sign(userData, secret, {
                    expiresIn: '14 days'
                });

                return _User2.default.findOneAndUpdate({ username: user.username }, { last_login: Date.now() }).then(function (user) {
                    var notificationMessage = GenerateMessage.Login(user);

                    (0, _SendEmailNotification2.default)(notificationMessage);
                    return res.status(200).json({
                        success: true,
                        token: token
                    });
                }).catch(function (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Password is incorrect -_-'
                });
            }
        }
    });
};

var GetUserProfile = exports.GetUserProfile = function GetUserProfile(req, res) {
    var user_id = hashIds.decode(req.params.user_id);
    return _User2.default.findOne({ user_id: user_id }, profileFields, function (err, user) {
        if (!err) {
            return user ? res.status(200).json({
                success: true,
                data: {
                    username: user.username,
                    firstname: user.firstname,
                    email: user.email,
                    joined: (0, _moment2.default)(user.created).format('lll'),
                    last_login: (0, _moment2.default)(user.last_login).format('lll')
                }
            }) : res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });
};