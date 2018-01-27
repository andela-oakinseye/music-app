import Comment from '../models/Comment';

import { getMedia } from '../controllers/Media';

import { decode } from '../helpers/Token';
import { commentCreateError } from '../helpers/response/Media';
import { request } from 'http';

const addComment = (req, res) => {
    const token = req.body.token || req.params.token || req.headers.token;
    const decodedToken = decode(token);
    const media_id = req.body.media_id || request.params.media_id;
    const media_name = req.body.media_name;
    const text = req.body.text;
    const firstname = decodedToken.firstname;
    const username = decodedToken.username

    const commentData = new Comment({
        media_id,
        username,
        firstname,
        text,
    });

    return commentData.save((err, comment) => {
        if(!err) {
            return getMedia(req, res);
        }
        return commentCreateError(res);
    })
}


export {
    addComment,
}