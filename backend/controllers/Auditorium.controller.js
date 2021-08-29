const Auditorium = require("../models/Auditorium.model");

const auditoriumGet = async (req, res, next) => {
  try {
    // const auditoriums = await Auditorium.find().populate("movie");

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

const auditoriumGetByMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const auditoriums = await Auditorium.find({ movie: movieId });

    if (auditoriums.length > 0) {
        //TODO: filer the session
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
    const { name, capacity, sessions, movie } = req.body;

    const newAuditorium = new Auditorium({
      name,
      capacity,
      sessions: new Date(sessions),
      movie: movie,
    });

    console.log(newAuditorium);

    const createdAuditorium = await newAuditorium.save();
    return res.status(200).json(createdAuditorium);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const auditoriumMoviePut = async (req, res, next) => {
  try {
    const { auditoriumId } = req.body;
    let session = req.body.session;

    session = new Date(session);
    console.log(session);

    const updatedAuditorium = await Auditorium.findByIdAndUpdate(
      auditoriumId,
      { $addToSet: { sessions: session } },
      { new: true }
    );

    return res.status(200).json(updatedAuditorium);
  } catch (err) {
    console.log(err);
    next(err);
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

const auditoriumDeletePastSession = async () => {
  try {
    const auditoriums = await Auditorium.find();

    const today = new Date();

    for (let i = 0; i < auditoriums.length; i++) {
      const auditorium = auditoriums[i];

      for (let j = 0; j < auditorium.sessions.length; j++) {
        const session = auditorium.sessions[j];

        if (today >= session) {
          console.log(
            "auditoriumDeletePastSession--> Found 1 session to delete"
          );
          const auditoriumChanged = await Auditorium.findByIdAndUpdate(
            auditorium._id,
            { $pull: { sessions: session } },
            { new: true }
          );
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  auditoriumGet,
  auditoriumGetByMovie,
  auditoriumPost,
  auditoriumMoviePut,
  auditoriumDelete,
  auditoriumDeletePastSession,
};
