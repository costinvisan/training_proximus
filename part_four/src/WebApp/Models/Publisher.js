const ServerError = require('./ServerError.js');

class PublisherPostBody {
    constructor(body) {
        this.name = body.name;

        if (this.name == null || this.name.length < 4) {
            throw new ServerError("Publisher name is missing", 400);
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

class PublisherBooksResponse{
    constructor(publisher) {
        this.id = publisher[0].publisher_id;
        this.name = publisher[0].publisher_name;
        this.books = publisher.map(row =>({
            id: row.book_id,
            name: row.book_name,
            author: {
                id: row.author_id,
                firstName: row.author_first_name,
                lastName: row.author_last_name
            }
        }));

        if (this.books[0].id === null) {
            this.books = [];
        }
    }
}


module.exports = {
    PublisherPostBody,
    PublisherPutBody,
    PublisherResponse,
    PublisherBooksResponse,
};