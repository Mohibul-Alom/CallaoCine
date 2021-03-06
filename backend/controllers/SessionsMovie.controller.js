const Session = require('../models/SessionsMovie.model');
const {createSeats, deleteSeat,deleteManySeatsBySessionId} = require('./Seat.controller');

//TODO: arregla la eliminacion de butacas listillo

const sessionGet = async (req, res, next) => {

    try{
        const sessions = await Session.find();

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
        console.error(err);
        return next(err);
    }

}


const sessionPost = async (req, res, next) => {

    const {date,movie,auditorium} = req.body;
    try{
        
        const newSession = new Session({
            date: new Date(date),
            movie,
            auditorium,
        });

        const seats = await createSeats(newSession._id);
    
        if(seats.length === 0) {
            const error = new Error("Error a la hora de crear butacas");
            throw error;
        }
        newSession.seats = seats;

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
        next(myError);
    }
}

const sessionDelete = async (req, res, next) => {

    try{

        const { id } = req.params;

        const session = await Session.findById(id);

        if(session !== null && session !== undefined){
            const deletedSeats = await deleteManySeatsBySessionId(session._id);

            if(deletedSeats){
                const deletedSession = await Session.findByIdAndDelete(id);
                console.log("Eliminado la session con id-->",deletedSession._id);
                return res.status(200).json("Eliminado la session de manera exitosa")
            }else{
                console.log("No hay butacas que eliminar");
                const error = new Error("Error al eliminar las butacas de la session: ",id);
                throw error;
            }
        }else{
            const error = new Error(`No se ha encontrado la session con el id--> ${id}`);
            throw error;
        }

    }catch(err){
        console.log(err);
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
                    `deletePastSession--> eliminar session: ${session.date.toString()}`
                );
                deleteSession(session._id)
            }  
        }
    }catch(err){
        console.log(err)
    }

}

const deleteSession = async(id) => {
    try{

        const session = await Session.findById(id);

        if(session !== null && session !== undefined){
            const deletedSeats = await deleteManySeatsBySessionId(session._id);

            if(deletedSeats){
                const deletedSession = await Session.findByIdAndDelete(id);
                console.log("Eliminado la session con id-->",deletedSession._id);
                return true;
            }else{
                console.log("No hay butacas que eliminar");
                const error = new Error("Error al eliminar las butacas de la session: ",id);
                throw error;
            }
        }else{
            const error = new Error(`No se ha encontrado la session con el id--> ${id}`);
            throw error;
        }

    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    sessionGet,
    sessionGetById,
    sessionPost,
    sessionPut,
    sessionGetByMovie,
    deletePastSession,
    sessionDelete
}