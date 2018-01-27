import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const AutoIncrement = autoIncrement(mongoose);
const Schema = mongoose.Schema;

const Comment = new Schema({
    media_id: {
        type: String,
    },

    username: {
        type: String
    },

    firstname: {
        type: String
    },

 
    text: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

Comment.plugin(AutoIncrement, { inc_field: 'comment_id' });
module.exports = mongoose.model('Comment', Comment);