const Router = require('express')();

const AuthorsController = require('./AuthorsController.js');
const BooksController = require('./BookController.js');
const PublisherController = require('./PublisherController.js');
const BookPublisherController = require('./BookPublisherController.js');

Router.use('/v1/authors', AuthorsController);
Router.use('/v1/books', BooksController);
Router.use('/v1/publishers', PublisherController);
Router.use('/v1/bookPublisher', BookPublisherController);


module.exports = Router;