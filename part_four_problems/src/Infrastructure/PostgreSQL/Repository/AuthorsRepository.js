const {
    queryAsync
} = require('..');

const addAsync = async (first_name, last_name) => {
    console.info(`Adding author in database async...`);

    const authors = await queryAsync('INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *', [first_name, last_name]);
    return authors[0];
};

const getAllAsync = async () => {
    console.info(`Getting all authors from database async...`);

    return await queryAsync('SELECT * FROM authors');
};

const getByIdAsync = async (id) => {
    console.info(`Getting the author with id ${id} from database async...`);

    const authors = await queryAsync('SELECT * FROM authors WHERE id = $1', [id]);
    return authors[0];
};

const getByAuthorAsync = async (id) => {
    console.info(`Getting the books by the author with id ${id} from database async...`);

    const result = await queryAsync(
    `SELECT publishers.id AS publisher_id, publishers.name AS publisher_name, T2.book_id, T2.book_name FROM publishers JOIN
    (SELECT P.publisher_id AS publisher_id, T1.book_id AS book_id, T1.book_name AS book_name FROM publishers_books P JOIN
    (SELECT id AS book_id, name AS book_name FROM books WHERE author_id = $1) AS T1 ON P.book_id = T1.book_id) AS T2 ON T2.publisher_id = publishers.id;`, [id])

    return result;
}

const updateByIdAsync = async (id, first_name, last_name) => {
    console.info(`Updating the author with id ${id} from database async...`);

    const authors =  await queryAsync('UPDATE authors SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *', [first_name, last_name, id]);
    return authors[0];
};

const deleteByIdAsync = async (id) => {
    console.info(`Deleting the author with id ${id} from database async...`);

    const authors = await queryAsync('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
    return authors[0];
    
};

module.exports = {
    addAsync,
    getAllAsync,
    getByIdAsync,
    getByAuthorAsync,
    updateByIdAsync,
    deleteByIdAsync
}