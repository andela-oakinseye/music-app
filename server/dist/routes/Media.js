'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllMedia = exports.getUserMedia = exports.getMyMedia = exports.getMedia = exports.addRating = exports.addMedia = exports.addComment = undefined;

var _Media = require('../controllers/Media');

var Media = _interopRequireWildcard(_Media);

var _Comment = require('../controllers/Comment');

var Comment = _interopRequireWildcard(_Comment);

var _Rating = require('../controllers/Rating');

var Rating = _interopRequireWildcard(_Rating);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var addMedia = Media.addMedia;
var getMedia = Media.getMedia;
var getMyMedia = Media.getMyMedia;
var getUserMedia = Media.getUserMedia;
var getAllMedia = Media.getAllMedia;

var addComment = Comment.addComment;
var addRating = Rating.addRating;

exports.addComment = addComment;
exports.addMedia = addMedia;
exports.addRating = addRating;
exports.getMedia = getMedia;
exports.getMyMedia = getMyMedia;
exports.getUserMedia = getUserMedia;
exports.getAllMedia = getAllMedia;