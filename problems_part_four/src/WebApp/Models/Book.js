const ServerError = require('./ServerError.js');

class BookPostBody {
    constructor (body) {
        this.name = body.name;
        this.authorId = body.authorId;

        if (this.name == null || this.name.length < 4) {
            throw new ServerError("Name is missing", 400);
        }
    }

    get Name () {
        return this.name;
    }

    get AuthorId () {
        return this.authorId;
    }

}

class BookPutBody extends BookPostBody {
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


class BookResponse {
    constructor(book) {
        this.id = book.id;
        this.name = book.name;
        this.authorId = book.author_id;
    }
}


class BookAllDetailsResponse {
    constructor(book) {
        this.id = book.id;
        this.name = book.name;
        this.author_id = book.author_id;
        this.author_first_name = book.author_first_name;
        this.author_last_name = book.author_last_name;
        this.publisher_id = book.publisher_id;
        this.publisher_name = book.publisher_name;
    }
}

module.exports =  {
    BookPostBody,
    BookResponse,
    BookPutBody,
    BookAllDetailsResponse
}