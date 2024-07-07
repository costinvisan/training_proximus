const UsersRepository = require('../../Infrastructure/PostgreSQL/Repository/UsersRepository.js');
const AuthenticatedUserDto = require('../DTOs/AuthenticatedUserDto.js');
const RegisteredUserDto = require('../DTOs/RegisteredUserDto.js');
const JwtPayloadDto = require('../DTOs/JwtPayloadDto.js');

const { hashPassword, comparePlainTextToHashedPassword } = require('../Security/Password')
const { generateTokenAsync } = require('../Security/Jwt');
const ServerError = require('../../WebApp/Models/ServerError.js');

const authenticateAsync = async (username, plainTextPassword) => {

    console.info(`Authenticates user with username ${username}`);

    const user = await UsersRepository.getByUsernameWithRoleAsync(username);
    
    if (!user) {
        throw new ServerError(`Utilizatorul cu username ${username} nu exista in sistem!`, 404);
    }

    /**
     * TODO
     * 
     * pas 1: verifica daca parola este buna (hint: functia compare)
     * pas 1.1.: compare returneaza true sau false. Daca parola nu e buna, arunca eroare
     * pas 2: genereaza token cu payload-ul JwtPayload
     * pas 3: returneaza AuthenticatedUserDto
     */
    if (!comparePlainTextToHashedPassword(plainTextPassword, user.password)) {
        throw new ServerError('Parola este incorecta', 404);
    }
    const payload = new JwtPayloadDto(user.id, user.role);
    const token = generateTokenAsync(payload);
    console.log(token);
    const authUser = new AuthenticatedUserDto(token, username, user.role);
    return authUser;
};

const registerAsync = async (username, plainTextPassword) => {
    /**
     * TODO
     * 
     * pas 1: cripteaza parola
     * pas 2: adauga (username, parola criptata) in baza de date folosind UsersRepository.addAsync
     * pas 3: returneaza RegisteredUserDto
     * 
     */
    const hashedPassword = hashPassword(plainTextPassword);
    UsersRepository.addAsync(username, hashedPassword);
    const user = UsersRepository.getByUsernameWithRoleAsync(username);
    return new RegisteredUserDto(user.id, username, user.role);
};

module.exports = {
    authenticateAsync,
    registerAsync
}