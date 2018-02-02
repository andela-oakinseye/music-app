'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addRating = undefined;

var _Rating = require('../models/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Media = require('../controllers/Media');

var _Token = require('../helpers/Token');

var _Media2 = require('../helpers/response/Media');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addRating = function addRating(req, res) {
    var token = req.body.token || req.params.token || req.headers.token;
    var decodedToken = (0, _Token.decode)(token);
    var media_id = req.body.media_id || req.params.media_id;
    var score = Number(req.body.score);
    var username = decodedToken.username;

    var ratingData = new _Rating2.default({
        media_id: media_id,
        username: username,
        score: score
    });
    return _Rating2.default.find({ username: username, media_id: media_id }).then(function (rating) {
        console.log(rating);
        if (rating.length) {
            return (0, _Media2.alreadyRatedError)(res);
        } else {
            return ratingData.save(function (err, rating) {
                if (!err) {
                    return (0, _Media.getMedia)(req, res);
                }
                return (0, _Media2.ratingCreateError)(res);
            });
        }
    });
};

exports.addRating = addRating;