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
    console.info(`Getting the book details with id ${id} from database async...`);

    const bookDetails = await queryAsync(
        ` SELECT b.id AS id, b.name AS name,
    a.id AS author_id, a.first_name AS author_first_name, a.last_name AS author_last_name,
    p.id AS publisher_id, p.name AS publisher_name
            FROM books b
    JOIN authors a ON b.author_id = a.id
    LEFT JOIN publishers_books pb ON b.id = pb.book_id
    LEFT JOIN publishers p ON pb.publisher_id = p.id
    WHERE b.id = $1`, [id]);
    return bookDetails[0];
};


const updateByIdAsync = async (id, name, author_id) => {
    console.info(`Updating the book with id ${id} from database async...`);

    const books =  await queryAsync('UPDATE books SET name = $1, author_id = $2 WHERE id = $3 RETURNING *', [name, author_id,id]);
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