const ServerError = require('./ServerError.js');

class BooksPublisherPostBody {
    constructor (body) {
        this.bookId = parseInt(body.bookId);
        this.publisherId = parseInt(body.publisherId);
        this.price = parseInt(body.price);

        if (this.price <= 0) {
            throw new ServerError("Price is incorrect.", 400);
        }
    }

    get BookId () {
        return this.bookId;
    }

    get PublisherId () {
        return this.publisherId;
    }

    get Price () {
        return this.price;
    }
}

class BooksPublisherPutBody extends BooksPublisherPostBody {
    constructor (body, bookId, publisherId) {
        body.bookId = bookId;
        body.publisherId = publisherId;
        super(body);

        if (!this.bookId || this.bookId < 1) {
            throw new ServerError("bookId should be a positive integer", 400);
        }

        if (!this.publisherId || this.publisherId < 1) {
            throw new ServerError("publisherId should be a positive integer", 400);
        }
    }

    // get BookId () {
    //     return this.bookId;
    // }

    // get PublisherId () {
    //     return this.publisherId;
    // }
}

class BooksPublisherResponse {
    constructor(booksPublisher) {
        this.bookId = booksPublisher.book_id;
        this.publisherId = booksPublisher.publisher_id;
        this.price = booksPublisher.price;
        this.id = booksPublisher.id;
    }
}

module.exports =  {
    BooksPublisherPostBody,
    BooksPublisherPutBody,
    BooksPublisherResponse
}