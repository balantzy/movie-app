const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieId: {
        type: String,
    },
    review:{
        type: String,
        required: [true, 'review must be provided']
    },
    user:{
        type: String,
        required: [true, 'User name must be provided']
    },
})

module.exports = mongoose.model('Review', reviewSchema)