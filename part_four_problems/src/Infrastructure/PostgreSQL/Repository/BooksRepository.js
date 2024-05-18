const {
    queryAsync
} = require('..');

const addAsync = async (name, author) => {
    console.info(`Adding book in database async...`);

    const authorQueryResult = await queryAsync(
        'SELECT id FROM authors WHERE first_name = $1 AND last_name = $2',
        [author.firstName, author.lastName]
    );

    if (authorQueryResult.length === 0) {
        throw new Error('Author not found');
    }
    const authorId = authorQueryResult[0].id;

    const bookResult = await queryAsync(
        `INSERT INTO books (name, author_id) VALUES ($1, $2) RETURNING *`,
        [name, authorId]
    );
    
    return bookResult[0];
};

const getAllAsync = async () => {
    console.info(`Getting all books from database async...`);

    return await queryAsync('SELECT * FROM books');
};

const getByIdAsync = async (id) => {
    console.info(`Getting the book with id ${id} from database async...`);

    const result = await queryAsync(`
    SELECT T1.author_id, T1.first_name, T1.last_name, T1.book_id, T1.book_name, T2.publisher_id, T2.publisher_name FROM 
    (select books.id AS book_id, authors.id AS author_id, authors.first_name, authors.last_name, books.name AS book_name from authors Join books on authors.id = books.author_id where books.id = $1) AS T1 JOIN 
    (select publishers.id AS publisher_id, publishers.name AS publisher_name, publishers_books.book_id AS book_id from publishers join publishers_books on publishers.id = publishers_books.publisher_id where book_id = $1) AS T2 ON T1.book_id = T2.book_id;`, [id])

    return result;
};

const updateByIdAsync = async (id, name) => {
    console.info(`Updating the book with id ${id} from database async...`);

    const book =  await queryAsync('UPDATE books SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return book[0];
};

const deleteByIdAsync = async (id) => {
    console.info(`Deleting the book with id ${id} from database async...`);

    const book = await queryAsync('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return book[0];
    
};


module.exports = {
    addAsync,
    getAllAsync,
    getByIdAsync,
    updateByIdAsync,
    deleteByIdAsync
}