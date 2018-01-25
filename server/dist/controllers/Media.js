'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetAllMedia = exports.GetUserMedia = exports.GetMyMedia = exports.GetMedia = exports.AddMedia = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

var _Media = require('../models/Media');

var _Media2 = _interopRequireDefault(_Media);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.SECRET || '|{-_-}|';
var hashSalt = process.env.HASH_ID_SALT;

var hashIds = new _hashids2.default(hashSalt, 4); // Pad it to 4
var mediaFields = 'title username type link created';

var AddMedia = exports.AddMedia = function AddMedia(req, res) {
    var token = req.params.token || req.body.token || req.headers.token;
    var requestIsGood = token && req.body;
    if (requestIsGood) {
        var decodedToken = jwt.verify(token, secret);
        var username = decodedToken.username;
        var title = req.body.title;
        var type = req.body.type;
        var link = req.body.link;

        var mediaData = new _Media2.default({
            title: title,
            username: username,
            type: type,
            link: link
        });

        return mediaData.save(function (err, media) {
            if (!err) {
                return res.status(201).json({
                    success: true,
                    data: media
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid Request, provide all fields'
        });
    }
};

var GetMedia = exports.GetMedia = function GetMedia(req, res) {
    var media_id = hashIds.decode(req.params.media_id)[0];
    return _Media2.default.findOne({ media_id: media_id }, mediaFields, function (err, media) {
        if (!err) {
            return media ? res.status(200).json({
                success: true,
                data: media
            }) : res.status(404).json({
                success: false,
                message: 'Media not found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });
};

var GetMyMedia = exports.GetMyMedia = function GetMyMedia(req, res) {
    var token = req.params.token || req.body.token || req.headers.token;
    var requestIsGood = token;

    if (token) {
        var decodedToken = jwt.verify(token, secret);
        var username = decodedToken.username;

        return _Media2.default.find({ username: username }, mediaFields, function (err, userMedia) {
            if (!err) {
                return userMedia.length ? res.status(200).json({
                    success: true,
                    data: userMedia
                }) : res.status(404).json({
                    success: false,
                    message: 'User has no media'
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid Request, provide a token'
        });
    }
};

var GetUserMedia = exports.GetUserMedia = function GetUserMedia(req, res) {
    var user_id = hashIds.decode(req.params.user_id)[0];

    return _User2.default.findOne({ user_id: user_id }, 'username').then(function (err, user) {
        if (!err) {
            return user ? _Media2.default.find({ username: user.username }, mediaFields, function (err, media) {}) : res.status(404).json({
                success: false,
                message: 'No such user'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });
};

var GetAllMedia = exports.GetAllMedia = function GetAllMedia(req, res) {

    return _Media2.default.find({}, mediaFields, function (err, allMedia) {
        if (!err) {
            return allMedia.length ? res.status(200).json({
                success: true,
                data: allMedia
            }) : res.status(404).json({
                success: false,
                message: 'No media found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });
};