'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserMedia = exports.getMyMedia = exports.getMedia = exports.getAllMedia = exports.addMedia = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Media = require('../models/Media');

var _Media2 = _interopRequireDefault(_Media);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _UserId = require('../helpers/UserId');

var Id = _interopRequireWildcard(_UserId);

var _Token = require('../helpers/Token');

var Token = _interopRequireWildcard(_Token);

var _Media3 = require('../helpers/response/Media');

var Reply = _interopRequireWildcard(_Media3);

var _User3 = require('../helpers/response/User');

var _Media4 = require('../helpers/validate/Media');

var RequestValidator = _interopRequireWildcard(_Media4);

var _DateTime = require('../helpers/DateTime');

var DateTime = _interopRequireWildcard(_DateTime);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediaFields = 'title username type link created';

var addMedia = function addMedia(req, res) {
    if (RequestValidator.mediaIsGood(req)) {
        var token = req.body.token || req.params.token || req.headers.token;
        var decodedToken = Token.decode(token);
        var username = decodedToken.username;
        var body = req.body;
        var media = _extends({}, body, { username: username });
        var mediaData = new _Media2.default(media);

        return mediaData.save(function (err, media) {
            return !err ? Reply.mediaSaveSuccess(res, media) : Reply.mediaServerError(res, err);
        });
    }
    return Reply.mediaSaveInvalid(res);
};

var getMedia = function getMedia(req, res) {
    var media_id = req.params.media_id;
    return _Media2.default.findOne({ media_id: media_id }, mediaFields, function (err, media) {
        if (!err) {
            return media ? Reply.mediaRetrieveSuccess(res, media) : Reply.mediaNotFound(res);
        }
        return Reply.mediaServerError(res, err);
    });
};

var getMyMedia = function getMyMedia(req, res) {
    var token = req.body.token || req.params.token || req.headers.token;
    var decodedToken = Token.decode(token);
    var username = decodedToken.username;

    return _Media2.default.find({ username: username }, mediaFields, function (err, userMedia) {
        if (!err) {
            return userMedia.length ? Reply.mediaRetrieveSuccess(res, userMedia) : Reply.mediaEmptyForUser(res);
        }
        return Reply.mediaServerError(res, err);
    });
};

var getUserMedia = function getUserMedia(req, res) {
    var user_id = Id.decode(req.params.user_id)[0];
    return _User2.default.findOne({ user_id: user_id }, 'username').then(function (user) {
        if (user) {
            return user ? _Media2.default.find({ username: user.username }, mediaFields, function (err, media) {
                return Reply.mediaRetrieveSuccess(res, media);
            }) : (0, _User3.userNotFound)(res);
        }
    }).catch(function (err) {
        return Reply.mediaServerError(res, err);
    });
};

var getAllMedia = function getAllMedia(req, res) {
    return _Media2.default.find({}, mediaFields, function (err, allMedia) {
        if (!err) {
            return allMedia.length ? Reply.mediaRetrieveSuccess(res, allMedia) : Reply.mediaNotFound(res);
        } else {
            return Reply.mediaServerError(res, err);
        }
    });
};

exports.addMedia = addMedia;
exports.getAllMedia = getAllMedia;
exports.getMedia = getMedia;
exports.getMyMedia = getMyMedia;
exports.getUserMedia = getUserMedia;