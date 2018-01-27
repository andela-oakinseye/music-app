'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Token = require('../helpers/Token');

var Token = _interopRequireWildcard(_Token);

var _User = require('../helpers/response/User');

var Response = _interopRequireWildcard(_User);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var AuthChecker = function AuthChecker(req, res, next) {
    var authToken = req.headers.token || req.body.token || req.params.token;
    return authToken && Token.decode(authToken) ? next() : Response.invalidToken(res);
};

exports.default = AuthChecker;