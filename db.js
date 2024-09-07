const mongoose = require('mongoose');
require('dotenv').config();

//1.Define the MongoDB connection URL
//const mongoURL = process.env.DB_URL_LOCAL //hotels is database name
const mongoURL = process.env.DB_URL;
//2.Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true //these two mandatory args
});

//3.Get the default connection
//Mongoose maintain a default connection object representing  the MongoDB connecton.
const db = mongoose.connection;
//db object will handle events and intract with the database

//4.Define event listeners-to identify states of db connection
db.on('connected',()=>{
    console.log('Connected to database');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error', err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//5. Export the databas connection
module.exports = db;
