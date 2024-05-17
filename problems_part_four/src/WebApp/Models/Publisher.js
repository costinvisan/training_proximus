const ServerError = require('./ServerError.js');

class PublisherPostBody {
    constructor (body) {
        this.name = body.name;
      
        if (this.name == null || this.name.length < 4) {
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


class PublisherResponseBody {
    constructor(publisher) {
        this.id = publisher.id;
        this.name = publisher.name;
    }
}


class PublisherAllDetailsResponse{
    constructor(publisher) {
        this.id = publisher[0].id;
        this.name = publisher[0].name;
        this.books = publisher.map(row => ({
            id: row.book_id,
            name: row.book_name,
            author: {
              id: row.author_id,
              firstName: row.author_first_name,
              lastName: row.author_last_name,
            }
          }));
        }
}


module.exports =  {
    PublisherPostBody,
    PublisherResponseBody,
    PublisherPutBody,
    PublisherAllDetailsResponse
}