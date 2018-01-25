'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rating = exports.Comment = exports.Register = exports.Login = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = exports.Login = function Login(userInfo) {
    return {
        to: userInfo.email,
        subject: 'BREAKOUT - Login Notification',
        html: '\n            <p> Hello <strong> ' + userInfo.firstname + ', </strong> </p>\n            <p> You logged into your account on <strong> ' + (0, _moment2.default)(Date.now()).format('lll') + ' </strong> </p>\n        '
    };
};

var Register = exports.Register = function Register(userInfo) {
    return {
        to: userInfo.email,
        subject: 'Welcome to Breakout!',
        html: '\n            <p> Hello <strong> ' + userInfo.firstname + ', </strong> </p>\n            <p> Thank you for joining Breakout </p>\n            <p> Your username is <strong> ' + userInfo.username + ' </strong> </p>\n        '
    };
};

var Comment = exports.Comment = function Comment(commentInfo) {
    return {
        to: commentInfo.mediaOwnerEmail,
        subject: 'BREAKOUT - New Comment',
        html: '\n            <p> Hello <strong> ' + user.mediaOwnerName + ', </strong> </p>\n            <p> ' + commentInfo.commenterUsername + ' left a comment on ' + commentInfo.mediaName + ' </p>\n            <p> Please login to Breakout to view the comment </p>\n        '
    };
};

var Rating = exports.Rating = function Rating(ratingInfo) {
    return {
        to: ratingInfo.mediaOwnerEmail,
        subject: 'BREAKOUT - New Rating',
        html: '\n            <p> Hello <strong> ' + ratingInfo.mediaOwnerName + ', </strong> </p>\n            <p> ' + ratingInfo.raterUsername + ' left a comment on ' + ratingInfo.mediaName + ' </p>\n            <p> Please login to Breakout to view the rating </p>\n        '
    };
};