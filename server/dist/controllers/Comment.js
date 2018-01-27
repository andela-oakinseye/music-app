'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addComment = undefined;

var _Comment = require('../models/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _Media = require('../controllers/Media');

var _Token = require('../helpers/Token');

var _Media2 = require('../helpers/response/Media');

var _http = require('http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addComment = function addComment(req, res) {
    var token = req.body.token || req.params.token || req.headers.token;
    var decodedToken = (0, _Token.decode)(token);
    var media_id = req.body.media_id || _http.request.params.media_id;
    var media_name = req.body.media_name;
    var text = req.body.text;
    var firstname = decodedToken.firstname;
    var username = decodedToken.username;

    var commentData = new _Comment2.default({
        media_id: media_id,
        username: username,
        firstname: firstname,
        text: text
    });

    return commentData.save(function (err, comment) {
        if (!err) {
            return (0, _Media.getMedia)(req, res);
        }
        return (0, _Media2.commentCreateError)(res);
    });
};

exports.addComment = addComment;