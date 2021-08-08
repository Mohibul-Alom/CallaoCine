const mongoose = require('mongoose');

const {Schema} = mongoose;

const seatSchema = new Schema(
    {
        row:{type: String, required: true},
        number:{type: Number, required: true},
        price:{type: Number, required: true, default: 10},
        booked: {type: Boolean, required: true},
    },
    { timestamps: true }
)

const Seat = mongoose.model('Seats',seatSchema);

module.exports = Seat;