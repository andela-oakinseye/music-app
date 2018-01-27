import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const AutoIncrement = autoIncrement(mongoose);
const Schema = mongoose.Schema;

const Comment = new Schema({
    media_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    text: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

Media.plugin(AutoIncrement, { inc_field: 'comment_id' });
module.exports = mongoose.model('Comment', Comment);