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

    const result = await queryAsync(`
    SELECT publishers.name AS publisher_name, T3.* FROM publishers JOIN
    (SELECT T2.*, A.first_name, A.last_name FROM authors A JOIN 
    (SELECT P.publisher_id, B.* FROM publishers_books P JOIN books B ON P.book_id = B.id WHERE P.publisher_id = $1) AS T2 ON A.id = T2.author_id) AS T3 ON publishers.id = T3.publisher_id;`, [id])

    return result;
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
