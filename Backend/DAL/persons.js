const _tableName = 'Persons';

const getPersons = connection => (person = {}) => {
    const { id, email, password } = person;
    let query = `select * from ${_tableName}`;
    const clause = [];
    if (id) {
        clause.push(`id='${id}'`);
    }
    if (email) {
        clause.push(`email='${email}'`);
    }
    if (password) {
        clause.push(`password='${password}'`);
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

const savePerson = connection => person => {
    const { id, email, password, firstName, lastName, profileImage, isSeller } = person;
    let query = `insert into ${_tableName} (id, email, password, firstName, lastName, profileImage, isSeller)` +
        `VALUES ('${id}', '${email}', '${password}', '${firstName}', '${lastName}', '${profileImage}', ${isSeller});`;
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
    getPersons,
    savePerson
};