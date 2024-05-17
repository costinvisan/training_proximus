const ServerError = require('./ServerError.js');

class BookPublisherPostBody {
    constructor (body) {
        this.price = body.price;
        this.publisherId = body.publisherId;

        if (this.price == null || this.price <= 0) {
            throw new ServerError("Price is missing!", 400);
        }
    
    }

    get Price () {
        return this.price;
    }

    get PublisherId () {
        return this.publisherId;
    }
}


class BookPublisherPutBody extends BookPublisherPostBody {
    constructor (body, bookId, publisherId) {
        super(body);
        this.bookId = parseInt(bookId);
        this.publisherId = parseInt(publisherId);

        if (!this.bookId || this.bookId < 1) {
            throw new ServerError("BookId should be a positive integer", 400);
        }
        if (!this.publisherId || this.publisherId < 1) {
            throw new ServerError("PublisherId should be a positive integer", 400);
        }
    }

    get BookId () {
        return this.bookId;
    }

    get PublisherId () {
        return this.publisherId;
    }
}


class BookPublisherResponse {
    constructor(bookPublisher) {
        this.id = bookPublisher.id;
        this.price = bookPublisher.price;
        this.bookId = bookPublisher.book_id;
        this.publisherId = bookPublisher.publisher_id;
    }
}


module.exports =  {
    BookPublisherPostBody,
    BookPublisherPutBody,
    BookPublisherResponse
}