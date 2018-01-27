'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSequence = require('mongoose-sequence');

var _mongooseSequence2 = _interopRequireDefault(_mongooseSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoIncrement = (0, _mongooseSequence2.default)(_mongoose2.default);
var Schema = _mongoose2.default.Schema;

var Rating = new Schema({
    media_id: {
        type: String
    },

    username: {
        type: String
    },
    score: {
        type: Number,
        min: [1],
        max: [5]
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

Rating.plugin(AutoIncrement, { inc_field: 'rating_id' });
module.exports = _mongoose2.default.model('Rating', Rating);