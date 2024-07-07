const {
    queryAsync
} = require('..');

const addAsync = async (book_id, publisher_id, price) => {
    console.info(`Adding book in database async...`);

    const books = await queryAsync('INSERT INTO publishers_books (book_id, publisher_id, price) VALUES ($1, $2, $3) RETURNING *', [book_id, publisher_id, price]);
    return books[0];
};

const updateByIdAsync = async (book_id, publisher_id, price) => {
    console.info(`Updating the book with bookId ${bookId} from database async...`);

    const books =  await queryAsync('UPDATE publishers_books SET price = $1 WHERE (book_id = $2 AND publisher_id = $3) RETURNING *', [price, book_id, publisher_id]);
    return books[0];
};

const deleteByIdAsync = async (book_id, publisher_id) => {
    console.info(`Deleting the book with bookId ${bookId} from database async...`);

    const books = await queryAsync('DELETE FROM publishers_books WHERE (book_id = $1 AND publisher_id = $2) RETURNING *', [book_id, publisher_id]);
    return books[0];
    
};

module.exports = {
    addAsync,
    updateByIdAsync,
    deleteByIdAsync
}