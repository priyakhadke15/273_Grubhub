const mysql = require('mysql');
// const faker = require('faker');
const { sql_host, sql_port, sql_user, sql_password, sql_database } = require('../config');

const { createTables } = require('./init');
const { getPersons, savePerson } = require('./persons');
const { getItems } = require('./items');
const { getRestaurants } = require('./restaurants');

const pool = mysql.createPool({
    host: sql_host,
    port: sql_port,
    user: sql_user,
    password: sql_password,
    database: sql_database,
    multipleStatements: true
});

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            console.log()
            return err ? reject(err) : resolve(connection);
        });
    });
};

const _createTables = async () => {
    const conn = await getConnection();
    return createTables(conn);
};

const _getPersons = async id => {
    const conn = await getConnection();
    return getPersons(conn)(id);
};

const _savePerson = async person => {
    const conn = await getConnection();
    return savePerson(conn)(person);
};

const _getItems = async id => {
    const conn = await getConnection();
    return getItems(conn)(id);
};

const _getRestaurants = async id => {
    const conn = await getConnection();
    return getRestaurants(conn)(id);
};

(async () => {
    try {
        // const createFakePerson = () => ({
        //     id: faker.random.uuid(),
        //     email: faker.internet.email(),
        //     password: faker.internet.password(),
        //     firstName: faker.name.firstName(),
        //     lastName: faker.name.lastName(),
        //     profileImage: faker.image.avatar(),
        //     isSeller: false
        // });
        // await _savePerson(createFakePerson());
        const { results, fields } = await _getPersons();
        console.log(JSON.stringify(results, null, 4))
    } catch (e) {
        console.error('error getting persons', e);
    }
})();

module.exports = {
    createTables: _createTables,
    getPersons: _getPersons,
    savePerson: _savePerson,
    getItems: _getItems,
    getRestaurants: _getRestaurants
};