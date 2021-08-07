const Movies = require('../models/Movies.model');


const moviesGet = async (req, res, next)=>{

    try{
        const movies = await Movies.find();
        return res.status(200).json(movies);

    }catch(err){
        next(err);
    }
}

const moviesPost = (req, res, next)=>{
    res.status(200).json('Post movies')
}

module.exports =  {
    moviesGet,
    moviesPost
};