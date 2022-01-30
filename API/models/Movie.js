const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title cannot be empty"],
        unique: true,
        minlength: [3, "Title length must be between 3 to 50 characters"],
        maxlength: [50, "Title length must be between 3 to 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"],
        minlength: [5, "Description must be of atmost 5 characters"]
    },
    image: {
        type: String,
        required: [true, "Provide an image"]
    },
    imageSm: String,
    imageTitle: String,
    trailer: String,
    video: String,
    year: String,
    limit: Number,
    genre: String,
    isSeries: {
        type: Boolean,
        default: true
    }
},

    { timestamps: true }

);

let Movie = new mongoose.model('Movie', movieSchema);
module.exports = Movie;