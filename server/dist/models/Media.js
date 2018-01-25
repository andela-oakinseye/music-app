'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSequence = require('mongoose-sequence');

var _mongooseSequence2 = _interopRequireDefault(_mongooseSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoIncrement = (0, _mongooseSequence2.default)(_mongoose2.default);
var Schema = _mongoose2.default.Schema;

var Media = new Schema({
    title: {
        type: String,
        required: 'Media title is required',
        min: 2,
        max: 40
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    type: {
        type: String,
        required: 'Please provide media type'
    },
    link: {
        type: String,
        required: 'Please provide a valid media link'
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

Media.plugin(AutoIncrement, { inc_field: 'media_id' });
module.exports = _mongoose2.default.model('Media', Media);