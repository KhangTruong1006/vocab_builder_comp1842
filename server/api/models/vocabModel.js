const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VocabSchema = new Schema(
    {
        english: {
            type: String,
            require:'English word cannot be blank'
        },

        german: {
            type: String,
            require:'German word cannot be blank'
        }
    },
    {collection: 'vocab'}
);

module.exports = mongoose.model('Vocab',VocabSchema)