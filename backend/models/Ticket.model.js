const mongoose = require('mongoose');

const {Schema} = mongoose;

const ticketSchema = new Schema (
    {
        hasPaid: {type:Boolean,required: true},
        timeLeft: {type: Number,required: true},
        day: {type: Date,required: true},
        auditorium : {type:mongoose.Types.ObjectId,ref:'Auditoriums'},
        seat: {type:mongoose.Types.ObjectId,ref:'Seats'}
    },
    {timestamps: true}
);

const Ticket = mongoose.model('Tickets',ticketSchema);

module.exports = Ticket;