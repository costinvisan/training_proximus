const express = require('express');

const BookRepository = require('../../Infrastructure/PostgreSQL/Repository/BookRepository.js');
const ServerError = require('../Models/ServerError.js');
const {BookPostBody, BookResponse, BookPutBody, BookAllDetailsResponse} = require('../Models/Book.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/', async (req, res) => {
    try{
        const bookBody = new BookPostBody(req.body);
        const book = await  BookRepository.addAsync(bookBody.name, bookBody.authorId);
        ResponseFilter.setResponseDetails(res, 201, new BookResponse(book), req.originalUrl);
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});


Router.get('/', async (req, res) => {
    try{
        const books = await BookRepository.getAllAsync();
        ResponseFilter.setResponseDetails(res, 200, books.map(book => new BookResponse(book)));
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});


Router.get('/:id', async (req, res) => {

    const id = parseInt(req.params.id);

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
       
    const book = await BookRepository.getByIdAsync(id);
    
    if (!book) {
        throw new ServerError(`Book with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new BookAllDetailsResponse(book));
});


Router.put('/:id', async (req, res) => {
    try{
        const bookBody = new BookPutBody(req.body, req.params.id);
        const book = await BookRepository.updateByIdAsync(bookBody.Id, bookBody.Name, bookBody.AuthorId);
        
        if (!book) {
            throw new ServerError(`Book with id ${id} does not exist!`, 404);
        }
        ResponseFilter.setResponseDetails(res, 200, new BookResponse(book));
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});


Router.delete('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
    
        if (!id || id < 1) {
            throw new ServerError("Id should be a positive integer", 400);
        }
        
        const book = await BookRepository.deleteByIdAsync(id);
        
        if (!book) {
            throw new ServerError(`Book with id ${id} does not exist!`, 404);
        }
    
        ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});

module.exports = Router;
