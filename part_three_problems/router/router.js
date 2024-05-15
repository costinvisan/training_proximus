const express = require('express');
const router = express.Router();
const database = require('../db/database');
 
router.post('/book', (req, res) => {
  try {
    const book = req.body;
    const book2 = database.insertIntoDb(book);
    return res.status(200).send(book2);
  }catch(err) {
    return res.status(400).send("There is a problem! Try again!");
  }
});

router.get("/book/:id", (req, res) => {
  try{
    const book = database.getFromDbById(req.params.id);
    return res.status(200).send(book);
  }catch(err) {
    return res.status(400).send(err.message);
  }
})
 
router.get('/books-by-author', (req, res) => {
  try{
    const author = req.query.author;
    const books = database.getFromDbByAuthor(author);
    return res.status(200).send(books);
  }catch(err){
    return res.status(400).send("There is a problem! Try again!");
  }
})

router.get('/all-books', (req, res) => {
  try{
    const books = database.getAllFromDb();
    return res.status(200).send(books);
  }catch(err){
    return res.status(400).send("There is a problem! Try again!");
  }
})

router.put('/book/:id', (req, res) => {
  try{
    const id = req.params.id;
    const updatedBook = req.body;
    const book = database.updateById(id, updatedBook);
    return res.status(200).send(book);
  }catch(err){
    return res.status(400).send(err.message);
  }
})

router.delete('/book/:id', (req, res) => {
  try{
    const id = req.params.id;
    database.removeFromDbById(id);
    return res.status(200).send("Book removed successfully!");
  }catch(err) {
    return res.status(400).send("There is a problem!");
  }
})

router.delete('/book', (req, res) => {
  try{
    const author = req.query.author;
    database.removeFromDbByAuthor(author);
    return res.status(200).send("Book removed successfully!");
  }catch(err) {
    return res.status(400).send("There is a problem!");
  }
})

router.delete('/database', (req, res) => {
  try{
    database.purgeDb();
    return res.status(200).send("Database removed successfully!");
  }catch(err) {
    return res.status(400).send("There is a problem!");
  }
})
module.exports = router;