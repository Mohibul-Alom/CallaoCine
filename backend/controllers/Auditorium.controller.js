const Auditorium = require("../models/Auditorium.model");

const auditoriumGet = async (req, res, next) => {
  try {
    
    const auditoriums = await Auditorium.find();

    if (auditoriums.length > 0) {
      return res.status(200).json(auditoriums);
    } else {
      const error = new Error("La collection está vacía");
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};


const auditoriumGetByName = async (req, res, next) => {
  const { name } = req.params;

  try {
    const auditoriums = await Auditorium.find({ name: name });

    if (auditoriums.length > 0) {
      return res.status(200).json(auditoriums);
    } else {
      const error = new Error("La collection está vacía");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const auditoriumPost = async (req, res, next) => {
  try {
    const { name, capacity } = req.body;

    const newAuditorium = new Auditorium({
      name,
      capacity,
    });

    const createdAuditorium = await newAuditorium.save();
    return res.status(200).json(createdAuditorium);
  } catch (error) {
    console.error(error);
    next(error);
  }
};



const auditoriumDelete = async (req, res, next) => {
  try {
    const { id } = req.body;
    const movieDeleted = await Auditorium.findByIdAndDelete(id);

    if (!movieDeleted) {
      return res.status(404).json("false");
    } else {
      return res.status(200).json("true");
    }
  } catch (error) {
    return next(error);
  }
};



module.exports = {
  auditoriumGet,
  auditoriumGetByName,
  auditoriumPost,
  auditoriumDelete,
};
