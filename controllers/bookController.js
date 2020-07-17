const bookController =(Book)=>{
    const get = (req, res) => {
        const query = {};
        if (req.query.genre) {
          query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
          if (err) return res.send(err);
          
          //remove mongoose schema bindings/restrictions and make new copy of books
          const responseBooks = JSON.parse(JSON.stringify(books));
          //add hypermedia to each book
          responseBooks.map(book=>{
            const newBook = book;
            newBook.links={
              findById: `http://${req.headers.host}/api/books/${book._id}`,
              filterByThisGenre: encodeURI(`http://${req.headers.host}/api/books/?genre=${book.genre}`)
            };
            
            return newBook;
          }) 

          res.json(responseBooks);
        });
      }

    const post = (req, res) => {
      if(!req.body.title){
        res.status(400);
        return res.send('Title is required');
      }

        const book = new Book(req.body);
        book.save();
        res.status(201)
        return res.send(book);
      }

    return {get, post}
}

module.exports = bookController