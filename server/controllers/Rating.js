import Rating from '../models/Rating';
import { getMedia } from '../controllers/Media';

import { decode } from '../helpers/Token';
import { ratingCreateError, alreadyRatedError } from '../helpers/response/Media';

const addRating = (req, res) => {
    const token = req.body.token || req.params.token || req.headers.token;
    const decodedToken = decode(token);
    const media_id = req.body.media_id || req.params.media_id;
    const score = Number(req.body.score);
    const username = decodedToken.username;

    const ratingData = new Rating({
        media_id,
        username,
        score,
    });
    return Rating.find({ username, media_id })
        .then((rating) => {
            console.log(rating);
            if (rating.length) {
                return alreadyRatedError(res);
            } else {
                return ratingData.save((err, rating) => {
                    if(!err) {
                        return getMedia(req, res);
                    }
                    return ratingCreateError(res);
                })
            }
        })
    
}

export {
    addRating,
}