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

const saveItem = connection => item => {
    const { itemID, restaurantId, itemName, iDesc, price, iImage, secName } = item;
    let query = `insert into ${_tableName} (itemID, restaurantId, itemName, iDesc, price, iImage, secName)` +
        `VALUES ('${itemID}', '${restaurantId}', '${itemName}', '${iDesc}', '${price}', '${iImage}', '${secName}');`;
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
    getItems,
    saveItem
};