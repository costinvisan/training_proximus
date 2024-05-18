const ServerError = require('./ServerError.js');
const { AuthorPostBody, AuthorResponseForBookDetails } = require('./Author.js');
const { PublisherResponseForBookDetails } = require('./Publisher.js');
const {PublisherResponseParams} = require('../Models/Publisher.js');

class BookPostBody{
    constructor (body) {
        this.name = body.name;
        this.author = new AuthorPostBody(body.author);

        if (this.name == null) {
            throw new ServerError("Name is missing", 400);
        }
    
        if (this.author == null) {
            throw new ServerError("Author is missing", 400);
        }

    }

    get Name() {
        return this.name;
    }

    get Author() {
        return this.author;
    }
}

class BookPutBody extends BookPostBody {
    constructor(body, id) {
        super(body);
        this.id = parseInt(id);

        if (!this.id || this.id < 1) {
            throw new ServerError("Id should be a positive integer", 400);
        }
    }

    get Id() {
        return this.id;
    }
}

class BookResponse {
    constructor(book) {
        this.name = book.name;
        this.id = book.id;
    }
}

class BookResponseParam {
    constructor(book) {
        this.bookId = book.book_id;
        this.bookName = book.book_name;
        this.publisher = new PublisherResponseParams(book.publisher_id, book.publisher_name);
    }
}

class BookResponseAllDetails {
    constructor(book) {
        this.bookId = book[0].book_id;
        this.bookName = book[0].book_name;
        this.author = new AuthorResponseForBookDetails(book[0].author_id, book[0].first_name, book[0].last_name);
        this.publisher = book.map(b => new PublisherResponseForBookDetails(b.publisher_id, b.publisher_name));
    }
}

class BookResponseForPublisherDetails {
    constructor(bookId, bookName, authorId, authorFirstName, authorLastName) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.author = new AuthorResponseForBookDetails(authorId, authorFirstName, authorLastName);
    }
}


module.exports = {
    BookPostBody,
    BookPutBody,
    BookResponse,
    BookResponseParam,
    BookResponseAllDetails,
    BookResponseForPublisherDetails
}