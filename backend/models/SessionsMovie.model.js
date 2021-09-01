const mongoose = require('mongoose');

const {Schema} = mongoose;

const sessionMovieSchema = new Schema(
    {
        date: {type:Date, required: true},
        movie:{type:mongoose.Types.ObjectId,ref:'Movies'},
        seats: [{type:mongoose.Types.ObjectId,ref:'Seats'}],
        auditorium: {type:mongoose.Types.ObjectId,ref:'Auditoriums'},
    },
    {timestamps: true}    
)

const SessionMovie = mongoose.model("SessionsMovie",sessionMovieSchema);

module.exports = SessionMovie;