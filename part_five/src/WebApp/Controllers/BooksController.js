const express = require('express');

const BooksRepository = require('../../Infrastructure/PostgreSQL/Repository/BooksRepository.js');
const BooksPublishersRepository = require('../../Infrastructure/PostgreSQL/Repository/BooksPublishersRepository.js');
const ServerError = require('../Models/ServerError.js');
const { BookPostBody, BookPutBody, BookResponse } = require('../Models/Book.js');
const { BooksPublisherPostBody, BooksPublisherPutBody, BooksPublisherResponse } = require('../Models/BooksPublisher.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');
const RoleConstants = require('../Constants/Roles.js');


const Router = express.Router();

Router.post('/', AuthorizationFilter.authorizeRoles(RoleConstants.MANAGER, RoleConstants.ADMIN), async (req, res) => {
    
    const bookBody = new BookPostBody(req.body);

    const book = await BooksRepository.addAsync(bookBody.Name, bookBody.AuthorId);

    ResponseFilter.setResponseDetails(res, 201, new BookResponse(book), req.originalUrl);
});

Router.post('/:id/publishers', AuthorizationFilter.authorizeRoles(RoleConstants.MANAGER, RoleConstants.ADMIN), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
    
    req.body.bookId = id;
    const booksPublisherBody = new BooksPublisherPostBody(req.body);

    const booksPublisher = await BooksPublishersRepository.addAsync(booksPublisherBody.BookId, booksPublisherBody.PublisherId, booksPublisherBody.Price);

    ResponseFilter.setResponseDetails(res, 201, new BooksPublisherResponse(booksPublisher), req.originalUrl);
});

Router.get('/', async (req, res) => {

    const books = await BooksRepository.getAllAsync();

    ResponseFilter.setResponseDetails(res, 200, books.map(book => new BookResponse(book)));
});

Router.get('/:id', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
       
    const book = await BooksRepository.getByIdAsync(id);
    
    if (!book) {
        throw new ServerError(`Book with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, /*new BookResponse(book)*/ book);
});

Router.put('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.MANAGER, RoleConstants.ADMIN), async (req, res) => {

    const bookBody = new BookPutBody(req.body, req.params.id);

    const book = await BooksRepository.updateByIdAsync(bookBody.Id, bookBody.Name, bookBody.AuthorId);
        
    if (!book) {
        throw new ServerError(`Book with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new BookResponse(book));
});

Router.put('/:bookId/publishers/:publisherId', AuthorizationFilter.authorizeRoles(RoleConstants.MANAGER, RoleConstants.ADMIN), async (req, res) => {
    let {
        bookId, publisherId
    } = req.params;

    bookId = parseInt(bookId);
    publisherId = parseInt(publisherId);

    if (!bookId || bookId < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }

    if (!publisherId || publisherId < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }

    const booksPublisherBody = new BooksPublisherPutBody(req.body, bookId, publisherId);

    const booksPublisher = await BooksPublishersRepository.updateByIdAsync(booksPublisherBody.BookId, booksPublisherBody.PublisherId, booksPublisherBody.Price);
        
    if (!booksPublisher) {
        throw new ServerError(`Book with id ${bookId} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new BooksPublisherResponse(booksPublisher));
});


Router.delete('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.MANAGER, RoleConstants.ADMIN), async (req, res) => {
    const {
        id
    } = req.params;

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
    
    const book = await BooksRepository.deleteByIdAsync(parseInt(id));
    
    if (!book) {
        throw new ServerError(`Book with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
});

Router.delete('/:bookId/publishers/:publisherId', AuthorizationFilter.authorizeRoles(RoleConstants.MANAGER, RoleConstants.ADMIN), async (req, res) => {
    let {
        bookId, publisherId
    } = req.params;

    bookId = parseInt(bookId);
    publisherId = parseInt(publisherId);

    if (!bookId || bookId < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }

    if (!publisherId || publisherId < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }

    const booksPublisher = await BooksPublishersRepository.deleteByIdAsync(bookId, publisherId);
    
    if (!booksPublisher) {
        throw new ServerError(`Book with id ${bookId} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
});

module.exports = Router;