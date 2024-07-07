const {
    queryAsync
} = require('..');

const addAsync = async (name) => {
    console.info(`Adding publisher in database async...`);

    const publishers = await queryAsync('INSERT INTO publishers (name) VALUES ($1) RETURNING *', [name]);
    return publishers[0];
};

const getAllAsync = async () => {
    console.info(`Getting all publishers from database async...`);

    return await queryAsync('SELECT * FROM publishers');
};

const getByIdAsync = async (id) => {
    console.info(`Getting the publisher with id ${id} from database async...`);

    const publishers = await queryAsync('SELECT publishers.id as "publisher_id", publishers.name as "publisher_name", books.id as "book_id", books.name as "book_name", authors.id as "author_id", authors.first_name as "author_first_name", authors.last_name as "author_last_name" FROM publishers INNER JOIN publishers_books ON publishers.id=publishers_books.publisher_id INNER JOIN books ON publishers_books.book_id=books.id INNER JOIN authors ON authors.id=books.author_id WHERE publishers.id = $1', [id]);
    return publishers;
};

const updateByIdAsync = async (id, name) => {
    console.info(`Updating the publisher with id ${id} from database async...`);

    const publishers =  await queryAsync('UPDATE publishers SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return publishers[0];
};

const deleteByIdAsync = async (id) => {
    console.info(`Deleting the publisher with id ${id} from database async...`);

    const publishers = await queryAsync('DELETE FROM publishers WHERE id = $1 RETURNING *', [id]);
    return publishers[0];
    
};

module.exports = {
    addAsync,
    getAllAsync,
    getByIdAsync,
    updateByIdAsync,
    deleteByIdAsync
}