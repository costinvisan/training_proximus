const express = require('express');

const BookPublisherRepository = require('../../Infrastructure/PostgreSQL/Repository/BookPublisherRepository.js');
const ServerError = require('../Models/ServerError.js');
const {BookPublisherPostBody, BookPublisherPutBody, BookPublisherResponse} = require('../Models/BookPublisher.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/books/:id/publishers', async (req, res) => {
    try{
        const bookPublisherBody = new BookPublisherPostBody(req.body);
        const bookPublisher = await  BookPublisherRepository.addAsync(bookPublisherBody.price, bookPublisherBody.publisherId, req.params.id);
        ResponseFilter.setResponseDetails(res, 201, new BookPublisherResponse(bookPublisher), req.originalUrl);    
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});


Router.put('/books/:bookId/publishers/:publisherId', async (req, res) => {
    try{
        const bookPublisherBody = new BookPublisherPutBody(req.body, req.params.bookId, req.params.publisherId);

        const bookPublisher = await BookPublisherRepository.updateByIdAsync(bookPublisherBody.BookId, bookPublisherBody.PublisherId, bookPublisherBody.Price);
        
        if (!bookPublisher) {
            throw new ServerError(`Book with id ${id} does not exist!`, 404);
        }
        ResponseFilter.setResponseDetails(res, 200, new BookPublisherResponse(bookPublisher));
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});

Router.delete('/books/:bookId/publishers/:publisherId', async (req, res) => {
    try{
        const bookId = parseInt(req.params.bookId);
        const publisherId = parseInt(req.params.publisherId);

        if (!bookId || bookId < 1) {
            throw new ServerError("BookId should be a positive integer", 400);
        }
        if (!publisherId || publisherId < 1) {
            throw new ServerError("PublisherId should be a positive integer", 400);
        }
        
        const bookPublisher = await BookPublisherRepository.deleteByIdAsync(publisherId);
        
        if (!bookPublisher) {
            throw new ServerError(`BookPublisher does not exist!`, 404);
        }
    
        ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});

module.exports = Router;