'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSequence = require('mongoose-sequence');

var _mongooseSequence2 = _interopRequireDefault(_mongooseSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoIncrement = (0, _mongooseSequence2.default)(_mongoose2.default);
var Schema = _mongoose2.default.Schema;

var Comment = new Schema({
    media_id: {
        type: String
    },

    username: {
        type: String
    },

    firstname: {
        type: String
    },

    text: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

Comment.plugin(AutoIncrement, { inc_field: 'comment_id' });
module.exports = _mongoose2.default.model('Comment', Comment);