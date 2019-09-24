const _tableName = 'Items';

const getItems = connection => item => {
    const { itemName, iDesc, price, secName } = item;
    let query = `select * from ${_tableName}`;
    const clause = [];
    if (itemName) {
        clause.push(`itemName LIKE '%${itemName}%'`);
    }
    if (iDesc) {
        clause.push(`iDesc like '%${iDesc}%'`);
    }
    if (price) {
        clause.push(`price<='${price}'`);
    }
    if (secName) {
        clause.push(`secName like '%${secName}%'`);
    }
    query += clause.length > 0 ? ` where ${clause.join(' and ')}` : ''
    console.log(query);
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
const editItem = connection => item => {
    const { itemID, itemName, iDesc, price, iImage, secName } = item;
    let query = `UPDATE ${_tableName}`;
    const clause = [];

    if (itemName) {
        clause.push(`itemName='${itemName}'`);
    }
    if (iDesc) {
        clause.push(`iDesc='${iDesc}'`);
    }
    if (price) {
        clause.push(`price='${price}'`);
    }

    if (secName) {
        clause.push(`secName='${secName}'`);
    }
    query += ` SET ${clause.join(' , ')}`;
    query += `where itemID='${itemID}'`;
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
    saveItem,
    editItem
};