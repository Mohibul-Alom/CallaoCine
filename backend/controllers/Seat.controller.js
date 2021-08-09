const Seat = require("../models/Seat.model");

const seatGet = async (req, res, next) => {
  try {
    const seats = await Seat.find();
    if (seats.length > 0) {
      return res.status(200).json(seats);
    } else {
      const error = new Error("La collection seats está vacía");
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const seatPost = async (req, res, next) => {
  try {
    const { row, number, price, booked } = req.body;

    const newSeat = new Seat({
      row,
      number,
      price,
      booked: booked === "false" ? false : true,
    });

    const createdTicket = await newSeat.save();
    return res.status(200).json(createdTicket);
  } catch (error) {
    next(error);
  }
};

const seatPut = async (req, res, next) => {
  try {
    const { id, row, number, price, booked } = req.body;

    const update = {};

    if (row) update.row = row;
    if (number) update.number = number;
    if (price) update.price = price;
    if (booked) update.booked = booked;

    const updateSeat = await Seat.findByIdAndUpdate(
      id,
      update,
      { new: true } // Usando esta opción, conseguiremos el documento actualizado cuando se complete el update
    );
    return res.status(200).json(updateSeat);
  } catch (error) {
    next(error);
  }
};

const seatDelete = async (req, res, next) => {
  try {
    const { id } = req.body;
    const seatDeleted = await Seat.findByIdAndDelete(id);

    if (!seatDeleted) {
      return res.status(404).json("false");
    } else {
      return res.status(200).json("true");
    }
  } catch (error) {
    return next(error);
  }
};


const seatUpdate = async (id,newState) => {

  try {
      
      const update = {};

      update.booked = newState;

      const  updateSeat = await Seat.findByIdAndUpdate(
        id,
        update,
        {new:true}
      );

      return res.status(200).json(updateSeat);


  } catch (error) {
    const error = new Error('Error cambiando el estado de butacas');
    return error;
  }

}

module.exports = {
  seatGet,
  seatPost,
  seatPut,
  seatDelete,
  seatUpdate
};
