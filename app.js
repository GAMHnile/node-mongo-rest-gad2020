const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/bookAPI');

const Book = require('./models/book-model');


const bookRouter = require('./routes/bookRouter')(Book);


app.use('/api', bookRouter);


app.get('/',(req,res)=>{
    res.send('You are on my Api');
})

app.listen(port, ()=>{
    console.log('server running at port ' + port);
})