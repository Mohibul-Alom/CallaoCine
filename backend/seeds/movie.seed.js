const mongoose = require('mongoose');
const Movie = require('../models/Movies.model');
const db = require('../config/db.config');

const movies = [

    {
        title: 'Batman Begins',
        director: 'Christopher Nolan',
        description: "When his parents are killed, billionaire playboy Bruce Wayne relocates to Asia, where he is mentored by Henri Ducard and Ra's Al Ghul in how to fight evil. When learning about the plan to wipe out evil in Gotham City by Ducard, Bruce prevents this plan from getting any further and heads back to his home. Back in his original surroundings, Bruce adopts the image of a bat to strike fear into the criminals and the corrupt as the icon known as Batman. But it doesn't stay quiet for long.",
        duration: 140,
        genere: ["Action","Suspense"],
        image: 'https://res.cloudinary.com/mohibul-dev/image/upload/v1628677719/Batman-Begins.jpg'

    },
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        description:"Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as 'The Joker' appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to confront everything he believes and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.",
        duration: 152,        
        genere: ["Action","Drama"],
        image: 'https://res.cloudinary.com/mohibul-dev/image/upload/v1628677786/The%20Dark%20Knight.jpg'
    },
    {
        title: 'The Dark Knight Rises',
        director: 'Christopher Nolan',
        description:"Despite his tarnished reputation after the events of The Dark Knight (2008), in which he took the rap for Dent's crimes, Batman feels compelled to intervene to assist the city and its Police force, which is struggling to cope with Bane's plans to destroy the city.",
        duration: 164, 
        genere: ["Action","Drama"],
        image: 'https://res.cloudinary.com/mohibul-dev/image/upload/v1628677911/The%20Dark%20Knight%20Rises.jpg',
        

    },
    {
        title: 'Batman v Superman: Dawn of Justice',
        director: 'Zack Snyder',
        description: `The general public is concerned over having Superman on their planet and letting the "Dark Knight" - Batman - pursue the streets of Gotham. While this is happening, a power-phobic Batman tries to attack Superman. Meanwhile, Superman tries to settle on a decision, and Lex Luthor, the criminal mastermind and millionaire, tries to use his own advantages to fight the "Man of Steel".`,
        duration: 183, 
        genere: ["Action","Aventure"],
        image: 'https://res.cloudinary.com/mohibul-dev/image/upload/v1628678124/Batman%20v%20Superman:%20Dawn%20of%20Justice.jpg'

    },

];

//coneccion con la BBDD para comprobar si existe o no la collection deseada

mongoose
    .connect(db.DB_URL, { useNewUrlParser:true, useUnifiedTopology: true })
    .then( async () => {
        const allMovies = await Movie.find();
        if(allMovies.length){
            //si existe la collection , las elimino
            console.log(`[Find]: Encontradas ${allMovies.length} peliculas`);
            await Movie.collection.drop();
            console.log(`[Delete]: Colección eliminada correctamente...`);

        }else{
            console.log(`[Find]: No se encontraron películas`);
        }

    })
    .catch(error => console.log(`[Error]: Eliminando la coleccion -->`,error))
    .then(async () => {

        await Movie.insertMany(movies);
        console.log(`[Success]: Nuevas películas añadidas con exito...`);
    })
    .catch(error => console.log(`[Error]: Añadiendo las películas --->`,error))
    .finally(()=> mongoose.disconnect());