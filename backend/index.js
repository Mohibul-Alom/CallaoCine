//imports
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const Mongostore = require('connect-mongo');
const auth = require('./auth');
const cors = require('cors');
const cron = require('node-cron'); // task scheduler for running code given a interval

const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db.config');
db.connect();

//ejecutar una funcion todos los dias a las 10:00 de la mañana o cada 30 segundos (comentado por defecto)
const controller = require('./controllers/SessionsMovie.controller');

// cron.schedule("*/30 * * * * *", function() {
//     console.log("running a task every 30 seconds");
//     controller.deletePastSession();
// });

cron.schedule('0 10 * * *', () => {
    console.log('Running a delete auditorium session at 10:00 at Europe/Amsterdam timezone');
    controller.deletePastSession();
}, {
    scheduled: true,
    timezone: "Europe/Amsterdam"
});
  


//rutas
const movieRoutes = require('./routes/Movie.routes');
const auditoriumRoutes = require('./routes/Auditorium.routes')
const ticketRoutes = require('./routes/Ticket.routes')
const seatRoutes = require('./routes/Seat.routes');
const authRoutes = require('./routes/Auth.routes');
const userRoutes = require('./routes/User.routes');
const sessionRoutes = require('./routes/SessionMovie.routes');


const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  /**
   * Abrimos la url con CORS desde la que recibimos peticiones
   */
   app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true,
  }));
  


//para el auth
auth.setStrategies();

//para generar cookies
app.use(session(
    {
        secret: process.env.Secret || "casaca!$$@OO124", //--> cambia esto si no quieres ser hakeado!!!!
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 2*60*60*1000,
        },
        store: Mongostore.create({mongoUrl:db.DB_URL}),
    }
));

//para usar el passporte
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',router);
app.use('/movies',movieRoutes);
app.use('/auditorium',auditoriumRoutes);
app.use('/ticket',ticketRoutes);
app.use('/seat',seatRoutes);
app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/session',sessionRoutes);


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