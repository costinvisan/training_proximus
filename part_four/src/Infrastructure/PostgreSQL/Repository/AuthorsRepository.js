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

const getBooksByIdAsync = async (id) => {
    console.info(`Getting the books by the author with id ${id} from database async...`);

    const authorBooks = await queryAsync(
        `SELECT 
            a.id AS author_id,
            b.id AS book_id,
            b.name AS book_name,
            p.id AS publisher_id,
            p.name AS publisher_name
        FROM 
            authors a
        JOIN
            books b ON a.id = b.author_id
        LEFT JOIN
            publishers_books pb ON b.id = pb.book_id
        LEFT JOIN
            publishers p ON pb.publisher_id = p.id
        WHERE
            a.id = $1`
    , [id]);
    return authorBooks;
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
    getBooksByIdAsync,
    updateByIdAsync,
    deleteByIdAsync
}