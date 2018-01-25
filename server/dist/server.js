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

var _index = require('./routes/index');

var Routes = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var PORT = process.env.PORT;
var MONGO_URL = process.env.MONGO_URL;
var SECRET = process.env.SECRET;

var app = (0, _express2.default)();
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
    return res.send("Welcome");
});

app.get('/api/user/:user_id', Routes.User.GetUserProfile);

app.post('/api/user/login', Routes.User.Login);
app.post('/api/user/signup', Routes.User.Signup);
app.post('/api/user/media/:user_id', Routes.Media.GetUserMedia);

// app.get('/api/me')

app.get('/api/media/me', Routes.Media.GetMyMedia);

app.get('/api/media', Routes.Media.GetAllMedia);
app.get('/api/media/:media_id', Routes.Media.GetMedia);
app.post('/api/media', Routes.Media.AddMedia);

app.listen(PORT, function () {
    console.log('Running on : ' + PORT);
});