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