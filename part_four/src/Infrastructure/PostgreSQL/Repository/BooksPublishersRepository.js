const {
    queryAsync
} = require('..');

const addAsync = async (book_id, publisher_id, price) => {
    console.info(`Adding publisher and price to book in database async...`);

    const booksPublishers = await queryAsync('INSERT INTO publishers_books (book_id, publisher_id, price) VALUES ($1, $2, $3) RETURNING *', [book_id, publisher_id, price]);
    return booksPublishers[0];
}

const updateByIdAsync = async (book_id, publisher_id, price) => {
    console.info(`Updating the price to book with id ${book_id} and publisher with id ${publisher_id} from database async...`);

    const booksPublishers =  await queryAsync('UPDATE publishers_books SET price = $1 WHERE book_id = $2 AND publisher_id = $3 RETURNING *', [price, book_id, publisher_id]);
    return booksPublishers[0];
};

const deleteByIdAsync = async (book_id, publisher_id) => {
    console.info(`Deleting the book with id ${book_id} and publisher with id ${publisher_id} from database async...`);

    const booksPublishers = await queryAsync('DELETE FROM publishers_books WHERE book_id = $1 AND publisher_id = $2 RETURNING *', [book_id, publisher_id]);
    return booksPublishers[0];
    
};

module.exports = {
    addAsync,
    updateByIdAsync,
    deleteByIdAsync
}