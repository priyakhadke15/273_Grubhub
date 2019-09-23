const _tableName = 'Restaurants';

const getRestaurants = connection => (restaurant = {}) => {
    const { restaurantId, ownerId } = restaurant;
    let query = `select * from ${_tableName}`;
    const clause = [];
    if (restaurantId) {
        clause.push(`restaurantId='${restaurantId}'`);
    }
    if (ownerId) {
        clause.push(`ownerId='${ownerId}'`);
    }
    query += clause.length > 0 ? ` where ${clause.join(' and ')}` : ''
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

const saveRestaurant = connection => restaurant => {
    const { restaurantId, ownerId, name, image, address, cuisine, zipcode } = restaurant;
    let query = `insert into ${_tableName} (restaurantId, ownerId, name, image, address, cuisine, zipcode)` +
        `VALUES ('${restaurantId}', '${ownerId}','${name}', '${image}', '${address}', '${cuisine}', '${zipcode}');`;
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
const editRestaurant = connection => restaurant => {
    const { ownerId, name, image, address, cuisine, zipcode } = restaurant;
    let query = `UPDATE ${_tableName}`;
    const clause = [];

    if (name) {
        clause.push(`name='${name}'`);
    }
    if (image) {
        clause.push(`image='${image}'`);
    }
    if (address) {
        clause.push(`address='${address}'`);
    }
    if (cuisine) {
        clause.push(`cuisine='${cuisine}'`);
    }
    if (zipcode) {
        clause.push(`zipcode='${zipcode}'`);
    }
    query += ` SET ${clause.join(' , ')}`;
    query += `where ownerId='${ownerId}'`;
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

}
module.exports = {
    getRestaurants,
    saveRestaurant,
    editRestaurant
};