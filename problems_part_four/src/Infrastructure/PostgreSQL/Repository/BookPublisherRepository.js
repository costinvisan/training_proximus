const {
    queryAsync
} = require('..');

const addAsync = async (price, publisher_id, book_id) => {
    console.info(`Adding book in database async...`);

    const bookPublishers = await queryAsync('INSERT INTO publishers_books (book_id, publisher_id, price) VALUES ($1, $2, $3) RETURNING *', [book_id, publisher_id, price]);
    return bookPublishers[0];
};


const updateByIdAsync = async (bookId, publisherId, price) => {
    console.info(`Updating the bookPublisher from database async...`);

    const booksPublisher =  await queryAsync('UPDATE publishers_books SET price = $1 WHERE book_id = $2 AND publisher_id = $3 RETURNING *', [price, bookId, publisherId]);
    return booksPublisher[0];
};


const deleteByIdAsync = async (publisherId) => {
    console.info(`Deleting the publisher from a book from database async...`);

    const booksPublisher = await queryAsync('DELETE FROM publishers_books WHERE publisher_id = $1 RETURNING *', [publisherId]);
    return booksPublisher[0];
};


module.exports = {
    addAsync,
    updateByIdAsync,
    deleteByIdAsync
}