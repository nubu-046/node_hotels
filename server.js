const express = require('express')
const app = express();
const db = require('./db');

require('dotenv').config();



const port = process.env.PORT || 3500;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //store data in req.body

app.get('/',(req, res) => {
    res.send('Welcome to home page of Hotel')
})

//Import the router files
const personRoutes = require('./routes/personRoutes');

//Use the router files
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuRoutes);


app.listen(port, () => {
    console.log('Server Started at port : ' + port)
})