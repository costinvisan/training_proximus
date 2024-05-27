const { error } = require("console");
const db = require("../db/database");
const express = require('express');
const router  = express.Router();

router.post('/books', (req, res) => {
    try {
        const book = db.insertIntoDb(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/book/:id', (req, res) => {
    try{
        const book = db.getFromDbById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get('books-by-author', (req, res) => {
    try{
        const books = db.getFromDbByAuthor(req.query.author);
        res.status(200).json(books);
    }catch(error){
        res.status(404).send(error.message);
    }
});

router.get('/all-books' ,(req,res) => {
    try{
        const books = db.getAllFromDb();
        res.status(200).json(books);
    }catch{
        res.status(400).send(error.message);
    }

});

router.put('/book/:id', (req,res) => {
    try{
        const book = db.updateById(req.params.id, req.body);
        res.status(200).json(book);
    }catch{
        res.status(400).send(error.message);
    }
});

router.delete('/book/:id', (req,res) => {
    try{
        db.removeFromDbById(req.params.id);
        res.status(200).json("Book deleted");
    }catch{
        res.status(404).send(error.message);
    }
});

router.delete('/book/:author', (req,res) => {
    try{
        db.removeFromDbByAuthor(req.params.author);
        res.status(200).json("Book deleted");
    }catch{
        res.status(404).send(error.message);
    }
});

router.delete('/db', (req,res) => {
    try{
        db.purgeDb();
        res.status(200).json("DB deleted");
    }catch{
        res.status(404).send(error.message);
    }
});


module.exports = router;
