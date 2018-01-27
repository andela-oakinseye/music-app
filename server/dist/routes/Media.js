'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllMedia = exports.getUserMedia = exports.getMyMedia = exports.getMedia = exports.addMedia = undefined;

var _Media = require('../controllers/Media');

var Media = _interopRequireWildcard(_Media);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var addMedia = Media.addMedia;
var getMedia = Media.getMedia;
var getMyMedia = Media.getMyMedia;
var getUserMedia = Media.getUserMedia;
var getAllMedia = Media.getAllMedia;

exports.addMedia = addMedia;
exports.getMedia = getMedia;
exports.getMyMedia = getMyMedia;
exports.getUserMedia = getUserMedia;
exports.getAllMedia = getAllMedia;