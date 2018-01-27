import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const AutoIncrement = autoIncrement(mongoose);
const Schema = mongoose.Schema;

const Rating = new Schema({
    media_id: {
        type: String,
    },

    username: {
        type: String
    },
    score: {
        type: Number,
        min: [1],
        max: [5]
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

Rating.plugin(AutoIncrement, { inc_field: 'rating_id' });
module.exports = mongoose.model('Rating', Rating);