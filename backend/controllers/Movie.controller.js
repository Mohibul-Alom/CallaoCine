const Movies = require('../models/Movies.model');


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
        
        const newMovie = new Movies(
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

const moviesPut = async (req, res, next)=>{

    try {
        const { id, title, director,description,duration,genere} = req.body;

        const update = {};
    
        if (title) update.title = title;
        if (director) update.director = director;
        if (description) update.description = description;
        if (duration) update.duration = Number(duration);
        if (genere) update.genere = genere;
    
        const updateMovie = await Movie.findByIdAndUpdate(
          id,
          update,
          { new: true } // Usando esta opción, conseguiremos el documento actualizado cuando se complete el update
        );
        return res.status(200).json(updateMovie);
      } catch (error) {
        const myError = new Error("[Error] no se ha podido modificar los datos");
    
        return next(myError);
      }

}

const moviesDelete = async (req, res, next) => {
    
    try {
      const { id } = req.body;
      const movieDeleted = await Movies.findByIdAndDelete(id);

      if (!movieDeleted) {
        return res.status(404).json("false");
      } else {
          return res.status(200).json("true");
      }
    } catch (error) {
      return next(error);
    }
};

const movieFindByName = async (req, res) => {
    
    try {
      const { name } = req.params;
      const movies = await Movies.find({title:{'$regex' : name, '$options' : 'i'}})
  
      if (movies.length === 0) {
        const error = new Error("Pelicula no encontrada");
        throw error;
      }
  
      return res.status(200).json(movies);
  
    } catch (error) {
      console.log("Error buscando peliculas->", error);
      return next(error);
    }
};

module.exports =  {
    moviesGet,
    moviesPost,
    moviesPut,
    moviesDelete,
    movieFindByName      
};