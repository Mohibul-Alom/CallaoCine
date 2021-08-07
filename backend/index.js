const express = require('express');

const PORT = 3000;

const app = express();
const router = express.Router();

app.use('/',router);


router.get('/',(req,res) => {
    res.send("Hola")
});


app.listen(PORT,() => {
    console.log(`Server runnig in http://localhost:${PORT}`);
});