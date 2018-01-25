'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserCtrl = require('../controllers/User');
var Login = exports.Login = UserCtrl.Login;
var Signup = exports.Signup = UserCtrl.Register;
var GetUserProfile = exports.GetUserProfile = UserCtrl.GetUserProfile;