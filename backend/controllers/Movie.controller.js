const Movie = require('../models/Movies.model');


const moviesGet = async (req, res, next)=>{

    try{
        const movies = await Movies.find();
        return res.status(200).json(movies);

    }catch(err){
        return next(err);
    }
}

const moviesPost = async(req, res, next)=>{

    try{

        const { title, director,description,duration,genere } = req.body;
        
        const newMovie = new Movie(
            {
                title, 
                director,
                description,
                duration,
                genere
            }
        );

        const createdMovie = await newMovie.save();

        return res.status(200).json(createdMovie);

    }catch(err) {
        return next(err);
    }
    
}

module.exports =  {
    moviesGet,
    moviesPost
};