const express = require('express');

const BooksPublishersRepository = require('../../Infrastructure/PostgreSQL/Repository/BooksPublishersRepository.js');
const ServerError = require('../Models/ServerError.js');
const { BookPublisherPostBody, BookPublisherPutBody, BookPublisherResponse } = require('../Models/BooksPublishers.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/books/:id/publishers', async (req, res) => {
    
    const bookId = parseInt(req.params.id);
    const body = new BookPublisherPostBody(req.body);

    const result = await BooksPublishersRepository.addAsync(bookId, body.PublisherId, body.Price);

    ResponseFilter.setResponseDetails(res, 201, new BookPublisherResponse(result), req.originalUrl);
});

Router.put('/books/:bookId/publishers/:publisherId', async (req, res) => {

    const bookId = parseInt(req.params.bookId);
    const publisherId = parseInt(req.params.publisherId);
    const body = new BookPublisherPutBody(req.body, bookId, publisherId);

    const result = await BooksPublishersRepository.updateByIdAsync(body.BookId, body.PublisherId, body.Price);
        
    if (!result) {
        throw new ServerError(`Failed to update!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new BookPublisherResponse(result));
});

Router.delete('/books/:bookId/publishers/:publisherId', async (req, res) => {

    const bookId = parseInt(req.params.bookId);
    const publisherId = parseInt(req.params.publisherId);

    if (!bookId || bookId < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }

    if (!publisherId || publisherId < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
    
    const result = await BooksPublishersRepository.deleteByIdAsync(bookId, publisherId);
    
    if (!result) {
        throw new ServerError(`Failed to delete!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
});

module.exports = Router;