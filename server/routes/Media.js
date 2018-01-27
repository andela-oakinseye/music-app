import * as Media from '../controllers/Media';
import * as Comment from '../controllers/Comment';
import * as Rating from '../controllers/Rating';

const addMedia = Media.addMedia;
const getMedia = Media.getMedia;
const getMyMedia = Media.getMyMedia;
const getUserMedia = Media.getUserMedia;
const getAllMedia = Media.getAllMedia;


const addComment = Comment.addComment;
const addRating = Rating.addRating;

export {
    addComment,
    addMedia,
    addRating,
    getMedia,
    getMyMedia,
    getUserMedia,
    getAllMedia,
}