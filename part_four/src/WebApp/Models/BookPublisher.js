const ServerError = require('./ServerError.js');

class BookPublisherPostBody {
    constructor(body) {
        this.bookId = parseInt(body.bookId);
        this.publisherId = parseInt(body.publisherId);
        this.price = parseInt(body.price);

        if (this.bookId == null || this.bookId < 1) {
            throw new ServerError("Book Id is missing", 400);
        }

        if (this.publisherId == null || this.publisherId < 1) {
            throw new ServerError("Publisher Id is missing", 400);
        }

        if (this.price == null || this.price < 0) {
            throw new ServerError("Book Price is missing", 400);
        }
    }

    get Price () {
        return this.price;
    }

    get BookId () {
        return this.bookId;
    }

    get PublisherId () {
        return this.publisherId;
    }
}

class BookPublisherPutBody extends BookPublisherPostBody {
    constructor (body) {
        super(body);

        if (!this.bookId || this.bookId < 1) {
            throw new ServerError("Book Id should be a positive integer", 400);
        }

        if (!this.publisherId || this.publisherId < 1) {
            throw new ServerError("Publisher Id should be a positive integer", 400);
        }
    }

}

class BookPublisherResponse {
    constructor(bookPublisher) {
        console.log(bookPublisher);
        this.bookId = parseInt(bookPublisher.book_id);
        this.publisherId = parseInt(bookPublisher.publisher_id);
        this.price = parseInt(bookPublisher.price);
    }
}

module.exports = {
    BookPublisherPostBody,
    BookPublisherPutBody,
    BookPublisherResponse
};