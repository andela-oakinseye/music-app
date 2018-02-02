'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserProfile = exports.register = exports.login = undefined;

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Media = require('../models/Media');

var _Media2 = _interopRequireDefault(_Media);

var _Comment = require('../models/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _UserId = require('../helpers/UserId');

var Id = _interopRequireWildcard(_UserId);

var _Token = require('../helpers/Token');

var Token = _interopRequireWildcard(_Token);

var _Email = require('../helpers/Email');

var Mail = _interopRequireWildcard(_Email);

var _User3 = require('../helpers/response/User');

var Reply = _interopRequireWildcard(_User3);

var _Message = require('../helpers/Message');

var BuildMessage = _interopRequireWildcard(_Message);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var profileFields = 'username firstname email created last_login';

var login = function login(req, res) {
    if (!req.body.username || !req.body.password) return Reply.noUsernameOrPassword(res);
    return _User2.default.findOne({ username: req.body.username }, function (err, user) {
        if (!user) return Reply.userNotFound(res);else {
            if (_bcryptNodejs2.default.compareSync(req.body.password, user.password)) {
                return _User2.default.findOneAndUpdate({ username: user.username }, { last_login: Date.now() }).then(function (user) {
                    var token = Token.sign(user);
                    var loginEmailMessage = BuildMessage.login(user);

                    Mail.send(loginEmailMessage);
                    return Reply.signInSuccess(res, token);
                }).catch(function (err) {
                    return Reply.serverError(res, err);
                });
            } else return Reply.invalidPassword(res);
        }
    });
};

var register = function register(req, res) {
    var user = new _User2.default(req.body);

    return user.save(function (err, user) {
        if (err) {
            return Reply.badRequest(res, err);
        }
        var signUpEmailMessage = BuildMessage.register(user);
        var token = Token.sign(user);

        Mail.send(signUpEmailMessage);
        return Reply.signUpSuccess(res, token);
    });
};

var getUserProfile = function getUserProfile(req, res) {
    var username = req.params.user_id;
    console.log(username);
    var userProfileMedia = {};
    return _User2.default.findOne({ username: username }, profileFields, function (err, user) {
        if (!err) {
            if (user) {
                userProfileMedia.user = user;
                return _Media2.default.find({ username: username }).then(function (data) {
                    if (data.length) userProfileMedia.media = data;
                }).then(function (response) {
                    return _Comment2.default.find({ username: username }).then(function (comments) {
                        userProfileMedia.comment = comments;
                        res.status(200).json({
                            success: true,
                            data: userProfileMedia
                        });
                    });
                });
            } else Reply.userNotFound(res, err);
        } else return Reply.serverError(res, err);
    });
};

exports.login = login;
exports.register = register;
exports.getUserProfile = getUserProfile;