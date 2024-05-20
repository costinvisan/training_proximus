const express = require('express');

const BooksPublishersRepository = require('../../Infrastructure/PostgreSQL/Repository/BooksPublishersRepository.js');
const ServerError = require('../Models/ServerError.js');
const { BookPublisherPostBody, BookPublisherPutBody, BookPublisherResponse } = require('../Models/BookPublisher.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/:id/publishers', async (req, res) => {

    const bookPublisherBody = new BookPublisherPostBody({...req.body, bookId: req.params.id});

    const bookPublisher = await BooksPublishersRepository.addAsync(bookPublisherBody.bookId, bookPublisherBody.publisherId, bookPublisherBody.price);
        
    if (!bookPublisher) {
        throw new ServerError(`Book with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new BookPublisherResponse(bookPublisher));
});

Router.put('/:bookId/publishers/:publisherId', async (req, res) => {

    const bookPublisherBody = new BookPublisherPutBody({...req.body, bookId: req.params.bookId, publisherId: req.params.publisherId});

    const bookPublisher = await BooksPublishersRepository.updateByIdAsync(bookPublisherBody.bookId, bookPublisherBody.publisherId, bookPublisherBody.price);
        
    if (!bookPublisher) {
        throw new ServerError(`Book with id ${bookId} and publisher id ${publisherId} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new BookPublisherResponse(bookPublisher));
});

Router.delete('/:bookId/publishers/:publisherId', async (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const publisherId = parseInt(req.params.publisherId);

    if (!bookId || bookId < 1) {
        throw new ServerError("Book Id should be a positive integer", 400);
    }

    if (!publisherId || publisherId < 1) {
        throw new ServerError("Publisher Id should be a positive integer", 400);
    }
    
    const bookPublisher = await BooksPublishersRepository.deleteByIdAsync(bookId, publisherId);
    
    if (!bookPublisher) {
        throw new ServerError(`Book with id ${bookId} and publisher id ${publisherId} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
});

module.exports = Router;