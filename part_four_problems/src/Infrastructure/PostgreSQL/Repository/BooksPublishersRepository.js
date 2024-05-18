const {
    queryAsync
} = require('..');

const addAsync = async (book_id, publisher_id, price) => {
    console.info(`Adding publisher to a book in database async...`);

    const result = await queryAsync('INSERT INTO publishers_books (book_id, publisher_id, price) VALUES ($1, $2, $3) RETURNING *', [book_id, publisher_id, price]);
    return result[0];
};

const updateByIdAsync = async (book_id, publisher_id, newPrice) => {
    console.info(`Updating the price...`);

    const result =  await queryAsync('UPDATE publishers_books SET price = $3 WHERE book_id = $1 AND publisher_id = $2 RETURNING *', [book_id, publisher_id, newPrice]);
    return result[0];
};

const deleteByIdAsync = async (book_id, publisher_id) => {
    console.info(`Deleting the price and publisher...`);

    const result = await queryAsync('DELETE FROM publishers_books WHERE book_id = $1 AND publisher_id = $2 RETURNING *', [book_id, publisher_id]);
    return result[0];
    
};
module.exports = {
    addAsync,
    updateByIdAsync,
    deleteByIdAsync
}