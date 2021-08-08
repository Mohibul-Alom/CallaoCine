const Seat = require('../models/Seat.model');

const seatGet = async (req, res, next) => {

    try {
        
        const seats = await Seat.find();
        if(seats.length > 0) {
            return res.status(200).json(seats);
        }else {
            const error = new Error("La collection seats está vacía");
            throw error;
        }

    } catch (error) {
        next(error);
    }

}

const seatPost = async (req, res, next) => {

    try {
        const { row, number, price, booked } = req.body;
    
        const newTicket = new Seat({
            row, 
            number, 
            price, 
            booked: booked ==='false'? false:true,
        });

        const createdTicket = await newTicket.save();
        return res.status(200).json(createdTicket);

      } catch (error) {
        next(error);
      }
}

const seatPut = async (req, res, next) => {

}

const seatDelete = async (req, res, next) => {

}

module.exports = {
    seatGet,
    seatPost,
    seatPut,
    seatDelete
}