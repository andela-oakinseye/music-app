'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
var GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

var transporter = _nodemailer2.default.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_ADDRESS,
    pass: GMAIL_APP_PASSWORD
  }
});

var send = function send(message) {
  var mailOptions = {
    from: GMAIL_ADDRESS,
    to: message.to,
    subject: message.subject,
    html: message.html
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

exports.send = send;