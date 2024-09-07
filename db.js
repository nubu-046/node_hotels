const mongoose = require('mongoose');

//1.Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' //hotels is database name

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
