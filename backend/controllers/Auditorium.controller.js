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

const auditoriumPost = async (req, res, next) => {

    console.log("HOLA???")

    try {
        const { name, capacity, sessions, reservations, movie } = req.body;

        console.log(movie)

        const newAuditorium = new Audotorium(
            {
                name,
                capacity,
                sessions: new Date(sessions),
                reservations
            }
        )

        console.log(newAuditorium);

        const createdAuditorium = await newAuditorium.save();
        return res.status(200).json(createdAuditorium)

    }catch (error) {
        next(error);
    }

}


const auditoriumPut = async (req, res, next) => { 

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

module.exports = {
    auditoriumGet,
    auditoriumPost,
    auditoriumPut
}
