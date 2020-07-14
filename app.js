const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/bookAPI');

const Book = require('./models/book-model');


bookRouter.route('/books')
.post((req,res)=>{
    
})
.get((req, res)=>{
    const query = {}
    if(req.query.genre){
        query.genre = req.query.genre;
    }
    Book.find(query, (err, books)=>{
        if(err) return res.send(err);

        res.json(books);
    })
});

bookRouter.route('/books/:bookId')
.get((req, res)=>{

  
    Book.findById(req.params.bookId, (err, books)=>{
        if(err) return res.send(err);

        res.json(books);
    })
})

app.use('/api', bookRouter);


app.get('/',(req,res)=>{
    res.send('You are on my Api');
})

app.listen(port, ()=>{
    console.log('server running at port ' + port);
})