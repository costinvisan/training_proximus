const express = require('express');

const UsersManager = require('../../WebCore/Managers/UsersManager.js');
const UsersRepository = require('../../Infrastructure/PostgreSQL/Repository/UsersRepository.js');

const {
    UserBody,
    UserRegisterResponse,
    UserLoginResponse
} = require ('../Models/Users.js');
const ResponseFilter = require('../Filters/ResponseFilter.js');
const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');
const RoleConstants = require('../Constants/Roles.js');

const Router = express.Router();

Router.post('/register', async (req, res) => {

    const userBody = new UserBody(req.body);
    const user = await UsersManager.registerAsync(userBody.Username, userBody.Password);

    ResponseFilter.setResponseDetails(res, 201, new UserRegisterResponse(user));
});

Router.post('/login', async (req, res) => {

    const userBody = new UserBody(req.body);
    const userDto = await UsersManager.authenticateAsync(userBody.Username, userBody.Password);
    const user = new UserLoginResponse(userDto.Token, userDto.Role);
    console.log(user);
    ResponseFilter.setResponseDetails(res, 200, user);
});

Router.get('/', AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN), async (req, res) => {

    const users = await UsersRepository.getAllAsync();

    ResponseFilter.setResponseDetails(res, 200, users.map(user => new UserRegisterResponse(user)));
});

Router.put('/:userId/role/:roleId', AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN), async (req, res) => {
    let {
        userId,
        roleId
    } = req.params;

    userId = parseInt(userId);
    roleId = parseInt(roleId);

    /**
     * TODO
     */

    const user = await UsersRepository.updateRoleByUserId(userId, roleId);
    ResponseFilter.setResponseDetails(res, 200, user);

});

module.exports = Router;