//imports
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db.config');
db.connect();

//rutas
const movieRoutes = require('./routes/Movie.routes');


const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use('/',router);
app.use('/movies',movieRoutes);


router.get('/',(req,res) => {
    res.send("Hola")
});

//para controlar paginas que no existe
app.use('*',(req,res,next) => {
    const error = new Error('Página no encontrada');
    return res.status(404).json(error.message);
})

app.use((error,req,res,next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})


app.listen(PORT,() => {
    console.log(`Server runnig in http://localhost:${PORT}`);
});