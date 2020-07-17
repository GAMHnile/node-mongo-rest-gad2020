const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(process.env.MYTESTENV === 'Test'){
    console.log({env: process.env.MYTESTENV});
    console.log("we're in test mode");
    mongoose.connect('mongodb://localhost/bookAPI-Test');
}else{
    mongoose.connect('mongodb://localhost/bookAPI');
}



const Book = require('./models/book-model');


const bookRouter = require('./routes/bookRouter')(Book);


app.use('/api', bookRouter);


app.get('/',(req,res)=>{
    res.send('You are on my Api');
});

app.server = app.listen(port, ()=>{
    console.log('server running at port ' + port);
});

module.exports = app;