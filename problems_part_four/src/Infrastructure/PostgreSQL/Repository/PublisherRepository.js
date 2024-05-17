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
    console.info(`Getting the publisher details with id ${id} from database async...`);

    const publisherDetails = await queryAsync(
        `SELECT 
          p.id AS id, p.name AS name,
          b.id AS book_id, b.name AS book_name,
          a.id AS author_id, a.first_name AS author_first_name, a.last_name AS author_last_name
        FROM publishers p
        LEFT JOIN publishers_books pb ON p.id = pb.publisher_id
        LEFT JOIN books b ON pb.book_id = b.id
        LEFT JOIN authors a ON b.author_id = a.id
        WHERE p.id = $1;
      `, [id]);
    return publisherDetails;
};


const updateByIdAsync = async (id, name) => {
    console.info(`Updating the pulishers with id ${id} from database async...`);

    const publishers =  await queryAsync('UPDATE publishers SET name = $1 WHERE id = $2 RETURNING *', [name,id]);
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