const Router = require('express')();

const AuthorsController = require('./AuthorsController.js');
const BooksController = require('./BooksController.js');
const PublishersController = require('./PublishersController.js');
const BooksPublishersController = require('./BooksPublishersController.js');

Router.use('/v1/authors', AuthorsController);
Router.use('/v1/books', BooksController);
Router.use('/v1/publishers', PublishersController);
Router.use('/v1/books', BooksPublishersController);


module.exports = Router;