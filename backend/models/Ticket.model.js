const mongoose = require('mongoose');

const {Schema} = mongoose;

const ticketSchema = new Schema (
    {
        hasPaid = {type: Boolean,required: true},
        num:{type:Number,required: true},
        timeLeft: {type: Date,required: true},
        day: {type:Date,required: true},
        auditorium : {type:mongoose.Types.ObjectId,ref:'Auditoriums'},
        
    },
    {timestamps: true}
);

const Ticket = mongoose.model('Tickets',ticketSchema);

module.exports = Ticket;