'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSequence = require('mongoose-sequence');

var _mongooseSequence2 = _interopRequireDefault(_mongooseSequence);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoIncrement = (0, _mongooseSequence2.default)(_mongoose2.default);

var Schema = _mongoose2.default.Schema;

var validateEmail = function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var User = new Schema({
    firstname: {
        type: String,
        min: [2, 'Firstname too short'],
        max: [24, 'Firstname too long'],
        required: [true, 'Firstname is required']
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        min: [4, 'username too short'],
        max: [8, 'username too long'],
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        min: [6, 'Password too short'],
        max: [40, 'Password too long'],
        required: [true, 'Please provide a password']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    created: {
        type: Date,
        default: Date.now()
    },
    last_login: {
        type: Date,
        default: Date.now()
    }
});

User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    _bcryptNodejs2.default.genSalt(8, function (err, salt) {
        if (err) {
            return next(err);
        }
        _bcryptNodejs2.default.hash(user.password, salt, null, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});

User.plugin(AutoIncrement, { inc_field: 'user_id' });
module.exports = _mongoose2.default.model('User', User);