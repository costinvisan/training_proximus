const express = require('express');

const AuthorsRepository = require('../../Infrastructure/PostgreSQL/Repository/AuthorsRepository.js');
const ServerError = require('../Models/ServerError.js');
const { AuthorPostBody, AuthorPutBody, AuthorResponse, AuthorBooksResponse } = require('../Models/Author.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/', async (req, res) => {
    
    const authorBody = new AuthorPostBody(req.body);

    const author = await AuthorsRepository.addAsync(authorBody.FirstName, authorBody.LastName);

    ResponseFilter.setResponseDetails(res, 201, new AuthorResponse(author), req.originalUrl);
});

Router.get('/', async (req, res) => {

    const authors = await AuthorsRepository.getAllAsync();

    ResponseFilter.setResponseDetails(res, 200, authors.map(author => new AuthorResponse(author)));
});

Router.get('/:id/books', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }

    const authorBooks = await AuthorsRepository.getBooksByIdAsync(id);
    
    if (!authorBooks) {
        throw new ServerError(`Author with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new AuthorBooksResponse(authorBooks));
});

Router.get('/:id', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }

    const author = await AuthorsRepository.getByIdAsync(id);
    
    if (!author) {
        throw new ServerError(`Author with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new AuthorResponse(author));
});

Router.put('/:id', async (req, res) => {

    const authorBody = new AuthorPutBody(req.body, req.params.id);

    const author = await AuthorsRepository.updateByIdAsync(authorBody.Id, authorBody.FirstName, authorBody.LastName);
        
    if (!author) {
        throw new ServerError(`Author with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new AuthorResponse(author));
});

Router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
    
    const author = await AuthorsRepository.deleteByIdAsync(parseInt(id));
    
    if (!author) {
        throw new ServerError(`Author with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
});

Router.get('/authors/:id/books', async (req, res) => {
    // TODO: a returna id-ul si numele cartilor pentru autorul cu id-ul :id, impreuna cu id-ul si numele editurii/editurilor pentru fiecare carte
});

module.exports = Router;