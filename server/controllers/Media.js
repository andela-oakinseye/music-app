import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import HashIds from 'hashids';

import Media from '../models/Media';
import User from '../models/User';

dotenv.config();

const secret = process.env.SECRET || '|{-_-}|';
const hashSalt = process.env.HASH_ID_SALT;

const hashIds = new HashIds(hashSalt, 4); // Pad it to 4
const mediaFields = 'title username type link created';

export const AddMedia = (req, res) => {
    const token = req.params.token || req.body.token || req.headers.token;
    const requestIsGood = token && req.body;
    if (requestIsGood) {
        const decodedToken = jwt.verify(token, secret);
        const username = decodedToken.username;
        const title = req.body.title;
        const type = req.body.type;
        const link = req.body.link;

        const mediaData = new Media({
            title,
            username,
            type,
            link,
        });

        return mediaData.save((err, media) => {
            if (!err) {
                return res.status(201).json({
                    success: true,
                    data: media
                })
            } else {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid Request, provide all fields'
        });
    }
}

export const GetMedia = (req, res) => {
    const media_id = req.params.media_id;
    return Media.findOne({ media_id }, mediaFields, (err, media) => {
        if (!err) {
            return media ?
                res.status(200).json({
                    success: true,
                    data: media
                }) :
                res.status(404).json({
                    success: false,
                    message: 'Media not found'
                });
        } else {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });
}

export const GetMyMedia = (req, res) => {
    const token = req.params.token || req.body.token || req.headers.token;
    const requestIsGood = token;

    if (token) {
        const decodedToken = jwt.verify(token, secret);
        const username = decodedToken.username;

        return Media.find({ username }, mediaFields, (err, userMedia) => { 
            if (!err) {
                return userMedia.length ?
                    res.status(200).json({
                        success: true,
                        data: userMedia
                    }) :
                    res.status(404).json({
                        success: false,
                        message: 'User has no media'
                    });
            } else {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid Request, provide a token'
        });
    }
}

export const GetUserMedia = (req, res) => {
    const user_id = hashIds.decode(req.params.user_id)[0];
    return User.findOne({ user_id }, 'username')
        .then((user) => {
            if (user) {
                return user ?
                    Media.find({ username: user.username }, mediaFields, (err, media) => {
                        return res.status(200).json({
                            success: true,
                            data: media,
                        })
                    }) :
                    res.status(404).json({
                        success: false,
                        message: 'No such user'
                    });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        })
}

export const GetAllMedia = (req, res) => {

    return Media.find({}, mediaFields, (err, allMedia) => {
        if (!err) {
            return allMedia.length ?
                res.status(200).json({
                    success: true,
                    data: allMedia
                }) :
                res.status(404).json({
                    success: false,
                    message: 'No media found'
                });
        } else {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    })
}
