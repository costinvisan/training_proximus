const ServerError = require('./ServerError.js');

const {BookResponseForPublisherDetails} = require('./Book.js');

class BookPublisherPostBody{

    constructor (body) {
        this.publisherId = body.publisherId;
        this.price = body.price;
    
        if (this.price == null) {
            throw new ServerError("Price is missing", 400);
        }

    }

    get PublisherId() {
        return this.publisherId;
    }

    get Price() {
        return this.price;
    }
}

class BookPublisherPutBody extends BookPublisherPostBody {
    constructor(body, bookId, publisherId) {
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

    get BookId() {
        return this.bookId;
    }
    get PublisherId() {
        return this.publisherId;
    }
}

class BookPublisherResponse {
    constructor(bookPublisher) {
        this.id = bookPublisher.id;
        this.bookId = bookPublisher.book_id;
        this.publisherId = bookPublisher.publisher_id;
        this.price = bookPublisher.price;
    }
}

class PublisherResponseAllDetails {
    constructor(publisher) {
        this.publisherId = publisher[0].publisher_id;
        this.publisherName = publisher[0].publisher_name;
        this.books = publisher.map(b => new BookResponseForPublisherDetails(b.id, b.name, b.author_id, b.first_name, b.last_name));
    }
}

module.exports = {
    BookPublisherPostBody,
    BookPublisherPutBody,
    PublisherResponseAllDetails,
    BookPublisherResponse
}