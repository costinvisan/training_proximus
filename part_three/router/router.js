const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Middleware to parse JSON
router.use(express.json());

//insert a book in DB
router.post('/books', (req, res) => {
    try {
        const insertedBook = db.insertIntoDb(req.body);
        res.status(201).json(insertedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get book by id given as a path parameter
router.get('/books/:id', (req, res) => {
    try {
        const book = db.getFromDbById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//get books by author give as a query parameter
router.get('/bookauthor', (req, res) => {
    try {
        const author = req.query.author;
        if (author) {
            const books = db.getFromDbByAuthor(author);
            if (books.length == 0) {
                res.status(404).send("No books found for author: " + author);
            }
            res.status(200).json(books);
        } else {
            res.status(404).send("Author parameter incorrect!");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get all books
router.get('/books', (req, res) => {
    try {
        res.status(200).json(db.getAllFromDb());
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//update book by id
router.put('/books/:id', (req, res) => {
    try {
        const updatedBook = db.updateById(req.params.id, req.body);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//delete a book by id
router.delete('/books/:id', (req, res) => {
    try {
        db.removeFromDbById(req.params.id);
        res.status(200).send("Book with id " + req.params.id + " deleted successfully!");
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//delete book by author
router.delete('/bookauthor', (req, res) => {
    try {
        const author = req.query.author;
        if (author) {
            db.removeFromDbByAuthor(author);
            res.status(200).send("Books successfully deleted from the author: " + author);
        } else {
            res.status(404).json({ error: "Author parameter incorrect!"});
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//delete the database
router.delete('/books', (req, res) => {
    try {
        db.purgeDb();
        res.status(200).send("Database successfully deleted!");
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;

