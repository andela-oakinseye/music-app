'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.format = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function format(datetime) {
    return (0, _moment2.default)(datetime).format('lll');
};
exports.format = format;