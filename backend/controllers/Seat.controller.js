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

    const createdSeat = await newSeat.save();
    return res.status(200).json(createdSeat);
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

      return await Seat.findByIdAndUpdate(
        id,
        update,
        {new:true}
      );

  } catch (error) {
    console.log("Error reservando una butaca");
    return false;
  }

}

const createSeats = async () => {

  const seats = [];
  const rows = ["A","B","C","D","E","F","G","H"];
  const number = [1,2,3, 4,5,6,7,8];


  try {

    for (let i = 0; i < rows.length; i++) {

      for (let j = 0; j < number.length; j++) {
          const newSeat = new Seat({
            row: rows[i],
            number: number[j],
            price: 10,
            booked: false,
          });
          const createdSeat = await newSeat.save();
          seats.push(createdSeat);
      }

    }
    return seats;

  }catch (error) {
    console.log(error);
  }
}

module.exports = {
  seatGet,
  seatPost,
  seatPut,
  seatDelete,
  seatUpdate,
  createSeats
};
