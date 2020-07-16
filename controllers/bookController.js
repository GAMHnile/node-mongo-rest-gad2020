const bookController =(Book)=>{
    const get = (req, res) => {
        const query = {};
        if (req.query.genre) {
          query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
          if (err) return res.send(err);
  
          res.json(books);
        });
      }

    const post = (req, res) => {
        const book = new Book(req.body);
        book.save((err)=>{
          if(err) return res.send(err);
  
          return res.status(201).json(book);
        });
        
      }

    return {get, post}
}

module.exports = bookController