const Session = require('../models/SessionsMovie.model');
const {createSeats, deleteSeat} = require('./Seat.controller');


const sessionGet = async (req, res, next) => {

    try{
        const sessions = await Session.find().populate('seats');

        if(sessions.length > 0){
            return res.status(200).json(sessions);
        }else{
            const error = new Error("La collection está vacía");
            throw error;
        }

    }catch(err){
        return next(err);
    }

}

const sessionGetById = async (req, res, next) => {

    const { id } = req.params;

    try{
        const session = await Session.findById(id).populate('seats');
        if(session !==null && session !==undefined){
            return res.status(200).json(session);
        }else{
            const error = new Error("No se ha econtrado la session");
            throw error;
        }

    }catch(err){
        return next(err);
    }

}

const sessionGetByMovie = async (req, res, next) => {

    const { movieId } = req.params;

    try{
        const sessions = await Session.find({movie:movieId});

        if(sessions.length > 0){
            return res.status(200).json(sessions);
        }else{
            const error = new Error("La collection está vacía");
            error.status = 404;
            throw error;
        }
    }catch(err){
        console.error(error);
        return next
    }

}


const sessionPost = async (req, res, next) => {

    const {date,movie,auditorium} = req.body;
    try{
        const seats = await createSeats();
    
        if(seats.length === 0) {
            const error = new Error("Error a la hora de crear butacas");
            throw error;
        }

        const newSession = new Session({
            date: new Date(date),
            movie,
            seats: seats,
            auditorium,
        });

        const createdSession = await newSession.save();
        return res.status(200).json(createdSession);

    }catch(err){
        return next(err);
    }
}


const sessionPut = async (req, res, next) => {

    const {id,date,movie,auditorium} = req.body;

    try{
        const update = {};

        if(date) update.date = new Date(date);
        if(movie) update.movie = movie;
        if(auditorium) update.auditorium = auditorium;

        const updateSession = await Session.findByIdAndUpdate(
            id,
            update,
            {new:true},
        );
        return res.status(200).json(updateSession);
    }catch(err){
        const myError = new Error("[Error] no se ha podido modificar los datos");
        next(err);
    }
}

const sessionDelete = async (req, res, next) => {

    try{

        //TODO: para el senior

        // const { id } = req.params;

        // const session = await Session.findById(id);

        // session.seats.forEach(element => {
        //     const deletedSeat = deleteSeat(element);
        //     if(!deletedSeat) throw new Error("Error al eliminar una butaca")
        // });

    }catch(err){
        next(err);
    }
}

const deletePastSession = async() => {

    try{
        const sessions = await Session.find();
        const today = new Date();

        for (let i = 0; i < sessions.length; i++) {
            const session = sessions[i];

            if(today >= session.date){
                console.log(
                    "deletePastSessions--> Found 1 session to delete"
                );
                const deletedSession = await Session.findByIdAndRemove(session._id);
            }  
        }
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    sessionGet,
    sessionGetById,
    sessionPost,
    sessionPut,
    sessionGetByMovie,
    deletePastSession
}