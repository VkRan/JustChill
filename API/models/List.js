const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title cannot be empty"],
        unique: true,
        minlength: [3, "Title length must be between 3 to 50 characters"],
        maxlength: [50, "Title length must be between 3 to 50 characters"]
    },
    type: String,
    genre: String,
    content: Array,
    movieNames: Array
},

    { timestamps: true }

);

let List = new mongoose.model('List', listSchema);
module.exports = List;