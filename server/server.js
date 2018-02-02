import dotenv from 'dotenv';
import express from 'express';



import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cor from 'cors';


import * as Handler from './routes/index';
import AuthChecker from './middlewares/AuthChecker';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET

const app = express();
app.use(cor());

// ? 
app.set('trust proxy', true);


// Connect to mongodb
mongoose.connect(MONGO_URL, (err) => {
    if (err)
        return console.log('Unable to Connect to MongoDB')
    return console.log('Connection Successful')
});




if (app.get('env') === 'production') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Welcome to breakout API',
    });
});

// User profile
app.get('/api/user/:user_id', AuthChecker, Handler.User.getUserProfile);

app.post('/api/user/login', Handler.User.login);
app.post('/api/user/signup', Handler.User.register);

app.get('/api/user/media/:user_id', AuthChecker, Handler.Media.getUserMedia);


app.post('/api/comment/:media_id', AuthChecker, Handler.Media.addComment);
app.post('/api/rate/:media_id', AuthChecker, Handler.Media.addRating);

app.get('/api/media/me', AuthChecker, Handler.Media.getMyMedia);
app.get('/api/media', AuthChecker, Handler.Media.getAllMedia);
app.get('/api/media/:media_id', AuthChecker, Handler.Media.getMedia);
app.post('/api/media', AuthChecker, Handler.Media.addMedia);

app.listen(PORT, () => {
    console.log('Running on : ' + PORT);
});