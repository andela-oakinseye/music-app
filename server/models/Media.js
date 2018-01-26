import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const AutoIncrement = autoIncrement(mongoose);
const Schema = mongoose.Schema;

const Media = new Schema({
    title: {
        type: String,
        required: 'Media title is required',
        min: 2,
        max: 40
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    type: {
        type: String,
        required: 'Please provide media type'
    },
    link: {
        type: String,
        required: 'Please provide a valid media link'
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

Media.plugin(AutoIncrement, { inc_field: 'media_id' });
module.exports = mongoose.model('Media', Media);