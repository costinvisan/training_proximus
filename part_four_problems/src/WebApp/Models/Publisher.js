const ServerError = require('./ServerError.js');

class PublisherPostBody {
    constructor (body) {
        this.name = body.name;

        if (this.name == null) {
            throw new ServerError("Name is missing", 400);
        }
    }

    get Name () {
        return this.name;
    }

}

class PublisherPutBody extends PublisherPostBody {
    constructor (body, id) {
        super(body);
        this.id = parseInt(id);

        if (!this.id || this.id < 1) {
            throw new ServerError("Id should be a positive integer", 400);
        }
    }

    get Id () {
        return this.id;
    }
}

class PublisherResponse {
    constructor(publisher) {
        this.name = publisher.name;
        this.id = publisher.id;
    }
}

class PublisherResponseParams {
    constructor(publisherId, publisherName) {
        this.name = publisherId;
        this.id = publisherName;
    }
}

class PublisherResponseForBookDetails{
    constructor(publisher_id, publisher_name) {
        this.publisherId = publisher_id;
        this.publisherName = publisher_name;
    }
}

module.exports =  {
    PublisherPostBody,
    PublisherPutBody,
    PublisherResponse,
    PublisherResponseParams,
    PublisherResponseForBookDetails
}