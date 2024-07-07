const {
    queryAsync
} = require('..');

const addAsync = async (name, author_id) => {
    console.info(`Adding book in database async...`);

    const books = await queryAsync('INSERT INTO books (name, author_id) VALUES ($1, $2) RETURNING *', [name, author_id]);
    return books[0];
};

const getAllAsync = async () => {
    console.info(`Getting all books from database async...`);

    return await queryAsync('SELECT * FROM books');
};

const getByIdAsync = async (id) => {
    console.info(`Getting the book with id ${id} from database async...`);

    const books = await queryAsync('SELECT books.id as "book_id", books.name as "book_name", authors.id as "author_id", authors.first_name as "author_first_name", authors.last_name as "author_last_name", publishers_books.publisher_id as "publisher_id", publishers.name as "publisher_name" FROM books INNER JOIN authors ON books.author_id=authors.id INNER JOIN publishers_books ON publishers_books.book_id=books.id INNER JOIN publishers ON publishers_books.publisher_id=publishers.id WHERE books.id = $1', [id]);
    return books;
};

const updateByIdAsync = async (id, name, author_id) => {
    console.info(`Updating the book with id ${id} from database async...`);

    const books =  await queryAsync('UPDATE books SET name = $1, author_id = $2 WHERE id = $3 RETURNING *', [name, author_id, id]);
    return books[0];
};

const deleteByIdAsync = async (id) => {
    console.info(`Deleting the book with id ${id} from database async...`);

    const books = await queryAsync('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return books[0];
    
};

module.exports = {
    addAsync,
    getAllAsync,
    getByIdAsync,
    updateByIdAsync,
    deleteByIdAsync
}