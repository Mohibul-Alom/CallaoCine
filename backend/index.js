//imports
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db.config');
db.connect();

//rutas
const movieRoutes = require('./routes/Movie.routes');
const auditoriumRoutes = require('./routes/Auditorium.routes')
const ticketRoutes = require('./routes/Ticket.routes')
const seatRoutes = require('./routes/Seat.routes')


const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',router);
app.use('/movies',movieRoutes);
app.use('/auditorium',auditoriumRoutes);
app.use('/ticket',ticketRoutes);
app.use('/seat',seatRoutes);

router.get('/',(req,res) => {
    const myRoutes = [
        {
            "route":"/movies",
            "description":"se ecuentra toda las pelicuas con su respectivo CRUD"
        },
        {
            "route":"/auditorium",
            "description":"se ecuentra todas las salas con su respectivo CRUD"
        },
        {
            "route":"/ticket",
            "description":"se ecuentra todas los tickets con su respectivo CRUD"
        },
        {
            "route":"/seat",
            "description":"se ecuentra todas los asientos con su respectivo CRUD"
        }

    ]
    res.status(200).json(myRoutes);
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