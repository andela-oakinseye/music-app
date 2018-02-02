import Comment from '../models/Comment'
import Media from '../models/Media';
import User from '../models/User';
import Rating from '../models/Rating';

import * as Id from '../helpers/UserId';
import * as Token from '../helpers/Token'
import * as Reply from '../helpers/response/Media';
import { userNotFound } from '../helpers/response/User'
import * as RequestValidator from '../helpers/validate/Media';
import * as DateTime from '../helpers/DateTime';

const addMedia = (req, res) => {
    if (RequestValidator.mediaIsGood(req)) {
        const token = req.body.token || req.params.token || req.headers.token;
        const decodedToken = Token.decode(token)
        const username = decodedToken.username;
        const body = req.body;
        const media = { ...body, username };
        const mediaData = new Media(media);

        return mediaData.save((err, media) => {
            return !err ?
                Reply.mediaSaveSuccess(res, media) :
                Reply.mediaServerError(res, err);
        });
    }
    return Reply.mediaSaveInvalid(res);
}

const getMedia = (req, res) => {
    const media_id = req.params.media_id;
    return Media.findOne({ media_id }, (err, media) => {
        if (!err) {
            if (media) {
                return Comment.find({ media_id })
                    .then((comments) => {
                        return Rating.find({ media_id })
                            .then((ratings) => {
                                const mediaData = {
                                    media,
                                    comments,
                                    ratings,
                                };
                                return Reply.mediaRetrieveSuccess(res, mediaData);
                            })
                    })
            } else {
                return Reply.mediaNotFound(res);
            }
        }
        return Reply.mediaServerError(res, err);
    });
}

const getMyMedia = (req, res) => {
    const token = req.body.token || req.params.token || req.headers.token;
    const decodedToken = Token.decode(token)
    const username = decodedToken.username;

    return Media.find({ username }, (err, userMedia) => {
        if (!err) {
            return userMedia.length ?
                Reply.mediaRetrieveSuccess(res, userMedia) :
                Reply.mediaEmptyForUser(res);
        }
        return Reply.mediaServerError(res, err);

    });
}

const getUserMedia = (req, res) => {
    const user_id = Id.decode(req.params.user_id)[0];
    return User.findOne({ user_id }, 'username')
        .then((user) => {
            if (user) {
                return user ?
                    Media.find({ username: user.username }, (err, media) => {
                        return Reply.mediaRetrieveSuccess(res, media);
                    }) :
                    userNotFound(res);
            }
        })
        .catch(err => Reply.mediaServerError(res, err));
}

const getAllMedia = (req, res) => {
    return Media.find({})
        .sort({media_id: -1, created: -1 })
        .then((allMedia) => {
            console.log(allMedia);
            return allMedia.length ?
                Reply.mediaRetrieveSuccess(res, allMedia) :
                Reply.mediaNotFound(res);
        })
        .catch((err) => {
            return Reply.mediaServerError(res, err);
        });
}

export {
    addMedia,
    getAllMedia,
    getMedia,
    getMyMedia,
    getUserMedia,
}
