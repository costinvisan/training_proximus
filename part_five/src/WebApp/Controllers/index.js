const Router = require('express')();

const AuthorsController = require('./AuthorsController.js');
const UserController = require('./UsersController.js');
const RoleController = require('./RolesControllers.js');
const BooksController = require('./BooksController.js');
const PublishersController = require('./PublishersController.js');

const {
    authorizeAndExtractTokenAsync
} = require("../Filters/JWTFilter");

/**
 * TODO import controllers
 */

Router.use('/v1/authors', authorizeAndExtractTokenAsync, AuthorsController);
Router.use('/v1/users', UserController);
Router.use('/v1/roles', authorizeAndExtractTokenAsync, RoleController);
Router.use('/v1/books', authorizeAndExtractTokenAsync, BooksController);
Router.use('/v1/publishers', authorizeAndExtractTokenAsync, PublishersController);

/**
 * TODO add controllers to main router
 */

module.exports = Router;