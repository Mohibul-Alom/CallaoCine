const Ticket = require("../models/Ticket.model");
const controllerSeat = require("./Seat.controller");


//TODO: arregla la eliminacion de tickets y de paso el modelo de ticket

const ticketGet = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('auditorium').populate('seat');
    if (tickets.length > 0) {
      return res.status(200).json(tickets);
    } else {
      const error = new Error("La collection tickets está vacía");
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const ticketGetById = async (req, res, next) => {

  try{

    const { id } = req.params;

    const ticket = await Ticket.findById(id).populate('auditorium').populate('seat').populate('movie');

    if(ticket !== null && ticket !== undefined) {

      return res.status(200).json(ticket);
    }else{
      const error = new Error("No se ha podido encontrar el ticket");
      throw error;
    }

  }catch (error) {
    next(error);
  }


}

const ticketPost = async (req, res, next) => {
  try {

    const { hasPaid, timeLeft, day, auditorium, seat,movie } = req.body;

    const newTicket = new Ticket({
      hasPaid: hasPaid === "false" ? false : true,
      timeLeft,
      day: new Date(day),
      auditorium,
      seat,
      movie 
    });

    //change seat booked state --> true
    const updatedSeat = await controllerSeat.seatUpdate(seat,true);

    if(updatedSeat === null || updatedSeat === undefined){
      const error = new Error ("Error no se ha podido reservar la butaca");
      throw error;
    }

    const createdTicket = await newTicket.save();
    return res.status(200).json(createdTicket);

  } catch (error) {
    next(error);
  }
};

const ticketPut = async (req, res, next) => {
  try {
    const { id, hasPaid, num, timeLeft, day, auditorium } = req.body;

    const update = {};

    //recuerda mandar un string en hasPaid
    if (hasPaid) update.hasPaid = hasPaid;
    if (num) update.num = num;
    if (timeLeft) update.timeLeft = Number(timeLeft);
    if (day) update.day = new Date(day);
    if (auditorium) update.auditorium = auditorium;

    const updateTicket = await Ticket.findByIdAndUpdate(
      id,
      update,
      { new: true }
    );
    return res.status(200).json(updateTicket);
  } catch (error) {
    const myError = new Error(
      "[Error] no se ha podido modificar los datos de ticket"
    );
    return next(myError);
  }
};

const ticketDelete = async (req, res, next) => {
  try {
    const { id } = req.body;

    const ticket = await Ticket.findById(id);

    if(ticket === null) {
      throw new Error("Error buscando ticket");
    }

    const seatId = ticket.seat;

    const seatModified = controllerSeat.seatUpdate(seatId,false);

    if(seatModified === null) throw new Error("Error modificando la butaca");

    const ticketDeleted = await Ticket.findByIdAndDelete(id);

    if (!ticketDeleted) {
      return res.status(404).json("El elemento no existe");
    } else {
      return res.status(200).json(ticketDeleted);
    }
  } catch (error) {
    return next(error);
  }
};

const deleteTicket = async(ticketId) =>{

  try {

    const ticket = await Ticket.findById(ticketId);

    if(ticket === null || ticket === undefined) {
      throw new Error("Error buscando ticket, ticket no encontrado");
    }

    const seatId = ticket.seat;

    const seatModified = controllerSeat.seatUpdate(seatId,false);

    if(seatModified === null || seatModified === undefined) throw new Error("Error modificando la butaca");

    const ticketDeleted = await Ticket.findByIdAndDelete(ticketId);

    if (!ticketDeleted) {
     return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }

}

module.exports = {
  ticketGet,
  ticketPost,
  ticketPut,
  ticketDelete,
  deleteTicket,
  ticketGetById
};
