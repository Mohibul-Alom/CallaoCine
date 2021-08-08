const Ticket = require('../models/Ticket.model');


const ticketGet = async (req, res, next) => {

    try {
        
        const tickets = await Ticket.find().populate(
            {

            path: 'auditorium',

            populate: { path: 'movie' }

            }
        );
        if (tickets.length > 0) {
            return res.status(200).json(tickets);
        } else {
            const error = new Error('La collection tickets está vacía');
            throw error;
        }

    } catch (error) {
        next(error);
    }

}

const ticketPost = async (req, res, next) => {

    try {
        const { hasPaid, num, timeLeft, day, auditorium } = req.body;

        const newTicket = new Ticket(
            {
                hasPaid: hasPaid==="false"? false:true, 
                num, 
                timeLeft, 
                day:new Date(day), 
                auditorium
            } 
        )

        console.log(newTicket);

        const createdTicket = await newTicket.save();
        return res.status(200).json(createdTicket)

    }catch (error) {
        next(error);
    }

}

const ticketPut = async (req, res, next) => {

}

const ticketDelete = async (req, res, next) => {

}

module.exports = {
    ticketGet,
    ticketPost,
    ticketPut,
    ticketDelete
}