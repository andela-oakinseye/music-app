
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';

import * as Routes from './routes/index';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET

const app = express();
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
    return res.send("Welcome")
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

app.listen(PORT, () => {
    console.log('Running on : ' + PORT);
});