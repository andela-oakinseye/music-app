'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rating = exports.comment = exports.register = exports.login = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = function login(userInfo) {
    return {
        to: userInfo.email,
        subject: 'BREAKOUT - Login Notification',
        html: '\n            <p> Hello <strong> ' + userInfo.firstname + ', </strong> </p>\n            <p> You logged into your account on <strong> ' + (0, _moment2.default)(Date.now()).format('lll') + ' </strong> </p>\n        '
    };
};

var register = function register(userInfo) {
    return {
        to: userInfo.email,
        subject: 'Welcome to Breakout!',
        html: '\n            <p> Hello <strong> ' + userInfo.firstname + ', </strong> </p>\n            <p> Thank you for joining Breakout </p>\n            <p> Your username is <strong> ' + userInfo.username + ' </strong> </p>\n        '
    };
};

var comment = function comment(commentInfo) {
    return {
        to: commentInfo.mediaOwnerEmail,
        subject: 'BREAKOUT - New Comment',
        html: '\n            <p> Hello <strong> ' + user.mediaOwnerName + ', </strong> </p>\n            <p> ' + commentInfo.commenterUsername + ' left a comment on ' + commentInfo.mediaName + ' </p>\n            <p> Please login to Breakout to view the comment </p>\n        '
    };
};

var rating = function rating(ratingInfo) {
    return {
        to: ratingInfo.mediaOwnerEmail,
        subject: 'BREAKOUT - New Rating',
        html: '\n            <p> Hello <strong> ' + ratingInfo.mediaOwnerName + ', </strong> </p>\n            <p> ' + ratingInfo.raterUsername + ' left a comment on ' + ratingInfo.mediaName + ' </p>\n            <p> Please login to Breakout to view the rating </p>\n        '
    };
};

exports.login = login;
exports.register = register;
exports.comment = comment;
exports.rating = rating;