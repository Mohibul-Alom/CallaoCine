const mongoose = require('mongoose');

const { Schema } = mongoose;

const auditoriumSchema = new Schema(
    {
        name: {type: String ,required: true},
        capacity: {type: Number ,required: true, default:100},
        sessions: [{type: Date ,required: true}],
        movie: {type:mongoose.Types.ObjectId,ref:'Movies'},
        seats: {type:mongoose.Types.ObjectId,ref:'Seats'}
    },
    {timestamps: true}
)

const Auditorium = mongoose.model('Auditoriums',auditoriumSchema);

module.exports = Auditorium;