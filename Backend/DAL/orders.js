const _tableName = 'Orders';

const getOrders = connection => order => {
    const { orderID, restaurantId, buyerId, orderDate, deliveryAdd, status, price } = order;
    let query = `select * from ${_tableName}`;
    const clause = [];
    if (orderID) {
        clause.push(`orderID='${orderID}'`);
    }
    if (restaurantId) {
        clause.push(`restaurantId='${restaurantId}'`);
    }
    if (buyerId) {
        clause.push(`buyerId='${buyerId}'`);
    }
    if (orderDate) {
        clause.push(`orderDate='${orderDate}'`);
    }
    if (deliveryAdd) {
        clause.push(`deliveryAdd like '%${deliveryAdd}%'`);
    }
    if (status) {
        clause.push(`status='${status}'`);
    }
    if (price) {
        clause.push(`price<='${price}'`);
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
const getOrderDetails = connection => orderdetail => {
    const { orderID } = orderdetail;
    let query = `select * from OrderDetails`;
    const clause = [];
    if (orderID) {
        clause.push(`orderID='${orderID}'`);
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


module.exports = {
    getOrders,
    getOrderDetails
};