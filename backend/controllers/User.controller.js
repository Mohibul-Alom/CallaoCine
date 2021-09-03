const User = require('../models/User.model');

const {deleteTicket} = require('../controllers/Ticket.controller');

const userGet = async (req, res, next) => {

    try {

        const user = await User.findById(req.user.id);

        if(user !== null) {
            return res.status(200).json(user);
        }else{
            throw new Error("[Error] No se ha encontrado al usuario")
        }

    } catch (error) {
        next(error);
    }

}

const userUpdateTickets = async (req, res, next) => {

    try{

        const {userId,ticketId} = req.body;
        
        const update = {};

        if(ticketId === null || ticketId === undefined) throw new Error("id incorrecto");

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {$addToSet: {tickets: ticketId}},
            {new:true}
        )

        return res.status(200).json(updateUser);
        
    }catch (error) {
        return next(error);
    }
}

const userDeleteTickets = async (req, res, next) => {

    try{

        const { userId, ticketId } = req.body;
        const isTicketDeleted = await deleteTicket(ticketId);
        
        if(isTicketDeleted){

            const updateUser = await User.findByIdAndUpdate(
                userId,
                {$pullAll:{tickets: ticketId}},
                {new:true}
            )
    
            return res.status(200).json(updateUser);

        }else{
            const error = new Error("Error al eliminar el ticket");
            throw error;
        }

    }catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    userGet,
    userUpdateTickets,
    userDeleteTickets,
}