const _tableName = 'Items';

const getItems = connection => id => {
    let query = `select * from ${_tableName}${id ? `where id=${id}` : ''}`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            // release connection first!
            connection.release();

            if (error) {
                reject(error);
            } else {
                resolve({ results, fields });
            }
        });
    });
};

module.exports = {
    getItems
};