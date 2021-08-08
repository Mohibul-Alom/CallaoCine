const mongoose = require('mongoose');

const {Schema} = mongoose;

const movieSchema = new Schema(
    {
        title:{ type: String, required: true },
        director: {type: String, required: true },
        description:{ type: String, required: true },
        duration:{ type: Number, required: true },
        genere:[String],
    },
    { timestamps: true }
)

const Movies = mongoose.model('Movies',movieSchema);

module.exports = Movies;