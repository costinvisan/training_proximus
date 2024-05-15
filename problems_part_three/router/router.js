const db = require("../db/database");
const express = require('express');
const router = express.Router();

router.post('/book', (req, res) => {
    try{
        const body = req.body;
        const bookInserted = db.insertIntoDb(body);
        res.status(201).send(bookInserted);
    }catch(error){
        return res.status(500).send('Something went wrong');
    }
  });

router.get('/book/:id', (req, res) => {
    try{
         const id = req.params.id;
         const book = db.getFromDbById(id);
         res.status(200).send(book);
    }catch(error){
      return res.status(404).send(error.message);
    }
});

router.get('/book', (req, res) => {
    try{
        const id = req.query.id;
        const book = db.getFromDbById(id);
        res.status(200).send(book);
    }catch(error){
        return res.status(404).send(error.message);
    }
});

router.get('/books', (req, res) => {
    try{
        const books = db.getAllFromDb();
        if(books.length===0) throw Error("Books not found!");
        res.status(200).send(books);

    }catch(error){
        if(error.message==="Books not found!"){
           return res.status(404).send('No books found!');
        }
        return res.status(500).send('Something went wrong');
    }
});

router.put('/book', (req, res) => {
    try{
        const body = req.body;
        const id = req.query.id;
        const book = db.updateById(id,body);
        res.status(200).send(book);
    }catch(error){
        return res.status(404).send('Book not found');
    }
});

router.delete('/book', (req, res) => {
    try{
        const id = req.query.id;
        db.removeFromDbById(id);
        res.status(200).send("Book deleted successfully!");
    }catch(error){
        return res.status(404).send('Book not found');
    }
});

router.delete('/book/author', (req, res) => {
    try{
        const author = req.query.author;
        db.removeFromDbByAuthor(author);
        res.status(200).send(`Books deleted successfully for author ${author}!`);
    }catch(error){
        return res.status(404).send('Books not found');
    }
});

router.delete('/database', (req, res) => {
    try{
        db.purgeDb();
        res.status(200).send("Database deleted successfully");
    }catch(error){
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;