'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _index = require('./routes/index');

var Handler = _interopRequireWildcard(_index);

var _AuthChecker = require('./middlewares/AuthChecker');

var _AuthChecker2 = _interopRequireDefault(_AuthChecker);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var PORT = process.env.PORT;
var MONGO_URL = process.env.MONGO_URL;
var SECRET = process.env.SECRET;

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

// ? 
app.set('trust proxy', true);

// Connect to mongodb
_mongoose2.default.connect(MONGO_URL, function (err) {
    if (err) return console.log('Unable to Connect to MongoDB');
    return console.log('Connection Successful');
});

if (app.get('env') === 'production') {
    app.use((0, _morgan2.default)('combined'));
} else {
    app.use((0, _morgan2.default)('dev'));
}

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    return res.status(200).json({
        success: true,
        message: 'Welcome to breakout API'
    });
});

// User profile
app.get('/api/user/:user_id', _AuthChecker2.default, Handler.User.getUserProfile);

app.post('/api/user/login', Handler.User.login);
app.post('/api/user/signup', Handler.User.register);

app.get('/api/user/media/:user_id', _AuthChecker2.default, Handler.Media.getUserMedia);

app.post('/api/comment/:media_id', _AuthChecker2.default, Handler.Media.addComment);
app.post('/api/rate/:media_id', _AuthChecker2.default, Handler.Media.addRating);

app.get('/api/media/me', _AuthChecker2.default, Handler.Media.getMyMedia);
app.get('/api/media', _AuthChecker2.default, Handler.Media.getAllMedia);
app.get('/api/media/:media_id', _AuthChecker2.default, Handler.Media.getMedia);
app.post('/api/media', _AuthChecker2.default, Handler.Media.addMedia);

app.listen(PORT, function () {
    console.log('Running on : ' + PORT);
});