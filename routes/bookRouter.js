const express = require("express");
const booksController = require('../controllers/bookController');

const routes = (Book) => {
  const bookRouter = express.Router();
  const controller =booksController(Book);
  bookRouter
    .route("/books")
    .post(controller.post)
    .get(controller.get);
  //midleware to attach book to req object  
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.send(err);
      if (book) {
        req.book = book;
        return next();
      }
      //if book doesn't exist
      res.sendStatus(404);
    });
  });
  bookRouter.route("/books/:bookId")
    .get((req, res) => {
      const responseBook = JSON.parse(JSON.stringify(req.book));
      responseBook.links = {
        filterByThisGenre: encodeURI(`http://${req.headers.host}/api/books/?genre=${req.book.genre}`)
      }
      return res.json(responseBook);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;

      book.save((err)=>{
        if(err) return res.send(err);

        return res.json(book)          
        });
    })
    .patch((req, res)=>{
        const { book } = req;
        
        if(req.body._id){
            delete req.body._id
        }

        Object.entries(req.body).forEach(item=>{
            key = item[0];
            value = item[1];
            book[key] = value;
        })

        book.save((err)=>{
            if(err) return res.send(err);

            return res.json(book)          
        })

    })
    .delete((req, res)=>{
        req.book.delete((err)=>{
            if(err) return res.send(err);
            return res.sendStatus(204);
        })
    })

  return bookRouter;
};

module.exports = routes;
