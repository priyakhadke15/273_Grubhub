const _tableName = 'Restaurants';

const getRestaurants = connection => id => {
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

const saveRestaurant = connection => restaurant => {
    const { restaurantId, ownerId, image, address, cuisine, zipcode } = restaurant;
    let query = `insert into ${_tableName} (restaurantId, ownerId, image, address, cuisine, zipcode)` +
        `VALUES ('${restaurantId}', '${ownerId}', '${image}', '${address}', '${cuisine}', '${zipcode}');`;
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
    getRestaurants,
    saveRestaurant
};