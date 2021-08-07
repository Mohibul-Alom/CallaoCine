
const moviesGet = (req, res,next)=>{

    // res.status(200).json('Get movies')
    const error = new Error('Error provocado');
    error.status = 500;

    next(error);
}

const moviesPost = (req, res, next)=>{
    res.status(200).json('Post movies')
}

module.exports =  {
    moviesGet,
    moviesPost
};