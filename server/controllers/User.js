import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import HashIds from 'hashids';
import moment from 'moment';

import User from '../models/User';
import * as GenerateMessage from '../helpers/GenerateMessage';
import SendMail from '../helpers/SendEmailNotification';
import SendEmailNotification from '../helpers/SendEmailNotification';

dotenv.config();
const secret = process.env.SECRET || '|{-_-}|';
const hashSalt = process.env.HASH_ID_SALT;

const hashIds = new HashIds(hashSalt, 4); // Pad it to 4
const profileFields = 'username firstname email created last_login';

export const Register = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });

    return user.save((err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }

        const notificationMessage = GenerateMessage.Register(user);        
        SendEmailNotification(notificationMessage)

        const token = jwt.sign({
            username: user.username,
            id: hashIds.encode(user.user_id)
        }, secret, {
                expiresIn: '14 days'
            });

        return res.status(201).json({
            sucesss: true,
            token
        });
    });
}

export const Login = (req, res) => {
    if (!req.body.username || !req.body.password)
        return res.status(400).json({
            success: false,
            message: "username or password not provided"
        });
    return User.findOne({ username: req.body.username }, (err, user) => {
        if (!user)
            return res.status(404).json({
                success: false,
                message: "No such user :("
            });
        else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const userData = {
                    username: user.username,
                    id: hashIds.encode(user.user_id)
                }

                const token = jwt.sign(userData, secret, {
                    expiresIn: '14 days'
                });


                return User.findOneAndUpdate({ username: user.username }, { last_login: Date.now() })
                    .then((user) => {
                        const notificationMessage = GenerateMessage.Login(user);

                        SendMail(notificationMessage);
                        return res.status(200).json({
                            success: true,
                            token,
                        });
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        })
                    });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'Password is incorrect -_-'
                });
            }
        }

    });
}

export const GetUserProfile = (req, res) => {
    const user_id = hashIds.decode(req.params.user_id);
    return User.findOne({ user_id }, profileFields, (err, user) =>  {
        if(!err) {
            return user ?
                res.status(200).json({
                    success: true,
                    data: {
                        username: user.username,
                        firstname: user.firstname,
                        email: user.email,
                        joined: moment(user.created).format('lll'),
                        last_login: moment(user.last_login).format('lll'),
                    }
                }) :
                    res.status(404).json({
                        success: false,
                        message: 'User not found'
                    });
        } else {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    })
}