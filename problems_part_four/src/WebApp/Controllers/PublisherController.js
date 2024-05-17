const express = require('express');

const PublisherRepository = require('../../Infrastructure/PostgreSQL/Repository/PublisherRepository.js');
const ServerError = require('../Models/ServerError.js');
const { PublisherPostBody, PublisherResponseBody, PublisherPutBody, PublisherAllDetailsResponse} = require('../Models/Publisher.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/', async (req, res) => {
    try{
        const publisherBody = new PublisherPostBody(req.body);

        const publisher = await PublisherRepository.addAsync(publisherBody.name);
    
        ResponseFilter.setResponseDetails(res, 201, new PublisherResponseBody(publisher), req.originalUrl);
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500, "Something bad happened!");
    }
});

Router.get('/', async (req, res) => {
    try{
        const publishers = await PublisherRepository.getAllAsync();

        ResponseFilter.setResponseDetails(res, 200, publishers.map(publisher => new PublisherResponseBody(publisher)));
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});

Router.get('/:id', async (req, res) => {

    const id = parseInt(req.params.id);
    
    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
           
    const publisher = await PublisherRepository.getByIdAsync(id);
        
     if (!publisher) {
         throw new ServerError(`Publisher with id ${id} does not exist!`, 404);
     }
    
     ResponseFilter.setResponseDetails(res, 200, new PublisherAllDetailsResponse(publisher));
});
    
    
Router.put('/:id', async (req, res) => {
    try{
        const publisherBody = new PublisherPutBody(req.body, req.params.id);

        const publisher = await PublisherRepository.updateByIdAsync(publisherBody.Id, publisherBody.Name);
        
        if (!publisher) {
            throw new ServerError(`Publisher with id ${id} does not exist!`, 404);
        }
        ResponseFilter.setResponseDetails(res, 200, new PublisherResponseBody(publisher));
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});


Router.delete('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
    
        if (!id || id < 1) {
            throw new ServerError("Id should be a positive integer", 400);
        }
        
        const publisher = await PublisherRepository.deleteByIdAsync(id);
        
        if (!publisher) {
            throw new ServerError(`Book with id ${id} does not exist!`, 404);
        }
    
        ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
    }catch(error){
        ResponseFilter.setResponseDetails(res, 500,"Something bad happened");
    }
});


module.exports = Router;