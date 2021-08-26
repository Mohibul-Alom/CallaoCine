const Audotorium = require('../models/Auditorium.model');


const auditoriumGet = async (req, res, next) => {

    try {
        const auditoriums = await Audotorium.find().populate('movie');
        if (auditoriums.length > 0) {
            return res.status(200).json(auditoriums);
        } else {
            const error = new Error('La collection está vacía');
            throw error;
        }

    } catch (error) {
        return next(error);
    }
}

const auditoriumGetByMovie = async (req, res, next) => {

    const { movieId } = req.params;

    try{

        const auditoriums = await Audotorium.find({movie: movieId}).populate('movie');

        if (auditoriums.length > 0) {
            return res.status(200).json(auditoriums);
        } else {
            const error = new Error('La collection está vacía');
            error.status = 404;
            throw error;
        }
    }catch (error) {
        console.error(error);
        return next(error);
    }

}



const auditoriumPost = async (req, res, next) => {

    try {
        const { name, capacity, sessions, movie } = req.body;

        const newAuditorium = new Audotorium(
            {
                name,
                capacity,
                sessions: new Date(sessions),
                movie:movie
            }
        )

        console.log(newAuditorium);

        const createdAuditorium = await newAuditorium.save();
        return res.status(200).json(createdAuditorium)

    }catch (error) {
        console.error(error);
        next(error);
    }

}

const auditoriumMoviePut = async (req, res, next) => { 

    try {
        const auditoriumId = req.body.auditoriumId;
        const movieId = req.body.movieId;
    
        const updatedAuditorium = await Audotorium.findByIdAndUpdate(
            auditoriumId,
          { $push: { movie: movieId } },
          { new: true }
        );
    
        return res.status(200).json(updatedAuditorium);
      } catch (err) {
        next(err);
      }

}

const auditoriumDelete = async (req, res, next) => {
    
    try {
      const { id } = req.body;
      const movieDeleted = await Audotorium.findByIdAndDelete(id);

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
    auditoriumGetByMovie,
    auditoriumPost,
    auditoriumMoviePut,
    auditoriumDelete
}
